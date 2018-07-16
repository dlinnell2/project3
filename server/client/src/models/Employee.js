var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({

  firstName: {
    type: String,
    trim: true,
    required: true
  },

  lastName: {
    type: String,
    required: true,
    unique:true
  },

  clockTimes: [{
    type: String,
    unique: true
  }]

},{
    timestamps : true
});


var Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
