$(document).ready(function() {


	var topicsArray = ["cats","dogs","mice"]

	for (var i = 0; i < topicsArray.length; i++) {
		var newButton = $('<button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">').text(topicsArray[i]).addClass("gifButton");
		//newButton.append($("<button>").text("x").addClass("checkbox"))
		$("#buttonHolder").append(newButton);
	}



	$(document).on("click",".gifButton",function(event) {
		console.log(this);
		var thatGif = $(this).text();
	    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        thatGif + "&api_key=dc6zaTOxFJmzC&limit=10";

	      $.ajax({
	          url: queryURL,
	          method: "GET"
	        })
	        .done(function(response) {

	          var results = response.data;
	          console.log(response);
	          for (var i = 0; i < results.length; i++) {
	            var gifDiv = $("<div class='item'>");
	            var rating = results[i].rating;
	            var p = $("<p>").text("Rating: " + rating);
	            var myGif = $("<img>");
	            myGif.attr("src", results[i].images.fixed_height_still.url);
	            myGif.attr("data-animate", results[i].images.fixed_height.url);
	            myGif.attr("data-still", results[i].images.fixed_height_still.url);
	            myGif.attr("data-state","still")
	            myGif.addClass("gif");
	            gifDiv.prepend(p);
	            gifDiv.prepend(myGif);
	            $("#gifHolder").prepend(gifDiv);
	          }
	        });
	});

    $("#addGif").on("click",function(event) {
    	event.preventDefault();
    	console.log($("#newGifInput").val())
		newButton = $("<button>").text($("#newGifInput").val()).addClass("gifButton");
		$("#buttonHolder").append(newButton);
	});

	$(document).on("click",".gif",function(event) {
		var state = $(this).attr("data-state");
        if (state === "still") {
          console.log(state);
          $(this).attr("src",$(this).attr("data-animate"));
          $(this).attr("data-state","animate");
        }

        else {
          $(this).attr("src",$(this).attr("data-still"));
          $(this).attr("data-state","still");
        }
	});

	

});

