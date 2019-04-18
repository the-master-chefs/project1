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
        <div class="row">
  <div class="col-sm-6">
      <div class="card" style="width: 18rem;">
  <img src="${response.meals[i].strMealThumb}" class="card-img-top" alt="none">
  <div class="card-body">
    <h5 class="card-title">${response.meals[i].strMeal}</h5>
    <a href="#" class="btn btn-primary">Looks Good</a>
  </div>
</div>
</div>
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

});


