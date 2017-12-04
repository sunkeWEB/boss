// let {server} = require('./../../socket/socket');
let express = require('express');
let utils = require('utility'); // 加密密码
let router = express.Router();
let mongoose = require('./../../database/database');
let User = require('./../../tablemodule/User');
let Chat = require('./../../tablemodule/Chat');
let socket = require('./../../socket/socket');

// var {server} = require('./../../socket/socket');
// let io = require('./../../socket/socket');
// console.log(server);
//socket.io 操作
// io 是一个全局链接  socket 当前用户
// io.on('connection', (socket) => {
//     console.log('有用户链接');
//
//     socket.on('sendmsg',(data)=>{
//         console.log(data);
//         io.emit('resvmsg',data)
//     })
//
// });

router.get('/list',(req,res)=>{
    const { type } = req.query;
    User.find({type:type},(err,doc)=>{
        if (err) {
            return res.json({
                code:1,
                msg:'系统错误 查询失败'
            });
        }
        // let [{pwd, ...data}] = doc.data;
        return res.json({
            code:0,
            msg:"查询成功",
            data:doc
        });
    })

});

router.get('/info', (req, res) => {
    const {userid} = req.cookies;
    if (!userid) {
       return res.json({
            code: 1,
           msg:'用户未登录'
        });
    }
    User.findOne({_id:userid},{pwd:0,__v:0},(err,doc)=>{
        if (err) {
            return res.json({
                code:1,
                msg:'系统错误 未找到id'
            });
        }
        if (doc) {
            return res.json({
                code:0,
                msg:'登录信息获取到',
                data:doc
            });
        }
    });
});

router.post('/resigter', (req, res) => {
    let {user, pwd, type} = req.body;
    let createObj = {
        user: user,
        pwd: md5Pwd(pwd),
        type: type
    };
    User.findOne({user: user}, (err, doc) => {
        if (doc) {
            return res.json({
                code: 1,
                msg: '该账号已经注册'
            });
        }
        // User.create(createObj, (err, doc) => {
        //     if (err) {
        //         return res.json({
        //             code: 1,
        //             msg: '注册失败'
        //         });
        //     }
        //     res.cookie('userid', doc._id, {
        //         expires: new Date(Date.now() + 900000),
        //         path:'/'
        //     });
        //     return res.json({
        //         code: 0,
        //         msg: '注册成功'
        //     });
        // });

    //  create 无法返回添加的id  只能用save
        const userModl = new User(createObj);
        userModl.save((err,doc)=>{
            if (err) {
                return res.json({
                    code:1,
                    msg:'系统错误 注册失败'
                });
            }
            const {user,_id,type} = doc;
            res.cookie('userid',_id);
            return res.json({
                code:0,
                msg:'注冊成功',
                data:{user,_id,type}
            });

        });

    })
});

router.post('/login', (req, res) => {
    let {user, pwd} = req.body;
    let loginDate = {
        user:user,
        pwd:md5Pwd(pwd)
    };
    User.findOne(loginDate,{pwd:0,__v:0}, (err, doc) => {
      if (err) {
          return res.json({
              code:1,
              msg:'系统错误 登录失败',
          });
      }
        if (!doc) {
            return res.json({
                code:1,
                msg:'用户名或者密码错误'
            });
        }
        res.cookie('userid',doc._id);
        return res.json({
            code:0,
            msg:'登录成功',
            data:doc
        });
    });
});

router.post('/update',(req,res)=>{
    const userid = req.cookies.userid;
    if (!userid) {
        return res.json({code:1,msg:'没有找到登录信息'});
    }
    const body = req.body;
    User.findByIdAndUpdate(userid,body,(err,doc)=>{
        if (err) {
            return res.json({
                code:1,
                msg:'系统错误 修改失败'
            });
        }
        console.log(doc);
        const {user, type,avatar} = doc;
        return res.json({code:0,data:{user, type,avatar}});
    })
});

router.get('/getmsglist', (req, res) => {
    let user = req.cookies.user;
    Chat.find({}, (err, doc) => {
        if (err) {
            return res.json({
                code:1,
                msg:'系统错误 获取失败'
            });
        }
        return res.json({
            code:0,
            msgs:doc
        });
    });
});

function md5Pwd(pwd) {
    let salt = "@`+=&%.397633183__=";
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = router;