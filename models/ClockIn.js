var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ClockInSchema = new Schema({

  name: {
      type: String,
      required: true
  }

},{
    timestamps : true
});


var ClockIn = mongoose.model("ClockIn", ClockInSchema);

module.exports = ClockIn;