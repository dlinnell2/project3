const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");
const recognizer = require ("../../recognizer/recognizer")

// Matches with "/employee"
router.route("/")
  .post(employeeController.clockIn);

// Matches with "/employee/identify"
router.route("/identify")
    .post(recognizer.identify);

module.exports = router;
