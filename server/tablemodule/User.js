const mongoose = require('mongoose');

const User = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    pwd: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    //个人简历或者职位介绍
    desc: {
        type: String
    },
    // 职位
    title: {
        type: String,
    },
//    boss  多了两个字段
    company: {
        type: String
    },
    money: {
        type: String
    }
});

module.exports = mongoose.model('users', User);