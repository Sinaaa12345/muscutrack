/* =============================================================
   MUSCUTRACK - Application de suivi de musculation
   ============================================================= */

// =============================================================
// INTERNATIONALIZATION (i18n)
// =============================================================
const translations = {
    fr: {
        // Muscle groups
        muscles: ['Pectoraux', 'Dos', 'Épaules', 'Biceps', 'Triceps', 'Quadriceps', 'Ischio-jambiers', 'Fessiers', 'Mollets', 'Abdominaux'],
        // General
        appName: 'MuscuTrack',
        loading: 'Chargement...',
        close: 'Fermer',
        change: 'Changer',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        save: 'Enregistrer',
        delete: 'Supprimer',
        start: 'Démarrer',
        language: 'Langue',
        // Auth
        trackingSubtitle: 'Suivi de musculation',
        enterUsername: 'Entrez votre nom d\'utilisateur :',
        usernamePlaceholder: 'Entrez votre ID',
        login: 'Connexion',
        loginSuccess: 'Connexion réussie',
        loginError: 'Erreur de connexion',
        userNotFound: 'Identifiant inconnu',
        // User info
        user: 'Utilisateur',
        yourId: 'Votre ID :',
        noteId: 'Notez cet ID pour vous reconnecter depuis un autre appareil.',
        online: 'En ligne',
        offline: 'Hors-ligne',
        // Navigation
        programs: 'Programmes',
        history: 'Historique',
        session: 'Séance',
        edit: 'Modifier',
        newProgram: 'Nouveau programme',
        progression: 'Progression',
        // Home
        noProgram: 'Aucun programme',
        createFirstProgram: 'Créez votre premier programme d\'entraînement pour commencer le suivi.',
        createProgram: 'Créer un programme',
        newProgramBtn: '+ Nouveau programme',
        exerciseCount: (n) => `${n} exercice${n > 1 ? 's' : ''}`,
        lastSession: 'Dernière séance :',
        sessionCount: (n) => `${n} séance${n > 1 ? 's' : ''}`,
        // Workout editor
        programName: 'Nom du programme',
        programNamePlaceholder: 'Ex: Push, Pull, Legs...',
        exercises: 'Exercices',
        noExerciseAdded: 'Aucun exercice ajouté',
        addExercise: 'Ajouter un exercice',
        exerciseName: 'Nom de l\'exercice',
        muscleGroup: 'Groupe musculaire',
        addBtn: '+ Ajouter',
        createProgramBtn: 'Créer le programme',
        weight: 'Charge',
        kg: 'kg',
        sets: 'Séries',
        // Workout editor toasts
        enterExerciseName: 'Entrez un nom d\'exercice',
        selectMuscleGroup: 'Sélectionnez un groupe musculaire',
        enterProgramName: 'Entrez un nom pour le programme',
        addAtLeastOneExercise: 'Ajoutez au moins un exercice',
        maxProgramsReached: 'Maximum 3 programmes atteint',
        programModified: 'Programme modifié',
        programCreated: 'Programme créé',
        // Delete program
        deleteProgram: 'Supprimer le programme',
        deleteProgramConfirm: (name) => `Supprimer "${name}" et toutes ses séances ?`,
        programDeleted: 'Programme supprimé',
        // Session
        addSet: '+ Ajouter une série',
        setsProgress: (done, total) => `${done}/${total} séries`,
        cancelSession: 'Annuler la séance',
        cancelSessionConfirm: 'Voulez-vous vraiment annuler cette séance ? Les données ne seront pas sauvegardées.',
        finishSession: 'Terminer la séance',
        validateAtLeastOneSet: 'Validez au moins une série',
        sessionSaved: 'Séance enregistrée !',
        reps: 'reps',
        // History
        noHistory: 'Aucun historique',
        createAndDoSession: 'Créez un programme et effectuez une séance pour voir l\'historique ici.',
        noSession: 'Aucune séance',
        doSessionForHistory: 'Effectuez une séance pour voir l\'historique.',
        deleteSession: 'Supprimer la séance',
        deleteSessionConfirm: 'Voulez-vous vraiment supprimer cette séance ?',
        sessionDeleted: 'Séance supprimée',
        viewProgression: 'Voir la progression',
        editSession: 'Modifier la séance',
        editSessionSaved: 'Séance modifiée',
        seriesCount: (n) => `${n} série${n > 1 ? 's' : ''}`,
        // Notes
        addNote: 'Ajouter une note',
        editNote: 'Modifier la note',
        notePlaceholder: 'Écrivez une note sur cette séance...',
        noteSaved: 'Note enregistrée',
        note: 'Note',
        // Drop set
        dropSet: 'Drop set',
        dropSetWeights: 'Charges (kg)',
        addDropWeight: '+ Charge',
        // Progression
        notEnoughData: 'Pas assez de données',
        doAtLeast2Sessions: 'Effectuez au moins 2 séances pour voir la progression.',
        notEnoughDataForProgression: 'Pas assez de données pour afficher la progression.',
        // Comparison
        prev: 'Préc.',
        current: 'Actuel',
        vsPreviousSession: (date) => `vs séance précédente (${date})`,
        setsShort: 'ser.',
        // Errors
        networkError: 'Erreur réseau',
        // Theme
        theme: 'Thème',
        // Date locale
        dateLocale: 'fr-FR',
    },
    zh: {
        // Muscle groups
        muscles: ['胸肌', '背部', '肩膀', '二头肌', '三头肌', '股四头肌', '腘绳肌', '臀肌', '小腿', '腹肌'],
        // General
        appName: 'MuscuTrack',
        loading: '加载中...',
        close: '关闭',
        change: '更换',
        cancel: '取消',
        confirm: '确认',
        save: '保存',
        delete: '删除',
        start: '开始',
        language: '语言',
        // Auth
        trackingSubtitle: '健身追踪',
        enterUsername: '请输入您的用户名：',
        usernamePlaceholder: '例如：BASILE',
        login: '登录',
        loginSuccess: '登录成功',
        loginError: '登录失败',
        userNotFound: '用户名不存在',
        // User info
        user: '用户',
        yourId: '您的ID：',
        noteId: '请记下此ID，以便从其他设备重新登录。',
        online: '在线',
        offline: '离线',
        // Navigation
        programs: '训练计划',
        history: '历史记录',
        session: '训练',
        edit: '编辑',
        newProgram: '新计划',
        progression: '进度',
        // Home
        noProgram: '没有训练计划',
        createFirstProgram: '创建您的第一个训练计划以开始追踪。',
        createProgram: '创建计划',
        newProgramBtn: '+ 新计划',
        exerciseCount: (n) => `${n} 个动作`,
        lastSession: '上次训练：',
        sessionCount: (n) => `${n} 次训练`,
        // Workout editor
        programName: '计划名称',
        programNamePlaceholder: '例如：推、拉、腿...',
        exercises: '动作',
        noExerciseAdded: '未添加任何动作',
        addExercise: '添加动作',
        exerciseName: '动作名称',
        muscleGroup: '肌肉群',
        addBtn: '+ 添加',
        createProgramBtn: '创建计划',
        weight: '重量',
        kg: '公斤',
        sets: '组数',
        // Workout editor toasts
        enterExerciseName: '请输入动作名称',
        selectMuscleGroup: '请选择肌肉群',
        enterProgramName: '请输入计划名称',
        addAtLeastOneExercise: '请至少添加一个动作',
        maxProgramsReached: '已达到3个计划上限',
        programModified: '计划已修改',
        programCreated: '计划已创建',
        // Delete program
        deleteProgram: '删除计划',
        deleteProgramConfirm: (name) => `删除"${name}"及其所有训练记录？`,
        programDeleted: '计划已删除',
        // Session
        addSet: '+ 添加一组',
        setsProgress: (done, total) => `${done}/${total} 组`,
        cancelSession: '取消训练',
        cancelSessionConfirm: '确定要取消此次训练吗？数据将不会被保存。',
        finishSession: '完成训练',
        validateAtLeastOneSet: '请至少完成一组',
        sessionSaved: '训练已保存！',
        reps: '次',
        // History
        noHistory: '没有历史记录',
        createAndDoSession: '创建计划并完成训练后可在此查看历史。',
        noSession: '没有训练记录',
        doSessionForHistory: '完成训练后可查看历史。',
        deleteSession: '删除训练记录',
        deleteSessionConfirm: '确定要删除此次训练记录吗？',
        sessionDeleted: '训练记录已删除',
        viewProgression: '查看进度',
        editSession: '编辑训练记录',
        editSessionSaved: '训练记录已修改',
        seriesCount: (n) => `${n} 组`,
        // Notes
        addNote: '添加备注',
        editNote: '修改备注',
        notePlaceholder: '写下关于这次训练的备注...',
        noteSaved: '备注已保存',
        note: '备注',
        // Drop set
        dropSet: '递减组',
        dropSetWeights: '重量 (公斤)',
        addDropWeight: '+ 重量',
        // Progression
        notEnoughData: '数据不足',
        doAtLeast2Sessions: '至少完成2次训练才能查看进度。',
        notEnoughDataForProgression: '数据不足，无法显示进度。',
        // Comparison
        prev: '上次',
        current: '本次',
        vsPreviousSession: (date) => `对比上次训练 (${date})`,
        setsShort: '组',
        // Errors
        networkError: '网络错误',
        // Theme
        theme: '主题',
        // Date locale
        dateLocale: 'zh-CN',
    }
};

const i18n = {
    _lang: 'fr',
    get lang() { return this._lang; },
    set lang(v) {
        this._lang = v;
        const uid = localStorage.getItem('mt_user_id');
        if (uid) localStorage.setItem(`mt_${uid}_lang`, v);
    },
    loadForUser(uid) {
        this._lang = (uid && localStorage.getItem(`mt_${uid}_lang`)) || 'fr';
    },
    t(key) { return translations[this._lang]?.[key] ?? translations.fr[key] ?? key; }
};

function t(key) { return i18n.t(key); }

// =============================================================
// MUSCLE GROUPS
// =============================================================
function getMuscleGroups() {
    return translations[i18n.lang].muscles;
}

// =============================================================
// THEMES
// =============================================================
const themes = {
    emerald: {
        name: 'Emerald',
        accent: '#4ecca3',
        accentDark: '#3ba882',
        accentLight: '#6fe8c0',
        bgPrimary: '#0f0f1a',
        bgSecondary: '#1a1a2e',
        bgTertiary: '#16213e',
        bgCard: '#1a1a2e',
        border: '#2a2a3e',
        chartColor: '#4ecca3',
        chartRgba: '78, 204, 163',
    },
    ocean: {
        name: 'Ocean',
        accent: '#5b9bf5',
        accentDark: '#4080d4',
        accentLight: '#82b5ff',
        bgPrimary: '#0b1120',
        bgSecondary: '#131d33',
        bgTertiary: '#1a2744',
        bgCard: '#131d33',
        border: '#243352',
        chartColor: '#5b9bf5',
        chartRgba: '91, 155, 245',
    },
    sunset: {
        name: 'Sunset',
        accent: '#f5a623',
        accentDark: '#d48e1a',
        accentLight: '#ffc35c',
        bgPrimary: '#141010',
        bgSecondary: '#221a1a',
        bgTertiary: '#2e2020',
        bgCard: '#221a1a',
        border: '#3d2e2e',
        chartColor: '#f5a623',
        chartRgba: '245, 166, 35',
    },
    lavender: {
        name: 'Lavender',
        accent: '#a78bfa',
        accentDark: '#8b6de0',
        accentLight: '#c4a8ff',
        bgPrimary: '#100e1a',
        bgSecondary: '#1a172e',
        bgTertiary: '#231f3e',
        bgCard: '#1a172e',
        border: '#302a4e',
        chartColor: '#a78bfa',
        chartRgba: '167, 139, 250',
    },
    cherry: {
        name: 'Cherry',
        accent: '#f472b6',
        accentDark: '#d4569a',
        accentLight: '#ff9ed0',
        bgPrimary: '#140c12',
        bgSecondary: '#221420',
        bgTertiary: '#2e1a2a',
        bgCard: '#221420',
        border: '#3d2838',
        chartColor: '#f472b6',
        chartRgba: '244, 114, 182',
    }
};

const themeManager = {
    _theme: 'emerald',
    get current() { return this._theme; },
    set current(id) {
        this._theme = id;
        const uid = localStorage.getItem('mt_user_id');
        if (uid) localStorage.setItem(`mt_${uid}_theme`, id);
        this.apply();
    },
    loadForUser(uid) {
        this._theme = (uid && localStorage.getItem(`mt_${uid}_theme`)) || 'emerald';
        this.apply();
    },
    apply() {
        const th = themes[this._theme] || themes.emerald;
        const root = document.documentElement.style;
        root.setProperty('--accent', th.accent);
        root.setProperty('--accent-dark', th.accentDark);
        root.setProperty('--accent-light', th.accentLight);
        root.setProperty('--success', th.accent);
        root.setProperty('--success-dark', th.accentDark);
        root.setProperty('--bg-primary', th.bgPrimary);
        root.setProperty('--bg-secondary', th.bgSecondary);
        root.setProperty('--bg-tertiary', th.bgTertiary);
        root.setProperty('--bg-card', th.bgCard);
        root.setProperty('--border', th.border);
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', th.bgPrimary);
    },
    getChartColor() {
        const th = themes[this._theme] || themes.emerald;
        return { hex: th.chartColor, rgba: th.chartRgba };
    }
};

// Load user preferences on startup
const _savedUid = localStorage.getItem('mt_user_id');
i18n.loadForUser(_savedUid);
themeManager.loadForUser(_savedUid);

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
        const err = await res.json().catch(() => ({ error: t('networkError') }));
        throw new Error(err.error || `${t('networkError')} ${res.status}`);
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
        // Keep only 50 per workout
        const counts = {};
        const filtered = sessions.filter(s => {
            counts[s.workoutId] = (counts[s.workoutId] || 0) + 1;
            return counts[s.workoutId] <= 50;
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
    return d.toLocaleDateString(t('dateLocale'), { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateShort(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString(t('dateLocale'), { day: 'numeric', month: 'short' });
}

function formatTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleTimeString(t('dateLocale'), { hour: '2-digit', minute: '2-digit' });
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
                <p style="margin-top:16px;color:var(--text-secondary)">${t('loading')}</p>
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
        headerTitle.textContent = t('appName');
        headerActions.innerHTML = '';

        main.innerHTML = `
            <div class="auth-container">
                <div class="auth-icon">
                    <img src="icons/pngtree-dumbbell-vector-png-image_12735280.png" width="48" height="48" alt="" style="object-fit:contain">
                </div>
                <h2 style="color:var(--text-primary);margin:0 0 8px">${t('appName')}</h2>
                <p style="color:var(--text-secondary);font-size:14px;margin:0 0 24px">${t('trackingSubtitle')}</p>

                <div style="font-size:13px;color:var(--text-muted);margin-bottom:12px">${t('enterUsername')}</div>
                <div style="display:flex;gap:8px">
                    <input type="text" class="form-input" id="auth-id-input" placeholder="${t('usernamePlaceholder')}"
                           style="flex:1" maxlength="64">
                    <button class="btn btn-primary" id="auth-login-btn">${t('login')}</button>
                </div>
                <div id="auth-error" style="color:var(--danger);font-size:13px;margin-top:12px;display:none"></div>

                <div style="margin-top:20px;text-align:center">
                    <button class="btn btn-secondary btn-sm" id="auth-lang-btn" style="font-size:12px">
                        ${i18n.lang === 'fr' ? '中文' : 'Français'}
                    </button>
                </div>
            </div>
        `;

        document.getElementById('auth-login-btn').addEventListener('click', async () => {
            const input = document.getElementById('auth-id-input');
            const errorDiv = document.getElementById('auth-error');
            const id = input.value.trim();
            if (!id) {
                input.focus();
                return;
            }
            const btn = document.getElementById('auth-login-btn');
            btn.disabled = true;
            errorDiv.style.display = 'none';
            try {
                await initAuth(id);
                await syncFromServer();
                showToast(t('loginSuccess'));
                this.onAuthSuccess();
            } catch {
                btn.disabled = false;
                errorDiv.textContent = t('userNotFound');
                errorDiv.style.display = 'block';
            }
        });

        document.getElementById('auth-id-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') document.getElementById('auth-login-btn').click();
        });

        document.getElementById('auth-lang-btn').addEventListener('click', () => {
            i18n.lang = i18n.lang === 'fr' ? 'zh' : 'fr';
            document.documentElement.lang = i18n.lang === 'zh' ? 'zh' : 'fr';
            this.showAuth();
        });
    },

    onAuthSuccess() {
        // Load user-specific preferences
        i18n.loadForUser(currentUserId);
        themeManager.loadForUser(currentUserId);
        document.documentElement.lang = i18n.lang === 'zh' ? 'zh' : 'fr';

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

        // Header buttons (when authenticated)
        if (currentUserId) {
            const th = themes[themeManager.current] || themes.emerald;
            headerActions.innerHTML = `
                <button class="header-btn header-theme-btn" id="btn-theme" aria-label="${t('theme')}">
                    <span class="theme-dot" style="background:${th.accent}"></span>
                </button>
                <button class="header-btn" id="btn-user-id" aria-label="${t('user')}" title="${escapeHtml(currentUserId)}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </button>
            `;
            document.getElementById('btn-theme').addEventListener('click', () => this.showThemePicker());
            document.getElementById('btn-user-id').addEventListener('click', () => this.showUserInfo());
        }

        // Update tab labels
        const tabHome = document.getElementById('tab-label-home');
        const tabHistory = document.getElementById('tab-label-history');
        if (tabHome) tabHome.textContent = t('programs');
        if (tabHistory) tabHistory.textContent = t('history');

        // Update html lang
        document.documentElement.lang = i18n.lang === 'zh' ? 'zh' : 'fr';

        // Update active tab
        document.querySelectorAll('#tab-bar .tab').forEach(tab => {
            tab.classList.toggle('active',
                tab.dataset.page === this.currentPage ||
                (this.currentPage === 'workout-editor' && tab.dataset.page === 'home') ||
                (this.currentPage === 'session' && tab.dataset.page === 'home') ||
                (this.currentPage === 'progression' && tab.dataset.page === 'history')
            );
        });

        switch (this.currentPage) {
            case 'home':
                headerTitle.textContent = '';
                renderHome(main);
                break;
            case 'workout-editor':
                headerTitle.textContent = this.pageParams.workoutId ? t('edit') : t('newProgram');
                btnBack.classList.remove('hidden');
                btnBack.onclick = () => this.goBack();
                renderWorkoutEditor(main, this.pageParams);
                break;
            case 'session':
                headerTitle.textContent = '';
                tabBar.classList.add('hidden');
                main.classList.add('session-mode');
                renderSession(main, this.pageParams);
                break;
            case 'history':
                headerTitle.textContent = t('history');
                renderHistory(main, this.pageParams);
                break;
            case 'edit-session':
                headerTitle.textContent = t('editSession');
                btnBack.classList.remove('hidden');
                btnBack.onclick = () => this.goBack();
                renderEditSession(main, this.pageParams);
                break;
            case 'progression':
                headerTitle.textContent = t('progression');
                btnBack.classList.remove('hidden');
                btnBack.onclick = () => this.goBack();
                renderProgression(main, this.pageParams);
                break;
            default:
                headerTitle.textContent = '';
                renderHome(main);
        }
    },

    showUserInfo() {
        const modalContainer = document.getElementById('modal-container');
        const langOptions = [
            { code: 'fr', label: 'Français' },
            { code: 'zh', label: '中文' }
        ];
        const langSelectHtml = langOptions.map(l =>
            `<option value="${l.code}" ${i18n.lang === l.code ? 'selected' : ''}>${l.label}</option>`
        ).join('');

        modalContainer.innerHTML = `
            <div class="confirm-modal">
                <h3>${t('user')}</h3>
                <p style="font-size:13px;color:var(--text-secondary);margin-bottom:8px">${t('yourId')}</p>
                <div style="background:var(--bg-primary);border-radius:8px;padding:10px 12px;font-family:monospace;font-size:14px;color:var(--accent);word-break:break-all;margin-bottom:4px">
                    ${escapeHtml(currentUserId)}
                </div>
                <p style="font-size:11px;color:var(--text-muted);margin-bottom:16px">
                    ${t('noteId')}
                    ${isOnline ? `<span style="color:var(--success)">${t('online')}</span>` : `<span style="color:var(--danger)">${t('offline')}</span>`}
                </p>
                <div style="margin-bottom:16px">
                    <label style="font-size:13px;color:var(--text-secondary);display:block;margin-bottom:6px">${t('language')}</label>
                    <select class="form-input" id="lang-select" style="width:100%">
                        ${langSelectHtml}
                    </select>
                </div>
                <div class="confirm-modal-actions">
                    <button class="btn btn-secondary" onclick="closeModal()">${t('close')}</button>
                    <button class="btn btn-danger" id="btn-change-user">${t('change')}</button>
                </div>
            </div>
        `;
        document.getElementById('lang-select').addEventListener('change', (e) => {
            i18n.lang = e.target.value;
            document.documentElement.lang = i18n.lang === 'zh' ? 'zh' : 'fr';
            closeModal();
            this.render();
        });
        document.getElementById('btn-change-user').addEventListener('click', () => {
            closeModal();
            localStorage.removeItem('mt_user_id');
            currentUserId = null;
            stopAutoSave();
            // Reset to defaults
            i18n._lang = 'fr';
            themeManager._theme = 'emerald';
            themeManager.apply();
            this.showAuth();
        });
        showModal();
    },

    showThemePicker() {
        const modalContainer = document.getElementById('modal-container');
        const themePickerHtml = Object.entries(themes).map(([id, th]) =>
            `<button class="theme-pick${themeManager.current === id ? ' active' : ''}" data-theme="${id}" style="background:${th.bgSecondary};border:2px solid ${themeManager.current === id ? th.accent : th.border}" title="${th.name}">
                <span style="background:${th.accent};width:18px;height:18px;border-radius:50%;display:block"></span>
            </button>`
        ).join('');

        modalContainer.innerHTML = `
            <div class="confirm-modal">
                <h3>${t('theme')}</h3>
                <div style="display:flex;gap:12px;justify-content:center;margin:20px 0">
                    ${themePickerHtml}
                </div>
                <div class="confirm-modal-actions">
                    <button class="btn btn-secondary btn-block" onclick="closeModal()">${t('close')}</button>
                </div>
            </div>
        `;
        document.querySelectorAll('.theme-pick').forEach(btn => {
            btn.addEventListener('click', () => {
                themeManager.current = btn.dataset.theme;
                closeModal();
                this.render();
            });
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
                <img src="icons/pngtree-dumbbell-vector-png-image_12735280.png" width="64" height="64" alt="" style="object-fit:contain;opacity:0.5">
                <h3>${t('noProgram')}</h3>
                <p>${t('createFirstProgram')}</p>
                <button class="btn btn-primary" onclick="App.pushPage('workout-editor')">${t('createProgram')}</button>
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
                    ${t('exerciseCount')(w.exercises.length)}
                    ${lastSession ? ` · ${t('lastSession')} ` + formatDateShort(lastSession.date) : ''}
                    ${sessionCount > 0 ? ` · ${t('sessionCount')(sessionCount)}` : ''}
                </div>
                <div class="workout-exercises-preview">${exerciseTags}</div>
                <div class="workout-actions">
                    <button class="btn btn-primary" onclick="startSession('${w.id}')">${t('start')}</button>
                    <button class="btn btn-secondary" onclick="deleteWorkoutConfirm('${w.id}')">${t('delete')}</button>
                </div>
            </div>
        `;
    });

    html += `
        <button class="btn btn-secondary btn-block mt-16" onclick="App.pushPage('workout-editor')">
            ${t('newProgramBtn')}
        </button>
    `;

    container.innerHTML = html;
}

function editWorkout(id) {
    App.pushPage('workout-editor', { workoutId: id });
}

function deleteWorkoutConfirm(id) {
    const workout = Store.getWorkouts().find(w => w.id === id);
    if (!workout) return;
    showConfirmModal(
        t('deleteProgram'),
        t('deleteProgramConfirm')(escapeHtml(workout.name)),
        () => {
            const workouts = Store.getWorkouts().filter(w => w.id !== id);
            Store.saveWorkouts(workouts);
            const sessions = Store.getSessions().filter(s => s.workoutId !== id);
            Store.saveSessions(sessions);
            // Also delete on server (cascade)
            if (currentUserId) {
                apiCall('DELETE', `/api/workouts/${id}`).catch(() => {});
            }
            showToast(t('programDeleted'));
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
        exercises: existing ? [...existing.exercises.map(e => ({ ...e, dropSet: e.dropSet || false, dropWeights: e.dropWeights ? [...e.dropWeights] : [] }))] : []
    };

    function render() {
        let exercisesHtml = '';
        state.exercises.forEach((ex, i) => {
            // Drop set weights UI
            let dropWeightsHtml = '';
            if (ex.dropSet && ex.dropWeights && ex.dropWeights.length > 0) {
                dropWeightsHtml = `<div class="editor-drop-weights">
                    <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:6px">${t('dropSetWeights')}</label>
                    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">
                        ${ex.dropWeights.map((w, wi) => `
                            <div style="display:flex;align-items:center;gap:4px">
                                <input type="number" inputmode="decimal" class="inline-input" value="${w}" style="width:55px"
                                       onchange="window._editorUpdateDropWeight(${i},${wi},this.value)" min="0" step="0.5">
                                ${ex.dropWeights.length > 1 ? `<button onclick="window._editorRemoveDropWeight(${i},${wi})" style="color:var(--danger);padding:2px;font-size:16px;line-height:1">&times;</button>` : ''}
                            </div>
                        `).join('<span style="color:var(--text-muted);font-size:12px">&rarr;</span>')}
                        <button class="btn btn-secondary btn-sm" onclick="window._editorAddDropWeight(${i})" style="padding:4px 10px;min-height:30px;font-size:12px">${t('addDropWeight')}</button>
                    </div>
                </div>`;
            }

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
                            <label>${t('weight')}</label>
                            <input type="number" inputmode="decimal" class="inline-input" value="${ex.defaultWeight}"
                                   onchange="window._editorUpdateWeight(${i}, this.value)" min="0" step="0.5">
                            <label>${t('kg')}</label>
                        </div>
                        <div class="editor-field">
                            <label>${t('sets')}</label>
                            <input type="number" inputmode="numeric" class="inline-input" value="${ex.defaultSets}"
                                   onchange="window._editorUpdateSets(${i}, this.value)" min="1" max="20" style="width:50px">
                        </div>
                        <label class="drop-set-toggle">
                            <input type="checkbox" ${ex.dropSet ? 'checked' : ''} onchange="window._editorToggleDropSet(${i}, this.checked)">
                            <span>${t('dropSet')}</span>
                        </label>
                    </div>
                    ${dropWeightsHtml}
                </div>
            `;
        });

        // Muscle group options
        const muscleOptions = getMuscleGroups().map(m => `<option value="${m}">${m}</option>`).join('');

        container.innerHTML = `
            <div class="form-group">
                <label class="form-label">${t('programName')}</label>
                <input type="text" class="form-input" id="workout-name" value="${escapeHtml(state.name)}"
                       placeholder="${t('programNamePlaceholder')}" maxlength="30">
            </div>

            <div class="form-group">
                <label class="form-label">${t('exercises')}</label>
                ${exercisesHtml || `<p class="text-muted" style="font-size:14px;padding:8px 0">${t('noExerciseAdded')}</p>`}
            </div>

            <div class="add-exercise-form" style="background:var(--bg-card);border-radius:var(--radius);padding:14px;border:1px dashed var(--border);margin-bottom:16px">
                <div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">${t('addExercise')}</div>
                <input type="text" class="form-input" id="new-exercise-name" placeholder="${t('exerciseName')}" maxlength="50" style="margin-bottom:10px">
                <select class="form-input" id="new-exercise-muscle" style="margin-bottom:12px">
                    <option value="" disabled selected>${t('muscleGroup')}</option>
                    ${muscleOptions}
                </select>
                <button class="btn btn-secondary btn-block btn-sm" onclick="window._editorAddExercise()">${t('addBtn')}</button>
            </div>

            <button class="btn btn-primary btn-block" onclick="saveWorkout()" id="btn-save-workout">
                ${existing ? t('save') : t('createProgramBtn')}
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
    window._editorToggleDropSet = (index, checked) => {
        state.exercises[index].dropSet = checked;
        if (checked && (!state.exercises[index].dropWeights || state.exercises[index].dropWeights.length === 0)) {
            const baseWeight = state.exercises[index].defaultWeight || 20;
            state.exercises[index].dropWeights = [baseWeight, Math.round(baseWeight * 0.8 * 2) / 2];
        }
        if (!checked) {
            state.exercises[index].dropWeights = [];
        }
        render();
    };
    window._editorUpdateDropWeight = (exIdx, weightIdx, value) => {
        state.exercises[exIdx].dropWeights[weightIdx] = parseFloat(value) || 0;
    };
    window._editorRemoveDropWeight = (exIdx, weightIdx) => {
        state.exercises[exIdx].dropWeights.splice(weightIdx, 1);
        render();
    };
    window._editorAddDropWeight = (exIdx) => {
        const weights = state.exercises[exIdx].dropWeights;
        const last = weights[weights.length - 1] || 10;
        weights.push(Math.round(last * 0.8 * 2) / 2);
        render();
    };

    window._editorAddExercise = () => {
        const nameInput = document.getElementById('new-exercise-name');
        const muscleSelect = document.getElementById('new-exercise-muscle');
        const name = nameInput.value.trim();
        const muscle = muscleSelect.value;

        if (!name) {
            showToast(t('enterExerciseName'));
            nameInput.focus();
            return;
        }
        if (!muscle) {
            showToast(t('selectMuscleGroup'));
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
        showToast(t('enterProgramName'));
        return;
    }
    if (state.exercises.length === 0) {
        showToast(t('addAtLeastOneExercise'));
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
        workouts.push({
            id: generateId(),
            name,
            exercises: state.exercises
        });
    }

    Store.saveWorkouts(workouts);
    showToast(workoutId ? t('programModified') : t('programCreated'));
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
    const prevRepsStr = p.sets.map(s => s.reps).join('-');
    let prevRowHtml = `
        <div class="perf-prev-summary">
            <span class="perf-prev-label">${t('prev')}</span>
            <div class="perf-prev-values">
                <span class="perf-prev-weight">${p.maxWeight} ${t('kg')}</span>
                <span class="perf-prev-reps">${prevRepsStr}</span>
            </div>
        </div>
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
                <span class="perf-row-label" style="font-weight:600;color:var(--text-primary)">${t('current')}</span>
                <div class="perf-row-values">
                    <span class="perf-badge ${weightClass}">${weightDiff !== 0 ? (weightClass === 'up' ? arrowUp : arrowDown) : ''} ${weightSign}${weightDiff} ${t('kg')}</span>
                    <span class="perf-badge ${repsClass}">${repsDiff !== 0 ? (repsClass === 'up' ? arrowUp : arrowDown) : ''} ${repsSign}${repsDiff} ${t('reps')}</span>
                </div>
            </div>
        `;
    }

    return `
        <div class="perf-comparison">
            <div class="perf-comparison-title">${t('vsPreviousSession')(formatDateShort(comparison.prev.date))}</div>
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

            if (ex.dropSet && ex.dropWeights && ex.dropWeights.length > 0) {
                // Drop set mode: one set per drop weight
                ex.dropWeights.forEach((dw, dwi) => {
                    const lastSet = lastEx?.sets?.[dwi];
                    sets.push({
                        weight: lastSet ? lastSet.weight : dw,
                        reps: '',
                        completed: false
                    });
                });
            } else {
                for (let i = 0; i < numSets; i++) {
                    const lastSet = lastEx?.sets?.[i];
                    sets.push({
                        weight: lastSet ? lastSet.weight : (lastSession ? ex.defaultWeight : ''),
                        reps: '',
                        completed: false
                    });
                }
            }
            return { name: ex.name, muscle: ex.muscle, sets, dropSet: ex.dropSet || false };
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
    const workoutName = workout ? workout.name : t('session');

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
                            <input type="number" inputmode="decimal" class="inline-input" value="${set.weight !== '' ? set.weight : ''}"
                                   onchange="updateSet(${exIdx},${setIdx},'weight',this.value)"
                                   ${set.completed ? 'readonly' : ''} min="0" step="0.5" placeholder="0">
                            <span>${t('kg')}</span>
                            <span style="color:var(--text-muted);margin:0 2px">x</span>
                            <input type="number" inputmode="numeric" class="inline-input" value="${set.reps !== '' ? set.reps : ''}"
                                   onchange="updateSet(${exIdx},${setIdx},'reps',this.value)"
                                   ${set.completed ? 'readonly' : ''} min="0" style="width:50px" placeholder="0">
                            <span>${t('reps')}</span>
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

            const dropBadge = ex.dropSet ? `<span class="drop-set-badge">${t('dropSet')}</span>` : '';

            html += `
                <div class="session-exercise ${perfClass}">
                    <div class="session-exercise-header">
                        <span>${escapeHtml(ex.name)} ${dropBadge}</span>
                        <div style="display:flex;align-items:center;gap:8px">
                            ${perfIndicatorHtml}
                            <span class="session-exercise-muscle">${escapeHtml(ex.muscle)}</span>
                        </div>
                    </div>
                    ${comparisonHtml}
                    ${setsHtml}
                    <div style="display:flex;align-items:center">
                        <button class="add-set-btn" onclick="addSet(${exIdx})" style="flex:1">${t('addSet')}</button>
                        ${ex.sets.length > 1 ? `<button class="add-set-btn" onclick="removeSet(${exIdx})" style="color:var(--danger);flex:0;padding:10px 14px">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>` : ''}</div>
                </div>
            `;
        });

        const completedSets = session.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
        const totalSets = session.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);

        html += `
            <div class="session-footer">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                    <span style="font-size:13px;color:var(--text-secondary)">${t('setsProgress')(completedSets, totalSets)}</span>
                    <button class="btn btn-danger btn-sm" onclick="cancelSession()">${t('cancel')}</button>
                </div>
                <button class="btn btn-success btn-block" onclick="finishSession()">${t('finishSession')}</button>
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

    window.removeSet = (exIdx) => {
        const sets = session.exercises[exIdx].sets;
        if (sets.length > 1) {
            sets.pop();
            Store.saveActiveSession(session);
            render();
        }
    };

    window.finishSession = () => {
        const completedSets = session.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
        if (completedSets === 0) {
            showToast(t('validateAtLeastOneSet'));
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

        showToast(t('sessionSaved'));
        App.navigate('home');
    };

    window.cancelSession = () => {
        showConfirmModal(
            t('cancelSession'),
            t('cancelSessionConfirm'),
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
                <h3>${t('noHistory')}</h3>
                <p>${t('createAndDoSession')}</p>
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
                <h3>${t('noSession')}</h3>
                <p>${t('doSessionForHistory')}</p>
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
        const noteText = session.note || '';
        detailHtml += `
            <div class="history-session-card">
                <div class="history-session-header">
                    <div>
                        <div class="history-session-date">${formatDate(session.date)}</div>
                        <div style="font-size:12px;color:var(--text-muted)">${formatTime(session.date)}</div>
                    </div>
                    <div style="display:flex;gap:8px">
                        <button class="history-session-delete" onclick="showNoteModal('${session.id}', '${selectedWorkoutId}')" aria-label="${t('note')}" style="color:${noteText ? 'var(--accent)' : 'var(--text-muted)'}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                            </svg>
                        </button>
                        <button class="history-session-delete" onclick="editSessionFromHistory('${session.id}', '${selectedWorkoutId}')" aria-label="${t('editSession')}" style="color:var(--text-secondary)">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="history-session-delete" onclick="deleteSessionConfirm('${session.id}', '${selectedWorkoutId}')">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                </div>
                ${noteText ? `<div class="session-note-display"><span class="session-note-label">${t('note')}:</span> ${escapeHtml(noteText)}</div>` : ''}
        `;

        // Find the previous session (the one right after in the sorted array)
        const prevSession = sessions[selectedSessionIdx + 1] || null;

        session.exercises.forEach(ex => {
            const maxWeight = Math.max(...ex.sets.map(s => s.weight));
            const totalReps = ex.sets.reduce((acc, s) => acc + s.reps, 0);
            const setsStr = ex.sets.map(s => `${s.weight}${t('kg')} x${s.reps}`).join(', ');

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
                        if (weightDiff > 0) parts.push(`+${weightDiff}${t('kg')}`);
                        if (repsDiff > 0) parts.push(`+${repsDiff} ${t('reps')}`);
                        perfBadgeHtml = `<span class="history-perf-badge up">${parts.join(', ')}</span>`;
                    } else if (maxWeight < prevMaxWeight && totalReps < prevTotalReps) {
                        perfClass = 'history-perf-down';
                        const parts = [];
                        if (weightDiff < 0) parts.push(`${weightDiff}${t('kg')}`);
                        if (repsDiff < 0) parts.push(`${repsDiff} ${t('reps')}`);
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
                        <span class="history-exercise-weight">${maxWeight} ${t('kg')}</span>
                        <span class="history-exercise-weight">${ex.sets.map(s => s.reps).join('-')}</span>
                    </div>
                </div>
            `;
        });

        detailHtml += '</div>';
    }

    // Progression button
    let progressionBtn = `
        <button class="btn btn-secondary btn-block mt-16" onclick="App.pushPage('progression', {workoutId:'${selectedWorkoutId}'})">
            ${t('viewProgression')}
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
            t('deleteSession'),
            t('deleteSessionConfirm'),
            () => {
                Store.deleteSession(sessionId);
                showToast(t('sessionDeleted'));
                App.navigate('history', { selectedWorkoutId: workoutId, selectedSessionIdx: 0 });
            }
        );
    };

    window.editSessionFromHistory = (sessionId, workoutId) => {
        const allSessions = Store.getSessions();
        const session = allSessions.find(s => s.id === sessionId);
        if (!session) return;
        App.pushPage('edit-session', { session: JSON.parse(JSON.stringify(session)), workoutId });
    };

    window.showNoteModal = (sessionId, workoutId) => {
        const allSessions = Store.getSessions();
        const session = allSessions.find(s => s.id === sessionId);
        if (!session) return;
        const currentNote = session.note || '';
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="confirm-modal">
                <h3>${currentNote ? t('editNote') : t('addNote')}</h3>
                <textarea class="form-input" id="note-input" rows="4" placeholder="${t('notePlaceholder')}" style="resize:vertical;min-height:80px;margin-bottom:16px">${escapeHtml(currentNote)}</textarea>
                <div class="confirm-modal-actions">
                    <button class="btn btn-secondary" onclick="closeModal()">${t('cancel')}</button>
                    <button class="btn btn-primary" id="btn-save-note">${t('save')}</button>
                </div>
            </div>
        `;
        document.getElementById('btn-save-note').addEventListener('click', () => {
            const noteValue = document.getElementById('note-input').value.trim();
            const sessions = Store.getSessions();
            const idx = sessions.findIndex(s => s.id === sessionId);
            if (idx !== -1) {
                sessions[idx].note = noteValue;
                Store.saveSessions(sessions);
            }
            closeModal();
            showToast(t('noteSaved'));
            App.navigate('history', { selectedWorkoutId: workoutId, selectedSessionIdx: selectedSessionIdx });
        });
        showModal();
    };
}

// =============================================================
// PAGE: EDIT SESSION
// =============================================================
function renderEditSession(container, params) {
    const session = params.session;
    if (!session) { App.goBack(); return; }

    function render() {
        let html = `<div style="margin-bottom:12px">
            <div style="font-size:16px;font-weight:600;color:var(--text-primary)">${formatDate(session.date)} - ${formatTime(session.date)}</div>
        </div>`;

        session.exercises.forEach((ex, exIdx) => {
            let setsHtml = '';
            ex.sets.forEach((set, setIdx) => {
                setsHtml += `
                    <div class="set-row completed">
                        <div class="set-number">${setIdx + 1}</div>
                        <div class="set-fields">
                            <input type="number" inputmode="decimal" class="inline-input" value="${set.weight}"
                                   onchange="window._editSessionUpdateSet(${exIdx},${setIdx},'weight',this.value)"
                                   min="0" step="0.5">
                            <span>${t('kg')}</span>
                            <span style="color:var(--text-muted);margin:0 2px">x</span>
                            <input type="number" inputmode="numeric" class="inline-input" value="${set.reps}"
                                   onchange="window._editSessionUpdateSet(${exIdx},${setIdx},'reps',this.value)"
                                   min="0" style="width:50px">
                            <span>${t('reps')}</span>
                        </div>
                        <button class="set-check" onclick="window._editSessionRemoveSet(${exIdx},${setIdx})" style="background:var(--bg-tertiary)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                `;
            });

            html += `
                <div class="session-exercise">
                    <div class="session-exercise-header">
                        <span>${escapeHtml(ex.name)}</span>
                        <span class="session-exercise-muscle">${escapeHtml(ex.muscle)}</span>
                    </div>
                    ${setsHtml}
                    <button class="add-set-btn" onclick="window._editSessionAddSet(${exIdx})">${t('addSet')}</button>
                </div>
            `;
        });

        html += `
            <button class="btn btn-primary btn-block mt-16" onclick="window._editSessionSave()">${t('save')}</button>
        `;

        container.innerHTML = html;
    }

    window._editSessionUpdateSet = (exIdx, setIdx, field, value) => {
        if (field === 'weight') {
            session.exercises[exIdx].sets[setIdx].weight = parseFloat(value) || 0;
        } else {
            session.exercises[exIdx].sets[setIdx].reps = parseInt(value) || 0;
        }
    };

    window._editSessionRemoveSet = (exIdx, setIdx) => {
        session.exercises[exIdx].sets.splice(setIdx, 1);
        // Remove exercise if no sets left
        if (session.exercises[exIdx].sets.length === 0) {
            session.exercises.splice(exIdx, 1);
        }
        render();
    };

    window._editSessionAddSet = (exIdx) => {
        const sets = session.exercises[exIdx].sets;
        const last = sets[sets.length - 1];
        sets.push({
            weight: last ? last.weight : 20,
            reps: last ? last.reps : 10,
            completed: true
        });
        render();
    };

    window._editSessionSave = () => {
        // Remove exercises with no sets
        session.exercises = session.exercises.filter(ex => ex.sets.length > 0);
        if (session.exercises.length === 0) {
            // If all exercises removed, delete the session
            Store.deleteSession(session.id);
            showToast(t('sessionDeleted'));
            App.goBack();
            return;
        }
        // Update session in store
        const sessions = Store.getSessions();
        const idx = sessions.findIndex(s => s.id === session.id);
        if (idx !== -1) {
            sessions[idx] = session;
            Store.saveSessions(sessions);
        }
        showToast(t('editSessionSaved'));
        App.goBack();
    };

    render();
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
                <h3>${t('notEnoughData')}</h3>
                <p>${t('doAtLeast2Sessions')}</p>
            </div>
        `;
        return;
    }

    // Reverse sessions to get chronological order
    const chronoSessions = [...sessions].reverse();

    let html = `<div style="font-size:14px;color:var(--text-secondary);margin-bottom:16px">
        ${escapeHtml(workout.name)} - ${t('sessionCount')(sessions.length)}
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
        const diffColor = diff >= 0 ? 'var(--success)' : 'var(--danger)';

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
                <p>${t('notEnoughDataForProgression')}</p>
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
    const cc = themeManager.getChartColor();
    ctx.strokeStyle = cc.hex;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Gradient fill
    const lastX = padding.left + chartW;
    ctx.lineTo(lastX, padding.top + chartH);
    ctx.lineTo(padding.left, padding.top + chartH);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    gradient.addColorStop(0, `rgba(${cc.rgba}, 0.3)`);
    gradient.addColorStop(1, `rgba(${cc.rgba}, 0.02)`);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Dots
    dataPoints.forEach((d, i) => {
        const x = padding.left + (i / (dataPoints.length - 1)) * chartW;
        const y = padding.top + chartH - ((d.maxWeight - minW) / range) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = cc.hex;
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
                <button class="btn btn-secondary" onclick="closeModal()">${t('cancel')}</button>
                <button class="btn btn-danger" id="confirm-action">${t('confirm')}</button>
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
