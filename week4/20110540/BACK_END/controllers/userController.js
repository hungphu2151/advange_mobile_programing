const User = require('../models/User')
const Friend = require('../models/Friend');
const { UserAPIFeatures } = require('../utils/APIFeatures');
const { query } = require('express');
const Post = require('../models/Post');
const Post_liked = require('../models/Post_liked');
const Addfriend = require('../models/Addfriend');
const Follow = require('../models/Follow');

//GET /info/:id
exports.getInfo = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                code: 4000,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const user = await User.findOne({ _id: req.params.id }).select('first_name last_name avatar.url');
        if(!user){
            return res.status(404).json({
                success: false,
                code: 4001,
                message: 'Không tìm thấy người dùng.', 
            });
        }
        const check_friend = await Friend.findOne({
            user_id: req.user._id,
            friend_id: req.params.id,
        })
        const friend = check_friend ? true : false;
        const check_following = await Follow.findOne({
            user_id: req.user._id,
            following_user_id: req.params.id,
        })
        const following = check_following ? true : false;
        if(!friend){
            const check_friend_request = await Addfriend.findOne({
                user_id: req.params.id,
                add_user_id: req.user._id
            })
            const friend_request = check_friend_request ? true : false;
            if(friend_request){
                return res.status(200).json({
                    success: true,
                    user,
                    following,
                    friend,
                    friend_request,
                });
            }
            const check_add_friend = await Addfriend.findOne({
                user_id: req.user._id,
                add_user_id: req.params.id
            })
            const add_friend = check_add_friend ? true : false;
            return res.status(200).json({
                success: true,
                user,
                following,
                friend,
                add_friend,
            });
        }
        res.status(200).json({
            success: true,
            user,
            following,
            friend,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 4002,
            message: error, 
        });
    }
})

//GET /posts/:id
exports.getPosts = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                code: 4003,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const user = await User.findOne({ _id: req.params.id });
        if(!user){
            return res.status(404).json({
                success: false,
                code: 4004,
                message: 'Không tìm thấy người dùng.', 
            });
        }

        const posts = await Post.find({ user_id : req.params.id })
            .select('_id post_img.url')
            .lean()

        const postsAfferCountLike = await Promise.all(posts.map(async (post) => {
            const post_like = await Post_liked.findOne({ post_id: post._id });
            const likes = post_like ? post_like.user_id.length : 0;

            //Làm thêm phần count_cmt
        
            return {
                ...post,
                likes,
            };
        }));

        return res.status(200).json({
            success: true,
            posts: postsAfferCountLike
        })
            
        
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 4005,
            message: error.message, 
        });
    }
})

//GET /users/admin
exports.getAll = (async (req, res, next) => {
    try {
        const { size } = req.query;
        const userQuery = User.find({ role_id: { $ne: 0 } }).select('avatar.url first_name last_name gmail id department phone_number is_active');
        
        const apiFeatures = new UserAPIFeatures(userQuery, req.query)
        
        let allUser = await apiFeatures.query;
        const totals = allUser.length;

        const apiFeaturesPagination = new UserAPIFeatures(User.find(userQuery), req.query)
            .search()
            .pagination(size);

        allUser = await apiFeaturesPagination.query;

        const count_user = allUser.length
        
        return res.status(200).json({
            success: true,
            count_user,
            totals,
            all_user: allUser, 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 4006,
            message: error, 
        });
    }
})

//POST /users/admin/:id
exports.disabled = (async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).select('is_active');
        if(!user){
            return res.status(404).json({
                success: false,
                code: 4007,
                message: 'Không tìm thấy người dùng.', 
            });
        }
        is_active = !user.is_active
        const user_update = await User.updateOne(
            { _id: req.params.id},
            { $set: { is_active: is_active } },
            { new: true },
        )
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 4008,
            message: err.message 
        });
    }
})

//GET /users/search
exports.getAllUser = (async (req, res) => {
    try {
        const { size } = req.query;
        const userQuery = User.find({ role_id: { $ne: 0 } }).select('avatar.url first_name last_name department');
        
        const apiFeatures = new UserAPIFeatures(userQuery, req.query)
            .search();
        
        let allUser = await apiFeatures.query;
        const totals = allUser.length;

        const apiFeaturesPagination = new UserAPIFeatures(User.find(userQuery), req.query)
            .search()
            .pagination(size);

        allUser = await apiFeaturesPagination.query;
        
        return res.status(200).json({
            success: true,
            totals,
            allUser, 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 4009,
            message: error, 
        });
    }
});