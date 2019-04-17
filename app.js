var cabinet = [];
var food = [];
$(document).ready(function(){

//collecting ingredients for master list
$("#salt").on("click", function (e) {
    e.preventDefault();           
        console.log("You have salt");
        cabinet.push($('#salt').val());
        $('#salt').attr('disabled', 'disabled');
      
});

$("#pepper").on("click", function (e) {
    e.preventDefault();         
        console.log("You have pepper");
        cabinet.push($('#pepper').val());
        $('#pepper').attr('disabled', 'disabled');
    
});


$("#olive-oil").on("click", function (e) {
    e.preventDefault();           
        console.log("You have olive oil");
        cabinet.push($('#olive-oil').val());
        $('#olive-oil').attr('disabled', 'disabled');
    
});

$("#baking-soda").on("click", function (e) {
    e.preventDefault();           
        console.log("You have baking soda");
        cabinet.push($('#baking-soda').val());
        $('#baking-soda').attr('disabled', 'disabled');
    
});

$("#eggs").on("click", function (e) {
    e.preventDefault();            
        console.log("You have eggs");
        cabinet.push($('#eggs').val());
        $('#eggs').attr('disabled', 'disabled');
    
});

$("#butter").on("click", function (e) {
    e.preventDefault();           
        console.log("You have butter");
        cabinet.push($('#butter').val());
        $('#butter').attr('disabled', 'disabled');
    
});

//collecting keyword for api search
$("form").on("submit", function (e) {
    e.preventDefault();            
        console.log("You want " + $('#keyword').val());
        food.push($('#keyword').val());
    
});

});
