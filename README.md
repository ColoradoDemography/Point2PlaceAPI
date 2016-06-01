# Point2PlaceAPI
NodeJS Microservice to assign a Lat/Lng to a Muni (or Un-Incorporated portion of a County) within Colorado.

Path: /lookup
Used to convert a LatLng to a Place Object
Use POST or GET depending upon volume of data to be processed.
Takes only one parameter, **data**

A Place Object Looks Like:
```
{
  placename:
  placelgid:
  placefips:
  countyname:
  countylgid:
  countyfips:
}
```

Example:



Path: /refresh-munidata
Used to refresh data on the server.
This will download the latest Municipal Boundary File from the Google Storage Bucket to the Server, convert it to a shapefile, and load it into the application memory.
