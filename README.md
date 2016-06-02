# Point2PlaceAPI
NodeJS Microservice to assign a place to a Lat/Lng.

## Path: */lookup*

Used to convert a LatLng to a *Place* Object

Use **GET** for one coordinate pair, or 

Use **POST** for a large volume of data

#### GET

Takes three parameters:

*lat:* latitude

*lng:* longitude

*districts:* use districts=true to include an array of District objects, which represent all Special Districts (on File with DOLA) that contain the point.


Example **GET** Request:

```
http://red-meteor-147235.nitrousapp.com:4567/lookup?lat=39.8019&lng=-105.513&districts=true
```

Output

```
{
	"lat": 39.8019,
	"lng": -105.513,
	"city": "Central City",
	"county": "Gilpin County",
	"place_fips": "12910",
	"place_lgid": "64263",
	"county_fips": "047",
	"county_lgid": "24005",
	"districts": [
		{
			"lgid": "24901",
			"lgname": "Gilpin County RE-1 School District",
			"lgtypeid": "99",
			"type": "School District"
		},
		{
			"lgid": "24002",
			"lgname": "Black Hawk-Central City Sanitation District",
			"lgtypeid": "10",
			"type": "Sanitation District"
		}
	]
}
```




#### POST

Send an JSON object with 2 properties:

*data:* an array [ ] of {id, lat, lng} coordinate objects, something like:

```
[{"id":"12345","lat":39.612329,"lng":-104.779962},{"id":"12346","lat":39.8019,"lng":-105.513},{"id":"12347","lat":39.755,"lng":-105.222}]
```

*districts:* use districts="true" to include district information in the response.  Any other value excludes districts.


Returns an Array of *Place* Objects (which will include the optional "uniqueid" field, if it was given)

Example **POST** Request: 

```
curl -H "Content-Type: application/json" -X POST -d '{"data":[{"id":"12345","lat":39.612329,"lng":-104.779962},{"id":"12346","lat":39.8019,"lng":-105.513},{"id":"12347","lat":39.755,"lng":-105.222}],"districts":"true"}' http://red-meteor-147235.nitrousapp.com:4567/lookup
```

Output:

```
[
        {
                "id": "12345",
                "lat": 39.612329,
                "lng": -104.779962,
                "city": "Centennial",
                "county": "Arapahoe County",
                "place_fips": "12815",
                "place_lgid": "03163",
                "county_fips": "005",
                "county_lgid": "03001",
                "districts": [
                        {
                                "lgid": "03032",
                                "lgname": "Cunningham Fire Protection District",
                                "lgtypeid": "8",
                                "type": "Fire Protection District"
                        },
                        {
                                "lgid": "03107",
                                "lgname": "Columbia Metropolitan District",
                                "lgtypeid": "6",
                                "type": "Metropolitan District"
                        },
                        {
                                "lgid": "03087",
                                "lgname": "Arapahoe Park & Recreation District",
                                "lgtypeid": "7",
                                "type": "Park & Recreation District"
                        },
                        {
                                "lgid": "03038",
                                "lgname": "East Cherry Creek Valley Water & Sanitation District",
                                "lgtypeid": "12",
                                "type": "Water & Sanitation District"
                        },
                        {
                                "lgid": "03903",
                                "lgname": "Cherry Creek 5 School District",
                                "lgtypeid": "99",
                                "type": "School District"
                        },
                        {
                                "lgid": "03080",
                                "lgname": "West Arapahoe Conservation District",
                                "lgtypeid": "20",
                                "type": "Conservation District (Soil)"
                        }
                ]
        },
        {
                "id": "12346",
                "lat": 39.8019,
                "lng": -105.513,
                "city": "Central City",
                "county": "Gilpin County",
                "place_fips": "12910",
                "place_lgid": "64263",
                "county_fips": "047",
                "county_lgid": "24005",
                "districts": [
                        {
                                "lgid": "24901",
                                "lgname": "Gilpin County RE-1 School District",
                                "lgtypeid": "99",
                                "type": "School District"
                        },
                        {
                                "lgid": "24002",
                                "lgname": "Black Hawk-Central City Sanitation District",
                                "lgtypeid": "10",
                                "type": "Sanitation District"
                        }
                ]
        },
        {
                "id": "12347",
                "lat": 39.755,
                "lng": -105.222,
                "city": "Golden",
                "county": "Jefferson County",
                "place_fips": "30835",
                "place_lgid": "30035",
                "county_fips": "059",
                "county_lgid": "30047",
                "districts": [
                        {
                                "lgid": "30900",
                                "lgname": "Jefferson County R-1 School District",
                                "lgtypeid": "99",
                                "type": "School District"
                        }
                ]
        }
]%
```

----
### Analyzing GET/POST Results:

A blank "city" field indicates that the location is not in an incorporated town.  

A blank "city" and "county" field indicates that the point is either not in Colorado, or is an invalid point.



## Path: */refresh-muni-data*

Used to refresh muni data on the server.

This will download the latest Municipal Boundary File from the Google Storage Bucket to the Server, convert it to a shapefile, and load it into the application memory.

Since the application is always on, and does not query a database - this is needed to periodically update the data in memory with any recent boundary changes.


## Path: */refresh-district-data*

Used to refresh district data on the server.

This will download the latest Special Districts Boundary File from the Google Storage Bucket to the Server, convert it to a shapefile, and load it into the application memory.

Since the application is always on, and does not query a database - this is needed to periodically update the data in memory with any recent boundary changes.


County data will not likely need to be updated, as County Boundaries do not change often.  If it is needed, please update the County file with the most current version of the Census TIGER county shapefile for Colorado.
