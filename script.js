function searchMeal() {
    const searchInput = document.getElementById('searchInput').value;
    const searchType = document.getElementById('searchType').value;
    let apiUrl = '';

    if (searchType === 'meal') {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    } else if (searchType === 'area') {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchInput}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.meals);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(meals) {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = '';

    meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.className = 'meal-card';
        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        `;
        resultsGrid.appendChild(mealCard);
    });
}
