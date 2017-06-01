let Sequelize = require('sequelize');
let sequelize = require('./models/sequelize');

var Project = sequelize.define('project', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    firstName : {type:Sequelize.STRING, field:'first_name'}
});

Project.belongsTo(ActivityType);

Project.sync({force: true});