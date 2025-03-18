const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { db, run } = require('../config/DB_config');

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');
    
    // Create users table
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created or exists');
    
    // Create user_watchlist table
    await run(`
      CREATE TABLE IF NOT EXISTS user_watchlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        movie_id INTEGER NOT NULL,
        movie_title TEXT NOT NULL,
        poster_path TEXT,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('User watchlist table created or exists');
    
    // Create ratings table
    await run(`
      CREATE TABLE IF NOT EXISTS ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        movie_id INTEGER NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
        review TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Ratings table created or exists');
    
    // Check if sample user exists
    const hashedPassword = '$2b$10$6XpY3.NwO96h2fIYJXuZo.UQiLTR/PuLZBLw6v3wUYQK.f9n3AX5u'; // This is 'password123'
    
    db.get("SELECT 1 FROM users WHERE email = ?", ['test@example.com'], async (err, row) => {
      if (err) {
        console.error('Error checking for existing user:', err.message);
        return;
      }
      
      if (!row) {
        // Create sample user
        await run(
          "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
          ['test@example.com', 'testuser', hashedPassword]
        );
        console.log('Sample user created');
      } else {
        console.log('Sample user already exists');
      }
      
      console.log('Database initialization completed');
    });
    
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
}

// Run the initialization
initializeDatabase(); 