// Beginning array of gifs
const gifs = ["Happy Dance", "Deep breaths", "Treat yoself", "Unplug", "All the feels", "Love yourself", "Cry it out"];

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

    let gifs = this.getAttribute("gifs");

    // API key for Giftastic App on Giphy Developer Dashboard
    const apikey = "z2LQNc66PGXSv6YHaNJ10LFBEPMOSq7N";

    // set limits and ratings
    const gifslimit = "10"
    const gifsratings = "PG"

    // construct URL
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + gifs + "&limit=" + gifslimit + "&offset=0&rating=" + gifsratings + "&lang=en";

    // const queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=z2LQNc66PGXSv6YHaNJ10LFBEPMOSq7N&limit=10"; tutor URL
    // multi-task with fetch promise

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (responseJson) {
            console.log(responseJson.data);
            const results = responseJson.data;
            for (var i = 0; i < results.length; i++) {
                // Creating a div to hold the gif

                // Found on https://codepen.io/BobDempsey/pen/jMjYdy
                // var newDiv = $('<div>');
                // newDiv.addClass("image-container");
    
                // // Retrieves the Rating Data
                // var ratingData = (response.data[i].rating);
    
                // // Creates an element to have the rating displayed
    
                // var rating = $("<p>").text(ratingData);
                // rating.addClass('img-rating');
                // newDiv.append(rating);
    
                // // Creates an element to hold the image
                // var image = $("<img>").attr("src", response.data[i].images.fixed_height.url);
                // image.addClass('img-grid');
              
    
        //         // Appends the image
        //         newDiv.append(image);
    
        //         // Puts the entire Movie above the previous movies.
        //         $("#moviesView").prepend(newDiv);
    
        //     }
        //     });
    
        // }

                // My attempt to create a div to hold the giphys
                // let gifDiv = document.createElement("gifdiv");
                // gifDiv.classList.add("gif");
                // const rating = results[i].rating;
                // const ratingEl = document.createElement("rating")
                // ratingEl.innerHTML = "Rating: " + rating;
                // const animated = results[i].images.fixed_height.url;
                // const still = results[i].images.fixed_height_still.url;

                // Tutor did this part and not totally sure - need to ask for help
                //<img src="jkhfjkbfmjb", data-still = "jhhjbm"></img>
                // let customElementRegistry = window.customElements;
                // console.log(customElementRegistry);
                // customElementRegistry.define("gif-image", MyCustomElement);
                // customElementRegistry gifImage = document.createElement("img");
                // gifImage.setAttribute("src", animated);
                // gifImage.setAttribute("data-still", still);
                // gifImage.setAttribute("data-animate", animated);
                // gifImage.setAttribute("data-state", "animate" );
                // gifImage.setAttribute("class", "gify-img");
                // gifDiv.append(ratingEl);
                // gifDiv.append(gifImage);
                // document.getElementById("gif-view").append(gifDiv);


                document.getElementById("gif-view").innerHTML = JSON.stringify(responseJson); //I don't want the JSON in the gif-view but want to set-up the gif view to show the rating el and image el....I don't understand when to stringify or parse...is there a simple way to tell the difference by look at the return response JSON?
                console.log(responseJson);
                console.log(responseJson.runtime);

                

                // Storing the rating data
                const rating = responseJson.rating;

                // Creating an element to have the rating displayed
                const ratingEl = document.createElement("rating")
                ratingEl.innerHTML = "Rating: " + rating;

                // Displaying the rating
                gifDiv.append(ratingEl);
                console.log("respo: " + JSON.stringify(responseJson.data));
                // Retrieving the URL for the image
                const imgURL = responseJson.data.images.original_still.url; //totally guessing on how to dig down into the JSON....double check on this

                // Creating an element to hold the image
                const imgEl = document.createElement("img")
                imgEl.setAttribute("src", imgURL); //double check on this too is the "src" ok or do I need the = ?

                // Appending the image
                gifDiv.append(imgEl);
            });
}
// Function for displaying gif data
function renderButtons() {

    // Deleting the buttons prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    document.getElementById("buttons-view").innerHTML = "";

    // Looping through the array of gifs
    for (let i = 0; i < gifs.length; i++) {

        // Then dynamically generating buttons for each gif in the array
        const a = document.createElement("button");
        // Adding a class of gif to our button
        a.classList.add("gif");
        // Adding a data-attribute
        a.setAttribute("data-name", gifs[i]);
        // Providing the initial button text
        a.innerHTML = gifs[i];
        // Adding the button to the buttons-view div
        document.getElementById("buttons-view").append(a);

        // Function for displaying the gif info
        a.addEventListener("click", displayGifInfo);
    }
}

/// This function handles events where one button is clicked. keep getting error message....tried switching "add-gif" to "find-gif" and it works! the buttons now show up!
document.getElementById("find-gif").addEventListener("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    let userInput = document.getElementById("gif-input").value.trim();

    // Adding the gif from the textbox to our array
    gifs.push(userInput);
    console.log(gifs);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});
// Calling the renderButtons function to display the intial buttons
renderButtons();

//script end
