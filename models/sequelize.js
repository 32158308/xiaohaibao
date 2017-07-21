var Sequelize = require('sequelize');
var dbConfig = require('../databaseConfig');

let sequelize = new Sequelize(dbConfig.database,dbConfig.user,dbConfig.password,{
    host : dbConfig.host,
    dialect : 'mysql',
    poll : {
        max : 5,
        min : 0,
        idle : 10000
    },
    define: {
        freezeTableName: true, //默认情况下，sequelize会把王model的名字根据table的名字设置成复数形式，如果你不想要这样的话，就要做这个配置
        underscored: true, //这样设置的话，那么在添加外键的时候，sequelize会自动把外键设置为tableName_key，默认的是tableNameKey，这种驼峰式的命名
        paranoid: true //不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
    }
});

module.exports = sequelize;