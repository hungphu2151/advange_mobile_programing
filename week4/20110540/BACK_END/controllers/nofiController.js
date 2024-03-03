const moment = require('moment');

const Post = require('../models/Post')
const Story = require('../models/Story')
const Follow = require('../models/Follow')
const Friend = require('../models/Friend')
const User = require('../models/User');
const Noti_user = require('../models/Noti_user');

//GET /me/notis
exports.getNotis = (async (req, res) => {
    try {
        const notis = await Noti_user.findOne({ user_id: req.user._id }).populate({
                path: 'detail.noti_id',
                select: 'noti_content post_id user_id noti_create_time',
                populate: {
                    path: 'user_id',
                    model: 'User',
                    select: 'avatar.url first_name last_name',
                },
            })
            .select('-_id detail').lean().exec()
        if(!notis){
            return res.status(200).json({
                success: true,
                notis: []
            });
        }
        const notis_filter = notis.detail.map(item => ({
            _id: item.noti_id._id,
            user_id: item.noti_id.user_id._id,
            first_name: item.noti_id.user_id.first_name,
            last_name: item.noti_id.user_id.last_name,
            avatar: item.noti_id.user_id.avatar,
            noti_content: item.noti_id.noti_content,
            post_id: item.noti_id.post_id,
            read: item.read,
            noti_create_time: item.noti_id.noti_create_time
        }));
        res.status(200).json({
            success: true,
            notis: notis_filter
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 9000,
            message: error.message, 
        });
    }
})

//POST /me/notis/read/:id
exports.readNoti = (async (req, res) => {
    try {
        const noti = await Noti_user.findOne({
                user_id: req.user._id,
                "detail.noti_id": req.params.id,
            })
        if(!noti){
            return res.status(404).json({
                success: false,
                code: 9001,
                message: 'Không tìm thấy thông báo.', 
            });
        }
        if(!noti.user_id.equals(req.user._id)){
            return res.status(404).json({
                success: false,
                code: 9002,
                message: 'Thao tác thất bại. Đây không phải là thông báo của bạn.', 
            });
        }
        const vi_tri_thong_bao = noti.detail.findIndex(thongBao => thongBao.noti_id.equals(req.params.id));

        if (vi_tri_thong_bao !== -1) {
            if(noti.detail[vi_tri_thong_bao].read){
                return res.status(400).json({
                    success: false,
                    code: 9003,
                    message: 'Bạn đã đọc thông báo này.',
                });
            }
            noti.detail[vi_tri_thong_bao].read = true;
            await noti.save();
        }
        const status = noti.detail[vi_tri_thong_bao].read
        res.status(200).json({
            success: true,
            message: 'Đọc thông báo thành công.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 9004,
            message: 'Thao tác thất bại: '+error.message, 
        });
    }
})