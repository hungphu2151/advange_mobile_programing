const express = require('express');
const router = express.Router();

const {
    getAll,
    getPost,
    store,
    create,
    like,
    update,
    destroy,
    adminGetAll,
    adminDestroy,
} = require('../controllers/postController.js');

const {
    verifyToken,
    isUser,
    isAdmin,
    isAdminOrUser
} = require('../middlewares/authMiddleware.js');

router.get('/admin', verifyToken, isAdmin, adminGetAll);
router.delete('/admin/:id', verifyToken, isAdmin, adminDestroy);

router.get('/:id', verifyToken, isAdminOrUser, getPost);
// router.get('/:id', verifyToken, isUser, getPost);
router.post('/store/:id', verifyToken, isUser, store);
router.post('/like/:id', verifyToken, isUser, like);
router.post('/create', verifyToken, isUser, create);
router.put('/:id', verifyToken, isUser, update);
router.delete('/:id', verifyToken, isUser, destroy);

router.get('/', verifyToken, isUser, getAll);

module.exports = router;