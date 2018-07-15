const router = require("express").Router();
const adminRoutes = require("./admin");
const employeeRoutes = require("./employee");
const path = require("path");

// Admin routes
router.use("/admin", adminRoutes);
router.use("/employee", employeeRoutes);

module.exports = router;
