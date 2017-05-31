var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


// 不使用通用路由
// 通用路由
// router.route('/api/:service/:method').all(function(req, res, next) {
//     // 获取serviceName和methodName
//     let serviceName = req.params.service;
//     let methodName = req.params.method;

//     // 导入service
//     let Service = require('../services/'+serviceName);
//     let service = Service.getInstance();

//     console.log(req.body);
//     console.log(req.query);
//     // 获取param
//     let param = Object.assign({}, req.body, req.query);

//     // 调用
//     let result = service[methodName](param);

//     // 返回数据
//     res.json(result);

// });


module.exports = router;
