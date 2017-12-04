const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/boss';

// 链接mongoose
mongoose.connect(DB_URL);

//ok
mongoose.connection.on('connected', () => {
    console.log("MongoDB StartServer ok");
});

//error
mongoose.connection.on('error', (err) => {
    console.log(`MongoDB StartServer error:${err}`);
});

//stop
mongoose.connection.on('disconnected', () => {
    console.log("MongoDB Server stop");
});

module.exports = mongoose;