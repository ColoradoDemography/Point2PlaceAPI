"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var routes = require("./routes/routes.js")(app);

var server = app.listen(4005, function() {
    console.log("Listening on port %s...", server.address().port);
});
