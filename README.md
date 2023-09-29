<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meal Discovery Website - Documentation</title>
</head>
<body>
<img src="/assets/Screenshot 2023-09-28 at 11.14.44 PM.png" alt="Meal Discovery Logo" width="200">
<h1>Meal Discovery Website</h1>

<p>Discover meals from around the world with our interactive search tool. Dive deep into each meal's details, ingredients, and even watch a video on how to prepare it. Additionally, explore meals by region with our interactive world map.</p>

<h2>Features</h2>

<ul>
    <li><strong>Search by Meal or Area</strong>: Users can search for meals by their name or by the region they come from.</li>
    <li><strong>Detailed Meal Information</strong>: Click on a meal to get detailed information, including ingredients, preparation steps, and a video guide.</li>
    <li><strong>Responsive Design</strong>: The website is designed to be user-friendly on both desktop and mobile devices.</li>
</ul>

<h2>How to Use</h2>

<ol>
    <li><strong>Homepage</strong>:
        <ul>
            <li>Use the search bar to search for meals by name or region.</li>
            <li>Click on any meal card to view its details.</li>
            <li>Pending: Use the world map to explore meals by region. Regions with available meals are highlighted.</li>
        </ul>
    </li>
    <li><strong>Details Page</strong>:
        <ul>
            <li>View detailed information about the selected meal.</li>
            <li>Click the "Go Back" button to return to the search results.</li>
            <li>Click the "Home" button to return to the homepage and start a new search.</li>
            <li>View embeded youtube video of the specified dish</li>
        </ul>
    </li>
</ol>

<h2>Technical Details</h2>

<ul>
    <li><strong>Local Storage</strong>: The website uses local storage to save search results. This ensures that when users navigate back to the homepage, their search results are still available.</li>
    <li><strong>The IFrame player API</strong>The IFrame player API allows for embed YouTube video player on your website and control the player using JavaScript.</li>
    <li><strong>Interactive Map</strong>: The map is powered by <code>jsVectorMap</code>, a plain JavaScript library for rendering interactive and dynamic vector-shaped world maps.</li>
    <li><strong>API</strong>: The website fetches meal data from TheMealDB API.</li>
    <li><strong>ChatGPT<strong>: Some of the code was provided by AI.</li>
</ul>

<h2>Future Enhancements</h2>

<ul>
    <li>Interactive World Map: Explore meals by region with our clickable world map.</li>
    <li>Integrate user reviews and ratings for each meal.</li>
    <li>Allow users to save their favorite meals and access them later.</li>
    <li>Add filters to refine search results based on dietary preferences or meal type (e.g., vegetarian, vegan, dessert).</li>
</ul>

</body>
</html>
