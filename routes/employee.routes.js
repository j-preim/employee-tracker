const router = require('express').Router();

const db = require("../config/connection")


router.get("/", (req, res) => {
  db.query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name as department, role.salary, CONCAT(m.first_name, ' ', m.last_name) as "manager" 
  FROM employee as e
  JOIN role ON e.role_id = role.id 
  JOIN department ON role.department_id = department.id
  LEFT JOIN employee as m
  ON m.id = e.manager_id`, (err, data) => {
    res.json({ status: "success", payload: data })
  })
})

router.get("/:id", (req, res) => {
  db.query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name as department, role.salary, CONCAT(m.first_name, ' ', m.last_name) as "manager" 
  FROM employee as e
  JOIN role ON e.role_id = role.id 
  JOIN department ON role.department_id = department.id
  LEFT JOIN employee as m
  ON m.id = e.manager_id
  WHERE e.id = ?`, req.params.id, (err, data) => {
    res.json({ status: "success", payload: data })
  })
})

router.post("/", (req, res) => {
  db.query(`INSERT INTO customers(name, email) VALUES('${req.body.name}, ${req.body.email})`, req.params.id, (err, data) => {
    res.json({ status: "success", payload: data })
  })
})

router.put("/:id", (req, res) => {
  db.query(`
    UPDATE customers 
    SET name = '${req.body.name}', 
        email = '${req.body.email}' 
    WHERE id = ?
  `, 
  req.params.id, 
  (err, data) => {
    res.json({ status: "success", payload: data })
  })
})

router.delete("/:id", (req, res) => {
  //...
})


module.exports = router;