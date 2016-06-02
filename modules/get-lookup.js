var turf = require("turf");
var fs = require("fs");
var place_key = require("./place-key.js");
var county_key = require("./county-key.js");
var type_description = require("./type-description.js");

module.exports = function(req, res, counties, muni_data, district_data) {

    var lat = parseFloat(req.query.lat);
    var lng = parseFloat(req.query.lng);

    if (isNaN(lat) || isNaN(lng)) {
        res.send("invalid coordinates");
        return;
    }

    var testPoint = {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [lng, lat]
        }
    };

    var place_result = "";
    var county_result = "";
    var place_fips = "";
    var place_lgid = "";
    var county_fips = "";
    var county_lgid = "";
  var districts_arr = [];

    muni_data.forEach(d => {
        let isInside = turf.inside(testPoint, d);
        if (isInside === true) {
            place_result = d.properties.FIRST_CITY;
            place_fips = d.properties.CITY;
            place_lgid = place_key(place_fips);
        }
    });

    counties.forEach(d => {
        let isInside = turf.inside(testPoint, d);
        if (isInside === true) {
            county_result = d.properties.NAMELSAD;
            county_fips = d.properties.COUNTYFP;
            county_lgid = county_key(county_fips);
        }
    });

  if(req.query.districts==="true"){
    district_data.forEach(d => {
        let isInside = turf.inside(testPoint, d);
        if (isInside === true) {
         if(d.properties.LGSTATUSID === "1"){
           let tempobj={};
           tempobj.lgid = d.properties.LGID;
           tempobj.lgname = d.properties.LGNAME;
           tempobj.lgtypeid = d.properties.LGTYPEID;
           tempobj.type = type_description(d.properties.LGTYPEID);
           districts_arr.push(tempobj);
         }
        }
    });

  }
  
    var result_response = {
        "lat": lat,
        "lng": lng,
        "city": place_result,
        "county": county_result,
        "place_fips": place_fips,
        "place_lgid": place_lgid,
        "county_fips": county_fips,
        "county_lgid": county_lgid
    };
  
  if(req.query.districts==="true"){
    result_response.districts = districts_arr;
  }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(result_response, null, '\t'));

}