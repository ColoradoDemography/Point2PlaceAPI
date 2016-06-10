"use-strict";

var fs = require("fs");
var get_lookup = require('../modules/get-lookup.js');
var post_lookup = require('../modules/post-lookup.js');
var refresh_data = require('../modules/refresh-data.js');

var counties = [];
var muni_data = [];
var district_data = [];


//load muni, county and district data into memory
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

    app.get("/place", function(req, res) {
        get_lookup(req, res, counties, muni_data, district_data);
    });

    app.post("/place", function(req, res) {
        post_lookup(req, res, counties, muni_data, district_data);
    });

    app.get("/refresh-muni-data", function(req, res) {
        refresh_data(req, res, muni_data, 'http://storage.googleapis.com/co-publicdata/MuniBounds.zip', 'muni');
    });

    app.get("/refresh-district-data", function(req, res) {
        refresh_data(req, res, district_data, 'http://storage.googleapis.com/co-publicdata/dlall.zip', 'district');
    });

}

module.exports = appRouter;