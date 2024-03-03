const moment = require('moment');

const Post = require('../models/Post')
const Story = require('../models/Story')
const Follow = require('../models/Follow')
const Friend = require('../models/Friend')
const User = require('../models/User')

//POST /statistics/admin
exports.getAdminStatistics = (async (req, res) => {
    try {
        const totals_accounts = await User.countDocuments({ role_id: { $ne: 0 } })

        const totals_posts = await Post.countDocuments()

        const today = new Date();
        const start_of_current_day = moment(today).startOf('day').toDate();
        const end_of_current_day = moment(today).endOf('day').toDate();
        const posts_in_current_day = await Post.countDocuments({
            create_post_time: {
              $gte: start_of_current_day,
              $lte: end_of_current_day,
            },
        })

        const start_of_current_week = moment(today).startOf('week').toDate();
        const end_of_current_week = moment(today).endOf('week').toDate();
        const posts_in_current_week = await Post.countDocuments({
            create_post_time: {
              $gte: start_of_current_week,
              $lte: end_of_current_week,
            },
        })

        const start_of_current_month = moment(today).startOf('month').toDate();
        const end_of_current_month = moment(today).endOf('month').toDate();
        const posts_in_current_month = await Post.countDocuments({
            create_post_time: {
              $gte: start_of_current_month,
              $lte: end_of_current_month,
            },
        })

        const month = parseInt(req.body.month);
        const year = parseInt(req.body.year);
        
        const startOfMonth = moment({ year, month: month - 1, day: 1 }).startOf('day').toDate();
        const endOfMonth = moment({ year, month: month - 1, day: 1 }).endOf('month').toDate();

        const daysInMonth = moment(endOfMonth).diff(startOfMonth, 'days') + 1;

        const result = await Post.aggregate([
            {
                $match: {
                    create_post_time: {
                        $gte: startOfMonth,
                        $lte: endOfMonth,
                    },
                },
            },
            {
                $group: {
                    _id: { $dayOfMonth: '$create_post_time' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    day: '$_id',
                    count: 1,
                    _id: 0,
                },
            },
            {
                $sort: { day: 1 },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$count' },
                    post_count_by_day: { $push: '$$ROOT' },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            totals_accounts,
            totals_posts,
            posts_in_current_day,
            posts_in_current_week,
            posts_in_current_month,
            total: result[0]?.total || 0,
            post_count_by_day: result[0]?.post_count_by_day || [],
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            code: 6000,
            message: err.message, 
        });
    }
})

//GET /statistics/:id
exports.getStatistics = (async (req, res) => {
    try {
        const user = await User.findOne({ _id:req.params.id }).select('_id')
        if(!user){
            return res.status(404).json({
                success: false,
                code: 6001,
                message: 'Không tìm thấy người dùng', 
            });
        }

        const count_posts = await Post.countDocuments({ user_id:req.params.id });

        const user_follow = await Follow.findOne({ user_id:req.params.id });
        const count_followers = user_follow ? user_follow.follower_user_id.length : 0;
        const count_followings = user_follow ? user_follow.following_user_id.length : 0;

        const user_friend = await Friend.findOne({ user_id:req.params.id });
        const count_friends = user_friend ? user_friend.friend_id.length : 0;

        res.status(200).json({
            success: true,
            user,
            message: 'Thống kê:',
            count_posts,
            count_followers,
            count_followings,
            count_friends,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 6002,
            message: err.message, 
        });
    }
})