let Sequelize = require('sequelize');
let sequelize = require('./sequelize');
let User = require('./User');
let ActivityType = require('./ActivityType');

let Activity = sequelize.define('activity', {
    // 标题
    title: {
        type:Sequelize.STRING,
        validate:{
            notEmpty : true
        }
    },
    // 海报
    poster: Sequelize.STRING,
    // 活动描述
    description: Sequelize.TEXT,
    // 开始时间
    start: Sequelize.DATE,
    // 结束时间
    end: Sequelize.DATE,
    // 地址
    address: Sequelize.STRING,
    // 浏览次数
    watch: Sequelize.INTEGER
});


User.hasMany(Activity);
ActivityType.hasMany(Activity);

module.exports = Activity;