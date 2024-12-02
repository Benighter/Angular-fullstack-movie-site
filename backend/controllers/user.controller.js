const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'login',
  host: 'localhost',
  database: 'login',
  password: '',
  port: 5432,
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`, [username, hashedPassword]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;
