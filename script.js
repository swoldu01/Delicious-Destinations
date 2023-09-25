


document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const resultsContainer = document.getElementById('results');

    // Fetch data from both APIs using the query
    const theMealDb =await fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const edamamData = await fetchData(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=f8614349&app_key=6f9da084e590aa1653021337859f39d4`);
    const spoonacularData = await fetchData(`https://api.spoonacular.com/recipes/search?query=${query}&apiKey=6bb3c9dc50264eed8ce99c3fe5b8d426`);
    // Combine and display the results
    // const combinedData = [...theMealDb.meals,...edamamData.hits, ...spoonacularData.results];
    const combinedData = [
        ...edamamData.hits.map(item => normalizeData(item.recipe, 'edamam')), 
        ...spoonacularData.results.map(item => normalizeData(item, 'spoonacular')), 
        ...(theMealDb.meals ? theMealDb.meals.map(item => normalizeData(item, 'themealdb')) : [])
    ];
    console.log(theMealDb)
    console.log(edamamData)
    console.log(spoonacularData)


    resultsContainer.innerHTML = combinedData.map(recipe => {
        const title = recipe.title || recipe.strMeal;
        const image = recipe.image || recipe.strMealThumb;
        console.log(title, image)
        return `
        <div class="recipe-card">
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
        </div>
    `
})
// .join('');
});

async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function normalizeData(data, source) {
    switch (source) {
        case 'edamam':
            return { title: data.label, image: data.image };
        // case 'spoonacular':
        //     return { title: data.title, image: data.image };
        case 'spoonacular':
            return { title: data.title, image: `https://spoonacular.com/recipeImages/${data.id}-480x360.jpg` };
        case 'themealdb':
            return { title: data.strMeal, image: data.strMealThumb };
        default:
            return {};
    }
}