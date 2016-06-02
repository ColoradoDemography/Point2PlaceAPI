var turf = require("turf");
var fs = require("fs");
var place_key = require("./place-key.js");
var county_key = require("./county-key.js");
var type_description = require("./type-description.js");

module.exports = function(req, res, counties, muni_data, district_data) {


    var latlng_array = req.body.data;
    var districts_flag = req.body.districts;

    var output_array = [];

    var array_length = latlng_array.length;

    for (let i = 0; i < latlng_array.length; i++) {


        let lat = parseFloat(latlng_array[i].lat);
        let lng = parseFloat(latlng_array[i].lng);

        let id = latlng_array[i].id;

        if (isNaN(lat) || isNaN(lng)) {
            res.send("invalid coordinates");
            return;
        }

        let testPoint = {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [lng, lat]
            }
        };

        let place_result = "";
        let county_result = "";
        let place_fips = "";
        let place_lgid = "";
        let county_fips = "";
        let county_lgid = "";
        let districts_arr = [];

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

        if (districts_flag === "true") {
            district_data.forEach(d => {
                let isInside = turf.inside(testPoint, d);
                if (isInside === true) {
                    if (d.properties.LGSTATUSID === "1") {
                        let tempobj = {};
                        tempobj.lgid = d.properties.LGID;
                        tempobj.lgname = d.properties.LGNAME;
                        tempobj.lgtypeid = d.properties.LGTYPEID;
                        tempobj.type = type_description(d.properties.LGTYPEID);
                        districts_arr.push(tempobj);
                    }
                }
            });

        }

        let result_response = {
            "id": id,
            "lat": lat,
            "lng": lng,
            "city": place_result,
            "county": county_result,
            "place_fips": place_fips,
            "place_lgid": place_lgid,
            "county_fips": county_fips,
            "county_lgid": county_lgid
        };

        if (districts_flag === "true") {
            result_response.districts = districts_arr;
        }

        output_array.push(result_response);

    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(output_array, null, '\t'));

}