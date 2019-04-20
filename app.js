var cabinet = [];
var food = [];
let ingredients = [];
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
        
      <div class="card p-2 bd-highlight food-card">
  <img src="${response.meals[i].strMealThumb}" class="card-img-top img-fluid" alt="none">
  <div class="card-body">
    <h5 class="card-title">${response.meals[i].strMeal}</h5>
    <a href="#" id = "recipe-card" class="btn btn-primary looks-good" value="${response.meals[i].strMeal}">Looks Good</a>
  </div>
  </div>
  <br>
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

  //Make List Function
  let makeList = function(sentence) {
    return `<li>- ${sentence}</li>`;
  }
  //Make <p> elements
  let makePara = function(item) {
    return `<p>${item}</p>`
  }

  //Capitalize First Letter
  function capitalizeFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }


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
        let listElements = recipeArray.map(makePara);

        let currentIngredientList = [];
        for (let i = 1; i < 20; i++) {
          let currentIngredient = response.meals[0]["strIngredient" + i];
          if (currentIngredient !== "") {
            currentIngredientList.push(currentIngredient);
          } else {
            console.log(currentIngredientList);
            break;
          }
        }
        let ingredientDisplay = currentIngredientList.map(makePara);

        //Check for matching ingredients
        let matching = [];
        let needed = [];
        for (let i = 0; i < currentIngredientList.length; i++) {
          if (cabinet.includes(currentIngredientList[i]) == true) {
            matching.push(currentIngredientList[i]);
          }
          if (cabinet.includes(currentIngredientList[i]) !== true) {
            needed.push(currentIngredientList[i]);
          }
        }
        var toTitleCase = function (str) {
          str = str.toLowerCase().split(' ');
          for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
          }
          return str.join(' ');
        };
        
        console.log("Cabinet: " + cabinet.join(', '));
        console.log("Matching: " + toTitleCase(matching.join(', ')));
        console.log("Needed: " + toTitleCase(needed.join(', ')));
        
        //This will be where we append the information to the jumbotron.
        //I'll edit this with the corresponding ids, and classes
        $("#recipe-tron").html(`
          <div id="recipe-tron-inner" class="jumbotron mx-auto">
            <div class="text-right">
              <p id="calories">Calories will go here!</p>
            </div>
            <div id="title-section">
              <p id="recipe-title" class="text-center">${meal}</p>
              <p id="recipe-origin" class="text-center">Origin Culture: ${foodObj.strArea}</p>
            </div>
            <div class="row">
              <div class="col-md-6">
                <img class="img-fluid img-thumbnail" src="${foodObj.strMealThumb}" alt="">
              </div>
              <div id="ingredient-list" class="col-md-6 d-flex flex-column text-center justify-content-center">
                ${ingredientDisplay.join(" ")}
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <p>
                  <ul class="unstyled">${listElements.join(" ")}</ul>
                </p>
              </div>
            </div>
          </div>
        `);
    });
  }
  //Test
  //displayRecipe("Creamy Tomato Soup");

  //This will be the event listener for the food item
  $(document).on("click", ".looks-good", function(e){
    //Each button could have either an id, or a value with the meal name in it
    e.preventDefault();
    let mealName = $(this).attr("value");
    $("#recipe-tron").empty();
    displayRecipe(mealName);
  });

});


