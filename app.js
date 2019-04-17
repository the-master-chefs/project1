var cabinet = [];
$(document).ready(function(){

//collecting ingredients for master list
$("#salt").on("click", function (e) {
    e.preventDefault();
    if (e) {             
        console.log("You have salt");
        cabinet.push($('#salt').val());
        $('#salt').attr('disabled', 'disabled');
      }
});

$("#pepper").on("click", function (e) {
    e.preventDefault();
    if (e) {             
        console.log("You have pepper");
        cabinet.push($('#pepper').val());
        $('#pepper').attr('disabled', 'disabled');
    }
});


$("#olive-oil").on("click", function (e) {
    e.preventDefault();
    if (e) {             
        console.log("You have olive oil");
        cabinet.push($('#olive-oil').val());
        $('#olive-oil').attr('disabled', 'disabled');
    }
});

});