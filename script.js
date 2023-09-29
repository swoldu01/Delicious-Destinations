//Access the DOM to get html id searchInput and stores its' value in the variable searchInput. Same for searchType
function searchMeal() {
    document.getElementById('map').style.display = 'none';
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
console.log(apiUrl)
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.meals); //calls the display function
            // Save the results to localStorage
            localStorage.setItem('mealSearchResults', JSON.stringify(data.meals));
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

         // Trigger the plane animation
        const planeIcon = document.getElementById('planeIcon');
        planeIcon.classList.add('flyaway');

        // After the animation duration, reset the plane's position and opacity
        setTimeout(() => {
        planeIcon.classList.remove('flyaway');
    }   , 2000); // 2000ms matches the CSS transition duration

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

// Checks if there are any saved search results in localStorage and display them.
document.addEventListener('DOMContentLoaded', function() {
    const savedResults = localStorage.getItem('mealSearchResults');
    if (savedResults) {
        document.getElementById('map').style.display = 'none';
        displayResults(JSON.parse(savedResults));
    }
});

const areaToCountryCode = {
    "American": "US",
    "British": "GB",
    "Canadian": "CA",
    "Chinese": "CN",
    "French": "FR",
    "Croatian": "HR",
    "Dutch": "NL",
    "Egyptian": "EG",
    "Filipino": "PH",
    "Greek": "GR",
    "Indian": "IN",
    "Irish": "IE",
    "Italian": "IT",
    "Jamaican": "JM",
    "Japanese": "JP",
    "Kenyan": "KE",
    "Malaysian": "MY",
    "Mexican": "MX",
    "Moroccan": "MA",
    "Polish": "PL",
    "Portuguese": "PT",
    "Russian": "RU",
    "Spanish": "ES",
    "Thai": "TH",
    "Tunisian": "TN",
    "Turkish": "TR",
    "Vietnamese": "VN",
    "Unknown": null
};
// Initialize the map first
document.addEventListener('DOMContentLoaded', function() {
    const map = new jsVectorMap({
        map: 'world',
        selector: '#map',
        backgroundColor: 'transparent',
        regionStyle: {
            initial: {
                fill: '#e3eaef', // Default color for countries
            },
            selected: {
                fill: '#FFB400' // Highlight color for selected countries
            }
        }
    });

    // Fetch the list of areas from TheMealDB
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then(response => response.json())
        .then(data => {
            const areas = data.meals.map(meal => meal.strArea);
            const countryCodes = areas.map(area => areaToCountryCode[area]).filter(code => code !== undefined);
            map.getSelectedRegions(countryCodes);
            console.log("Fetched areas:", areas);
            console.log("Mapped country codes:", areas.map(area => areaToCountryCode[area]));
        })
        .catch(error => {
            console.error('Error fetching areas:', error);
        });
});
