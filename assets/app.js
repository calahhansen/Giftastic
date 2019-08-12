// Beginning array of gifs
const gifs = ["Happy Dance", "Deep breaths", "Treat yoself", "Unplug", "All the feels", "Love yourself", "Cry it out"];

// Here we grab the text from the input box
const gif = document.getElementById("gif-input").value;

// API key for Giftastic App on Giphy Developer Dashboard
const apikey = "z2LQNc66PGXSv6YHaNJ10LFBEPMOSq7N";

// construct URL
const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=" + apikey + "&limit=10";

// multi-task with fetch promise

fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (responseJson) {
        document.getElementById("gif-view").innerHTML = JSON.stringify(responseJson);
        console.log(responseJson);
        console.log(responseJson.runtime);
    });

// Creating a div to hold the gif
const gifDiv = document.createElement("div");
gifDiv.classList.add('gif');

// Storing the rating data
const rating = responseJson.rating;

// Creating an element to have the rating displayed
const pOne = document.createElement("p")
pOne.innerHTML = "Rating: " + rating;

// Displaying the rating
gifDiv.append(pOne);

// Retrieving the URL for the image
const imgURL = responseJson.Poster;

// Creating an element to hold the image
const image = document.createElement("img")
image.setAttribute("src", imgURL);

// Appending the image
gifDiv.append(image);

// Function for displaying gif data
function renderButtons() {

    // Deleting the buttons prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    document.getElementById("buttons-view").innerHTML = "";

    // Looping through the array of movies
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

// This function handles events where one button is clicked
document.getElementById("add-gif").addEventListener("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    const gif = document.getElementById("gif-input").value.trim();

    // Adding the gif from the textbox to our array
    gifs.push(gif);
    console.log(gifs);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

// Calling the renderButtons function to display the intial buttons
renderButtons();

//script end
