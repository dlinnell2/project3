const db = require("../models");

// Defining methods for the clockController
module.exports = {

    clockIn: function (req, res) {
        db.ClockIn
            .create(req.body)
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },

    pullTimes: function(req, res){
        db.ClockIn
            .find(req.body)
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    }
};