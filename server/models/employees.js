const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define("employees", {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: type.STRING,
        surname: type.STRING,
        dateofbirth: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        salary: type.INTEGER
    });
}