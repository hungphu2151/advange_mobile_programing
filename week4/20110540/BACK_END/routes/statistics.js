const express = require('express');
const router = express.Router();

const {
    getAdminStatistics,
    getStatistics,
} = require('../controllers/statisticsController.js');

const {
    verifyToken,
    isUser,
    isAdmin
} = require('../middlewares/authMiddleware.js');

router.post('/admin', verifyToken, isAdmin, getAdminStatistics);

router.get('/:id', verifyToken, isUser, getStatistics);

module.exports = router; 