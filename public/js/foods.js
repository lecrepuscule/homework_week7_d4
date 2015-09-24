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
    $("<li class='food' data-id=" + food.id + "><a href='#'>" + food.name + "</a></li>").appendTo("#foods");
  })
}