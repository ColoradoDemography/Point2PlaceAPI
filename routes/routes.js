"use strict";

var fs = require("fs");
var get_lookup = require('../modules/get-lookup.js');
var refresh_munidata = require('../modules/refresh-munidata.js');

var counties = [];
var muni_data = [];


//load muni and county data into memory
fs.readFile("data/coCountiesTiger2015wgs84.geojson", (err, data) => {
    if (err) throw err;
    let counties_set = JSON.parse(data);
    counties = counties_set.features;
});


fs.readFile("data/muni-data.geojson", (err, data) => {
    if (err) throw err;
    let muni_data_set = JSON.parse(data);
    muni_data = muni_data_set.features;
});



var appRouter = function(app) {

    app.get("/lookup", function(req, res) {
      get_lookup(req, res, counties, muni_data);
    });
  
    app.get("/refresh-munidata", function(req, res) {
      refresh_munidata(req, res, counties, muni_data);
    });
  
}

module.exports = appRouter;