let sequelize = require('./sequelize');

let Test = sequelize.define('test',{
    firstName : {
        type : Sequelize.STRING,
        field : 'first_name'
    }
});

Test.sync({force:true}).then(function(){
    // 已创建数据表
    return Test.create({
        firstName : 'Join'
    });
});