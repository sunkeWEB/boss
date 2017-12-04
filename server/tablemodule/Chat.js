const mongoose = require('mongoose');

const Chat = new mongoose.Schema({
    chatid: {type: String, require: true, default:''},
    from: {type: String, require: true},
    to: {type: String, require: true},
    read: {type: Boolean, default: false},
    content: {type: String, require: true, default: ''},
    create_time: {type: Number, default: new Date().getTime()}
});

module.exports = mongoose.model('chats', Chat);