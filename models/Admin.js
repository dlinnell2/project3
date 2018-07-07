var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AdminSchema = new Schema({

  userName: {
    type: String,
    trim: true,
    required: true
  },

  password: {
    type: String,
    trim: true,
    required: true
  },

},{
    timestamps : true
});


var Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
