$(document).ready(function(){

    //just letting you know that the page is loaded
    console.log("page loaded");

    //variables to generate headlines
    var headline = $(".headlines");
    
    //activate the dropdown
    $(".dropdown-trigger").dropdown();

    //checking what the user has clicked
    $("#ny-times").on("click", function(){
        console.log("clicked!");
        $.getJSON("/nytimes", function(data){
            console.log(data);
            displayHeadlines(data);
        });
    });

    function displayHeadlines(data) {
        const values = Object.values(data)
        console.log("inside display");
        headline.empty();
        
        for (const value of values) {
            console.log(value.title);
            console.log(value.link);
            console.log(value.desc);
            headline.add("div").addClass("card");
            headline.append("<span class=\"card-title\">"+value.title);
            headline.append("<a class=\"btn-floating halfway-fab waves-effect waves-light red\"><i class=\"material-icons\">add</i></a>")
            headline.append("<div class=\"card-content\"><p>"+value.desc); 
            headline.append("<a href=\""+value.link+"\" class=\"waves-effect waves-light btn\">Link</a>")
        }
    }


});


/* <div class="card">
  <span class="card-title">Card Title</span>
  <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
  <div class="card-content">
  <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
</div>
</div> */
