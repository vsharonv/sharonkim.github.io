const apiKey = "fHHlZvKQYcmrznORf67YlHYOjB2OqrBp";

async function giphySearch(e) {

    // prevent the page from submitting/reloading
    e.preventDefault();

    // get the user input from the form
    let userInput = document.querySelector('input[name="search-term"]').value;

    // If user input is NOT blank then proceed
    if (userInput) {
        // make an API call using fetch() - include your API key and the user's search term (template strings are your friend)
        const requestURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + userInput;

        // convert your response data into .json()
        const response = await fetch(requestURL);
        const giphyData = await response.json();

        // Check if there are any results. If there are none then alert user
        // otherwise move forward
        if (giphyData.data.length == 0) {
            Swal.fire({
                title: 'Hmm...',
                text: "It seems there were no results...Try another phrase!",
                icon: 'warning',
                confirmButtonText: 'Okay!'
            }).then((result) => {
                // Add logic if desired
            })   
        }
        else {
            // If there is atleast one result then hide so we can fade in again
            $('.giphy-results').hide();
            // 0 -> A, 1 -> B, 2 -> C
            let containerNames = [];

            containerNames.push('giphy-results-A');
            containerNames.push('giphy-results-B');
            containerNames.push('giphy-results-C');

            // print your data to the console to see its format, dont forget to delete later
            // clear out all gifs from previous searches    
            for (let i = 0; i < containerNames.length; i++) {
                document.getElementById(containerNames[i]).innerHTML = "";
            }

            // We will use the count to know when to
            // repeat and cycle back to index 0 as 
            // we add gifs to the HTML
            let finalContainerIndex = containerNames.length;
            let currentContainerNameIndex = 0;

            // Limit of how many gifs we want to load from the API
            let limit = 30;

            // In each iteration of the loop, append/add the new element to the 
            // correct respective container (A, B, C...etc)
            for (let i = 0; i < giphyData.data.length; i++) {
                if (i == limit) {
                    break;
                }

                const imageUrl = giphyData.data[i].images.fixed_width.url;
                const newImageTag = document.createElement("img");

                newImageTag.setAttribute("src", imageUrl);

                // Add some styling/spacing to make it visually more appealing       
                newImageTag.style.width = "100%";
                newImageTag.style.marginBottom = "8px";

                // We will put the image in the order of A -> B -> C -> A....etc
                if (currentContainerNameIndex == finalContainerIndex) {
                    // Reset the cycle and go back to 0
                    currentContainerNameIndex = 0;
                }
                // Get current container name (A, B...etc)
                let columnName = containerNames[currentContainerNameIndex];

                // Add the image/gif to the current container
                document.getElementById(columnName).appendChild(newImageTag);

                // Cycle to the next one
                currentContainerNameIndex++;
            }
            $('.giphy-results').fadeIn('slow');
        }
    }
    // otherwise throw error message
    else {
        Swal.fire({
            title: 'Uh oh...',
            text: "It seems the text box is empty...",
            icon: 'warning',
            confirmButtonText: 'Okay!'
        }).then((result) => {
            // Add logic if desired
        })
    }
}

async function giphySearchDelete(e) {
    e.preventDefault();
    // Reset - delete user input
    let userInput = document.querySelector('input[name="search-term"]').value = "";

    let containerNames = [];

    containerNames.push('giphy-results-A');
    containerNames.push('giphy-results-B');
    containerNames.push('giphy-results-C');

    // print your data to the console to see its format, dont forget to delete later
    // clear out all gifs from previous searches    
    for (let i = 0; i < containerNames.length; i++) {
        document.getElementById(containerNames[i]).innerHTML = "";
    }
}

// Click event for ENTER button
document.querySelector("#blue-button").addEventListener("click", giphySearch);
// Click event for RESET button
document.querySelector("#red-button").addEventListener("click", giphySearchDelete);