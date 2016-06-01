
var turf = require("turf");
var fs = require("fs");

module.exports = function(req, res, counties, muni_data) {

  var lat=parseFloat(req.query.lat);
  var lng=parseFloat(req.query.lng);
  
  if( isNaN(lat) || isNaN(lng) ){ res.send("invalid coordinates"); return; }

  
        var testPoint = {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [lng, lat]
            }
        };


  var muni_result="";
  var county_result="";
  
        muni_data.forEach(d => {
            let isInside = turf.inside(testPoint, d);
            if (isInside === true) {
              muni_result = d.properties.FIRST_CITY;
            }
        });

        counties.forEach(d => {
            let isInside = turf.inside(testPoint, d);
            if (isInside === true) {
              county_result = d.properties.NAMELSAD;
            }
        });
  
  var result_response = {
    "city": muni_result,
    "county": county_result
  };

res.writeHead(200, { 'Content-Type': 'application/json' });   
res.end(JSON.stringify(result_response));

  
    }