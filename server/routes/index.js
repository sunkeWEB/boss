let express = require('express');
let router = express.Router();
let mongoose = require('./../database/database');
let User = require('./../tablemodule/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', (req, res) => {
    User.create({
        user:'孙涛',
        age:22
    },(err,doc)=>{
        if (err) {
            console.log(err);
        }else {
            res.json({
                data:doc
            });
        }
    });
});

router.get('/find', (req, res) => {
    User.find({}, (err, doc) => {
        res.json({
            data:doc
        });
    });
});

router.get('/delete', (req, res) => {
    User.remove({age:21},(err,doc)=>{
        res.json({
            msg:'删除数据成功',
            data:doc
        });
    });
});

router.get('/update',(req,res)=>{
    User.update({user:'孙涛'},{'$set':{age:20}},(err,doc)=>{
        if (err) {
            res.json({
                msg:'修改失败'
            });
        }else{
            res.json({
                msg:'修改成功',
                data:doc
            });
        }
    });
});

module.exports = router;
