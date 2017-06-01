let Sequelize = require('sequelize');
let sequelize = require('./sequelize');

let ActivityType = sequelize.define('activityType', {
    // 类型名称
    name: {
        type:Sequelize.STRING,
        validate:{
            notEmpty : true
        }
    },
    // 类型描述
    description: Sequelize.STRING
},{
    tableName: 'activity_type'
});


module.exports = ActivityType;