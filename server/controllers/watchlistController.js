const pool = require('../config/DB_config');

// Add a movie to user's watchlist
const addToWatchlist = async (req, res) => {
    try {
        const { userId, movieId } = req.body;
        
        console.log('Received add to watchlist request:', { userId, movieId });

        // Check if the movie is already in the watchlist
        const existingEntry = await pool.query(
            `SELECT * FROM user_watchlist 
             WHERE user_id = $1 AND movie_id = $2`,
            [userId, movieId]
        );

        if (existingEntry.rows.length > 0) {
            console.log('Movie already in watchlist');
            return res.status(409).json({ message: 'Movie already in watchlist' });
        }
        
        const result = await pool.query(
            `INSERT INTO user_watchlist (user_id, movie_id) 
             VALUES ($1, $2) 
             RETURNING id`,
            [userId, movieId]
        );

        console.log('Movie added to watchlist:', result.rows[0]);

        res.status(201).json({ 
            message: 'Movie added to watchlist', 
            id: result.rows[0].id 
        });
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        res.status(500).json({ 
            message: 'Error adding movie to watchlist',
            error: error.message 
        });
    }
};

// Remove a movie from user's watchlist
const removeFromWatchlist = async (req, res) => {
    try {
        const { userId, movieId } = req.params;
        
        console.log('Received remove from watchlist request:', { userId, movieId });
        
        const result = await pool.query(
            `DELETE FROM user_watchlist 
             WHERE user_id = $1 AND movie_id = $2`,
            [userId, movieId]
        );

        console.log('Remove from watchlist result:', result.rowCount);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Movie not found in watchlist' });
        }

        res.json({ message: 'Movie removed from watchlist' });
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        res.status(500).json({ 
            message: 'Error removing movie from watchlist',
            error: error.message 
        });
    }
};

// Get user's watchlist
const getWatchlist = async (req, res) => {
    try {
        const { userId } = req.params;
        
        console.log('Received get watchlist request:', { userId });
        
        const result = await pool.query(
            `SELECT movie_id, added_at 
             FROM user_watchlist 
             WHERE user_id = $1 
             ORDER BY added_at DESC`,
            [userId]
        );

        console.log('Watchlist retrieved:', result.rows);

        res.json(result.rows);
    } catch (error) {
        console.error('Error getting watchlist:', error);
        res.status(500).json({ 
            message: 'Error retrieving watchlist',
            error: error.message 
        });
    }
};

module.exports = { addToWatchlist, removeFromWatchlist, getWatchlist };
