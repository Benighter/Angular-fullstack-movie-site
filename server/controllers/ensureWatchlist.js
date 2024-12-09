const pool = require('../config/DB_config');

const ensureWatchlist = async (userId) => {
    try {
        const result = await pool.query(
            `SELECT * FROM user_watchlist 
             WHERE user_id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            console.log('No watchlist exists for user:', userId);
        } else {
            console.log('Watchlist already exists for user:', userId);
        }
    } catch (error) {
        console.error('Error ensuring watchlist:', error);
    }
};

module.exports = { ensureWatchlist };
