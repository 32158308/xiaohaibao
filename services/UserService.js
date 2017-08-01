let User = require('../models/user');

class UserService{

    // 单例模式
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    register(user){
        User.findOrCreate({
            where: {username: user.username}, 
            defaults: {password: '123456'}
        }).spread(function(user, created) {
            console.log(user.get({plain: true}));
            console.log(created);
        });

    }

    findOrCreateByOpenId(openid, next){
        User.findOrCreate({
            where: {wechat: openid}
        }).spread(function(user, created) {
            // 将用户实例返回给router
            next(user.get({plain: true}));
        });
    }

}

module.exports = UserService;