const Addfriend = require('../models/Addfriend')
const Follow = require('../models/Follow');
const Friend = require('../models/Friend');
const User = require('../models/User');
const Notification = require('../models/Notification');
const Noti_user = require('../models/Noti_user');

//POST /interacts/follow/:id
exports.follow = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                code: 5000,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const check_user = await User.findOne({ _id: req.params.id });
        if(!check_user){
            return res.status(404).json({
                success: false,
                code: 5001,
                message: 'Không tìm thấy người dùng.', 
            });
        }
        const user = await Follow.findOneAndUpdate(
            { user_id: req.user._id }, 
            {},
            { new: true, upsert: true }
        );
        const user_following = await Follow.findOneAndUpdate(
            { user_id: req.params.id },
            {},
            { new: true, upsert: true }
        );
        if (user.following_user_id.includes(req.params.id)){
            user.following_user_id.pull(req.params.id);
            await user.save();
            user_following.follower_user_id.pull(req.user._id);
            await user_following.save();
            return res.status(201).json({
                success: true,
                message: 'Unfollow thành công.',
            });
        } else{
            user.following_user_id.push(req.params.id);
            await user.save();
            user_following.follower_user_id.push(req.user._id);
            await user_following.save();
            return res.status(201).json({
                success: true,
                message: 'Follow thành công.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 5002,
            message:'Thao tác thất bại :' + error.message, 
        });
    }
})

//POST /interacts/addfriend/:id
exports.addfriend = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                code: 5003,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const check_user = await User.findOne({ _id: req.params.id });
        if(!check_user){
            return res.status(404).json({
                success: false,
                code: 5004,
                message: 'Không tìm thấy người dùng.', 
            });
        }
        const check_friend = await Friend.findOne({
            user_id: req.user._id,
            friend_id: req.params.id,
        })
        if(check_friend){
            return res.status(400).json({
                success: false,
                code: 5005,
                message: 'Không thể gửi lời mời. Các bạn đã là bạn bè.', 
            });
        }
        const check_friend_request = await Addfriend.findOne({
            user_id: req.params.id,
            add_user_id: req.user._id
        })
        if(check_friend_request){
            return res.status(400).json({
                success: false,
                code: 5006,
                message: 'Người này đã gửi lời mời cho bạn. Chỉ có thể chấp nhận hoặc từ chối.', 
            });
        }
        const user = await Addfriend.findOneAndUpdate(
                { user_id: req.user._id },
                {},
                { new: true, upsert: true }
            )
            .populate('user_id', 'first_name last_name');

        const first_name = user.user_id.first_name;
        const last_name = user.user_id.last_name;
        
        if(user.add_user_id.includes(req.params.id)){
            user.add_user_id.pull(req.params.id);
            await user.save();

            const noti = await Notification.findOneAndDelete({
                user_id: req.user._id,
                add_user_id: req.params.id,
            })
            if(noti){
                await Noti_user.findOneAndUpdate(
                    { user_id: req.params.id },
                    { $pull: { 'detail': { noti_id: noti._id } } },
                    { new: true, upsert: true }
                );
            }

            return res.status(201).json({
                success: true,
                message: 'Hủy lời mời thành công.',
            });
        } else{
            user.add_user_id.push(req.params.id);
            await user.save();

            const currentDate = new Date();
            const content = first_name + ' ' + last_name +' đã gửi lời mời kết bạn.';
            const noti = await Notification.create({
                user_id: req.user._id,
                noti_content: content,
                add_user_id: req.params.id,
                noti_create_time: currentDate
            })

            await Noti_user.findOneAndUpdate(
                { user_id: req.params.id },
                { $push: { 'detail': { noti_id: noti._id } } },
                { new: true, upsert: true }
            );

            return res.status(201).json({
                success: true,
                message: 'Gửi lời mời thành công.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 5007,
            message:'Thao tác thất bại :' + error.message,
        });
    }
})

//POST /interacts/accept/:id
exports.accept = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                code: 5008,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const check_user = await User.findOne({ _id: req.params.id });
        if(!check_user){
            return res.status(404).json({
                success: false,
                code: 5009,
                message: 'Không tìm thấy người dùng.', 
            });
        }
        const request = await Addfriend.findOne({
            user_id: req.params.id,
            // add_user_id: { $in: [req.user._id] }
            add_user_id: req.user._id,
        });
        if(!request){
            return res.status(404).json({
                success: false,
                code: 5010,
                message: 'Thao tác thất bại. Không có lời mời kết bạn từ người này.', 
            });
        }

        const user_in_Follow = await Follow.findOneAndUpdate(
            { user_id: req.user._id }, 
            {},
            { new: true, upsert: true }
        );
        const friend_in_Follow = await Follow.findOneAndUpdate(
            { user_id: req.params.id },
            {},
            { new: true, upsert: true }
        );
        if (!user_in_Follow.following_user_id.includes(req.params.id)){
            user_in_Follow.following_user_id.push(req.params.id);
            await user_in_Follow.save();
            friend_in_Follow.follower_user_id.push(req.user._id);
            await friend_in_Follow.save();
        }
        if (!friend_in_Follow.following_user_id.includes(req.user._id)){
            friend_in_Follow.following_user_id.push(req.user._id);
            await friend_in_Follow.save();
            user_in_Follow.follower_user_id.push(req.params.id);
            await user_in_Follow.save();
        }

        request.add_user_id.pull(req.user._id);
        await request.save();

        const user = await Friend.findOneAndUpdate(
            { user_id: req.user._id },
            {},
            { new: true, upsert: true }
        );
        user.friend_id.push(req.params.id);
        await user.save();

        const friend = await Friend.findOneAndUpdate(
            { user_id: req.params.id },
            {},
            { new: true, upsert: true }
        );
        friend.friend_id.push(req.user._id);
        await friend.save();

        res.status(201).json({
            success: true,
            message: 'Chấp nhận kết bạn.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 5011,
            message:'Thao tác thất bại :' + error.message,
        });
    }
})

//POST /interacts/refuse/:id
exports.refuse = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                code: 5012,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const check_user = await User.findOne({ _id: req.params.id });
        if(!check_user){
            return res.status(404).json({
                success: false,
                code: 5013,
                message: 'Không tìm thấy người dùng.', 
            });
        }
        const request = await Addfriend.findOne({
            user_id: req.params.id,
            add_user_id: { $in: [req.user._id] }
        });
        if(!request){
            return res.status(404).json({
                success: false,
                code: 5014,
                message: 'Thao tác thất bại. Không có lời mời kết bạn từ người này.', 
            });
        }
        request.add_user_id.pull(req.user._id);
        await request.save();
        res.status(201).json({
            success: true,
            message: 'Từ chối kết bạn.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 5015,
            message:'Thao tác thất bại :' + error.message,
        });
    }
})

//POST /interacts/unfriend/:id
exports.unfriend = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                code: 5016,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const check_user = await User.findOne({ _id: req.params.id });
        if(!check_user){
            return res.status(404).json({
                success: false,
                code: 5017,
                message: 'Không tìm thấy người dùng.', 
            });
        }

        const check_friend = await Friend.findOne({
            user_id: req.user._id,
            friend_id: req.params.id
        })
        if(!check_friend){
            return res.status(400).json({
                success: false,
                code: 5018,
                message: 'Không thể hủy kết bạn. Các bạn không phải là bạn bè', 
            });
        }

        const user_in_Friend = await Friend.findOne({
            user_id: req.user._id
        }) 
        user_in_Friend.friend_id.pull(req.params.id)
        user_in_Friend.save()
        const friend_in_Friend = await Friend.findOne({
            user_id: req.params.id
        }) 
        friend_in_Friend.friend_id.pull(req.user._id)
        friend_in_Friend.save()

        const user_in_Follow = await Follow.findOne({
            user_id: req.user._id
        }) 
        user_in_Follow.following_user_id.pull(req.params.id)
        user_in_Follow.follower_user_id.pull(req.params.id)
        user_in_Follow.save()
        const friend_in_Follow = await Follow.findOne({
            user_id: req.params.id
        }) 
        friend_in_Follow.follower_user_id.pull(req.user._id)
        friend_in_Follow.following_user_id.pull(req.user._id)
        friend_in_Follow.save()

        res.status(201).json({
            success: true,
            message: 'Hủy kết bạn thành công.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 5019,
            message: error.message, 
        });
    }
})

//POST /interacts/block/:id
exports.block = (async (req, res) => {
    res.send('Hello World!')
})
