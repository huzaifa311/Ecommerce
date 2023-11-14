const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    opt_code : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    isUsed: {
        default: false,
        require: true,
        type: Boolean
    }
});

const otpModel = mongoose.model('otp', schema);

module.exports = otpModel;