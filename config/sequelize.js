const { Sequelize } = require("sequelize");

module.exports.sequelize = new Sequelize('estimates', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
