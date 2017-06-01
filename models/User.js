let Sequelize = require('sequelize');
let sequelize = require('./sequelize');

let User = sequelize.define('user', {
    username: {
        type:Sequelize.STRING,
        validate:{
            notEmpty : true
        }
    },
    password: {
        type:Sequelize.STRING,
        validate:{
            notEmpty : true
        }
    },
    wechat: Sequelize.STRING
});

module.exports = User;