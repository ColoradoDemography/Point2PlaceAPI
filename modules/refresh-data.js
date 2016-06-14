"use strict";

var shp = require('shpjs');
var fs = require("fs");


module.exports = function(path, tag, resolve, reject) {

    console.log("");

    let request_time = new Date();
    console.log("---" + request_time + "---");

    shp(path).then(function(geo) {
        console.log(tag + ' data downloaded from google storage');
        console.log('data converted from shapefile to geojson');

        fs.writeFile('data/' + tag + '-data.geojson', JSON.stringify(geo), (err) => {
            if (err) {
                throw err;
                console.log("failure, unable to save " + tag + " data to server file system!");
            } else {
                console.log("saved " + tag + " data to server file system!");

                //refresh data in memory
                fs.readFile("data/" + tag + "-data.geojson", (err, data) => {
                    if (err) {
                        throw err;
                        console.log("failure, unable to access " + tag + " data from local file system!");
                    } else {
                        let unparsed_data_set = JSON.parse(data);
                        console.log("success!  " + tag + " data is current!");
                        resolve(unparsed_data_set.features);
                    }

                });

            }
        });

    }).catch(function() {
        console.log('error');
        console.log(arguments);
        console.log("failure, unable to load " + tag + " data from google storage!");
    });

}