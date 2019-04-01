const express = require('express');
const app = express();
const { Employees } = require('../../sequelize')


app.get('/', (req, res) => {
    Employees.findAll().then(employees => res.json(employees))
});
app.get('/add', (req, res) => {
    let user = {firstname: "Victor", surname: "Kholyavo", salary: 123123, dateofbirth: new Date()};
    Employees.create(user)
        .then(user => res.json(user))
})
app.put("/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    
    Employees.update(
        {firstname: req.body.firstname},
        {surname: req.body.surname},
        {salary: req.body.salary},
        {where: {id: req.params.id}}
    )
    .then(function([rowsUpdate, [updatedEmployeer] ]) {
        res.json(updatedEmployeer);
    })
})
// app.get('/', (req, res) => {
//     let sql = "SELECT * FROM employees";
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         console.log(results);
//         res.json(results)
//     })
// });

module.exports = app;