var express = require('express');
var router = express.Router();

let User = require('../models/user');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// 注册
router.post('/register', function(req, res, next){
    // 执行创建用户
    User.findOrCreate({
        where: {username: req.body.username}, 
        defaults: {password:req.body.password}
    }).spread(function(user, created) {

        if(!created){
            return '该用户名已经存在';
        }else{
            return '创建成功';
        }

    }).then(function(data){

        res.json({success:true,msg:data});

    }).catch(function(e){

        res.json({success:false,error:e});

    });
    
});

module.exports = router;
