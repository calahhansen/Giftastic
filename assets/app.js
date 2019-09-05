// Beginning array of topics
const topics = ["Happy Dance", "Deep breaths", "Treat yoself", "Unplug", "All the feels", "Love yourself", "Cry it out"];

// displayTopicInfo function re-renders the HTML to display the appropriate content
function displayTopicInfo() {

    const topic = this.getAttribute("data-name");

    // API key for Giftastic App on Giphy Developer Dashboard
    const apikey = "z2LQNc66PGXSv6YHaNJ10LFBEPMOSq7N";

    // set limits and ratings
    const gifslimit = "10"
    const gifsratings = "PG"

    // construct URL
    const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + topic + "&limit=" + gifslimit + "&offset=0&rating=" + gifsratings + "&lang=en";
    console.log("queryURL", queryURL);
    // const queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=z2LQNc66PGXSv6YHaNJ10LFBEPMOSq7N&limit=10"; tutor URL
    // multi-task with fetch promise

    fetch(queryURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (responseJson) {
            // console.log("responseJson", responseJson);
            const results = responseJson.data;
            // console.log('results before loop', results);
            for (var i = 0; i < results.length; i++) {
                // My attempt to create a div to hold the topics - needs more work/help (tutor suggestion below)
                const topicDiv = document.createElement("div");
                topicDiv.classList.add("topic");
                // console.log('topiDiv', topicDiv);
                //Gather the rating data
                const rating = results[i].rating;
                // console.log('rating', rating);
                // Creat an element to have the rating displayed
                const ratingEl = document.createElement("p");
                ratingEl.classList.add("rating");

                // console.log('ratingEl', ratingEl);

                // Display rating
                ratingEl.innerHTML = "Rating: " + rating;
                topicDiv.append(ratingEl);
                // Gather animated image
                // const animatedURL = results[i].data.data.images.original_mp4.url;
                //Creat an element to hold animated image
                // const animated = document.createElement("img-animated");
                // animated.setAttribute("src", animatedURL);
                // Gather the still image
                const stillURL = results[i].images.fixed_height_still.url;
                // console.log('results of still url', stillURL);
                // Create an element to hold still image
                const still = document.createElement("img");
                // create an image tag element by const still = <img /> tag
                // console.log("still", still);
                still.setAttribute("src", stillURL);
                //<img src ="hfjkgdhfghvbhm" />

                const animateUrl = results[i].images.fixed_height.url;
                still.setAttribute("data-state", "still");
                //<img src ="hfjkgdhfghvbhm" data-state="still" />
                still.setAttribute("id", "img-gif");
                // still.setAttribute("onclick", mFunction());
                //<img src ="hfjkgdhfghvbhm" data-state="still" class="img-gif" onclick=changeAnimate() />
                // still.setAttribute('onclick', 'changeAnimate()');
                still.setAttribute("data-animate", animateUrl);
                still.setAttribute("data-still", stillURL);
                // Appending the image
                topicDiv.append(still);
                // Put the topic above the previous topics
                document.getElementById("topics-view").prepend(topicDiv);
            }

            // Tutor did this part and not totally sure what she was doing - unsure of why i needed a custom element from the window?? Couldn't get the code to work...
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

        });
}
// function changeAnimate() {
//     console.log("work on animating the gif");
//     element.getElementsByClassName("img-gif") = "animateURL";

// }

// Function for displaying topic data
function renderButtons() {
    // Deleting the buttons prior to adding new topic
    // (this is necessary otherwise you will have repeat buttons)
    document.getElementById("buttons-view").innerHTML = "";

    // Looping through the array of topics
    for (let i = 0; i < topics.length; i++) {
        // Then dynamically generating buttons for each topic in the array
        const a = document.createElement("button");
        // Adding a class of topic to our button
        a.classList.add("topic");
        // Adding a data-attribute
        a.setAttribute("data-name", topics[i]);
        // Providing the initial button text
        a.innerHTML = topics[i];
        // Adding the button to the buttons-view div
        document.getElementById("buttons-view").append(a);
        // Function for displaying the gif info
        a.addEventListener("click", displayTopicInfo);
    }
}

/// This function handles events where one button is clicked. keep getting error message....tried switching "add-gif" to "find-gif" and it works! the buttons now show up!
document.getElementById("find-topic").addEventListener("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    const topic = document.getElementById("topic-input").value.trim();

    // Adding the gif from the textbox to our array
    topics.push(topic);
    console.log(topics);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});
// document.getElementById("img-gif").addEventListener('click', function (e) {
//     console.log("on click");
//     var state = e.getAttribute("data-state");
// });
window.onload = function () {
    var el = document.getElementById('img-gif');
    console.log("el: " + el);
    if (el) {
        el.addEventListener('click', changeAnimate);
    }
    else {
        console.log("not having anything");
    }
}
function changeAnimate() {
    // var state = e.getAttribute('data-state');
    // console.log("state: "+state);
    console.log("animate gif ");
}
// Calling the renderButtons function to display the intial buttons
renderButtons();


