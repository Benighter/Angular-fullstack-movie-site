const { db, get, all, run } = require('../config/DB_config');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if email already exists
        const emailExists = await get(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (emailExists) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Check if username already exists
        const usernameExists = await get(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (usernameExists) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Insert new user
        const result = await run(
            `INSERT INTO users (email, username, password) 
             VALUES (?, ?, ?)`,
            [email, username, hashedPassword]
        );

        const userId = result.id;
        
        // Get the created user
        const newUser = await get(
            'SELECT id, email, username FROM users WHERE id = ?',
            [userId]
        );

        // Generate JWT token
        const token = jwt.sign(
            { id: userId, email, username },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '1d' }
        );

        res.status(201).json({
            ...newUser,
            token
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        console.log('Login attempt with:', { identifier, password: '***' });

        // Find user by email or username
        const user = await get(
            `SELECT id, email, username, password 
             FROM users 
             WHERE email = ? OR username = ?`,
            [identifier, identifier]
        );

        if (!user) {
            console.log('No user found with identifier:', identifier);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Found user:', { ...user, password: '***' });

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Password mismatch for user:', identifier);
            return res.status(401).json({ message: 'Email or Password is invalid!!!' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '1d' }
        );

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        console.log('Login successful, returning:', userWithoutPassword);
        
        res.json({
            ...userWithoutPassword,
            token
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
};

module.exports = { register, login };
