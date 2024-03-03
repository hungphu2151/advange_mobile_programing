const fs = require('fs').promises;
const path = require('path');
const cloudinary = require('cloudinary').v2;

const Post = require('../models/Post')
const Story = require('../models/Story')
const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken')
const Post_stored = require('../models/Post_stored')
const bcrypt = require('bcrypt');
const Addfriend = require('../models/Addfriend')
const Post_liked = require('../models/Post_liked')
const Friend = require('../models/Friend')
const { UserAPIFeatures } = require('../utils/APIFeatures');

//GET /posts
exports.getMyPosts = (async (req, res) => {
    try {
        const posts = await Post.find({ user_id : req.user._id })
            .select('_id post_img.url')
            .lean()
        if(!posts){
            return res.status(200).json({
                success: true,
                posts: []
            })
        }
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
            code: 3000,
            message: error.message, 
        });
    }
})

//GET /stored/posts
exports.getPosts = (async (req, res) => {
    try {
        const store = await Post_stored.findOne({ user_id : req.user._id })
        .select('post_id -_id')
        .populate('post_id', 'post_img.url')
        .lean()
        if(!store){
            return res.status(200).json({
                success: true,
                posts: []
            })
        }
        const posts = store.post_id
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
            code: 3001,
            message: error.message, 
        });
    }
})

//GET /stored/stories
exports.getStories = (async (req, res) => {
    try {
        const stories = await Story.find({ user_id : req.user._id }).select('-story_content.publicId')
        return res.status(200).json({
            success: true,
            stories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 3002,
            message: error.message, 
        });
    }
})

//GET /account/info
exports.getInfo = (async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }).select('-pass_word -is_active -__v -avatar.publicId -_id');
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 3003,
            message: err.message, 
        });
    }
})

//GET /friend-request
exports.getFriendRequest = (async (req, res) => {
    try {
        const friend_request = await Addfriend.find({
                add_user_id: req.user._id
            })
            .populate('user_id', 'first_name last_name avatar.url department id')
            .select('-_id user_id');
        if(friend_request.length > 0){
            const formattedRequests = friend_request.map(request => {
                const user = request.user_id;
                return {
                    avatar: user.avatar,
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    id: user.id,
                    department: user.department
                };
            });

            return res.status(200).json({
                success: true,
                requests: formattedRequests,
            });
        } else {
            return res.status(200).json({
                success: true,
                requests: [],
            });
        }
        
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 3004,
            message: err.message, 
        });
    }
})

//GET /friends
exports.getFriends = (async (req, res) => {
    try {
        const friends = await Friend
            .findOne({user_id: req.user._id})
            .populate('friend_id', 'first_name last_name avatar.url department id')
            .select('-_id friend_id');
        const friend_list = friends.friend_id
        if(!friends.length){
            return res.status(200).json({
                success: true,
                friends:friend_list,
                // friends,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: 'Chưa có bạn',
            });
        }
        
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 3005,
            message: err.message, 
        });
    }
})

//GET /me/friends/search
exports.searchFriends = (async (req, res) => {
    try {
        const { size } = req.query;
        const friends = await Friend.findOne({ user_id: req.user._id }).select('-_id friend_id');
        const friend_ids = friends.friend_id

        const userQuery = User.find({ _id: { $in: friend_ids } })
            .select('avatar.url first_name last_name department id');
        
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
            code: 3006,
            message: error.message, 
        });
    }
});

//PUT /account/info
exports.updateInfo = (async (req, res) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false,
                code: 3007,
                message:'Cập nhật thất bại. Chưa nhập dữ liệu.',
            })
        }
        const user = await User.findByIdAndUpdate(
            { _id : req.user._id },
            {$set: {...req.body}},
            { new: true },
        ).select('-pass_word -role_id -is_active -__v -avatar -_id');
        res.status(200).json({
            success: true,
            message:'Cập nhật thành công.',
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 3008,
            message:'Cập nhật thất bại.',
            message: error.message, 
        });
    }
})

//PUT /account/password
exports.updatePassword = (async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ 
            success: false, 
            code: 3009,
            message: 'Không tìm thấy người dùng.' 
        });;
    }
    const isPasswordMatched = await user.comparePassword(req.body.pass_word);
    if (!isPasswordMatched) {
        return res.status(400).json({ 
            success: false, 
            code: 3010,
            message: 'Mật khẩu không chính xác.' 
        });
    }
    if (req.body.new_password !== req.body.confirm) {
        return res.status(400).json({ 
            success: false, 
            code: 3011,
            message: 'Nhập lại mật khẩu không trùng khớp.' });
    }

    const hashedPassword = await bcrypt.hash(req.body.new_password, 10);

    await User.findByIdAndUpdate(req.user._id, { pass_word: hashedPassword });

    res.status(201).json({ 
        success: true, 
        message: 'Đổi mật khẩu thành công.' 
    });
})

// uploadAvatar
const validImageFormats = ['jpg', 'jpeg', 'png'];
const maxFileSize = 10 * 1024 * 1024;
//POST /me/avatar
exports.uploadAvatar = (async (req, res) => {
    try {
        if (!req.files.avatar || !req.files.avatar.data) {
            return res.status(400).json({
                success: false,
                code: 3012,
                message: 'Đổi avatar thất bại. Chưa có ảnh.',
            });
        }

        const allowedExtensions = validImageFormats.map(format => `.${format}`);
        const fileExtension = path.extname(req.files.avatar.name).toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(400).json({
                success: false,
                code: 3013,
                message: 'Đổi avatar thất bại. Định dạng ảnh không hợp lệ. Chỉ chấp nhận .jpg, .jpeg hoặc .png.',
            });
        }

        const fileSize = req.files.avatar.data.length;
        if (fileSize > maxFileSize) {
            return res.status(400).json({
                success: false,
                code: 3014,
                message: 'Đổi avatar thất bại. Kích thước ảnh vượt quá giới hạn cho phép (10MB).',
            });
        }

        const user = await User.findOne({_id: req.user._id})

        if(user.avatar.publicId){
            await cloudinary.uploader.destroy(user.avatar.publicId)
        }

        // Tạo một thư mục tạm thời nếu nó chưa tồn tại
        const tempDir = path.join(__dirname, 'temp');
        await fs.mkdir(tempDir, { recursive: true });

        // Tạo một bộ đệm từ dữ liệu tệp
        const buffer = req.files.avatar.data;

        // Tạo một đường dẫn tạm thời để lưu trữ tệp
        const tempFilePath = path.join(tempDir, 'uploadedFile.jpg');

        // Ghi dữ liệu vào tệp tạm thời
        await fs.writeFile(tempFilePath, buffer);

        const result = await cloudinary.uploader.upload(
            tempFilePath,
            { folder: 'avatars', width: 512, height: 512, crop: 'fill', },
        );

        // Xóa tệp tạm thời
        await fs.unlink(tempFilePath);

        const avatar = {
            publicId: result.public_id,
            url: result.secure_url,
        };

        const new_user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { avatar: avatar },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: 'Đổi avatar thành công.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 3015,
            message: 'Đổi avatar thất bại :' + error.message, 
        });
    }
})