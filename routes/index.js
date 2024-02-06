// This file acts as a gatekeeper for all routes

const router = require('express').Router();
const departmentRoutes = require("./department.routes");
const roleRoutes = require("./role.routes");
const employeeRoutes = require("./employee.routes");

router.use("/departments", departmentRoutes);
router.use("/roles", roleRoutes);
router.use("/employees", employeeRoutes);


module.exports = router;