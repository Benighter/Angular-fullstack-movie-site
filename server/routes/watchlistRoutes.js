const express = require('express');
const router = express.Router();
const { run, get, all } = require('../config/DB_config');

// Add movie to watchlist
router.post('/', async (req, res) => {
  try {
    const { movieId, movieTitle, posterPath } = req.body;
    const userId = req.body.userId;
    console.log('Received data:', req.body);
    
    if (!userId) {
      return res.status(401).json({ message: 'User must be logged in to add to watchlist' });
    }

    // Check if movie is already in watchlist
    const existingEntry = await get(
      'SELECT * FROM user_watchlist WHERE movie_id = ? AND user_id = ?',
      [movieId, userId]
    );

    if (existingEntry) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    // Add movie to watchlist
    const result = await run(
      'INSERT INTO user_watchlist (movie_id, user_id, movie_title, poster_path) VALUES (?, ?, ?, ?)',
      [movieId, userId, movieTitle, posterPath]
    );

    const newEntry = await get(
      'SELECT * FROM user_watchlist WHERE id = ?',
      [result.id]
    );

    res.status(201).json(newEntry);
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

    const watchlist = await all(
      'SELECT * FROM user_watchlist WHERE user_id = ? ORDER BY added_at DESC',
      [userId]
    );

    res.json(watchlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving watchlist' });
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

    await run(
      'DELETE FROM user_watchlist WHERE movie_id = ? AND user_id = ?',
      [movieId, userId]
    );
    
    res.json({ message: 'Movie removed from watchlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error removing from watchlist' });
  }
});

module.exports = router;
