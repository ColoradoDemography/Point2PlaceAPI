# Point2PlaceAPI
NodeJS Microservice to assign a place to a Lat/Lng.

### Path: */lookup*

Used to convert a LatLng to a Place Object

Use GET for one coordinate pair, or 
Use POST for a large volume of data

#### GET

Takes two parameters:
lat: latitude
lng: longitude

Returns a Place Object, which looks like:

```
{
  "city": "Central City",
  "county": "Gilpin County",
  "placefips": ""
  "placelgid": ""
  "countyfips": ""
  "countylgid": ""
}
```


#### POST

Takes one parameters:
data: an array of coordinate objects, something like:
```
[{"lat":40,"lng":-105},{"lat":40,"lng":-105},{"lat":40,"lng":-105},{"lat":40,"lng":-105},{"lat":40,"lng":-105}]
```

Returns and Array of Point Objects


----
### Analyzing the Results:

A blank "city" field indicates that the location is not in an incorporated town.  

A blank "city" and "county" field indicates that the point is either not in Colorado, or is an invalid point.

Example GET request:
http://red-meteor-147235.nitrousapp.com:4567/lookup?lat=39.8019&lng=-105.513


## Path: */refresh-munidata*

Used to refresh data on the server.

This will download the latest Municipal Boundary File from the Google Storage Bucket to the Server, convert it to a shapefile, and load it into the application memory.

