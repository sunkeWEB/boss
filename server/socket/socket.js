let app = require('../app');
let server = require('http').Server(app);
let io = require('socket.io')(server);
let socket = io.on('connection', (socket) => {
    console.log('有用户链接');

    socket.on('sendmsg',(data)=>{
        console.log(data);
        io.emit('resvmsg',data)
    })

});
module.exports.socket = socket;
module.exports.server = server;