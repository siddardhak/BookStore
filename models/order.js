const Sequelize = require('sequelize');

const sequelize = require('../util/databaseConnection');

const order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = order;