$(document).ready(function(){

    //just letting you know that the page is loaded
    console.log("page loaded");

    //variables to generate headlines
    var headline = $(".headlines");
    
    //activate the dropdown
    $(".dropdown-trigger").dropdown();

    //checking WHEN the user has clicked NYTIMES
    $("#ny-times").on("click", function(){
        console.log("clicked!");
        $.getJSON("/nytimes", function(data) {
            //console.log(data);
            displayHeadlines(data); 
        });
    });
    //checking WHEN the user has clicked BUZZFEED
    $("#buzzfeed").on("click", function(){
        console.log("clicked!");
        $.getJSON("/buzzfeed", function(data) {
            //console.log(data);
            displayHeadlines(data); 
        });
    });
    //checking WHEN the user has clicked TECHCRUNCH
    $("#techcrunch").on("click", function(){
        console.log("clicked!");
        $.getJSON("/techcrunch", function(data) {
            //console.log(data);
            displayHeadlines(data); 
        });
    });

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

            //console.log("BEFORE CLICK", title[0].innerText,desc[0].innerText,link[0].href);

        }

        checkForClicks();

    }

    function checkForClicks(){
        $(".save-button").on("click", function(event){
            console.log($(this));
            let articleTitleToSave = $(this)["0"].parentElement.firstChild.text;
            let descriptionToSave = $(this)["0"].previousElementSibling.innerText;
            let linkToSave = $(this)["0"].parentElement.firstChild.href;
            saveToDb(articleTitleToSave,descriptionToSave,linkToSave)

        });
    }

    function saveToDb(title, desc, link){
        console.log(title, desc, link)
    
        $.post({
            url: "/saved-articles/",
            data: {
                title: title,
                link: link,
                description: desc,
            }
        });
    }

});
