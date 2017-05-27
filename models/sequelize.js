let sequelize = new Sequelize('xiaohaibao','root','123456',{
    host : '192.168.0.201',
    dialect : 'mysql',
    poll : {
        max : 5,
        min : 0,
        idle : 10000
    }
});

module.exports = sequelize;