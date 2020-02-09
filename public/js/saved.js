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


      //location.href = "/members/" + data.id;
    }
}

    //just letting you know that the page is loaded
    console.log("page loaded");

    //variables to generate headlines
    var headline = $(".headlines");
    
    API.getArticles("saved-articles");

    function displayHeadlines(data) {
        //const values = Object.values(data)
        console.log("DATA", data)
        headline.empty();
        for (var i=0; i<data.length; i++) {
            var card = $("<div>").addClass("card");
            let title = $("<span>").addClass("card-title").text(data[i].title);
            var link = $("<a>").addClass("link-to-article").attr("href", data[i].link);
            //var button = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red save-button");
            //var icon = $("<i>").addClass("material-icons").text("add");
            var desc= $("<div>").addClass("card-content").text(data[i].description);
            link.append(title);
            //button.append(icon);
            card.append(link,desc);
            headline.append(card);
        }
    }

});
