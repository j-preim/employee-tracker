const router = require('express').Router();

const db = require("../config/connection")


router.get("/", (req, res) => {
  db.query("SELECT id, name FROM department ORDER BY name ASC", (err, data) => {
    res.json({ status: "success", payload: data })
  })
})

router.get("/:id", (req, res) => {
  db.query("SELECT id, name FROM department WHERE id = ?", req.params.id, (err, data) => {
    res.json({ status: "success", payload: data })
  })
})

router.post("/", (req, res) => {
  db.query(`INSERT INTO department(name) VALUES(${req.body.name})`, (err, data) => {
    res.json({ status: "success", payload: data })
  })
})

router.delete("/:id", (req, res) => {
  //...
})


module.exports = router;