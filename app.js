$(document).ready(function(){

let getRecipe = (meal) => {
    let queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((response) => {
        console.log(response);  
        //TODO: Build an array of the required ingredients
        let ingredients = [];
        for (let i = 1; i < 20; i++) {

        }
        //console.log(ingredients);
        console.log(response.meals[0].strInstructions);

    })
}    

getRecipe("Creamy Tomato Soup");

})