const express = require('express');
const router = express.Router();
const pool = require('../config/DB_config');

// Add movie to watchlist
router.post('/', async (req, res) => {
  try {
    const { movieId, userId } = req.body;
    console.log('Received data:', req.body);
    
    if (!userId) {
      return res.status(401).json({ message: 'User must be logged in to add to watchlist' });
    }

    // Check if movie is already in user's watchlist
    const existingEntry = await pool.query(
      'SELECT * FROM watchlist WHERE movie_id = $1 AND user_id = $2',
      [movieId, userId]
    );

    if (existingEntry.rows.length > 0) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    // Add movie to watchlist
    const result = await pool.query(
      'INSERT INTO watchlist (movie_id, user_id) VALUES ($1, $2) RETURNING *',
      [movieId, userId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding to watchlist' });
  }
});

// Get user's watchlist
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'User must be logged in to view watchlist' });
    }

    const results = await pool.query(
      'SELECT * FROM watchlist WHERE user_id = $1',
      [userId]
    );
    
    res.json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching watchlist' });
  }
});

// Remove movie from watchlist
router.delete('/:movieId', async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const userId = req.query.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User must be logged in to remove from watchlist' });
    }

    await pool.query(
      'DELETE FROM watchlist WHERE movie_id = $1 AND user_id = $2',
      [movieId, userId]
    );
    
    res.json({ message: 'Movie removed from watchlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error removing from watchlist' });
  }
});

module.exports = router;
