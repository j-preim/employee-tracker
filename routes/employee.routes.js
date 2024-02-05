const router = require('express').Router();

const db = require("../config/connection")


router.get("/", (req, res) => {
  db.query("SELECT * FROM customers", (err, data) => {
    res.json({ status: "success", payload: data })
  })
})

router.get("/:id", (req, res) => {
  db.query("SELECT * FROM customers WHERE id = ?", req.params.id, (err, data) => {
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