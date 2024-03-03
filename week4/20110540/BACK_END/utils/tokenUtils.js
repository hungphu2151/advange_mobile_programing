const jwt = require('jsonwebtoken');
const {nanoid} = require('nanoid');

const RefreshToken = require('../models/RefreshToken')

const sendToken = (user, refreshToken, res) => {
    const token = user.getAccessToken();
    const options = {
        expires: refreshToken.expires,
        httpOnly: true,
        path: '/auth',
        sameSite: 'None',
        secure: true,
    }
    const userData = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        role_id: user.role_id,
        avatar: user.avatar.url,
    };
    res.cookie('refreshToken', refreshToken.token, options).json({
        success: true,
        user: userData,
        token: token
    });
}

const clearToken = (res) => {
    res.clearCookie('refreshToken', {
        path: '/auth',
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    });
}

const getRefreshToken = async (user) => {
    return await RefreshToken.create({
        token: nanoid(),
        expires: new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        user
    });
};

const getNextRefreshToken = async (user, parent) => {
    const tokenObj = { _: nanoid(10), p: parent };
    const token = Buffer.from(JSON.stringify(tokenObj)).toString('base64url');
    await RefreshToken.deleteMany({ parent });
    return await RefreshToken.create({
        token,
        expires: new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        user,
        parent
    });
};

const deleteToken = async (parent) => {
    await RefreshToken.deleteMany({ parent });
    await RefreshToken.findByIdAndDelete({ _id: parent });
}

module.exports = { 
    sendToken,
    clearToken,
    getRefreshToken,
    getNextRefreshToken,
    deleteToken,
}
