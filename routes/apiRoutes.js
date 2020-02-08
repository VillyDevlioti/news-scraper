var cheerio = require("cheerio");
var axios = require("axios");
//var express = require("express");
//var app = express();
var db = require("../models");
//var mongojs = require("mongojs");

module.exports = function(app) {

    //NYTIMES
    app.get("/nytimes", function(req, res){
        // An empty array to save the data that we'll scrape
        var data = [];
        console.log("back end call");
        
        // Make a request via axios to grab the HTML body from the site of your choice
        axios.get("https://www.nytimes.com/section/us").then(function(response) {
            console.log(response.data);
            
            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load(response.data);
            
            // Select each element in the HTML body from which you want information.
            $(".css-ye6x8s").each(function(i, element) {
        
                data[i] = { 
                    //variables to hold title, link and description
                    title : $(element).find("h2").text(),
                    link: "https://www.nytimes.com"+$(element).find("a").attr("href"),
                    desc : $(element).find("p").text()
                };
            });
            // Log the results once you've looped through each of the elements found with cheerio
            console.log(data); 
            res.json(data);
        });
    });  

    //BUZZFEED
    app.get("/buzzfeed", function(req, res){
        // An empty array to save the data that we'll scrape
        var data = [];
        
        // Make a request via axios to grab the HTML body from the site of your choice
        axios.get("https://www.buzzfeed.com/").then(function(response) {
            console.log(response.data);
            
            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load(response.data);
            
            // Select each element in the HTML body from which you want information.
            $(".xs-px05").each(function(i, element) {
        
                data[i] = { 
                    //variables to hold title, link and description
                    title : $(element).find("h2").text(),
                    link: $(element).find("a").attr("href"),
                    desc : $(element).find("p").text()
                };
            });
            // Log the results once you've looped through each of the elements found with cheerio
            console.log(data); 
            res.json(data);
        });
    });   

    //TECHCRUNCH
    app.get("/techcrunch", function(req, res){
        // An empty array to save the data that we'll scrape
        var data = [];
        
        // Make a request via axios to grab the HTML body from the site of your choice
        axios.get("https://techcrunch.com/").then(function(response) {
            console.log(response.data);
            
            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load(response.data);
            
            // Select each element in the HTML body from which you want information.
            $(".post-block").each(function(i, element) {
        
                data[i] = { 
                    //variables to hold title, link and description
                    title : $(element).find("h2").text(),
                    link: $(element).find("a").attr("href"),
                    desc : $(element).find(".post-block__content").text()
                };
            });
            // Log the results once you've looped through each of the elements found with cheerio
            console.log(data); 
            res.json(data);
        });
    });  

    //Getting saved articles page
    app.get("/saved-articles", function (req, res){
        // TODO: Finish the route so it grabs all of the articles
    db.Article.find({})
    .then(function(dbArticle) {
        // If all articles are successfully found, send them back to the client
        res.json(dbArticle);
    })
    .catch(function(err) {
        // If an error occurs, send the error back to the client
        res.json(err);
    });
    })

    //posting saved articles to database
    app.post("/saved-articles", function (req, res){
        //console.log(req);
        db.Article.create(req.body, function(error, saved) {
            // Show any errors
            if (error) {
            console.log(error);
            }
            else {
            // Otherwise, send the response to the client (for AJAX success function)
            console.log("article saved, check db");
            }
        });
    });
};