//fetches the data from url and structures it in JSON. Show error if something goes wrong.
async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const resultsContainer = document.getElementById('results');

    // Fetch data from all three APIs based on the query input
    const theMealDb =await fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const edamamData = await fetchData(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=f8614349&app_key=6f9da084e590aa1653021337859f39d4`);
    const spoonacularData = await fetchData(`https://api.spoonacular.com/recipes/search?query=${query}&apiKey=6bb3c9dc50264eed8ce99c3fe5b8d426`);
    //Combine all items in one array and then uses the normalize function to keep each item consistant. In edamamData the details are in the recipe proterty
    const combinedData = [
        ...edamamData.hits.map(item => normalizeData(item.recipe, 'edamam')), 
        ...spoonacularData.results.map(item => normalizeData(item, 'spoonacular')), 
        ...(theMealDb.meals.map(item => normalizeData(item, 'themealdb')))
    ];
    console.log(theMealDb)
    console.log(edamamData)
    console.log(spoonacularData)

//Displays the search results on the grid. MealDB uses strMeal and strMealThumb for title and images respectfully. So using an or operator handles data from either api.
    resultsContainer.innerHTML = combinedData.map(recipe => {
        let link;
        switch (recipe.source) {
            case 'edamam':
                link = `detail-card.html?id=${recipe.id}&source=edamam`;
                break;
            case 'spoonacular':
                link = `/detail-card.html?id=${recipe.id}&source=spoonacular`; 
                break;
            case 'themealdb':
                link = `/detail-card.html?id=${recipe.id}&source=themealdb`;  
                break;
            default:
                link = "#";
        }
        const title = recipe.title || recipe.strMeal;
        const image = recipe.image || recipe.strMealThumb;
        console.log(title, image)
        return `
        <a href="${link}" class="recipe-link">
        <div class="recipe-card">
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
        </div>
        </a>`
})
});
//fetches the data from url and structures it in JSON. Show error if something goes wrong.
async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
//Used the normalize function to account for each unique data structure. For images both edamam and Mealdb provide url links. Spoonacular need a specifc format to access the images. ChatGPT indicated that I needed to get spoonacular images using this code.
function normalizeData(data, source) {
    switch (source) {
        case 'edamam':
            return { 
                title: data.label, 
                image: data.image,
                url: data.url  // URL for the recipe on Edamam 
            };
        // case 'spoonacular':
        //     return { title: data.title, image: data.image };
        case 'spoonacular':
            return { 
                title: data.title, 
                image: `https://spoonacular.com/recipeImages/${data.id}-480x360.jpg`,
                id: data.id  // ID for the recipe on Spoonacular
             };
        case 'themealdb':
            return { 
                title: data.strMeal, 
                image: data.strMealThumb,
                id: data.idMeal  // ID for the recipe on TheMealDB 
            };
        default:
            return {};
    }
}
    
document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    const source = urlParams.get('source');

    let recipeDetails;

    switch (source) {
        case 'edamam':
            // Fetch detailed data from Edamam using the recipeId
            // Note: You might need a different endpoint or method to fetch detailed data.
            break;
        case 'spoonacular':
            const spoonacularResponse = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=YOUR_API_KEY`);
            recipeDetails = await spoonacularResponse.json();
            break;
        case 'themealdb':
            const mealDbResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
            recipeDetails = (await mealDbResponse.json()).meals[0];
            break;
        default:
            console.error("Unknown source");
            return;
    }

    const detailContainer = document.getElementById('recipe-detail-container');

    detailContainer.innerHTML = `
        <img src="${recipeDetails.image}" alt="${recipeDetails.title}">
        <h2>${recipeDetails.title}</h2>
        <p>Calories: ${recipeDetails.calories}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${recipeDetails.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <h3>Nutrition Details:</h3>
        // Render nutrition details as needed
    `;
});
