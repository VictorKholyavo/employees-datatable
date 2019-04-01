const Sequelize = require('sequelize');
const EmployeesModel = require('./server/models/employees');

const sequelize = new Sequelize('employees', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const Employees = EmployeesModel(sequelize, Sequelize);

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
    Employees
}