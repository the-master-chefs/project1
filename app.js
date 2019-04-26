var cabinet = [];
var food = [];
let ingredients = [];
$(document).ready(function() {
	//AJAX Request Function
	let getRecipe = (meal) => {
		let queryURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + meal;

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then((response) => {
			console.log(response);
			//Build an array of the required ingredients

			for (let i = 1; i < 20; i++) {
				$('#recipes').append(`       
        
<div class="food-card hover-blur">
<a href="#" class="card-link" value="${response.meals[i].strMeal}">
  <img class="card-img" src="${response.meals[i].strMealThumb}" alt="img">
  <div class="card-img-overlay text-white d-flex flex-column justify-content-center" style="top: 118px;">
    <h4 class="card-title">${response.meals[i].strMeal}</h4>
    <h5 class="card-subtitle mb-2" id="sub">${response.meals[i].strArea}</h5>
    </div>
    </a>
  </div>
</div>

        
        `);
				let currentIngredient = response.meals[0]['strIngredient' + i];
				if (currentIngredient !== '') {
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

	$('#salt').on('click', function(e) {
		e.preventDefault();
		console.log('You have salt');
		cabinet.push($('#salt').val());
		$('#salt').attr('disabled', 'disabled');
	});

	$('#pepper').on('click', function(e) {
		e.preventDefault();
		console.log('You have pepper');
		cabinet.push($('#pepper').val());
		$('#pepper').attr('disabled', 'disabled');
	});

	$('#olive-oil').on('click', function(e) {
		e.preventDefault();
		console.log('You have olive oil');
		cabinet.push($('#olive-oil').val());
		$('#olive-oil').attr('disabled', 'disabled');
	});

	$('#baking-soda').on('click', function(e) {
		e.preventDefault();
		console.log('You have baking soda');
		cabinet.push($('#baking-soda').val());
		$('#baking-soda').attr('disabled', 'disabled');
	});

	$('#eggs').on('click', function(e) {
		e.preventDefault();
		console.log('You have eggs');
		cabinet.push($('#eggs').val());
		$('#eggs').attr('disabled', 'disabled');
	});

	$('#butter').on('click', function(e) {
		e.preventDefault();
		console.log('You have butter');
		cabinet.push($('#butter').val());
		$('#butter').attr('disabled', 'disabled');
	});

	$('#water').on('click', function(e) {
		e.preventDefault();
		console.log('You have water');
		cabinet.push($('#water').val());
		$('#water').attr('disabled', 'disabled');
	});

	//collecting keyword for api search
	$('form').on('submit', function(e) {
		e.preventDefault();
		console.log('You want ' + $('#keyword').val());
		food.push($('#keyword').val());
    food.map(getRecipe);
    scroll();
	});

	//comparing ingredients between recipe and master

	//Make List Function
	let makeList = function(sentence) {
		return `<li>- ${sentence}</li>`;
	};
	//Make <p> elements
	let makePara = function(item) {
		return `<p>${item}</p>`;
	};

	//Capitalize First Letter
	function capitalizeFirst(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	//TODO: Display the Recipe Inside a Jumbotron
	let displayRecipe = (meal) => {
		let queryURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + meal;

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then((response) => {
			let foodObj = response.meals[0];

			let recipeArray = foodObj.strInstructions.split('. ');
			let listElements = recipeArray.map(makePara);

			let currentIngredientList = [];
			for (let i = 1; i < 20; i++) {
        let currentIngredient =
          response.meals[0]["strMeasure" + i] +
          " " +
          response.meals[0]["strIngredient" + i];
        if (currentIngredient !== "") {
          currentIngredientList.push(currentIngredient);
        } else {
          console.log(currentIngredientList);
          break;
        }
      };
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
			var toTitleCase = function(str) {
				str = str.toLowerCase().split(' ');
				for (var i = 0; i < str.length; i++) {
					str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
				}
				return str.join(' ');
			};

			console.log('Cabinet: ' + cabinet.join(', '));
			console.log('Matching: ' + toTitleCase(matching.join(', ')));
			console.log('Needed: ' + toTitleCase(needed.join(', ')));

			//This will be where we append the information to the jumbotron.
			//I'll edit this with the corresponding ids, and classes
			$('#recipe-tron').html(`
          <div id="recipe-tron-inner" class="jumbotron mx-auto">
            <div class="text-right">
              <p id="calories">Loading...</p>
            </div>
            <div id="title-section">
              <p id="recipe-title" class="text-left">${toTitleCase(meal)}</p>
              <p id="recipe-origin" class="text-left">Origin: ${foodObj.strArea}</p>
            </div>
            <div class="row">
              <div class="col-md-6">
                <img class="img-fluid img-thumbnail" src="${foodObj.strMealThumb}" alt="food">
              </div>
              <div id="ingredient-list" class="col-md-6 d-flex flex-column text-right justify-content-center">
                ${ingredientDisplay.join(' ')}
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <p>
                  <ul class="unstyled">${listElements.join(' ')}</ul>
                  <ul class="unstyled"><span id="val">Available:</span> ${toTitleCase(matching.join(', '))}</ul>
                  <ul class="unstyled"><span id="val">Needed:</span> ${toTitleCase(needed.join(', '))}</ul>
                </p>
              </div>
            </div>
          </div>
      `);
      //$(document).on("click", "#calories", function(){
        calTotal(currentIngredientList);
      //})
		});
	};
	//Test
	//displayRecipe("Creamy Tomato Soup");

	//This will be the event listener for the food item
	$(document).on('click', '.card-link', function(e) {
		//Each button could have either an id, or a value with the meal name in it
		e.preventDefault();
		let mealName = $(this).attr('value');
		$('#recipe-tron').empty();
		displayRecipe(mealName);
  });
  
  $(document).on("click", ".card-link", function(event) {
    event.preventDefault();
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#recipe-tron").offset().top
      },
      1000
    );
  });

  //scrolls page from recipe search click to recipe cards div
  function scroll() {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#recipes").offset().top
      },
      1000
    );
  }

  function calTotal(array) {
    //URL to pull from //example: https://api.edamam.com/api/nutrition-data?app_id=0d8a9a85&app_key=a32fd165fbb5bc39af8e2d82099ea9e9&ingr=1%20large%20apple
    let totalCalories = 0;
    let localCalories = [];
    for (let i = 0; i < array.length; i++) {
      let queryURL = "https://api.edamam.com/api/nutrition-data?app_id=d4fa434c&app_key=f81ff4dab99fcb211f2e761d6dc73511&ingr=" + array[i];
      $.ajax({
        url: queryURL,
        method: "GET",
        dataType: 'jsonp',
      }).then(function(response) {
        localCalories.push(response.calories);
        totalCalories += response.calories;
        if (localCalories.length === array.length) {
          $("#calories").empty().text(`${totalCalories} Calories`);
         }
      });
    }
  };

});
