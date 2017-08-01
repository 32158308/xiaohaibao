var express = require('express');
var router = express.Router();
var https = require('https');
var uuid = require('uuid');
// 小程序加密解密包
// var WXBizDataCrypt = require('../wx/WXBizDataCrypt');
var wxConfig = require('../wxConfig');
var userService = require('../services/UserService').getInstance();

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
router.get('/wxlogin', function(req, response, next){
    // 获取参数
    var wxCode = req.query.wxCode;
    var wxEncryptedData = req.query.wxEncryptedData;
    var wxIv = req.query.wxIv;
    // 调用微信接口
    https.get('https://api.weixin.qq.com/sns/jscode2session?appid='+wxConfig.appId+'&secret='+wxConfig.appSecret+'&js_code='+wxCode+'&grant_type=authorization_code',(res)=>{
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                console.log(rawData)
                const parsedData = JSON.parse(rawData);
                // 获取到的session_key 和 openId 
                console.log(parsedData);
                // 调用service获取
                userService.findOrCreateByOpenId(parsedData.openid, function(user){
                    req.session.user = user;
                    req.session.save();
                    response.json('success');
                });
            } catch (e) {
                console.error(e.message);
            }
        });
    });
});

// 测试用，获取session中的user
router.get('/getSessionUser', function(req, res, next){
    if(!req.session.user){
        res.json({checkLogin:false});
    }
    console.log(req.session.user);
    res.send(req.session.user);
});

module.exports = router;
