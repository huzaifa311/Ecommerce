const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    full_name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    isVerify: {
        default: false,
        require: true,
        type: Boolean
    }
});

const userModel = mongoose.model('user', schema);

module.exports = userModel;