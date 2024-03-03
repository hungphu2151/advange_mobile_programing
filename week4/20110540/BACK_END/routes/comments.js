const express = require('express');
const router = express.Router();

const {
    getComments,
    create,
    like,
} = require('../controllers/commentController.js');

const {
    verifyToken,
    isUser,
    isAdmin
} = require('../middlewares/authMiddleware.js');

router.get('/:id', verifyToken, isUser, getComments);
router.post('/create/:id', verifyToken, isUser, create);
router.post('/like/:id', verifyToken, isUser, like);
//router.put('/:id', verifyToken, isUser, update);





module.exports = router;