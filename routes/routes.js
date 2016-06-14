"use strict";

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


var appRouter = function(app) {

    app.get("/place", function(req, res) {
        get_lookup(req, res, counties, muni_data, district_data);
    });

    app.post("/place", function(req, res) {
        post_lookup(req, res, counties, muni_data, district_data);
    });

    app.get("/refresh-muni-data", function(req, res) {
      
        var promise_muni = new Promise(function(resolve, reject){
          refresh_data('http://storage.googleapis.com/co-publicdata/MuniBounds.zip', 'muni', resolve, reject);
        });
        
      promise_muni.then(function(value) {
   muni_data = value;
        res.send('complete');
  }, function(reason) {
  res.send('oops');
});
        
      
    });

    app.get("/refresh-district-data", function(req, res) {
      
        var promise_district = new Promise(function(resolve, reject){
          refresh_data('http://storage.googleapis.com/co-publicdata/dlall.zip', 'district', resolve, reject);
        });
        
      promise_district.then(function(value) {
   district_data = value;
        res.send('complete');
  }, function(reason) {
  res.send('oops');
});
        
    });

}

module.exports = appRouter;