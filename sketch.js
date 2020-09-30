var backGroundImage,backGround;
var monkey, monkey_running
var ground, ground_img

var obstaclesGroup, obstacles_img;
var bananaGroup, banana_img

var score=0;
var gameover

function preload(){
  backGroundImage=loadImage("jungle.jpg")
monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  banana_img=loadImage("banana.png");
  obstacles_img=loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);
  
  backGround=createSprite(0,0,800,400);
  backGround.addImage(backGroundImage);
  backGround.scale=1.5;
  backGround.x=backGround.width/2;
  backGround.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  ground.velocityX=-4;
  
  BananaGroup= new Group();
  obstaclesGroup= new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
  
  if(ground.x<0){
  ground.x=ground.width/2  
  }
  if(backGround.x<100){
    backGround .x=backGround.width/2;
  }
 if(BananaGroup.isTouching(monkey)){
      BananaGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }

if (keyDown("space")){
monkey.velocityY=-12;
}
monkey.velocityY=monkey.velocityY+0.8;
  
monkey.collide(ground);
  
  if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
     score=0; 
    }
  
  
  
spawnBanana();
spawnObstacles();
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnBanana(){

if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(banana_img);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    BananaGroup.add(banana);
    
  }
}
function spawnObstacles(){
if(frameCount%300===0) {  
   var obstacle=createSprite(400,350,20,20)
  
   obstacle.addImage(obstacles_img);
  
  obstaclesGroup.add(obstacle);
  
  obstacle.scale=0.3;
  
  obstacle.velocityX=-7;

  obstacle.lifetime=200
  
  monkey.depth=obstacle.depth+1;

}
}