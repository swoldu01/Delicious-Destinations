//Access the DOM to get html id searchInput and stores its' value in the variable searchInput. Same for searchType
function searchMeal() {
    const searchInput = document.getElementById('searchInput').value;
    const searchType = document.getElementById('searchType').value;
//Declares the  apiUrl empty
//If searchTpye html value is true, this line sets the apiUrl variable to a specific URL, embedding the user's search input into the URL using a template literal.
let apiUrl = '';
    if (searchType === 'meal') {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    } else if (searchType === 'area') {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchInput}`;
    }
//This initalizes a fetch request for that apiURL and returns a promise for the response object and converts it to json then takes the resulting data and calls the displayResults function passing in the meals array from the data. If all fails then catch and  console that error.  
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.meals);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
       
}
//Here we create the displayResults function that uses meals as a parameter. We search  for the html  element with the id resultsGrid then we declare  it as a  variable, then clear it with ''
function displayResults(meals) {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = '';
//Create a loop that interates over each meal in the meals array, then creates a div witha class name meal-card and then sets the innerHTML of the mealCard element to embed image and name again using template literal
    meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.className = 'meal-card';
        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        `;
        //This then says if the mealCard is clicked navigate to details.html and pass the meal id as a query parameter.
        mealCard.addEventListener('click', () => {
            window.location.href = `details.html?id=${meal.idMeal}`;
        });
        //This line appends the mealCard element (which now contains the meal's image and name) to the resultsGrid element.
        resultsGrid.appendChild(mealCard);
    });
  
}
