const express = require('express');
const router = express.Router();

const {
    getMyPosts,
    getPosts,
    getStories,
    getInfo,
    getFriendRequest,
    getFriends,
    searchFriends,
    updateInfo,
    updatePassword,
    uploadAvatar
} = require('../controllers/meController.js');

const {
    getNotis,
    readNoti,
} = require('../controllers/nofiController.js');

const {
    verifyToken,
    isUser,
    isAdmin,
    isAdminOrUser,
} = require('../middlewares/authMiddleware.js');

router.get('/posts', verifyToken, isUser, getMyPosts);
router.get('/stored/posts', verifyToken, isUser, getPosts);
router.get('/stored/stories', verifyToken, isUser, getStories);
router.get('/friend-request', verifyToken, isUser, getFriendRequest);
router.get('/friends', verifyToken, isUser, getFriends);
router.get('/friends/search', verifyToken, isUser, searchFriends);
router.get('/notis', verifyToken, isUser, getNotis);
router.post('/notis/read/:id', verifyToken, isUser, readNoti);

router.get('/account/info', verifyToken, isAdminOrUser, getInfo);
router.put('/account/info', verifyToken, isAdminOrUser, updateInfo);
router.put('/account/password', verifyToken, isAdminOrUser, updatePassword);
router.post('/avatar', verifyToken, isAdminOrUser, uploadAvatar);

module.exports = router;