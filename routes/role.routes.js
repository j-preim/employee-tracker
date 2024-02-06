const router = require('express').Router();

const db = require("../config/connection")


router.get("/", (req, res) => {
  db.query("SELECT role.id, title, department.name as department, salary FROM role JOIN department ON role.department_id = department.id", (err, data) => {
    res.json({ status: "success", payload: data })
  })
})

router.get("/:id", (req, res) => {
  db.query("SELECT role.id, title, department.name as department, salary FROM role JOIN department ON role.department_id = department.id WHERE role.id = ?", req.params.id, (err, data) => {
    res.json({ status: "success", payload: data })
  })
})

router.post("/", (req, res) => {
  db.query(`INSERT INTO role(title, salary, department_id) VALUES(${req.body.title}, ${req.body.salary}, ${req.body.department_id})`, (err, data) => {
    res.json({ status: "success", payload: data })
  })
})

router.delete("/:id", (req, res) => {
  //...
})


module.exports = router;