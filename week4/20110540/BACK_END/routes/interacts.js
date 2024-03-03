const express = require('express');
const router = express.Router();

const {
    follow,
    addfriend,
    accept,
    refuse,
    unfriend,
    block,
} = require('../controllers/interactController.js');

const {
    verifyToken,
    isUser,
} = require('../middlewares/authMiddleware.js');

router.post('/follow/:id', verifyToken, isUser, follow);
router.post('/addfriend/:id', verifyToken, isUser, addfriend);
router.post('/accept/:id', verifyToken, isUser, accept);
router.post('/refuse/:id', verifyToken, isUser, refuse);
router.post('/unfriend/:id', verifyToken, isUser, unfriend);
router.post('/block/:id', verifyToken, isUser, block);

module.exports = router;