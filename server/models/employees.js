module.exports = (sequelize, type) => {
    return sequelize.define('employees', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: type.STRING,
        surname: type.STRING,
        salary: type.INTEGER
    });
}