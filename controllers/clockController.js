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
            .find(req.body, null, {sort: {createdAt:-1}})
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },

    remove: function(req, res){
        db.ClockIn
            .deleteMany(req.body)
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    }
};