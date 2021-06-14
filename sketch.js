//Create variables here
var dog, dogHappy, foodS, foodStock, database;
var fedTime, lastFed, feed, addFood;
var foodObj;
var gameState=0;
var readState;
var ChangeState;
var bed, garden, washroom;
var sleeping,bathing;
var LastFed=0;

function preload()
{
  rdog= loadImage("dogg.png")
  doggo= loadImage("doggo.png")
  bed=loadImage("Bed Room.png")
  garden=loadImage("Garden.png")
  washroom= loadImage("Wash Room.png")
  home=loadImage("Living Room.png")
	//load images here
}

function setup() {

	createCanvas(1000, 500);
  dog= createSprite(250,380,20,20)
  dog.addImage(rdog)
foodObj= new Food()
  dog.scale=0.3
 database= firebase.database()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

 

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  foody=database.ref('LastFed');
  foody.on("value",function(data){
    LastFed=data.val()
  })

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })
  
}


function draw() {  
background(46,139,87)
textSize(22)
fill("red")
text("Milk Bottles: "+ foodS, 150,40);
textSize(15)
fill("white")

  drawSprites();
  foodObj.display();
  if (LastFed >= 12) {
    text("Last Feed: " + LastFed %12 + "PM", 350, 30);
  }
  else if(LastFed == 0) {
    text("Last Feed: 12AM ", 350, 30);
  }
  else {
    text("Last Feed:  " + LastFed + "AM", 350, 30);
  }
  //add styles here
if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  //dog.remove();

}else {
  feed.show()
  addFood.show()
  dog.addImage(rdog)
}


currentTime=hour();
if(currentTime==(LastFed+1)){
  update("Playing");
  foodObj.garden()
  foodObj.scale=0.5
}else if(currentTime==(LastFed+2)){
  update("Sleeping")
  foodObj.bedroom()
  foodObj.scale=1
}else if(currentTime>(LastFed+2)&& currentTime<=(LastFed+4)){
  update("Bathing")
  foodObj.washroom()
  foodObj.scale=1
}else{
  update("Hungry")
  foodObj.display()
}

if(foodS == 0){
dog.addImage(doggo);
milkBottle2.visible=false;
}else{
  dog.addImage(dogg)
milkBottle2.visible=true;
}



if(gameState==1){
  dog.addImage(doggo)
  dog.scale=0.175
  dog.y=250
}
if(gameState==2){
  dog.addImage(dogg)
  do.scale=0.175
  dog.y=250
  milkBottle2.visible=false
}
var Bath=createButton("I want to take a Bath");
Bath.position(580,125);
if(Bath.mousePressed(function(){
  gameState=3
  database.ref('/').update({'gameState':gameState});
}))

if(gameState==3){
  dog.addImage(washroom)
  dog.scale=1
  milkBottle2.visible=false;
}
var Sleep=createButton("zZZ Feeling Sleepy");
Sleep.position(710,125);
if(Sleep.mousePressed(function(){
  gameState=4
  database.ref('/').update({'gameState':gameState});
}))
if(gameState==4){
  dog.addImage(bed)
  dog.scale=1
  milkBottle2.visible=false;
}
var Play=createButton("Lets Play!");
Play.position(500,160);
if(Play.mousePressed(function(){
  gameState=5
  database.ref('/').update({'gameState':gameState});
}))
if(gameState==5){
  dog.addImage(home)
  dog.scale=1;
  milkBottle2.visible=false;
}
var PG=createButton("Park Time!")
PG.position(585,160)
if(PG.mousePressed(function(){
  gameState=6
  database.ref('/').update({'gameState':gameState});
}))
if(gameState==6){
  dog.y=175
  dogg.addImage(garden)
  dog.scale=1
  milkBottle2.visible=false;
}
var But=createButton("Feed Me!")
 But.position(400,125);

if(But.mousePressed(fucntion(){
  foodS=foodS-1
  gameState=1
  database.ref('/').update({'gameState':gameState});
}))

}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}
//function to update food stock and last fed time
 


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState: state
  });
}