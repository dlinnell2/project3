const router = require("express").Router();
const adminRoutes = require("./admin");
const employeeRoutes = require("./employee");
const path = require("path");

// Admin routes
router.use("/admin", adminRoutes);
router.use("/employee", employeeRoutes);

router.route('/hello').get(((req, res) => {
    res.send({ express: 'Hello From Express' });
  }));

module.exports = router;
