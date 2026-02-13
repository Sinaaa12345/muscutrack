/* =============================================================
   MUSCUTRACK - Application de suivi de musculation
   ============================================================= */

// =============================================================
// MUSCLE GROUPS
// =============================================================
const MUSCLE_GROUPS = [
    'Pectoraux',
    'Dos',
    'Épaules',
    'Biceps',
    'Triceps',
    'Quadriceps',
    'Ischio-jambiers',
    'Fessiers',
    'Mollets',
    'Abdominaux',
];

// =============================================================
// API LAYER
// =============================================================
let currentUserId = localStorage.getItem('mt_user_id');
let isOnline = true;
let _autoSaveInterval = null;

async function apiCall(method, path, body) {
    const headers = { 'Content-Type': 'application/json' };
    if (currentUserId) headers['X-User-Id'] = currentUserId;
    const res = await fetch(path, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Erreur réseau' }));
        throw new Error(err.error || `Erreur ${res.status}`);
    }
    return res.json();
}

async function syncFromServer() {
    if (!currentUserId) return false;
    try {
        const [workouts, sessions, activeSession] = await Promise.all([
            apiCall('GET', '/api/workouts'),
            apiCall('GET', '/api/sessions'),
            apiCall('GET', '/api/sessions/active')
        ]);
        localStorage.setItem('mt_workouts', JSON.stringify(workouts));
        localStorage.setItem('mt_sessions', JSON.stringify(sessions));
        if (activeSession) {
            localStorage.setItem('mt_active_session', JSON.stringify(activeSession));
        } else {
            localStorage.removeItem('mt_active_session');
        }
        isOnline = true;
        return true;
    } catch {
        isOnline = false;
        return false;
    }
}

async function initAuth(userId) {
    try {
        const result = await apiCall('POST', '/api/auth/init', { userId: userId || undefined });
        currentUserId = result.userId;
        localStorage.setItem('mt_user_id', currentUserId);
        isOnline = true;
        return result;
    } catch (err) {
        isOnline = false;
        throw err;
    }
}

// =============================================================
// STORAGE (localStorage + API sync)
// =============================================================
const Store = {
    _get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch { return null; }
    },
    _set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    getWorkouts() {
        return this._get('mt_workouts') || [];
    },
    saveWorkouts(workouts) {
        this._set('mt_workouts', workouts);
        if (currentUserId) {
            apiCall('POST', '/api/workouts', workouts).catch(() => {});
        }
    },

    getSessions() {
        return this._get('mt_sessions') || [];
    },
    saveSessions(sessions) {
        this._set('mt_sessions', sessions);
    },

    getActiveSession() {
        return this._get('mt_active_session');
    },
    saveActiveSession(session) {
        this._set('mt_active_session', session);
        // API sync is handled by auto-save interval, not every keystroke
    },
    clearActiveSession() {
        localStorage.removeItem('mt_active_session');
        if (currentUserId) {
            apiCall('DELETE', '/api/sessions/active').catch(() => {});
        }
    },

    addSession(session) {
        const sessions = this.getSessions();
        sessions.unshift(session);
        // Keep only 20 per workout
        const counts = {};
        const filtered = sessions.filter(s => {
            counts[s.workoutId] = (counts[s.workoutId] || 0) + 1;
            return counts[s.workoutId] <= 20;
        });
        this.saveSessions(filtered);
        if (currentUserId) {
            apiCall('POST', '/api/sessions', session).catch(() => {});
        }
    },

    deleteSession(sessionId) {
        const sessions = this.getSessions().filter(s => s.id !== sessionId);
        this.saveSessions(sessions);
        if (currentUserId) {
            apiCall('DELETE', `/api/sessions/${sessionId}`).catch(() => {});
        }
    },

    getSessionsForWorkout(workoutId) {
        return this.getSessions()
            .filter(s => s.workoutId === workoutId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    getLastSession(workoutId) {
        const sessions = this.getSessionsForWorkout(workoutId);
        return sessions.length > 0 ? sessions[0] : null;
    }
};

// =============================================================
// UTILITY
// =============================================================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateShort(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function formatTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.add('hidden'), 2500);
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// =============================================================
// AUTO-SAVE (session active)
// =============================================================
function startAutoSave() {
    stopAutoSave();
    _autoSaveInterval = setInterval(() => {
        if (!currentUserId) return;
        const active = Store.getActiveSession();
        if (active) {
            apiCall('POST', '/api/sessions/active', active).catch(() => {});
        }
    }, 2000);
}

function stopAutoSave() {
    if (_autoSaveInterval) {
        clearInterval(_autoSaveInterval);
        _autoSaveInterval = null;
    }
}

// =============================================================
// APP STATE & NAVIGATION
// =============================================================
const App = {
    currentPage: 'home',
    pageParams: {},
    pageStack: [],

    async init() {
        this.bindTabBar();
        this.registerSW();

        // Auth check
        const savedId = localStorage.getItem('mt_user_id');
        if (savedId) {
            currentUserId = savedId;
            // Try to sync from server
            this.showLoading();
            try {
                await initAuth(savedId);
                await syncFromServer();
            } catch {
                // Offline - continue with localStorage data
            }
            this.hideLoading();
            this.checkActiveSession();
            this.navigate('home');
        } else {
            this.showAuth();
        }
    },

    showLoading() {
        const main = document.getElementById('main');
        main.innerHTML = `
            <div class="empty-state">
                <div class="loading-spinner"></div>
                <p style="margin-top:16px;color:var(--text-secondary)">Chargement...</p>
            </div>
        `;
    },

    hideLoading() {
        // Cleared by next render
    },

    showAuth() {
        const main = document.getElementById('main');
        const tabBar = document.getElementById('tab-bar');
        const headerTitle = document.getElementById('header-title');
        const headerActions = document.getElementById('header-actions');

        tabBar.classList.add('hidden');
        headerTitle.textContent = 'MuscuTrack';
        headerActions.innerHTML = '';

        main.innerHTML = `
            <div class="auth-container">
                <div class="auth-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6.5 6.5h11M6.5 17.5h11M2 12h2M20 12h2M5 6.5V4M5 20v-2.5M19 6.5V4M19 20v-2.5M5 6.5a1.5 1.5 0 0 1-1.5 1.5M5 6.5a1.5 1.5 0 0 0 1.5 1.5M5 17.5A1.5 1.5 0 0 0 3.5 16M5 17.5a1.5 1.5 0 0 1 1.5-1.5M19 6.5a1.5 1.5 0 0 0 1.5 1.5M19 6.5a1.5 1.5 0 0 1-1.5 1.5M19 17.5a1.5 1.5 0 0 1 1.5-1.5M19 17.5a1.5 1.5 0 0 0-1.5-1.5"/>
                        <line x1="4" y1="8" x2="4" y2="16"/>
                        <line x1="20" y1="8" x2="20" y2="16"/>
                    </svg>
                </div>
                <h2 style="color:var(--text-primary);margin:0 0 8px">MuscuTrack</h2>
                <p style="color:var(--text-secondary);font-size:14px;margin:0 0 24px">Suivi de musculation</p>

                <div style="font-size:13px;color:var(--text-muted);margin-bottom:12px">Entrez votre nom d'utilisateur :</div>
                <div style="display:flex;gap:8px">
                    <input type="text" class="form-input" id="auth-id-input" placeholder="Ex: BASILE"
                           style="flex:1" maxlength="64">
                    <button class="btn btn-primary" id="auth-login-btn">Connexion</button>
                </div>
                <div id="auth-error" style="color:var(--accent);font-size:13px;margin-top:12px;display:none"></div>
            </div>
        `;

        document.getElementById('auth-login-btn').addEventListener('click', async () => {
            const input = document.getElementById('auth-id-input');
            const id = input.value.trim();
            if (!id) {
                input.focus();
                return;
            }
            const btn = document.getElementById('auth-login-btn');
            btn.disabled = true;
            try {
                await initAuth(id);
                await syncFromServer();
                showToast('Connexion réussie');
                this.onAuthSuccess();
            } catch (err) {
                const errorEl = document.getElementById('auth-error');
                errorEl.textContent = err.message || 'Erreur de connexion';
                errorEl.style.display = 'block';
                btn.disabled = false;
            }
        });

        document.getElementById('auth-id-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') document.getElementById('auth-login-btn').click();
        });
    },

    onAuthSuccess() {
        const tabBar = document.getElementById('tab-bar');
        tabBar.classList.remove('hidden');
        this.checkActiveSession();
        if (this.currentPage === 'home') {
            this.navigate('home');
        }
    },

    registerSW() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(() => {});
        }
    },

    checkActiveSession() {
        const active = Store.getActiveSession();
        if (active) {
            this.navigate('session', { session: active, resumed: true });
        }
    },

    bindTabBar() {
        document.querySelectorAll('#tab-bar .tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const page = tab.dataset.page;
                this.pageStack = [];
                this.navigate(page);
            });
        });
    },

    navigate(page, params = {}) {
        this.currentPage = page;
        this.pageParams = params;
        this.render();
    },

    pushPage(page, params = {}) {
        this.pageStack.push({ page: this.currentPage, params: this.pageParams });
        this.navigate(page, params);
    },

    goBack() {
        if (this.pageStack.length > 0) {
            const prev = this.pageStack.pop();
            this.navigate(prev.page, prev.params);
        } else {
            this.navigate('home');
        }
    },

    render() {
        const main = document.getElementById('main');
        const btnBack = document.getElementById('btn-back');
        const headerTitle = document.getElementById('header-title');
        const headerActions = document.getElementById('header-actions');
        const tabBar = document.getElementById('tab-bar');

        // Reset
        headerActions.innerHTML = '';
        btnBack.classList.add('hidden');
        btnBack.onclick = null;
        tabBar.classList.remove('hidden');
        main.classList.remove('no-padding', 'session-mode');

        // User ID button in header (when authenticated)
        if (currentUserId) {
            headerActions.innerHTML = `
                <button class="header-btn" id="btn-user-id" aria-label="Utilisateur" title="${escapeHtml(currentUserId)}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </button>
            `;
            setTimeout(() => {
                const btn = document.getElementById('btn-user-id');
                if (btn) btn.addEventListener('click', () => this.showUserInfo());
            }, 0);
        }

        // Update active tab
        document.querySelectorAll('#tab-bar .tab').forEach(t => {
            t.classList.toggle('active',
                t.dataset.page === this.currentPage ||
                (this.currentPage === 'workout-editor' && t.dataset.page === 'home') ||
                (this.currentPage === 'session' && t.dataset.page === 'home') ||
                (this.currentPage === 'progression' && t.dataset.page === 'history')
            );
        });

        switch (this.currentPage) {
            case 'home':
                headerTitle.textContent = 'MuscuTrack';
                renderHome(main);
                break;
            case 'workout-editor':
                headerTitle.textContent = this.pageParams.workoutId ? 'Modifier' : 'Nouveau programme';
                btnBack.classList.remove('hidden');
                btnBack.onclick = () => this.goBack();
                renderWorkoutEditor(main, this.pageParams);
                break;
            case 'session':
                headerTitle.textContent = 'Séance';
                tabBar.classList.add('hidden');
                main.classList.add('session-mode');
                renderSession(main, this.pageParams);
                break;
            case 'history':
                headerTitle.textContent = 'Historique';
                renderHistory(main, this.pageParams);
                break;
            case 'progression':
                headerTitle.textContent = 'Progression';
                btnBack.classList.remove('hidden');
                btnBack.onclick = () => this.goBack();
                renderProgression(main, this.pageParams);
                break;
            default:
                headerTitle.textContent = 'MuscuTrack';
                renderHome(main);
        }
    },

    showUserInfo() {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="confirm-modal">
                <h3>Utilisateur</h3>
                <p style="font-size:13px;color:var(--text-secondary);margin-bottom:8px">Votre ID :</p>
                <div style="background:var(--bg-primary);border-radius:8px;padding:10px 12px;font-family:monospace;font-size:14px;color:var(--accent);word-break:break-all;margin-bottom:4px">
                    ${escapeHtml(currentUserId)}
                </div>
                <p style="font-size:11px;color:var(--text-muted);margin-bottom:16px">
                    Notez cet ID pour vous reconnecter depuis un autre appareil.
                    ${isOnline ? '<span style="color:var(--success)">En ligne</span>' : '<span style="color:var(--accent)">Hors-ligne</span>'}
                </p>
                <div class="confirm-modal-actions">
                    <button class="btn btn-secondary" onclick="closeModal()">Fermer</button>
                    <button class="btn btn-danger" id="btn-change-user">Changer</button>
                </div>
            </div>
        `;
        document.getElementById('btn-change-user').addEventListener('click', () => {
            closeModal();
            localStorage.removeItem('mt_user_id');
            currentUserId = null;
            stopAutoSave();
            this.showAuth();
        });
        showModal();
    }
};

// =============================================================
// PAGE: HOME (Programmes)
// =============================================================
function renderHome(container) {
    const workouts = Store.getWorkouts();

    if (workouts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6.5 6.5h11M6.5 17.5h11M2 12h2M20 12h2M5 6.5V4M5 20v-2.5M19 6.5V4M19 20v-2.5M5 6.5a1.5 1.5 0 0 1-1.5 1.5M5 6.5a1.5 1.5 0 0 0 1.5 1.5M5 17.5A1.5 1.5 0 0 0 3.5 16M5 17.5a1.5 1.5 0 0 1 1.5-1.5M19 6.5a1.5 1.5 0 0 0 1.5 1.5M19 6.5a1.5 1.5 0 0 1-1.5 1.5M19 17.5a1.5 1.5 0 0 1 1.5-1.5M19 17.5a1.5 1.5 0 0 0-1.5-1.5"/>
                    <line x1="4" y1="8" x2="4" y2="16"/>
                    <line x1="20" y1="8" x2="20" y2="16"/>
                </svg>
                <h3>Aucun programme</h3>
                <p>Créez votre premier programme d'entraînement pour commencer le suivi.</p>
                <button class="btn btn-primary" onclick="App.pushPage('workout-editor')">Créer un programme</button>
            </div>
        `;
        return;
    }

    let html = '';
    workouts.forEach(w => {
        const lastSession = Store.getLastSession(w.id);
        const sessionCount = Store.getSessionsForWorkout(w.id).length;
        const exerciseTags = w.exercises.map(e =>
            `<span class="exercise-tag">${escapeHtml(e.name)}</span>`
        ).join('');

        html += `
            <div class="workout-card">
                <div class="workout-card-header">
                    <div>
                        <div class="workout-name">${escapeHtml(w.name)}</div>
                    </div>
                    <button class="btn-icon btn-secondary" onclick="editWorkout('${w.id}')" aria-label="Modifier">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                </div>
                <div class="workout-meta">
                    ${w.exercises.length} exercice${w.exercises.length > 1 ? 's' : ''}
                    ${lastSession ? ' · Dernière séance : ' + formatDateShort(lastSession.date) : ''}
                    ${sessionCount > 0 ? ` · ${sessionCount} séance${sessionCount > 1 ? 's' : ''}` : ''}
                </div>
                <div class="workout-exercises-preview">${exerciseTags}</div>
                <div class="workout-actions">
                    <button class="btn btn-primary" onclick="startSession('${w.id}')">Démarrer</button>
                    <button class="btn btn-secondary" onclick="deleteWorkoutConfirm('${w.id}')">Supprimer</button>
                </div>
            </div>
        `;
    });

    if (workouts.length < 3) {
        html += `
            <button class="btn btn-secondary btn-block mt-16" onclick="App.pushPage('workout-editor')">
                + Nouveau programme
            </button>
        `;
    }

    container.innerHTML = html;
}

function editWorkout(id) {
    App.pushPage('workout-editor', { workoutId: id });
}

function deleteWorkoutConfirm(id) {
    const workout = Store.getWorkouts().find(w => w.id === id);
    if (!workout) return;
    showConfirmModal(
        'Supprimer le programme',
        `Supprimer "${escapeHtml(workout.name)}" et toutes ses séances ?`,
        () => {
            const workouts = Store.getWorkouts().filter(w => w.id !== id);
            Store.saveWorkouts(workouts);
            const sessions = Store.getSessions().filter(s => s.workoutId !== id);
            Store.saveSessions(sessions);
            // Also delete on server (cascade)
            if (currentUserId) {
                apiCall('DELETE', `/api/workouts/${id}`).catch(() => {});
            }
            showToast('Programme supprimé');
            App.navigate('home');
        }
    );
}

// =============================================================
// PAGE: WORKOUT EDITOR
// =============================================================
function renderWorkoutEditor(container, params) {
    const workoutId = params.workoutId;
    const existing = workoutId ? Store.getWorkouts().find(w => w.id === workoutId) : null;

    const state = {
        name: existing ? existing.name : '',
        exercises: existing ? [...existing.exercises.map(e => ({ ...e }))] : []
    };

    function render() {
        let exercisesHtml = '';
        state.exercises.forEach((ex, i) => {
            exercisesHtml += `
                <div class="editor-exercise">
                    <div class="editor-exercise-header">
                        <div>
                            <div class="editor-exercise-name">${escapeHtml(ex.name)}</div>
                            <div style="font-size:12px;color:var(--text-muted)">${escapeHtml(ex.muscle)}</div>
                        </div>
                        <button class="editor-exercise-remove" onclick="window._editorRemoveExercise(${i})">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                    <div class="editor-exercise-fields">
                        <div class="editor-field">
                            <label>Charge</label>
                            <input type="number" inputmode="decimal" class="inline-input" value="${ex.defaultWeight}"
                                   onchange="window._editorUpdateWeight(${i}, this.value)" min="0" step="0.5">
                            <label>kg</label>
                        </div>
                        <div class="editor-field">
                            <label>Séries</label>
                            <input type="number" inputmode="numeric" class="inline-input" value="${ex.defaultSets}"
                                   onchange="window._editorUpdateSets(${i}, this.value)" min="1" max="20" style="width:50px">
                        </div>
                    </div>
                </div>
            `;
        });

        // Muscle group options
        const muscleOptions = MUSCLE_GROUPS.map(m => `<option value="${m}">${m}</option>`).join('');

        container.innerHTML = `
            <div class="form-group">
                <label class="form-label">Nom du programme</label>
                <input type="text" class="form-input" id="workout-name" value="${escapeHtml(state.name)}"
                       placeholder="Ex: Push, Pull, Legs..." maxlength="30">
            </div>

            <div class="form-group">
                <label class="form-label">Exercices</label>
                ${exercisesHtml || '<p class="text-muted" style="font-size:14px;padding:8px 0">Aucun exercice ajouté</p>'}
            </div>

            <div class="add-exercise-form" style="background:var(--bg-card);border-radius:var(--radius);padding:14px;border:1px dashed var(--border);margin-bottom:16px">
                <div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">Ajouter un exercice</div>
                <input type="text" class="form-input" id="new-exercise-name" placeholder="Nom de l'exercice" maxlength="50" style="margin-bottom:10px">
                <select class="form-input" id="new-exercise-muscle" style="margin-bottom:12px">
                    <option value="" disabled selected>Groupe musculaire</option>
                    ${muscleOptions}
                </select>
                <button class="btn btn-secondary btn-block btn-sm" onclick="window._editorAddExercise()">+ Ajouter</button>
            </div>

            <button class="btn btn-primary btn-block" onclick="saveWorkout()" id="btn-save-workout">
                ${existing ? 'Enregistrer' : 'Créer le programme'}
            </button>
        `;

        document.getElementById('workout-name').addEventListener('input', (e) => {
            state.name = e.target.value;
        });
    }

    window._editorState = state;
    window._editorWorkoutId = workoutId;
    window._editorRender = render;

    window._editorRemoveExercise = (index) => {
        state.exercises.splice(index, 1);
        render();
    };
    window._editorUpdateWeight = (index, value) => {
        state.exercises[index].defaultWeight = parseFloat(value) || 0;
    };
    window._editorUpdateSets = (index, value) => {
        state.exercises[index].defaultSets = Math.max(1, parseInt(value) || 1);
    };
    window._editorAddExercise = () => {
        const nameInput = document.getElementById('new-exercise-name');
        const muscleSelect = document.getElementById('new-exercise-muscle');
        const name = nameInput.value.trim();
        const muscle = muscleSelect.value;

        if (!name) {
            showToast('Entrez un nom d\'exercice');
            nameInput.focus();
            return;
        }
        if (!muscle) {
            showToast('Sélectionnez un groupe musculaire');
            muscleSelect.focus();
            return;
        }

        state.exercises.push({ name, muscle, defaultWeight: 20, defaultSets: 4 });
        render();
        // Focus back on name input for quick multi-add
        setTimeout(() => {
            const input = document.getElementById('new-exercise-name');
            if (input) input.focus();
        }, 50);
    };

    render();
}

function saveWorkout() {
    const state = window._editorState;
    const name = document.getElementById('workout-name')?.value?.trim() || state.name.trim();

    if (!name) {
        showToast('Entrez un nom pour le programme');
        return;
    }
    if (state.exercises.length === 0) {
        showToast('Ajoutez au moins un exercice');
        return;
    }

    const workouts = Store.getWorkouts();
    const workoutId = window._editorWorkoutId;

    if (workoutId) {
        const idx = workouts.findIndex(w => w.id === workoutId);
        if (idx !== -1) {
            workouts[idx].name = name;
            workouts[idx].exercises = state.exercises;
        }
    } else {
        if (workouts.length >= 3) {
            showToast('Maximum 3 programmes atteint');
            return;
        }
        workouts.push({
            id: generateId(),
            name,
            exercises: state.exercises
        });
    }

    Store.saveWorkouts(workouts);
    showToast(workoutId ? 'Programme modifié' : 'Programme créé');
    App.goBack();
}

// =============================================================
// PERFORMANCE COMPARISON (vs séance précédente)
// =============================================================
function getExerciseComparison(workoutId, exerciseName, currentCompletedSets) {
    const sessions = Store.getSessionsForWorkout(workoutId);
    // Find the last session that contains this exercise
    let lastEx = null;
    let lastDate = null;
    for (const s of sessions) {
        const ex = s.exercises.find(e => e.name === exerciseName);
        if (ex && ex.sets.length > 0) {
            lastEx = ex;
            lastDate = s.date;
            break;
        }
    }

    if (!lastEx) return null;

    const prevTotalReps = lastEx.sets.reduce((acc, st) => acc + st.reps, 0);
    const prevMaxWeight = Math.max(...lastEx.sets.map(st => st.weight));
    const prev = { date: lastDate, totalReps: prevTotalReps, maxWeight: prevMaxWeight, sets: lastEx.sets };

    // Current performance from completed sets only
    if (currentCompletedSets.length === 0) {
        return { prev, status: 'pending', currentTotalReps: 0, currentMaxWeight: 0 };
    }

    const currentTotalReps = currentCompletedSets.reduce((acc, s) => acc + s.reps, 0);
    const currentMaxWeight = Math.max(...currentCompletedSets.map(s => s.weight));

    // Compare directly against previous session
    let status = 'neutral';
    if (currentMaxWeight > prevMaxWeight || currentTotalReps > prevTotalReps) {
        status = 'up';
    } else if (currentMaxWeight < prevMaxWeight && currentTotalReps < prevTotalReps) {
        status = 'down';
    }

    return {
        prev,
        status,
        currentTotalReps,
        currentMaxWeight,
        repsDiff: currentTotalReps - prevTotalReps,
        weightDiff: Math.round((currentMaxWeight - prevMaxWeight) * 10) / 10
    };
}

function renderComparisonHtml(comparison) {
    if (!comparison) return '';

    const arrowUp = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    const arrowDown = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>';

    // Previous session row
    const p = comparison.prev;
    const prevSetsStr = p.sets.map(s => `${s.weight}x${s.reps}`).join(' / ');
    let prevRowHtml = `
        <div class="perf-row">
            <span class="perf-row-label">Préc.</span>
            <div class="perf-row-values">
                <span>${p.maxWeight} kg</span>
                <span style="color:var(--text-muted)">|</span>
                <span>${p.totalReps} reps</span>
                <span style="color:var(--text-muted)">|</span>
                <span>${p.sets.length} ser.</span>
            </div>
        </div>
        <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${prevSetsStr}</div>
    `;

    // Current indicator
    let currentHtml = '';
    if (comparison.currentTotalReps > 0) {
        const repsDiff = comparison.repsDiff;
        const weightDiff = comparison.weightDiff;

        const repsClass = repsDiff > 0 ? 'up' : repsDiff < 0 ? 'down' : 'neutral';
        const weightClass = weightDiff > 0 ? 'up' : weightDiff < 0 ? 'down' : 'neutral';
        const repsSign = repsDiff > 0 ? '+' : '';
        const weightSign = weightDiff > 0 ? '+' : '';

        currentHtml = `
            <div class="perf-row" style="margin-top:4px;padding-top:4px;border-top:1px solid var(--border)">
                <span class="perf-row-label" style="font-weight:600;color:var(--text-primary)">Actuel</span>
                <div class="perf-row-values">
                    <span class="perf-badge ${weightClass}">${weightDiff !== 0 ? (weightClass === 'up' ? arrowUp : arrowDown) : ''} ${weightSign}${weightDiff} kg</span>
                    <span class="perf-badge ${repsClass}">${repsDiff !== 0 ? (repsClass === 'up' ? arrowUp : arrowDown) : ''} ${repsSign}${repsDiff} reps</span>
                </div>
            </div>
        `;
    }

    return `
        <div class="perf-comparison">
            <div class="perf-comparison-title">vs séance précédente (${formatDateShort(comparison.prev.date)})</div>
            ${prevRowHtml}
            ${currentHtml}
        </div>
    `;
}

// =============================================================
// PAGE: SESSION TRACKING
// =============================================================
function startSession(workoutId) {
    const workout = Store.getWorkouts().find(w => w.id === workoutId);
    if (!workout) return;

    const lastSession = Store.getLastSession(workoutId);

    const session = {
        id: generateId(),
        workoutId,
        date: new Date().toISOString(),
        exercises: workout.exercises.map(ex => {
            // Match previous session by exercise name
            const lastEx = lastSession?.exercises?.find(e => e.name === ex.name);
            const sets = [];
            const numSets = ex.defaultSets || 4;
            for (let i = 0; i < numSets; i++) {
                const lastSet = lastEx?.sets?.[i];
                sets.push({
                    weight: lastSet ? lastSet.weight : ex.defaultWeight,
                    reps: lastSet ? lastSet.reps : 10,
                    completed: false
                });
            }
            return { name: ex.name, muscle: ex.muscle, sets };
        })
    };

    Store.saveActiveSession(session);
    startAutoSave();
    App.navigate('session', { session });
}

function renderSession(container, params) {
    const session = params.session;
    if (!session) { App.navigate('home'); return; }

    // Start auto-save if resumed
    if (params.resumed) startAutoSave();

    const workout = Store.getWorkouts().find(w => w.id === session.workoutId);
    const workoutName = workout ? workout.name : 'Séance';

    function render() {
        let html = `<div style="margin-bottom:8px">
            <div style="font-size:20px;font-weight:700;margin-bottom:2px">${escapeHtml(workoutName)}</div>
            <div style="font-size:13px;color:var(--text-secondary)">${formatDate(session.date)} - ${formatTime(session.date)}</div>
        </div>`;

        session.exercises.forEach((ex, exIdx) => {
            // Comparison with last 3 sessions
            const completedSets = ex.sets.filter(s => s.completed);
            const comparison = getExerciseComparison(session.workoutId, ex.name, completedSets);
            const perfClass = comparison && completedSets.length > 0 ? `perf-${comparison.status}` : '';
            const comparisonHtml = renderComparisonHtml(comparison);

            let setsHtml = '';
            ex.sets.forEach((set, setIdx) => {
                setsHtml += `
                    <div class="set-row ${set.completed ? 'completed' : ''}">
                        <div class="set-number">${setIdx + 1}</div>
                        <div class="set-fields">
                            <input type="number" inputmode="decimal" class="inline-input" value="${set.weight}"
                                   onchange="updateSet(${exIdx},${setIdx},'weight',this.value)"
                                   ${set.completed ? 'readonly' : ''} min="0" step="0.5">
                            <span>kg</span>
                            <span style="color:var(--text-muted);margin:0 2px">x</span>
                            <input type="number" inputmode="numeric" class="inline-input" value="${set.reps}"
                                   onchange="updateSet(${exIdx},${setIdx},'reps',this.value)"
                                   ${set.completed ? 'readonly' : ''} min="0" style="width:50px">
                            <span>reps</span>
                        </div>
                        <button class="set-check" onclick="toggleSet(${exIdx},${setIdx})">
                            ${set.completed ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f0f1a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                        </button>
                    </div>
                `;
            });

            // Performance indicator in header
            let perfIndicatorHtml = '';
            if (comparison && completedSets.length > 0 && comparison.status !== 'pending') {
                if (comparison.status === 'up') {
                    perfIndicatorHtml = '<span class="perf-indicator up"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span>';
                } else if (comparison.status === 'down') {
                    perfIndicatorHtml = '<span class="perf-indicator down"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span>';
                }
            }

            html += `
                <div class="session-exercise ${perfClass}">
                    <div class="session-exercise-header">
                        <span>${escapeHtml(ex.name)}</span>
                        <div style="display:flex;align-items:center;gap:8px">
                            ${perfIndicatorHtml}
                            <span class="session-exercise-muscle">${escapeHtml(ex.muscle)}</span>
                        </div>
                    </div>
                    ${comparisonHtml}
                    ${setsHtml}
                    <button class="add-set-btn" onclick="addSet(${exIdx})">+ Ajouter une série</button>
                </div>
            `;
        });

        const completedSets = session.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
        const totalSets = session.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);

        html += `
            <div class="session-footer">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                    <span style="font-size:13px;color:var(--text-secondary)">${completedSets}/${totalSets} séries</span>
                    <button class="btn btn-danger btn-sm" onclick="cancelSession()">Annuler</button>
                </div>
                <button class="btn btn-success btn-block" onclick="finishSession()">Terminer la séance</button>
            </div>
        `;

        container.innerHTML = html;
    }

    window.updateSet = (exIdx, setIdx, field, value) => {
        if (field === 'weight') {
            session.exercises[exIdx].sets[setIdx].weight = parseFloat(value) || 0;
        } else {
            session.exercises[exIdx].sets[setIdx].reps = parseInt(value) || 0;
        }
        Store.saveActiveSession(session);
    };

    window.toggleSet = (exIdx, setIdx) => {
        const set = session.exercises[exIdx].sets[setIdx];
        set.completed = !set.completed;
        Store.saveActiveSession(session);
        if (navigator.vibrate) navigator.vibrate(30);
        render();
    };

    window.addSet = (exIdx) => {
        const sets = session.exercises[exIdx].sets;
        const last = sets[sets.length - 1];
        sets.push({
            weight: last ? last.weight : 20,
            reps: last ? last.reps : 10,
            completed: false
        });
        Store.saveActiveSession(session);
        render();
    };

    window.finishSession = () => {
        const completedSets = session.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
        if (completedSets === 0) {
            showToast('Validez au moins une série');
            return;
        }

        // Only keep completed sets in saved session
        const savedSession = {
            ...session,
            exercises: session.exercises.map(ex => ({
                ...ex,
                sets: ex.sets.filter(s => s.completed)
            })).filter(ex => ex.sets.length > 0)
        };

        Store.addSession(savedSession);
        Store.clearActiveSession();
        stopAutoSave();

        // Auto-update workout template with values from this session
        const workouts = Store.getWorkouts();
        const wIdx = workouts.findIndex(w => w.id === session.workoutId);
        if (wIdx !== -1) {
            const w = workouts[wIdx];
            session.exercises.forEach(sessionEx => {
                const completed = sessionEx.sets.filter(s => s.completed);
                if (completed.length === 0) return;
                const templateEx = w.exercises.find(e => e.name === sessionEx.name);
                if (templateEx) {
                    // Update default weight to the most used weight in this session
                    const weightCounts = {};
                    completed.forEach(s => { weightCounts[s.weight] = (weightCounts[s.weight] || 0) + 1; });
                    templateEx.defaultWeight = parseFloat(Object.entries(weightCounts).sort((a, b) => b[1] - a[1])[0][0]);
                    // Update default sets to match completed count
                    templateEx.defaultSets = completed.length;
                }
            });
            Store.saveWorkouts(workouts);
        }

        showToast('Séance enregistrée !');
        App.navigate('home');
    };

    window.cancelSession = () => {
        showConfirmModal(
            'Annuler la séance',
            'Voulez-vous vraiment annuler cette séance ? Les données ne seront pas sauvegardées.',
            () => {
                Store.clearActiveSession();
                stopAutoSave();
                App.navigate('home');
            }
        );
    };

    render();
}

// =============================================================
// PAGE: HISTORY
// =============================================================
function renderHistory(container, params) {
    const workouts = Store.getWorkouts();
    if (workouts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Aucun historique</h3>
                <p>Créez un programme et effectuez une séance pour voir l'historique ici.</p>
            </div>
        `;
        return;
    }

    const selectedWorkoutId = params.selectedWorkoutId || workouts[0].id;
    const sessions = Store.getSessionsForWorkout(selectedWorkoutId);
    const selectedSessionIdx = params.selectedSessionIdx || 0;

    // Workout filter buttons
    let filterHtml = '<div class="history-workout-selector">';
    workouts.forEach(w => {
        filterHtml += `<button class="workout-filter-btn ${w.id === selectedWorkoutId ? 'active' : ''}"
                               onclick="selectHistoryWorkout('${w.id}')">${escapeHtml(w.name)}</button>`;
    });
    filterHtml += '</div>';

    if (sessions.length === 0) {
        container.innerHTML = filterHtml + `
            <div class="empty-state">
                <h3>Aucune séance</h3>
                <p>Effectuez une séance pour voir l'historique.</p>
            </div>
        `;
        window.selectHistoryWorkout = (wId) => {
            App.navigate('history', { selectedWorkoutId: wId });
        };
        return;
    }

    // Session tabs
    let tabsHtml = '<div class="session-tabs">';
    sessions.forEach((s, i) => {
        tabsHtml += `<button class="session-tab ${i === selectedSessionIdx ? 'active' : ''}"
                             onclick="selectHistorySession(${i})">${formatDateShort(s.date)}</button>`;
    });
    tabsHtml += '</div>';

    // Selected session detail
    const session = sessions[selectedSessionIdx];
    let detailHtml = '';
    if (session) {
        detailHtml += `
            <div class="history-session-card">
                <div class="history-session-header">
                    <div>
                        <div class="history-session-date">${formatDate(session.date)}</div>
                        <div style="font-size:12px;color:var(--text-muted)">${formatTime(session.date)}</div>
                    </div>
                    <button class="history-session-delete" onclick="deleteSessionConfirm('${session.id}', '${selectedWorkoutId}')">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
        `;

        // Find the previous session (the one right after in the sorted array)
        const prevSession = sessions[selectedSessionIdx + 1] || null;

        session.exercises.forEach(ex => {
            const maxWeight = Math.max(...ex.sets.map(s => s.weight));
            const totalReps = ex.sets.reduce((acc, s) => acc + s.reps, 0);
            const setsStr = ex.sets.map(s => `${s.weight}kg x${s.reps}`).join(', ');

            // Compare with same exercise in previous session
            let perfClass = '';
            let perfBadgeHtml = '';
            if (prevSession) {
                const prevEx = prevSession.exercises.find(e => e.name === ex.name);
                if (prevEx && prevEx.sets.length > 0) {
                    const prevMaxWeight = Math.max(...prevEx.sets.map(s => s.weight));
                    const prevTotalReps = prevEx.sets.reduce((acc, s) => acc + s.reps, 0);
                    const weightDiff = Math.round((maxWeight - prevMaxWeight) * 10) / 10;
                    const repsDiff = totalReps - prevTotalReps;

                    if (maxWeight > prevMaxWeight || totalReps > prevTotalReps) {
                        perfClass = 'history-perf-up';
                        const parts = [];
                        if (weightDiff > 0) parts.push(`+${weightDiff}kg`);
                        if (repsDiff > 0) parts.push(`+${repsDiff} reps`);
                        perfBadgeHtml = `<span class="history-perf-badge up">${parts.join(', ')}</span>`;
                    } else if (maxWeight < prevMaxWeight && totalReps < prevTotalReps) {
                        perfClass = 'history-perf-down';
                        const parts = [];
                        if (weightDiff < 0) parts.push(`${weightDiff}kg`);
                        if (repsDiff < 0) parts.push(`${repsDiff} reps`);
                        perfBadgeHtml = `<span class="history-perf-badge down">${parts.join(', ')}</span>`;
                    }
                }
            }

            detailHtml += `
                <div class="history-exercise-row ${perfClass}">
                    <div class="history-exercise-name">
                        ${escapeHtml(ex.name)}
                        <div style="font-size:11px;color:var(--text-muted)">${setsStr}</div>
                        ${perfBadgeHtml}
                    </div>
                    <div class="history-exercise-detail">
                        <span class="history-exercise-weight">${maxWeight} kg</span>
                        <div style="font-size:11px;color:var(--text-muted)">${ex.sets.length} série${ex.sets.length > 1 ? 's' : ''}</div>
                    </div>
                </div>
            `;
        });

        detailHtml += '</div>';
    }

    // Progression button
    let progressionBtn = `
        <button class="btn btn-secondary btn-block mt-16" onclick="App.pushPage('progression', {workoutId:'${selectedWorkoutId}'})">
            Voir la progression
        </button>
    `;

    container.innerHTML = filterHtml + tabsHtml + detailHtml + progressionBtn;

    window.selectHistoryWorkout = (wId) => {
        App.navigate('history', { selectedWorkoutId: wId, selectedSessionIdx: 0 });
    };

    window.selectHistorySession = (idx) => {
        App.navigate('history', { selectedWorkoutId: selectedWorkoutId, selectedSessionIdx: idx });
    };

    window.deleteSessionConfirm = (sessionId, workoutId) => {
        showConfirmModal(
            'Supprimer la séance',
            'Voulez-vous vraiment supprimer cette séance ?',
            () => {
                Store.deleteSession(sessionId);
                showToast('Séance supprimée');
                App.navigate('history', { selectedWorkoutId: workoutId, selectedSessionIdx: 0 });
            }
        );
    };
}

// =============================================================
// PAGE: PROGRESSION
// =============================================================
function renderProgression(container, params) {
    const workoutId = params.workoutId;
    const workout = Store.getWorkouts().find(w => w.id === workoutId);
    const sessions = Store.getSessionsForWorkout(workoutId);

    if (!workout || sessions.length < 2) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Pas assez de données</h3>
                <p>Effectuez au moins 2 séances pour voir la progression.</p>
            </div>
        `;
        return;
    }

    // Reverse sessions to get chronological order
    const chronoSessions = [...sessions].reverse();

    let html = `<div style="font-size:14px;color:var(--text-secondary);margin-bottom:16px">
        ${escapeHtml(workout.name)} - ${sessions.length} séance${sessions.length > 1 ? 's' : ''}
    </div>`;

    // Get all unique exercise names across sessions
    const exerciseNames = new Set();
    sessions.forEach(s => s.exercises.forEach(e => exerciseNames.add(e.name)));

    const chartsToRender = [];

    exerciseNames.forEach(exName => {
        const dataPoints = [];
        chronoSessions.forEach(s => {
            const ex = s.exercises.find(e => e.name === exName);
            if (ex && ex.sets.length > 0) {
                const maxWeight = Math.max(...ex.sets.map(st => st.weight));
                const totalVolume = ex.sets.reduce((acc, st) => acc + st.weight * st.reps, 0);
                dataPoints.push({
                    date: s.date,
                    maxWeight,
                    totalVolume,
                    sets: ex.sets.length
                });
            }
        });

        if (dataPoints.length < 2) return;

        const canvasId = `chart-${exName.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const firstWeight = dataPoints[0].maxWeight;
        const lastWeight = dataPoints[dataPoints.length - 1].maxWeight;
        const diff = lastWeight - firstWeight;
        const diffStr = diff >= 0 ? `+${diff}` : `${diff}`;
        const diffColor = diff >= 0 ? 'var(--success)' : 'var(--accent)';

        html += `
            <div class="progression-section">
                <div class="flex-between mb-8">
                    <div class="progression-title">${escapeHtml(exName)}</div>
                    <span style="font-size:13px;font-weight:600;color:${diffColor}">${diffStr} kg</span>
                </div>
                <div class="chart-container">
                    <canvas id="${canvasId}" height="160"></canvas>
                </div>
            </div>
        `;

        chartsToRender.push({ canvasId, dataPoints });
    });

    if (chartsToRender.length === 0) {
        html += `
            <div class="empty-state">
                <p>Pas assez de données pour afficher la progression.</p>
            </div>
        `;
    }

    container.innerHTML = html;

    // Draw charts after DOM update
    requestAnimationFrame(() => {
        chartsToRender.forEach(({ canvasId, dataPoints }) => {
            drawChart(canvasId, dataPoints);
        });
    });
}

function drawChart(canvasId, dataPoints) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = 160 * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '160px';
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = 160;
    const padding = { top: 20, right: 15, bottom: 30, left: 45 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    const weights = dataPoints.map(d => d.maxWeight);
    const minW = Math.min(...weights) - 2.5;
    const maxW = Math.max(...weights) + 2.5;
    const range = maxW - minW || 1;

    // Grid lines
    ctx.strokeStyle = 'rgba(42, 42, 62, 0.6)';
    ctx.lineWidth = 1;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
        const y = padding.top + (chartH / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(w - padding.right, y);
        ctx.stroke();

        const val = maxW - (range / gridLines) * i;
        ctx.fillStyle = '#5a5a6e';
        ctx.font = '11px -apple-system, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(val.toFixed(1), padding.left - 8, y + 4);
    }

    // Date labels
    const labelCount = Math.min(dataPoints.length, 5);
    const labelStep = Math.max(1, Math.floor(dataPoints.length / labelCount));
    ctx.fillStyle = '#5a5a6e';
    ctx.font = '10px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i < dataPoints.length; i += labelStep) {
        const x = padding.left + (i / (dataPoints.length - 1)) * chartW;
        const label = formatDateShort(dataPoints[i].date);
        ctx.fillText(label, x, h - 8);
    }

    // Line
    ctx.beginPath();
    dataPoints.forEach((d, i) => {
        const x = padding.left + (i / (dataPoints.length - 1)) * chartW;
        const y = padding.top + chartH - ((d.maxWeight - minW) / range) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#e94560';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Gradient fill
    const lastX = padding.left + chartW;
    ctx.lineTo(lastX, padding.top + chartH);
    ctx.lineTo(padding.left, padding.top + chartH);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    gradient.addColorStop(0, 'rgba(233, 69, 96, 0.3)');
    gradient.addColorStop(1, 'rgba(233, 69, 96, 0.02)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Dots
    dataPoints.forEach((d, i) => {
        const x = padding.left + (i / (dataPoints.length - 1)) * chartW;
        const y = padding.top + chartH - ((d.maxWeight - minW) / range) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#e94560';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
    });
}

// =============================================================
// MODAL SYSTEM
// =============================================================
function showModal() {
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

function showConfirmModal(title, message, onConfirm) {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <div class="confirm-modal">
            <h3>${title}</h3>
            <p>${message}</p>
            <div class="confirm-modal-actions">
                <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
                <button class="btn btn-danger" id="confirm-action">Confirmer</button>
            </div>
        </div>
    `;
    document.getElementById('confirm-action').addEventListener('click', () => {
        closeModal();
        onConfirm();
    });
    showModal();
}

// Close modal on overlay click
document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});

// =============================================================
// INIT
// =============================================================
document.addEventListener('DOMContentLoaded', () => App.init());
