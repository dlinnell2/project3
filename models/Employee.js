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

  clockTimes: [{
    type: String
  }]

},{
    timestamps : true
});


var Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
