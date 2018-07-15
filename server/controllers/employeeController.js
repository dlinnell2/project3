const db = require("../models");

// Defining methods for the employeeController
module.exports = {
  findAll: function (req, res) {
    db.Employee
      .find({}, null, {sort: {lastName:1}})
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Employee
      .create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Employee
      .deleteOne(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
