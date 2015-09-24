$(document).on("ready", function(){
  console.log("testing");

  getIndex();

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

function appendFoods(foods){
  $.each(foods, function(index, food){
    $("<li class='food' data-id=" + food.id + "><a href='#'>" + food.name + "</a></li>").appendTo(".foods");
  })
}