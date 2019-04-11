const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const EmployeesController = require('./server/controllers/employees');
const { Employees } = require('./sequelize')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "employees"
// });


// app.get('/employees', (req, res) => {
//     let sql = "SELECT * FROM employees";
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         console.log(results);
//         res.json(results)
//     })
// });

// app.get('/adddata', (req, res) => {
//     let sql = "CREATE TABLE posts(id INT AUTO_INCREMENT, title VARCHAR(255), PRIMARY KEY (id))";
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send("Posts table created...")
//     })
// });

// db.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
app.use('/employees', EmployeesController);

app.listen(3015, function () {
    console.log('API app started');
})