"use strict";

var fs = require("fs");
var get_lookup = require('../modules/get-lookup.js');
var refresh_muni_data = require('../modules/refresh-muni-data.js');
var refresh_district_data = require('../modules/refresh-district-data.js');

var counties = [];
var muni_data = [];
var district_data = [];

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


fs.readFile("data/district-data.geojson", (err, data) => {
    if (err) throw err;
    let district_data_set = JSON.parse(data);
    district_data = district_data_set.features;
});


var appRouter = function(app) {

    app.get("/lookup", function(req, res) {
      get_lookup(req, res, counties, muni_data, district_data);
    });
  
    app.get("/refresh-muni-data", function(req, res) {
      refresh_muni_data(req, res, counties, muni_data);
    });
  
    app.get("/refresh-district-data", function(req, res) {
      refresh_district_data(req, res, counties, district_data);
    });  
}

module.exports = appRouter;