var shp = require('shpjs');
var fs = require("fs");

module.exports = function(req, res, counties, muni_data) {

        console.log("");

        let request_time = new Date();
        console.log("---" + request_time + "---");

        shp("http://storage.googleapis.com/co-publicdata/MuniBounds.zip").then(function(geo) {
            console.log('Muni Data Downloaded from Google Storage');
            console.log('Data Converted from Shapefile to GeoJSON');

            fs.writeFile('data/muni-data.geojson', JSON.stringify(geo), (err) => {
                if (err) {
                    throw err;
                    console.log("Failure, Unable to save Muni Data to Server File System!");
                    res.send("Failure, Unable to save Muni Data to Server File System!");
                } else {
                    console.log('Saved Muni Data to Server File System!');

                    //refresh data in memory
                    fs.readFile("data/muni-data.geojson", (err, data) => {
                        if (err) {
                            throw err;
                            console.log("Failure, Unable to access Muni Data from Local file system!");
                            res.send("Failure, Unable to access Muni Data from Local file system!");
                        } else {
                            let muni_data_set = JSON.parse(data);
                            muni_data = muni_data_set.features;
                            console.log('Success!  Muni data is current!');
                            res.send("Success!  Muni data is current!");
                        }

                    });

                }
            });

        }).catch(function() {
            console.log('error');
            console.log(arguments);
            console.log("Failure, Unable to load Muni Data from Google Storage!");
            res.send("Failure, Unable to load Muni Data from Google Storage!");
        });

    }