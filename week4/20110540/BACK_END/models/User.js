const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const { generateOTP } = require("../utils/authUtils.js");

const User = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  pass_word: {
    type: String,
    required: true,
  },
  birth_day: {
    type: Date,
  },
  gender: {
    type: String,
  },
  gmail: {
    type: String,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  role_id: {
    type: Number,
    default: 1,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  avatar: {
    publicId: {
      type: String,
    },
    url: {
      type: String,
      default:
        "https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-50-hinh-anh-dai-dien-facebook-mac-dinh-dep-doc-la_17.jpg",
    },
  },
  forgotPassword: {
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
  },
  resetPasswordToken: {
    token: {
      type: String,
    },
    TokenExpiresAt: {
      type: Date,
    },
  },
});

User.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.pass_word);
};

User.methods.getAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: "5m",
  });
};

User.methods.generateForgotPasswordOtp = async function () {
  const otp = generateOTP(6);
  this.forgotPassword.otp = otp;
  this.forgotPassword.otpExpiresAt =
    Date.now() + process.env.OTP_EXPIRATION_TIME_IN_SECONDS * 1000;
  await this.save();
  return otp;
};

User.methods.generateResetPasswordToken = async function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to resetPasswordToken.token
  this.resetPasswordToken.token = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordToken.TokenExpiresAt =
    Date.now() +
    process.env.RESET_PASSWORD_TOKEN_EXPIRATION_TIME_IN_MINUTES * 60 * 1000;
  await this.save();

  return resetToken;
};

module.exports = mongoose.model("User", User);
