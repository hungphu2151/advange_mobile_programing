const express = require('express');
const router = express.Router();

const {
    getInfo,
    getPosts,
    getAllUser,
    getAll,
    disabled ,
} = require('../controllers/userController.js');

const {
    verifyToken,
    isUser,
    isAdmin,
} = require('../middlewares/authMiddleware.js');

router.get('/search', verifyToken, isUser, getAllUser);
router.get('/info/:id', verifyToken, isUser, getInfo);
router.get('/posts/:id', verifyToken, isUser, getPosts);

router.get('/admin', verifyToken, isAdmin, getAll);
router.post('/admin/:id', verifyToken, isAdmin, disabled);



module.exports = router;