let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let users = require('./routes/user/user');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
//socket.io 操作
// io 是一个全局链接  socket 当前用户
io.on('connection', (socket) => {
    console.log('有用户链接');

    socket.on('sendmsg',(data)=>{
        console.log(data);
        io.emit('resvmsg',data)
    })

});



app.use('/users', users);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

server.listen(3030,()=>{
    console.log('Node Server Start');
});
