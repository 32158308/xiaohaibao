let Sequelize = require('sequelize');
let sequelize = require('./sequelize');

let User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    wechat: Sequelize.STRING
},{
    // 创建唯一索引
    indexes:[{
        unique: true,
        fields: ['wechat']
    }]
});

module.exports = User;