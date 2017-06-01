let User = require('../models/user');

class UserService{

    // 单例模式
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    login(){
        return param;
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

    modify(){

    }

}

module.exports = UserService;