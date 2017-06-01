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
        User.findOrCreate();
    }

    modifyPassword(){
        
    }

}

module.exports = UserService;