let Sequelize = require('sequelize');
let sequelize = require('./sequelize');

let User = sequelize.define('user', {
    username: {
        type:Sequelize.STRING,
        unique: true,
        validate:{
            notEmpty : true
        }
    },
    password: {
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty : true
        }
    },
    wechat: Sequelize.STRING
},{
    // 创建唯一索引
    indexes:[{
        unique: true,
        fields: ['username']
    }]
});

module.exports = User;