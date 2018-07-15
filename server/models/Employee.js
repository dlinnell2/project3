var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({

  firstName: {
    type: String,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
    required: true,
  },

},{
    timestamps : true
});


var Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
