const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'XXXXXX', { dialect: 'mysql', host: 'localhost' })


module.exports = sequelize;