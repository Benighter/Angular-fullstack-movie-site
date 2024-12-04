const pool = require('../config/DB_config');

// Function to handle user registration
const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if email already exists
        const emailCheck = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Check if username already exists
        const usernameCheck = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (usernameCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Username already taken', });
        }

        const result = await pool.query(
            `INSERT INTO users (email, username, password) 
             VALUES ($1, $2, $3) 
             RETURNING id, email, username`,
            [email, username, password]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Function to handle user login
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        console.log('Login attempt with:', { identifier, password });
        
        // First check if the login credential is an email or username
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

        // Verify password
        const user = result.rows[0];
        console.log('Found user:', { ...user, password: '***' });
        
        if (user.password !== password) {
            console.log('Password mismatch for user:', identifier);
            return res.status(401).json({ message: 'Email or Password is invalid!!!'});
        }

        // Return user data without password
        const { password: _, ...userWithoutPassword } = user;
        console.log('Login successful, returning:', userWithoutPassword);
        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
};

module.exports = { register, login };