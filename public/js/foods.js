$(document).on("ready", function(){
  console.log("testing");

  getIndex();

  $("#new-food-submit").on("click", createFood)

  $("body").on("click", ".delete-food", deleteFood);

})

function request(url, method, data){
  return $.ajax({
    url: url,
    method: method,
    dataType: "json",
    data: data
  })
}

function getIndex(){
  request("/foods", "get").done(appendFoods);
}

function createFood(e){
  e.preventDefault();
  var data = {
    name: $("#food-name").val(),
    yumminess: $("#food-yumminess").val()
  }
  request("/foods", "post", data).done(appendFoods);
}

function deleteFood(e){
  e.preventDefault();
  var url = "/foods/" + $(this).data("id");
  request(url, "delete").done(function(response){
    $("#food-"+ response[0].id).remove();
  })
}

function appendFoods(foods){
  $.each(foods, function(index, food){
    $("<tr class='food' id='food-" + food.id + "'><td>" + food.name + "</td><td>" + food.yumminess + "</td><td><button class='delete-food' data-id=" + food.id + ">Delete</button></td></tr>").appendTo("#foods");
  })
}