
var turf = require("turf");
var fs = require("fs");

module.exports = function(req, res, counties, muni_data) {

  console.log(req.query);

        var testPoint = {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [-104.938498, 39.704263]
            },
            'properties': {
                'name': 'testPoint'
            }
        };

        muni_data.forEach(d => {
            var isInside = turf.inside(testPoint, d);
            if (isInside === true) {
                console.log(d.properties.FIRST_CITY);
            }
        });

        counties.forEach(d => {
            var isInside = turf.inside(testPoint, d);
            if (isInside === true) {
                console.log(d.properties.NAMELSAD);
            }
        });

        res.send("done");

    }