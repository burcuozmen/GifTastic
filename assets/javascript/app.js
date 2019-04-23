$(document).ready(function() {   

  
  // Initial array of Topics
  var topics = ["jon-snow", "cercei", "daenerys", "brienne-of-tarth", "arya-stark", "bran-stark" ,"tyrion-lannister"];
  
  //Function Display Gif
  function displayGif(){
           var character = $(this).attr("character-name");
           var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=6aTAUL6zBk9XehT7ngEGjFN7IqAOFeff&limit=10"; // Limit 10 Gifs
           $.ajax({
               url: queryURL,
               method: "GET"
               })
          .then(function(response) {
                $("#gifs-appear-here").empty();
                var results = response.data ;
                console.log(response);
                for (var i = 0; i < results.length; i++) {
                         var gifDiv = $("<div>");
                         var ratingInfo = $("<p>").text("Rating: " + results[i].rating);
                         var gifImage = $("<img>");
                         gifImage.addClass("gif-icon");
                         

                         
                         gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                         gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                         gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                         gifImage.attr("data-state", "still"); // set the image state
                         
                        

                         gifDiv.append(gifImage);
                         gifDiv.append(ratingInfo);
                         $("#gifs-appear-here").prepend(gifDiv);
                 }   
                   $(".gif-icon").on("click", function() {
                   var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                         $(this).attr("data-state", "still");
                }

            });

          });        
          
          
  }
  // Function to create(render) new Buttons
  function renderButtons() {
             $("#buttons-view").empty();
             for (var i = 0; i < topics.length; i++){
                 var newButton = $("<button>");
                 newButton.addClass("character");
                 newButton.attr("character-name", topics[i]);
                 newButton.text(topics[i]);
                 $("#buttons-view").append(newButton);
             }
  }
  //Function adding event listener to click on buttons
  $("#add-character").on("click", function(event){
                 event.preventDefault();
                 var character = $("#character-input").val().trim();
                 topics.push(character);
                 $("#character-input").val(" ");
                 renderButtons();


                
  });

  $(document).on("click", ".character", displayGif);
  renderButtons();
  
  // Play Music Button
  var theme = new Audio("assets/Audio/Game-of-Thrones.mp3");
  $("#play").on("click", function() {
    theme.play();
  });
  $("#pause").on("click", function() {
    theme.pause();
  });
  
  

  

});  