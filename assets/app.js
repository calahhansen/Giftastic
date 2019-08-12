 // This .on("click") function will trigger the AJAX Call
 document.getElementById("find-gif").addEventListener("click", function (event) {

    // Preventing the submit button from trying to submit the form
    // We're optionally using a form so the user may hit Enter to search instead of clicking the button
    event.preventDefault();

    // Here we grab the text from the input box
    const gif = document.getElementById("gif-input").value;

    // API key for Giftastic App on Giphy Developer Dashboard
    const apikey="z2LQNc66PGXSv6YHaNJ10LFBEPMOSq7N";

    // construct URL
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + apikey + "&limit=5";

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
});