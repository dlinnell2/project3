const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");
const recognizer = require("../../recognizer/recognizer")

// Matches with "/api/admin/all"
router.route("/all")
  .get(employeeController.findAll);

//Matches with "/api/admin/add/images"
router.route("/add/images").post((req, res) =>{
  req.files.file.mv(`${__dirname}/../../recognizer/addEmpImages/${req.files.file.name}`, function(err){
      if (err) console.log(err);

      console.log('success');

      res.json({fileName:req.files.file.name});
  });
});

// Matches with "/api/admin/add/recognize"
router.route("/add/recognize")
  .get(recognizer.addNew);

// Matches with "/api/admin/add"
router.route("/add")
  .get(employeeController.create);

router.route("/delete/:user")
  .get(employeeController.remove);

module.exports = router;
