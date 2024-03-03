const Post = require('../models/Post')

const Comment = require('../models/Comment');
const Comment_liked = require('../models/Comment_like');
const Follow = require('../models/Follow');
const Notification = require('../models/Notification');
const Noti_user = require('../models/Noti_user');


//GET /:Post_id
exports.getComments = (async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success: false,
                code: 8000,
                message: 'Không tìm thấy bài viết.', 
            });
        }

        const following_Users = await Follow.find({ user_id: req.user._id }).select('following_user_id');
        const following_User_Ids = following_Users.map(follow => follow.following_user_id).flat();
        following_User_Ids.push(req.user._id);

        if (!following_User_Ids.some(id => id.equals(post.user_id))){
            return res.status(400).json({
                success: false,
                code: 8001,
                message: 'Không thể thao tác. Bài viết này của người mà bạn chưa theo dõi.',
            });
        }

        const comments = await Comment
            .find({
                post_id:req.params.id,
                user_id: {$in: following_User_Ids}
            })
            .populate('user_id', 'first_name last_name avatar.url')
            .sort({ create_comment_time: -1 })
        
        if(comments.length === 0){
            return res.status(200).json({
                success: true,
                comments: [],
            });
        }

        const check_liked = await Comment_liked.find({user_id:req.user._id}).select('comment_id -_id')

        const commentsAfferCheck = comments.map(comment => {
            const isLiked = check_liked.some(like => like.comment_id.equals(comment._id));
            
            return {
                ...comment.toObject(),
                liked: isLiked,
            };
        });

        const commentsAfferCountLike = await Promise.all(commentsAfferCheck.map(async (comment) => {
            const comment_like = await Comment_liked.findOne({ comment_id: comment._id });
            const likes = comment_like ? comment_like.user_id.length : 0;
        
            return {
                ...comment,
                likes,
            };
        }));

        
        res.status(200).json({
            success: true,
            comments: commentsAfferCountLike,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 8002,
            message: error ,
        });
    }
})

//POST /comments/create/:Post_id
exports.create = (async (req, res) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false,
                code: 8003,
                message: 'Thao tác thất bại. Thiếu nội dung',
            });
        }
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success: false,
                code: 8004,
                message: 'Không tìm thấy bài viết.', 
            });
        }
        
        const following_Users = await Follow.find({ user_id: req.user._id }).select('following_user_id');
        const following_User_Ids = following_Users.map(follow => follow.following_user_id).flat();
        following_User_Ids.push(req.user._id);
        
        if (!following_User_Ids.some(id => id.equals(post.user_id))){
            return res.status(400).json({
                success: false,
                code: 8005,
                message: 'Không thể thao tác. Bài viết này của người mà bạn chưa theo dõi.',
            });
        }
        const currentDate = new Date();

        const comment = await Comment.create({ 
            user_id:req.user._id, 
            post_id:req.params.id, 
            ...req.body, 
            create_comment_time: currentDate
        });

        if(!post.user_id.equals(req.user._id)){
            const content = req.user.first_name + ' ' + req.user.last_name +' bình luận bài viết của bạn.';

            const noti = await Notification.create({
                user_id: req.user._id,
                noti_content: content,
                post_id: post._id,
                noti_create_time: currentDate
            })
            await Noti_user.findOneAndUpdate(
                { user_id: post.user_id },
                { $push: { 'detail': { noti_id: noti._id } } },
                { new: true, upsert: true }
            );
        }

        res.status(201).json({
            success: true,
            message: 'Comment thành công.',
            comment,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 8006,
            message: err.message, 
        });
    }
})

//POST /comments/like/:cmt_id
exports.like = (async (req, res) => {
    try {
        const check_cmt = await Comment.findById(req.params.id);
        if(!check_cmt){
            return res.status(404).json({
                success: false,
                code: 8007,
                message: 'Không tìm thấy bình luận.', 
            });
        }
        const following_Users = await Follow.find({ user_id: req.user._id }).select('following_user_id');
        const following_User_Ids = following_Users.map(follow => follow.following_user_id).flat();
        following_User_Ids.push(req.user._id);
        if (!following_User_Ids.some(id => id.equals(check_cmt.user_id))){
            return res.status(400).json({
                success: false,
                code: 8008,
                message: 'Không thể thao tác. Bình luận này của người mà bạn chưa theo dõi.',
            });
        }

        const liked = await Comment_liked.findOneAndUpdate(
            { comment_id: req.params.id },
            {},
            { new: true, upsert: true }
        );
        if(liked.user_id.includes(req.user._id)){
            liked.user_id.pull(req.user._id);
            await liked.save();
            return res.status(201).json({
                success: true,
                message: 'Bỏ yêu thích.',
            });
        } else{
            liked.user_id.push(req.user._id);
            await liked.save();
            res.status(201).json({
                success: true,
                message: 'Yêu thích bình luận thành công.',
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 8009,
            message: err.message, 
        });
    }
})

