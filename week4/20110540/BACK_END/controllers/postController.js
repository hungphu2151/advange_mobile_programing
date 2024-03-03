const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');
const fs = require('fs').promises;
const path = require('path');

const Post = require('../models/Post')
const Post_liked = require('../models/Post_liked')
const Post_stored = require('../models/Post_stored')
const Follow = require('../models/Follow');
const { PostAPIFeatures } = require('../utils/APIFeatures');
const Notification = require('../models/Notification');
const Noti_user = require('../models/Noti_user');

//GET /posts
exports.getAll = (async (req, res) => {
    try {
        const following_Users = await Follow.find({ user_id: req.user._id }).select('following_user_id');

        const following_User_Ids = following_Users.map(follow => follow.following_user_id).flat();
        following_User_Ids.push(req.user._id);
    
        

        const { size } = req.query;
        
        const posts = Post
            .find({ user_id: { $in: following_User_Ids } })
            .sort({ create_post_time: -1 })
            .populate('user_id', 'first_name last_name avatar.url')
            .select('-post_img.publicId');

        if(posts.length === 0){
            return res.status(200).json({
                success: true,
                posts: [],
            });
        }
    
        const apiFeatures = new PostAPIFeatures(posts, req.query)
        
        let allPosts = await apiFeatures.query;
        const totals = allPosts.length;

        const apiFeaturesPagination = new PostAPIFeatures(Post.find(posts), req.query)
            .pagination(size);

        allPosts = await apiFeaturesPagination.query;


        const check_liked = await Post_liked.find({user_id:req.user._id}).select('post_id')
        const check_stored = await Post_stored.find({user_id:req.user._id}).select('post_id')

        const postsAfferCheck = allPosts.map(post => {
            const isLiked = check_liked.some(like => like.post_id.equals(post._id));
            const isStored = check_stored.some(store => {
                  return store.post_id.some(storeId => storeId.equals(post._id));
            });
            return {
                ...post.toObject(),
                liked: isLiked,
                stored: isStored,
            };
        });

        const postsAfferCountLike = await Promise.all(postsAfferCheck.map(async (post) => {
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
            totals,
            posts: postsAfferCountLike,
        });


        
        // const posts = await Post
        //     .find({ user_id: { $in: following_User_Ids } })
        //     .sort({ create_post_time: -1 })
        //     .populate('user_id', 'first_name last_name avatar.url')
        //     .select('-post_img.publicId');

        // if(posts.length === 0){
        //     return res.status(200).json({
        //         success: true,
        //         posts: [],
        //     });
        // }

        // const check_liked = await Post_liked.find({user_id:req.user._id}).select('post_id')
        // const check_stored = await Post_stored.find({user_id:req.user._id}).select('post_id')

        // const postsAfferCheck = posts.map(post => {
        //     const isLiked = check_liked.some(like => like.post_id.equals(post._id));
        //     const isStored = check_stored.some(store => {
        //           return store.post_id.some(storeId => storeId.equals(post._id));
        //     });
        //     return {
        //         ...post.toObject(),
        //         liked: isLiked,
        //         stored: isStored,
        //     };
        // });

        // const postsAfferCountLike = await Promise.all(postsAfferCheck.map(async (post) => {
        //     const post_like = await Post_liked.findOne({ post_id: post._id });
        //     const likes = post_like ? post_like.user_id.length : 0;

        //     //Làm thêm phần count_cmt
        
        //     return {
        //         ...post,
        //         likes,
        //     };
        // }));

        
        // res.status(200).json({
        //     success: true,
        //     posts: postsAfferCountLike,
        // });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2000,
            message: error.message, 
        });
    }
})

//GET /posts/:id
exports.getPost = (async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('user_id', 'first_name last_name avatar.url')
            .select('-post_img.publicId')
            .lean();
        if(!post){
            return res.status(404).json({
                success: false,
                code: 2001,
                message: 'Không tìm thấy bài viết.', 
            });
        }

        const check_liked = await Post_liked.findOne({post_id: req.params.id,user_id:req.user._id})
        const check_stored = await Post_stored.findOne({user_id:req.user._id,post_id: req.params.id})
        
        post.liked = !!check_liked;
        post.stored = !!check_stored;

        const post_like = await Post_liked.findOne({ post_id: post._id });
        post.likes = post_like ? post_like.user_id.length : 0;

        res.status(200).json({
            success: true,
            post,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2002,
            message: error.message ,
        });
    }
})

const validImageFormats = ['jpg', 'jpeg', 'png'];
const maxFileSize = 10 * 1024 * 1024;
//POST /posts/create
exports.create = (async (req, res) => {
    try {
        if (!req.files.post_img || !req.files.post_img.data) {
            return res.status(400).json({
                success: false,
                code: 2003,
                message: 'Đăng bài thất bại. Bài đăng phải có ảnh.',
            });
        }

        const allowedExtensions = validImageFormats.map(format => `.${format}`);
        const fileExtension = path.extname(req.files.post_img.name).toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(400).json({
                success: false,
                code: 2004,
                message: 'Đăng bài thất bại. Định dạng ảnh không hợp lệ. Chỉ chấp nhận .jpg, .jpeg hoặc .png.',
            });
        }

        const fileSize = req.files.post_img.data.length;
        if (fileSize > maxFileSize) {
            return res.status(400).json({
                success: false,
                code: 2005,
                message: 'Đăng bài thất bại. Kích thước ảnh vượt quá giới hạn cho phép (10MB).',
            });
        }
        
        const tempDir = path.join(__dirname, 'temp');
        await fs.mkdir(tempDir, { recursive: true });
        const buffer = req.files.post_img.data;
        const tempFilePath = path.join(tempDir, 'uploadedFile.jpg');
        await fs.writeFile(tempFilePath, buffer);

        const result = await cloudinary.uploader.upload(
            tempFilePath,
            { folder: 'post_imgs'},
        );

        await fs.unlink(tempFilePath);
        await fs.rmdir(tempDir, { recursive: true });

        const post_img = {
            publicId: result.public_id,
            url: result.secure_url,
        };

        const currentDate = new Date();
        const post = await Post.create({
            user_id: req.user._id,
            ...req.body,
            create_post_time: currentDate,
            post_img,
        });

        const content = req.user.first_name + ' ' + req.user.last_name +' vừa mới đăng bài.';

        const noti = await Notification.create({
            user_id: req.user._id,
            noti_content: content,
            post_id: post._id,
            noti_create_time: currentDate
        })

        const follower_Users = await Follow.find({user_id: req.user._id})
            .select('follower_user_id');

        const follower_user_ids = follower_Users
            .map(follow => follow.follower_user_id)
            .flat();

        for (const user_id of follower_user_ids) {
            await Noti_user.findOneAndUpdate(
                { user_id: user_id },
                { $push: { 'detail': { noti_id: noti._id } } },
                { new: true, upsert: true }
            );
        }

        res.status(201).json({
            success: true,
            message: 'Đăng bài thành công.',
            post,
        });
    } catch (error) {
        // console.error('Lỗi:', error);
        res.status(500).json({
            success: false,
            code: 2006,
            message: 'Đăng bài thất bại :' + error.message, 
        });
    }
})

//POST /posts/store/:id
exports.store = (async (req, res) => {
    try {
        const check_post = await Post.findOne({ _id: req.params.id });
        if(!check_post){
            return res.status(404).json({
                success: false,
                code: 2007,
                message: 'Không tìm thấy bài viết.', 
            });
        }

        const following_Users = await Follow.find({ user_id: req.user._id }).select('following_user_id');
        const following_User_Ids = following_Users.map(follow => follow.following_user_id).flat();
        following_User_Ids.push(req.user._id);
        if (!following_User_Ids.some(id => id.equals(check_post.user_id))){
            return res.status(400).json({
                success: false,
                code: 2008,
                message: 'Không thể thao tác. Bài viết này của người mà bạn chưa theo dõi.',
            });
        }

        const stored = await Post_stored.findOneAndUpdate(
            { user_id: req.user._id },
            {},
            { new: true, upsert: true }
        );
        if(stored.post_id.includes(req.params.id)){
            stored.post_id.pull(req.params.id);
            await stored.save();
            res.status(201).json({
                success: true,
                message: 'Bỏ lưu bài viết.',
            });
        } else{
            stored.post_id.push(req.params.id);
            await stored.save();
            res.status(201).json({
                success: true,
                message: 'Lưu bài viết thành công.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2009,
            message: error.message, 
        });
    }
})

//POST /posts/like/:id
exports.like = (async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        if(!post){
            return res.status(404).json({
                success: false,
                code: 2010,
                message: 'Không tìm thấy bài viết.', 
            });
        }

        const following_Users = await Follow.find({ user_id: req.user._id }).select('following_user_id');
        const following_User_Ids = following_Users.map(follow => follow.following_user_id).flat();
        following_User_Ids.push(req.user._id);
        if (!following_User_Ids.some(id => id.equals(post.user_id))){
            return res.status(400).json({
                success: false,
                code: 2011,
                message: 'Không thể thao tác. Bài viết này của người mà bạn chưa theo dõi.',
            });
        }

        const liked = await Post_liked.findOneAndUpdate(
            { post_id: req.params.id },
            {},
            { new: true, upsert: true }
        );
        if(liked.user_id.includes(req.user._id)){
            liked.user_id.pull(req.user._id);
            await liked.save();

            const noti = await Notification.findOneAndDelete({
                user_id: req.user._id,
                post_id: req.params.id,
            })
            if(noti){
                await Noti_user.findOneAndUpdate(
                    { user_id: post.user_id },
                    { $pull: { 'detail': { noti_id: noti._id } } },
                    { new: true, upsert: true }
                );
            }

            const post_like = await Post_liked.findOne({ post_id: post._id });
            const likes = post_like ? post_like.user_id.length : 0;

            res.status(201).json({
                success: true,
                message: 'Bỏ yêu thích.',
                likes
            });
        } else{
            liked.user_id.push(req.user._id);
            await liked.save();

            if(!post.user_id.equals(req.user._id)){
                const currentDate = new Date();
                const content = req.user.first_name + ' ' + req.user.last_name +' yêu thích bài viết của bạn.';

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

            const post_like = await Post_liked.findOne({ post_id: post._id });
            const likes = post_like ? post_like.user_id.length : 0;

            res.status(201).json({
                success: true,
                message: 'Yêu thích bài viết thành công.',
                likes
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2012,
            message: error.message, 
        });
    }
})

//PUT /posts/:id
exports.update = (async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success: false,
                code: 2013,
                message: 'Không tìm thấy bài viết.', 
            });
        }
        if(!post.user_id.equals(req.user._id))
        {
            return res.status(400).json({
                success: false,
                code: 2024,
                message: 'Không thể sửa viết của người khác.',
            });
        }
        if (!req.files.post_img || !req.files.post_img.data) {
            return res.status(400).json({
                success: false,
                code: 2014,
                message: 'Cập nhật thất bại. Chưa có ảnh.',
            });
        }

        const allowedExtensions = validImageFormats.map(format => `.${format}`);
        const fileExtension = path.extname(req.files.post_img.name).toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(400).json({
                success: false,
                code: 2015,
                message: 'Cập nhật thất bại. Định dạng ảnh không hợp lệ. Chỉ chấp nhận .jpg, .jpeg hoặc .png.',
            });
        }

        const fileSize = req.files.post_img.data.length;
        if (fileSize > maxFileSize) {
            return res.status(400).json({
                success: false,
                code: 2016,
                message: 'Cập nhật thất bại. Kích thước ảnh vượt quá giới hạn cho phép (10MB).',
            });
        }

        if(post.post_img.publicId){
            await cloudinary.uploader.destroy(post.post_img.publicId)
        }

        const tempDir = path.join(__dirname, 'temp');
        await fs.mkdir(tempDir, { recursive: true });
        const buffer = req.files.post_img.data;
        const tempFilePath = path.join(tempDir, 'uploadedFile.jpg');
        await fs.writeFile(tempFilePath, buffer);

        const result = await cloudinary.uploader.upload(
            tempFilePath,
            { folder: 'post_imgs'},
        );

        await fs.unlink(tempFilePath);
        await fs.rmdir(tempDir, { recursive: true });

        const post_img = {
            publicId: result.public_id,
            url: result.secure_url,
        };
        const description = req.body.post_description
        await Post.updateOne(
            { _id: req.params.id, user_id: req.user._id },
            { $set: { post_description: description, post_img: post_img } }
        );
        res.status(201).json({
            success: true,
            message: 'Cập nhật bài viết thành công.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2017,
            message: 'Cập nhật bài viết thất bại : ' + error.message, 
        });
    }
})

//DELETE /posts/:id
exports.destroy = (async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success: false,
                code: 2018,
                message: 'Không tìm thấy bài viết.', 
            });
        }
        if(!post.user_id.equals(req.user._id))
        {
            return res.status(400).json({
                success: false,
                code: 2019,
                message: 'Không thể xóa bài viết của người khác.',
            });
        }
        if(post.post_img.publicId){
            await cloudinary.uploader.destroy(post.post_img.publicId)
        }
        await Post.deleteOne({ _id: req.params.id})

        const noti = await Notification.findOneAndDelete({
            user_id: post.user_id,
            post_id: req.params.id
        })
        if(noti){
            const follower_Users = await Follow.find({user_id: req.user._id})
                .select('follower_user_id');

            const follower_user_ids = follower_Users
                .map(follow => follow.follower_user_id)
                .flat();

            for (const user_id of follower_user_ids) {
                await Noti_user.findOneAndUpdate(
                    { user_id: user_id },
                    { $pull: { 'detail': { noti_id: noti._id } } },
                    { new: true, upsert: true }
                );
            }
        }
        
        res.status(200).json({
            success: true,
            message: 'Xóa bài viết thành công.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2020,
            message: 'Xóa bài viết thất bại : ' + error.message ,
        });
    }
})


//GET /posts/admin
exports.adminGetAll = (async (req, res) => {
    try {
        const { size } = req.query;
        const posts = Post.find().select('-post_img.publicId');
        
        const apiFeatures = new PostAPIFeatures(posts, req.query)
        
        let allPosts = await apiFeatures.query;
        const totals = allPosts.length;

        const apiFeaturesPagination = new PostAPIFeatures(Post.find(posts), req.query)
            .pagination(size);

        allPosts = await apiFeaturesPagination.query;
        
        res.status(200).json({
            success: true,
            totals,
            posts: allPosts, 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2021,
            message: error.message ,
        });
    }
})

//DELETE /posts/admin/:id
exports.adminDestroy = (async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success: false,
                code: 2022,
                message: 'Không tìm thấy bài viết.', 
            });
        }
        if(post.post_img.publicId){
            await cloudinary.uploader.destroy(post.post_img.publicId)
        }

        const noti = await Notification.findOneAndDelete({
            user_id: post.user_id,
            post_id: req.params.id
        })
        if(noti){
            const follower_Users = await Follow.find({user_id: req.user._id})
                .select('follower_user_id');

            const follower_user_ids = follower_Users
                .map(follow => follow.follower_user_id)
                .flat();

            for (const user_id of follower_user_ids) {
                await Noti_user.findOneAndUpdate(
                    { user_id: user_id },
                    { $pull: { 'detail': { noti_id: noti._id } } },
                    { new: true, upsert: true }
                );
            }
        }

        await Post.deleteOne({ _id: req.params.id})
        res.status(201).json({
            success: true,
            message: 'Xóa bài viết thành công.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2023,
            message: 'Xóa bài viết thất bại : ' + error.message, 
        });
    }

})