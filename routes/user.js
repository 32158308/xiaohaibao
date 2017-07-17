var express = require('express');
var router = express.Router();
var https = require('https');

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

// 根据小程序的登录凭证（code），获取session_key
router.post('/login', function(req, response, next){
    // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    https.get('https://api.weixin.qq.com/sns/jscode2session?appid='+global.appInfo.appID+'&secret='+global.appInfo.appSecret+'&js_code='+req.body.code+'&grant_type=authorization_code',(res)=>{
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
                // 返回数据
                res.json('登录成功');
            } catch (e) {
                console.error(e.message);
            }
        });
    });
});

module.exports = router;
