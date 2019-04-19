var cabinet = [];
var food = [];
let ingredients = [];
var matching = [];
$(document).ready(function() {
  //AJAX Request Function
  let getRecipe = meal => {
    let queryURL =
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {
      console.log(response);
      //Build an array of the required ingredients
     
      for (let i = 1; i < 20; i++) {
        $("#recipes").append(`
        
  
      <div class="card" style="width: 18rem;">
        <img src="${response.meals[i].strMealThumb}" class="card-img-top img-fluid" alt="none">
        <div class="card-body">
          <h5 class="card-title">${response.meals[i].strMeal}</h5>
          <a href="#" id = "recipe-card" class="btn btn-primary">Looks Good</a>
        </div>
        <br>
    </div>

    `);
        let currentIngredient = response.meals[0]["strIngredient" + i];
        if (currentIngredient !== "") {
          ingredients.push(currentIngredient);
        } else {
          break;
        }
      }
      //log api url
      console.log(queryURL);
      //Display Ingredients
      console.log(ingredients);
      //Display Recipe
      console.log(response.meals[0].strInstructions);


    });
  };

  //collecting ingredients for master list
  $("#salt").on("click", function(e) {
    e.preventDefault();
    console.log("You have salt");
    cabinet.push($("#salt").val());
    $("#salt").attr("disabled", "disabled");
  });

  $("#pepper").on("click", function(e) {
    e.preventDefault();
    console.log("You have pepper");
    cabinet.push($("#pepper").val());
    $("#pepper").attr("disabled", "disabled");
  });

  $("#olive-oil").on("click", function(e) {
    e.preventDefault();
    console.log("You have olive oil");
    cabinet.push($("#olive-oil").val());
    $("#olive-oil").attr("disabled", "disabled");
  });

  $("#baking-soda").on("click", function(e) {
    e.preventDefault();
    console.log("You have baking soda");
    cabinet.push($("#baking-soda").val());
    $("#baking-soda").attr("disabled", "disabled");
  });

  $("#eggs").on("click", function(e) {
    e.preventDefault();
    console.log("You have eggs");
    cabinet.push($("#eggs").val());
    $("#eggs").attr("disabled", "disabled");
  });

  $("#butter").on("click", function(e) {
    e.preventDefault();
    console.log("You have butter");
    cabinet.push($("#butter").val());
    $("#butter").attr("disabled", "disabled");
  });

  $("#water").on("click", function(e) {
    e.preventDefault();
    console.log("You have water");
    cabinet.push($("#water").val());
    $("#water").attr("disabled", "disabled");
  });

  //collecting keyword for api search
  $("form").on("submit", function(e) {
    e.preventDefault();
    console.log("You want " + $("#keyword").val());
    food.push($("#keyword").val());
    food.map(getRecipe);

  });


  //comparing ingredients between recipe and master


  //TODO: Display the Recipe Inside a Jumbotron
  let displayRecipe = (meal) => {
    let queryURL =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((response) => {
        let foodObj = response.meals[0];

        let recipeArray = foodObj.strInstructions.split(". ");
        let listElements = recipeArray.map(makeList);
        
        //This will be where we append the information to the jumbotron
        $("#recipes").append(`
            <div class="card shadow">
                <div class="card-header">
                    <h5>${meal}</h5>
                </div>
                <div class="card-body">
                    <img src="${foodObj.strMealThumb}" class="img-fluid mb-1" alt="food thumbnail" />
                    <h6 class="text-left">Recipe</h6>
                    <ul class="text-left unstyled">${listElements.join("")}</ul>
                </div>
            </div>
        `);
    });
  }

  //This will be the event listener for the food item
  $(document).on("click", ".class-of-meal-button", function(){
    let mealName = $(this).attr("wherever-we-put-the-name-of-the-meal");
    displayRecipe(mealName);
  });

});


