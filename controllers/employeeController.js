const db = require("../models");

// Defining methods for the employeeController
module.exports = {
  findAll: function (req, res) {
    db.Employee
      .find({})
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {

    console.log(req.body);
    db.Employee
      .create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Employee
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  clockIn: function (req, res) {
    db.Employee
      .find
  }
};
