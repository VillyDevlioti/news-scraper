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

// Make a request via axios to grab the HTML body from the site of your choice
axios.get("https://www.nytimes.com").then(function(response) {
  console.log(response.data);

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
   $("article").each(function(i, element) {
    
    //variables to hold title, link and description
    var title = $(element).children().text();
    var link = $(element).find("a").attr("href");
    var desc = $(element).children().find("p").text();
    console.log
    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link,
      desc: desc
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results); 
});