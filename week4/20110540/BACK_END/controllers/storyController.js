const Story = require('../models/Story')
const Story_like = require('../models/Story_like')
const Follow = require('../models/Follow')

//GET /stories
exports.getAll = (async (req, res) => {
    try {
        const following_Users = await Follow.find({ user_id: req.user._id }).select('following_user_id');
        const following_User_Ids = following_Users.map(follow => follow.following_user_id).flat();
        following_User_Ids.push(req.user._id);

        const stories = await Story
            .find({ user_id: { $in: following_User_Ids } })
            .populate('user_id', 'first_name last_name avatar.url')
            .select('-story_content.publicId -__v')
            .sort({ create_story_time: -1 })
        if(stories.length === 0){
            return res.status(200).json({
                success: true,
                stories: [],
            });
        }

        const check_liked = await Story_like.find({user_id:req.user._id}).select('story_id')

        const storiesAfferCheck = stories.map(story => {
            const isLiked = check_liked.some(like => like.story_id.equals(story._id));
            return {
                ...story.toObject(),
                liked: isLiked,
            };
        });

        res.status(200).json({
            success: true,
            stories: storiesAfferCheck,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 7000,
            message: err,
        });
    }
})

//GET /stories/:id
exports.getStory = (async (req, res) => {
    try {
        const check_story = await Story.findOne({ _id: req.params.id });
        if(!check_story){
            return res.status(404).json({
                success: false,
                code: 7001,
                message: 'Không tìm thấy story.', 
            });
        }
        const story = await Story.findById(req.params.id).populate('user_id', 'first_name last_name avatar.url').select('-story_content.publicId -__v');
        res.status(200).json({
            success: true,
            story
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 7002,
            message: err.message 
        });
    }
})

//POST /story/like/:id
exports.like = (async (req, res) => {
    try {
        const story = await Story.findOne({_id: req.params.id});
        if(!story){
            return res.status(404).json({
                success: false,
                code: 7003,
                message: 'Không tìm thấy story.' ,
            });
        }

        const following_Users = await Follow.find({ user_id: req.user._id }).select('following_user_id');
        const following_User_Ids = following_Users.map(follow => follow.following_user_id).flat();
        following_User_Ids.push(req.user._id);
        if (!following_User_Ids.some(id => id.equals(story.user_id))){
            return res.status(400).json({
                success: false,
                code: 7004,
                message: 'Không thể thao tác. Story này của người mà bạn chưa theo dõi.',
            });
        }

        const liked = await Story_like.findOneAndUpdate(
            { story_id: req.params.id },
            {},
            { new: true, upsert: true }
        );
        if(liked.user_id.includes(req.user._id)){
            //console.log(user)
            liked.user_id.pull(req.user._id);
            await liked.save();
            res.status(201).json({
                success: true,
                message: 'Bỏ yêu thích.',
            });
        } else{
            liked.user_id.push(req.user._id);
            await liked.save();
            res.status(201).json({
                success: true,
                message: 'Yêu thích story thành công.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 7005,
            message: error.message 
        });
    }
})

const allowedFormats = /^(data:image\/jpeg|data:image\/jpg|data:image\/png);base64,/i;

//POST /stories/create
exports.create = (async (req, res) => {
    try {
        if(req.body.story_content==null){
            res.status(400).json({
                success: false,
                code: 7006,
                message: 'Đăng story thất bại. Story phải có ảnh.',
            });
        }
        const currentDate = new Date();
        const fileFormatMatch = req.body.story_content.match(allowedFormats);
        
        if (!fileFormatMatch) {
            return res.status(400).json({
                success: false,
                code: 7007,
                message: 'Định dạng ảnh không hợp lệ. Chỉ chấp nhận định dạng .jpg, .jpeg hoặc .png.',
            });
        }

        const result = await cloudinary.uploader.upload(req.body.story_content);
        story_content = {
            publicId: result.public_id,
            url: result.secure_url,
        }

        const story = await Story.create({ user_id:req.user._id , ...req.body, create_story_time: currentDate, story_content});
        res.status(201).json({
            success: true,
            message: 'Đăng story thành công.',
            story
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 7005,
            message: 'Đăng story thất bại :' + error,  
        });
    }
})

//PUT /stories/:id
exports.update = (async (req, res) => {
    try {
        const story = await Story.findById({_id: req.params.id});
        if(!story){
            res.status(400).json({
                success: false,
                code: 7009,
                message: 'Story không tồn tại.' ,
            });
        }
        await Story.findByIdAndUpdate({_id: req.params.id}, {user_id:req.user._id, ...req.body});
        res.status(200).json({
            success: true,
            message: 'Cập nhật story thành công.',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 7010,
            message: err.message 
        });
    }
})

//DELETE /stories/:id
exports.destroy = (async (req, res) => {
    try {
        const story = await Story.findById({_id: req.params.id});
        if(!story){
            res.status(400).json({
                success: false,
                code: 7011,
                message: 'Story không tồn tại.' ,
            });
        }
        if(!story.user_id.equals(req.user._id))
        {
            return res.status(400).json({
                success: false,
                code: 7012,
                message: 'Không thể xóa story của người khác.',
            });
        }
        // await Story.deleteOne({_id: req.params.id});
        res.status(201).json({
            success: true,
            message: 'Xóa story thành công.',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 7013,
            message: err.message 
        });
    }
})