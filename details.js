//Event listener runs the function when the dom content is loaded then the function extracts the query from the current page, then stores the 'id' (idMeal) in the mealId variable 
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('id');
//Here we fetch the url like before, turn it to json then take the parses json data through the meals array. Catch any errors along the way.
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            displayMealDetails(data.meals[0]);
        })
        .catch(error => {
            console.error('Error fetching meal details:', error);
        });
});

let player;
//This does the same thing but for the YouTube Iframe API. It fetches meal details from TheMealDB using the meal ID from the URL and then calls the displayMealDetails function.
    function onYouTubeIframeAPIReady() {
        const urlParams = new URLSearchParams(window.location.search);
        const mealId = urlParams.get('id');
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            displayMealDetails(data.meals[0]);
        })
        .catch(error => {
            console.error('Error fetching meal details:', error);
        });
    }
//The displayMealDetails function takes the meal (object containing details about a meal) parameter as an argument 
//Retrieve specific elements from the DOM.
// Update these elements with data from the meal object
    function displayMealDetails(meal) {
    document.getElementById('mealImage').src = meal.strMealThumb;
    document.getElementById('mealName').textContent = meal.strMeal;

     // Split the instructions at each \r\n
     const steps = meal.strInstructions.split(/\r\n/);

     // Create an ordered list for the steps
     const instructionsList = document.createElement('ul');
     steps.forEach(step => {
         if (step.trim() !== '') { // Ensure we don't add empty steps
             const listItem = document.createElement('li');
             listItem.textContent = step;
             instructionsList.appendChild(listItem);
         }
     });
     // Append the ordered list to the instructions container
     const instructionsContainer = document.getElementById('instructions');
     instructionsContainer.innerHTML = ''; // Clear any existing content
     instructionsContainer.appendChild(instructionsList);
    // document.getElementById('instructions').textContent = meal.strInstructions;
// Populate an ingredient list based on the ingredients and measures in the meal object
    const ingredientList = document.getElementById('ingredientList');
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient} - ${measure}`;
            ingredientList.appendChild(listItem);
        }
    }
//Retrieve the YouTube link associated with a meal.
// Extract the video ID from that link.
// Initialize a YouTube video player using the extracted video ID.
    const youtubeLink = meal.strYoutube;
    if (youtubeLink) {
        let videoId = null;
        const videoIdMatch = youtubeLink.match(/v=([^&]+)/);
        if (videoIdMatch && videoIdMatch[1]) {
            videoId = videoIdMatch[1];
        }
        if (videoId) {
            player = new YT.Player('youtubeVideo', {
                height: '315',
                width: '560',
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady
                }
            });
        }
    }
}
function onPlayerReady(event) {
    // I can autoplay the video or add other controls here if I need
    // event.target.playVideo();
}
   // Handle the 'Go Back' button when clicked
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('backButton').addEventListener('click', function() {
        window.history.back();
    });
    // Handle the 'Home' button when clicked and added an unelegant way to bring back the map. 
    document.getElementById('homeButton').addEventListener('click', function() {
        window.location.href = '/'; 
    });
    document.getElementById('map').style.display = 'block';
});
