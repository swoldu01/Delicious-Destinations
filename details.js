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
// Populate an ingredient list based on the ingredients and measures in the meal object
    function displayMealDetails(meal) {
    document.getElementById('mealImage').src = meal.strMealThumb;
    document.getElementById('mealName').textContent = meal.strMeal;
    document.getElementById('instructions').textContent = meal.strInstructions;

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
    // I can autoplay the video or add other controls here if  I need
    // event.target.playVideo();
}