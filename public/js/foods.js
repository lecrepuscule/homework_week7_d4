$(document).on("ready", function(){
  console.log("testing");

  getIndex();

  $("#new-food-submit").on("click", createFood)

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

function appendFoods(foods){
  $.each(foods, function(index, food){
    $("<tr class='food' id='" + food.id + "'><td data-id=" + food.id + ">" + food.name + "</td><td>" + food.yumminess + "</td><td><button class='delete-food'>Delete</button></td></tr>").appendTo("#foods");
  })
}