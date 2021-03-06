const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");
const recognizer = require("../../recognizer/recognizer")
const clockController = require("../../controllers/clockController");

// Matches with "/api/admin/all"
router.route("/all")
  .get(employeeController.findAll);


//Matches with "/api/admin/add/images"
router.route("/add/images").post((req, res) => {
  req.files.file.mv(`${__dirname}/../../recognizer/addEmpImages/${req.files.file.name}`, function (err) {
    if (err) console.log(err);

    console.log('success');

    res.sendStatus(200);
  })
}),

  // Matches with "/api/admin/add/recognize"
  router.route("/add/recognize")
    .post(recognizer.addNew);

// Matches with "/api/admin/saveRecognizer"
router.route('/saveRecognizer')
  .get(recognizer.saveState);

router.route("/add")
  .post(employeeController.create);

router.route("/pull")
  .post(clockController.pullTimes);

router.route("/delete/employee")
  .post(employeeController.remove);

router.route("/delete/times")
  .post(clockController.remove);


module.exports = router;
