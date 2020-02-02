// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

var cheerio = require("cheerio");
var axios = require("axios");
var express = require("express");
var mongojs = require("mongojs");
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
    app.use(express.static(__dirname + '/public'));
}); 

app.get("/nytimes", function(req, res){
    // An empty array to save the data that we'll scrape
    var data = {};

    axios.get("https://www.nytimes.com").then(function(response) {
        console.log(response.data);
        
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);
        
        // Select each element in the HTML body from which you want information.
        $("article").each(function(i, element) {
    
            data[i] = { 
                //variables to hold title, link and description
                title : $(element).children().text(),
                link: "https://www.nytimes.com"+$(element).find("a").attr("href"),
                desc : $(element).children().find("p").text()
            };
        });
        // Log the results once you've looped through each of the elements found with cheerio
        console.log(data); 
        res.json(data);
        });
    });      

// Make a request via axios to grab the HTML body from the site of your choice

app.listen(3000, function() {
    console.log("App running on port 3000!");
});