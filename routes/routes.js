"use strict";


// var coordinatesLookup = require("../modules/coordinatesLookup.js")



var appRouter = function(app) {

    app.get("/lookup", function(req, res) {

        var newday = new Date();

        return res.send(newday.toLocaleDateString());

    });

}

module.exports = appRouter;