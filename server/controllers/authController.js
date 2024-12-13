const pool = require('../config/DB_config');
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const emailCheck = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const usernameCheck = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (usernameCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const result = await pool.query(
            `INSERT INTO users (email, username, password) 
             VALUES ($1, $2, $3) 
             RETURNING id, email, username`,
            [email, username, hashedPassword]
        );

        const userId = result.rows[0].id;

        await pool.query(
            `CREATE TABLE IF NOT EXISTS user_watchlist (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                movie_id INTEGER NOT NULL,
                added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );`
        );

        const watchlistCheck = await pool.query(
            'SELECT * FROM user_watchlist WHERE user_id = $1',
            [userId]
        );

        if (watchlistCheck.rows.length === 0) {
            await pool.query(
                `INSERT INTO user_watchlist (user_id) 
                 VALUES ($1)`,
                [userId]
            );
        }

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        console.log('Login attempt with:', { identifier, password });

        const result = await pool.query(
            `SELECT id, email, username, password 
             FROM users 
             WHERE email = $1 OR username = $1`,
            [identifier]
        );

        console.log('Database query result:', result.rows);

        if (result.rows.length === 0) {
            console.log('No user found with identifier:', identifier);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = result.rows[0];
        console.log('Found user:', { ...user, password: '***' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Password mismatch for user:', identifier);
            return res.status(401).json({ message: 'Email or Password is invalid!!!' });
        }

        delete req.user;

        const { password: _, ...userWithoutPassword } = user;
        console.log('Login successful, returning:', userWithoutPassword);
        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
};

module.exports = { register, login };
