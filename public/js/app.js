$(document).ready(function(){

    var API = {
        getArticles: function(url) {
        console.log("inside query func");
        queryURL = "/" + url;
        console.log(queryURL);
        return $.ajax({
            url: queryURL,
            type: "GET"
            })
            .then(function(data){
                console.log(data);
                displayHeadlines(data);
            });
        },
        saveToDb: function (title, desc, link){
            console.log(title, desc, link)
            return $.ajax({
                url: "/saved-articles",
                type: "POST",
                data: {
                    title: title,
                    link: link,
                    description: desc,
                }
            });
        }, 

        //location.href = "/members/" + data.id;
    }

    //just letting you know that the page is loaded
    console.log("page loaded");

    //variables to generate headlines
    var headline = $(".headlines");
    
    //activate the dropdown
    $(".dropdown-trigger").dropdown();

    //checking WHEN the user has clicked NYTIMES
    $("#nytimes").on("click", function(){
        var url = getURL($(this));
        API.getArticles(url);

    });
    //checking WHEN the user has clicked BUZZFEED
    $("#buzzfeed").on("click", function(){
        var url = getURL($(this));
        API.getArticles(url);
    });
    //checking WHEN the user has clicked TECHCRUNCH
    $("#techcrunch").on("click", function(){
        var url = getURL($(this));
        API.getArticles(url);
    });
/*     //checking for saved articles
    $("#saved-articles").on("click", function(){
        var url = getURL($(this));
        console.log(url);
        API.getArticles(url);
    }); */

    function displayHeadlines(data) {
        //const values = Object.values(data)
        console.log("DATA", data)
        headline.empty();
        for (var i=0; i<data.length; i++) {
            var card = $("<div>").addClass("card");
            let title = $("<span>").addClass("card-title").text(data[i].title);
            var link = $("<a>").addClass("link-to-article").attr("href", data[i].link);
            var button = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red save-button");
            var icon = $("<i>").addClass("material-icons").text("add");
            var desc= $("<div>").addClass("card-content").text(data[i].desc);
            link.append(title);
            button.append(icon);
            card.append(link,desc,button);
            headline.append(card);
        }
        checkForClicks();
    }

    function checkForClicks(){
        $(".save-button").on("click", function(event){
            console.log($(this));
            let articleTitleToSave = $(this)["0"].parentElement.firstChild.text;
            let descriptionToSave = $(this)["0"].previousElementSibling.innerText;
            let linkToSave = $(this)["0"].parentElement.firstChild.href;
            API.saveToDb(articleTitleToSave,descriptionToSave,linkToSave);
        });
    }

    //getting url to feed into API call
    function getURL(object){
        var url = object[0].id;
        return url;
    }
});
