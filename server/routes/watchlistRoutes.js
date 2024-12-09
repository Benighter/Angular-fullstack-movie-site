const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');

router.get('/createTable', watchlistController.createUserWatchlistTable);
router.post('/add', watchlistController.addToWatchlist);
router.delete('/:userId/:movieId', watchlistController.removeFromWatchlist);
router.get('/:userId', watchlistController.getWatchlist);
router.get('/isInWatchlist/:userId/:movieId', watchlistController.isInWatchlist);

module.exports = router;
