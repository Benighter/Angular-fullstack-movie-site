const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');

router.post('/add', watchlistController.addToWatchlist);
router.delete('/:userId/:movieId', watchlistController.removeFromWatchlist);
router.get('/:userId', watchlistController.getWatchlist);

module.exports = router;
