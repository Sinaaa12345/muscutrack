require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const Redis = require('ioredis');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// =============================================================
// REDIS CONNECTION
// =============================================================
const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB) || 0,
    retryStrategy(times) {
        if (times > 3) return null; // Stop retrying after 3 attempts
        return Math.min(times * 200, 2000);
    },
    lazyConnect: true
});

let redisConnected = false;

redis.on('connect', () => {
    redisConnected = true;
    console.log('Redis connected');
});

redis.on('error', (err) => {
    redisConnected = false;
    console.error('Redis error:', err.message);
});

redis.on('close', () => {
    redisConnected = false;
});

// Try to connect
redis.connect().catch(err => {
    console.error('Redis connection failed:', err.message);
    console.log('Server will start without Redis - clients will use localStorage fallback');
});

// =============================================================
// MIDDLEWARE
// =============================================================
app.use(cors({
    origin: process.env.CORS_ORIGIN === '*' ? true : process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'X-User-Id']
}));

app.use(express.json({ limit: '1mb' }));

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Trop de requêtes, réessayez dans une minute' }
});
app.use('/api/', limiter);

// Serve static files
app.use(express.static(path.join(__dirname), {
    setHeaders(res, filePath) {
        if (filePath.endsWith('sw.js')) {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

// =============================================================
// HELPERS
// =============================================================
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[<>"'&]/g, c => ({
        '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;'
    })[c]);
}

function isValidUserId(id) {
    return typeof id === 'string' && /^[a-zA-Z0-9_-]{2,64}$/.test(id);
}

function requireRedis(req, res, next) {
    if (!redisConnected) {
        return res.status(503).json({ error: 'Redis non disponible' });
    }
    next();
}

// Auth middleware - extract userId from header
function authMiddleware(req, res, next) {
    const userId = req.headers['x-user-id'];
    if (!userId || !isValidUserId(userId)) {
        return res.status(401).json({ error: 'userId manquant ou invalide' });
    }
    req.userId = userId;
    next();
}

// =============================================================
// AUTH ROUTES
// =============================================================
app.post('/api/auth/init', requireRedis, async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'Entrez votre nom d\'utilisateur' });
        }

        if (!isValidUserId(userId)) {
            return res.status(400).json({ error: 'ID utilisateur invalide' });
        }

        const exists = await redis.sismember('mt:users', userId);
        if (!exists) {
            return res.status(404).json({ error: 'Utilisateur inconnu' });
        }

        await redis.hset(`user:${userId}:profile`, 'lastAccess', new Date().toISOString());
        res.json({ userId, isNew: false });
    } catch (err) {
        console.error('Auth error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// =============================================================
// WORKOUT ROUTES
// =============================================================
app.get('/api/workouts', requireRedis, authMiddleware, async (req, res) => {
    try {
        const data = await redis.get(`user:${req.userId}:workouts`);
        res.json(data ? JSON.parse(data) : []);
    } catch (err) {
        console.error('Get workouts error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.post('/api/workouts', requireRedis, authMiddleware, async (req, res) => {
    try {
        const workouts = req.body;
        if (!Array.isArray(workouts) || workouts.length > 3) {
            return res.status(400).json({ error: 'Données invalides (max 3 workouts)' });
        }
        // Validate each workout
        for (const w of workouts) {
            if (!w.id || typeof w.name !== 'string' || !Array.isArray(w.exercises)) {
                return res.status(400).json({ error: 'Structure workout invalide' });
            }
            if (w.name.length > 30) {
                return res.status(400).json({ error: 'Nom du programme trop long (max 30)' });
            }
            if (w.exercises.length > 20) {
                return res.status(400).json({ error: 'Trop d\'exercices (max 20)' });
            }
        }
        await redis.set(`user:${req.userId}:workouts`, JSON.stringify(workouts));
        res.json({ success: true });
    } catch (err) {
        console.error('Save workouts error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.put('/api/workouts/:id', requireRedis, authMiddleware, async (req, res) => {
    try {
        const data = await redis.get(`user:${req.userId}:workouts`);
        const workouts = data ? JSON.parse(data) : [];
        const idx = workouts.findIndex(w => w.id === req.params.id);
        if (idx === -1) {
            return res.status(404).json({ error: 'Workout non trouvé' });
        }
        const update = req.body;
        if (update.name && update.name.length > 30) {
            return res.status(400).json({ error: 'Nom trop long (max 30)' });
        }
        workouts[idx] = { ...workouts[idx], ...update };
        await redis.set(`user:${req.userId}:workouts`, JSON.stringify(workouts));
        res.json({ success: true });
    } catch (err) {
        console.error('Update workout error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.delete('/api/workouts/:id', requireRedis, authMiddleware, async (req, res) => {
    try {
        const data = await redis.get(`user:${req.userId}:workouts`);
        const workouts = data ? JSON.parse(data) : [];
        const filtered = workouts.filter(w => w.id !== req.params.id);
        await redis.set(`user:${req.userId}:workouts`, JSON.stringify(filtered));

        // Also remove sessions for this workout
        const sessionsData = await redis.get(`user:${req.userId}:sessions`);
        if (sessionsData) {
            const sessions = JSON.parse(sessionsData);
            const filteredSessions = sessions.filter(s => s.workoutId !== req.params.id);
            await redis.set(`user:${req.userId}:sessions`, JSON.stringify(filteredSessions));
        }

        res.json({ success: true });
    } catch (err) {
        console.error('Delete workout error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// =============================================================
// SESSION ROUTES
// =============================================================
app.get('/api/sessions', requireRedis, authMiddleware, async (req, res) => {
    try {
        const data = await redis.get(`user:${req.userId}:sessions`);
        res.json(data ? JSON.parse(data) : []);
    } catch (err) {
        console.error('Get sessions error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.post('/api/sessions', requireRedis, authMiddleware, async (req, res) => {
    try {
        const session = req.body;
        if (!session.id || !session.workoutId || !session.date || !Array.isArray(session.exercises)) {
            return res.status(400).json({ error: 'Structure session invalide' });
        }

        const data = await redis.get(`user:${req.userId}:sessions`);
        const sessions = data ? JSON.parse(data) : [];
        sessions.unshift(session);

        // Keep max 20 per workout
        const counts = {};
        const filtered = sessions.filter(s => {
            counts[s.workoutId] = (counts[s.workoutId] || 0) + 1;
            return counts[s.workoutId] <= 20;
        });

        await redis.set(`user:${req.userId}:sessions`, JSON.stringify(filtered));
        res.json({ success: true });
    } catch (err) {
        console.error('Add session error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.delete('/api/sessions/:id', requireRedis, authMiddleware, async (req, res) => {
    try {
        const data = await redis.get(`user:${req.userId}:sessions`);
        const sessions = data ? JSON.parse(data) : [];
        const filtered = sessions.filter(s => s.id !== req.params.id);
        await redis.set(`user:${req.userId}:sessions`, JSON.stringify(filtered));
        res.json({ success: true });
    } catch (err) {
        console.error('Delete session error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// =============================================================
// ACTIVE SESSION ROUTES
// =============================================================
app.get('/api/sessions/active', requireRedis, authMiddleware, async (req, res) => {
    try {
        const data = await redis.get(`user:${req.userId}:active_session`);
        res.json(data ? JSON.parse(data) : null);
    } catch (err) {
        console.error('Get active session error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.post('/api/sessions/active', requireRedis, authMiddleware, async (req, res) => {
    try {
        const session = req.body;
        if (!session || !session.id) {
            return res.status(400).json({ error: 'Session invalide' });
        }
        await redis.set(`user:${req.userId}:active_session`, JSON.stringify(session));
        res.json({ success: true });
    } catch (err) {
        console.error('Save active session error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.delete('/api/sessions/active', requireRedis, authMiddleware, async (req, res) => {
    try {
        await redis.del(`user:${req.userId}:active_session`);
        res.json({ success: true });
    } catch (err) {
        console.error('Delete active session error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// =============================================================
// FALLBACK - Serve index.html for SPA
// =============================================================
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// =============================================================
// START SERVER
// =============================================================
app.listen(PORT, () => {
    console.log(`MuscuTrack server running on http://localhost:${PORT}`);
    console.log(`Redis: ${redisConnected ? 'connected' : 'disconnected (localStorage fallback)'}`);
});
