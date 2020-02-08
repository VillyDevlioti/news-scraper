// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

var express = require("express");
var mongoose = require("mongoose");
var app = express();
var htmlRoute = require("./routes/htmlRoutes.js");
//var apiRoute = require("./routes/apiRoutes.js");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup static directory
app.use(express.static("public"));

// Database configuration
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scrapedarticlesdb", { useNewUrlParser: true });

//call the html Routes
app.use(htmlRoute);
require('./routes/apiRoutes')(app);

app.listen(3000, function() {
    console.log("App running on port 3000!");
});