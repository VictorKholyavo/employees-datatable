const express = require("express");
const app = express();
const { Employees } = require("../../sequelize")


app.get("/", async (req, res) => {
	let orderDirection = "";
	let orderColumn = "";
	if (req.query.sort) {
		orderColumn = Object.keys(req.query.sort)[0];
	}
	for (const key in req.query.sort) {
		if (req.query.sort.hasOwnProperty(key)) {
			orderDirection = req.query.sort[key];
		}
	}
	let sortColumn = req.query.sort ? [orderColumn, orderDirection] : ['id', 'ASC'];
    let data = [];
    if (req.query.start && req.query.count) {
        data = await Employees.findAll({order: [sortColumn], offset: +req.query.start, limit: +req.query.count});
    }
	Employees.count().then(function (count) {
        res.json({"pos": +req.query.start, "data": data, "total_count": +count})
    })
});
app.post("/", (req, res) => {
	let employee = req.body;
	Employees.create(employee)
		.then(employee => res.json(employee))
});

app.put("/:id", (req, res) => {
	let values = {
		firstname: req.body.firstname,
		surname: req.body.surname,
		dateofbirth: req.body.dateofbirth,
		salary: req.body.salary,
	};
	let options = {
		where: { id: req.body.id }
	};
	Employees.update(values, options)
		.then(function (rowsUpdate, [updatedEmployeer]) {
			return res.json(updatedEmployeer);
		});
});

app.delete("/:id", (req, res) => {
	Employees.destroy({ where: { id: req.body.id } })
		.then(function () {
			return res.send(req.body.id);
		});
});
// app.get('/', (req, res) => {
//     let sql = "SELECT * FROM employees";
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         console.log(results);
//         res.json(results)
//     })
// });

module.exports = app;