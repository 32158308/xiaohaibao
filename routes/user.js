var express = require('express');
var router = express.Router();
var https = require('https');
var uuid = require('uuid');

let WXBizDataCrypt = require('../wx/WXBizDataCrypt');
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
router.get('/wxlogin', function(req, response, next){
    console.log(typeof req.headers);
    var wxcode = req.headers['X-WX-CODE'];
    console.log(wxcode);
    // 调用微信接口
    https.get('https://api.weixin.qq.com/sns/jscode2session?appid='+global.appInfo.appId+'&secret='+global.appInfo.appSecret+'&js_code='+req.body.code+'&grant_type=authorization_code',(res)=>{
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                // 获取到的session_key 和 openId 
                console.log(parsedData);
                // 生成UUID当作session的key值
                var uuidStr = uuid.v1();
                req.session.user = {};
                // 将数据存入session
                req.session.user[uuidStr] = '123456';
                // console.log(req.session);
                // console.log(req.session.user);
                // 返回数据
                response.json(uuidStr);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
});

// 测试用，获取session中的user
router.get('/getSessionUser', function(req, res, next){
    console.log('-----------------');
    console.log(req.session.user);
    res.json(req.session.user);
});

// 根据小程序中获取的用户信息，对服务端进行登录
router.post('/login', function(req, res, next){
    // 解密获取unionId
    var sessionKey = null;// 从session中获取session_key
    var encryptedData = req.body.encryptedData; // 从参数中获取encryptedData
    var iv = req.body.iv; // 从参数中获取iv
    var pc = new WXBizDataCrypt(global.appInfo.appId, sessionKey);
    var data = pc.decryptData(encryptedData , iv);
    // 查询该unionId，如果存在则将用户信息存入session
    // 如果不存在，则对unionId进行保存
});

module.exports = router;
