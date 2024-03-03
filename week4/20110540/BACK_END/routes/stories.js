const express = require('express');
const router = express.Router();

const {
    getAll,
    getStory,
    create,
    like,
    update,
    destroy,
} = require('../controllers/storyController.js');

const {
    verifyToken,
    isUser
} = require('../middlewares/authMiddleware.js');

router.get('/:id', verifyToken, isUser, getStory);
router.post('/like/:id', verifyToken, isUser, like);
router.post('/create', verifyToken, isUser, create);
router.put('/:id', verifyToken, isUser, update);
router.delete('/:id', verifyToken, isUser, destroy);

router.get('/', verifyToken, isUser, getAll);

module.exports = router;