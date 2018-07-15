const router = require("express").Router();
const clockController = require("../../controllers/clockController");
const recognizer = require ("../../recognizer/recognizer")

// Matches with "/employee"
router.route("/")
  .post(clockController.clockIn);

// Matches with "/employee/identify"
router.route("/identify")
    .post(recognizer.identify);

module.exports = router;
