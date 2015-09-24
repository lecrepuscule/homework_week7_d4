// REQUIREMENTS //
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// CONFIG //

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));

// body parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DATA //

// pre-seeded food data
var foods =[
  {id: 1, name: "Sushiritto", yumminess: "quite"},
  {id: 2, name: "Green Eggs & Ham", yumminess: "sure"},
  {id: 3, name: "Crayfish", yumminess: "depending"},
  {id: 4, name: "Foie Gras", yumminess: "omg"},
  {id: 5, name: "Kale", yumminess: "meh"}
]

var id = 5;

// middleware logging
app.use(function(req, res, next){
  console.log("%s request to %s from %s", req.method, req.url, req.ip);
  next();
})

// ROUTES //
var foodRouter = express.Router();
app.use("/foods", foodRouter);

// root path
app.get("/", function (req, res) {
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
})

// foods index path
app.get("/foods", function (req, res) {
  res.json(foods);
})

app.post("/foods", function (req, res) {
  id++;
  req.body.id = id;
  foods.push(req.body);
  res.json(foods[foods.length-1]);
})

app.delete("/foods/:id", function (req, res) {
  console.log("hitting delete route");
  // finding an object with id = req.body.id out of the foods
  // remove item from array
  // render deleted object
})

// listen on port 3000
app.listen(3000, function (){
  console.log("listening on port 3000");
})