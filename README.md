# Point2PlaceAPI
NodeJS Microservice to assign a place to a Lat/Lng.

## Path: */lookup*

Used to convert a LatLng to a Place Object

Use **GET** for one coordinate pair, or 

Use **POST** for a large volume of data

#### GET

Takes two parameters:

*lat:* latitude

*lng:* longitude

Returns a *Place* Object, which looks like:

```
{
  "city": "Central City",
  "county": "Gilpin County",
  "place_fips": ""
  "place_lgid": ""
  "county_fips": ""
  "county_lgid": ""
}
```


#### POST

Takes one parameters:
data: an array of coordinate objects (with an optional "uniqueid" field), something like:
```
[{"uniqueid":9872378,"lat":40,"lng":-105},{"uniqueid":9872379,"lat":40,"lng":-105},{"uniqueid":9872380,"lat":40,"lng":-105},{"uniqueid":9872381,"lat":40,"lng":-105},{"uniqueid":9872382,"lat":40,"lng":-105}]
```

Returns an Array of *Place* Objects (which will include the optional "uniqueid" field, if it was given)



----
### Analyzing GET/POST Results:

A blank "city" field indicates that the location is not in an incorporated town.  

A blank "city" and "county" field indicates that the point is either not in Colorado, or is an invalid point.

Example GET request:
http://red-meteor-147235.nitrousapp.com:4567/lookup?lat=39.8019&lng=-105.513


## Path: */refresh-munidata*

Used to refresh data on the server.

This will download the latest Municipal Boundary File from the Google Storage Bucket to the Server, convert it to a shapefile, and load it into the application memory.

Since the application is always on, and does not query a database - this is needed to periodically update the data in memory with any recent boundary changes.

