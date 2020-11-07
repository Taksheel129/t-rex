var PLAY = 1;
var END = 0;
var gameState = PLAY;

var restart,restartI;
var gameover,gameoverI;
var monkey , monkey_run;
var banana ,bananaI, obstacle, obstacleI;
var FoodG, obstacleG;
var score = 0;
var ground;
var jumpsound,diesound;


function preload(){
  
    
  monkey_run =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaI = loadImage("banana.png");
  obstaceI = loadImage("obstacle.png");
  gameoverI = loadImage("71M3glE5W8L._SL1500_.jpg");
  restartI = loadImage("res.png");
  jumpsound = loadSound("salamisound-6941726-sfx-jump-9-game-computer.mp3");
  diesound = loadSound("die.mp3");
}



function setup() {
  createCanvas(600,500);
  monkey = createSprite(100,430);
  monkey.addAnimation("monkey",monkey_run);
  monkey.scale = 0.1;
 

  
  ground = createSprite(300,462,600,7);
  ground.x = ground.width / 2;
  
  gameover = createSprite(300,250);
  gameover.addImage("gameover",gameoverI);
  gameover.scale = 0.55;
 
  restart = createSprite(300,450);
  restart.addImage("restart",restartI);
  restart.scale = 0.05;
  restart.visible = false;
  
  obstacleG = new Group();
  bananaG = new Group();
}


function draw() {
  background("white");

  if(gameState === PLAY){
    
    ground.velocityX = -6;
    if(ground.x < 300){
    ground.x = ground.width / 2;
    }
    
    
    
    gameover.visible = false;
    restart.visible = false;
    
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("space") && monkey.y >= 410){
      monkey.velocityY = -24;
      jumpsound.play();
    }

    //gravity
    monkey.velocityY = monkey.velocityY + 0.9;  
  
  
    monkey.collide(ground);
  
    obs();
    bananas();
    
    
    if(obstacleG.isTouching(monkey)){
        gameState = END;
        diesound.play();
        
    }
  }  else if(gameState === END){
        obstacleG.destroyEach();
        bananaG.destroyEach();
        obstacleG.setVelocityX = 0;
        bananaG.setVelocityX = 0;
        
    
        gameover.visible = true;
        restart.visible = true;
    
    
        
        
  }
        ground.velocityX = 0;
        monkey.velocityX = 0;

  drawSprites();
  textSize(17);
  fill("red");
  stroke("red");
  text("SURVIVAL TIME : " + score,10,30);
}


function reset(){
  
  gameState = PLAY;
  score = 0;
  obstacleG.destroyEach();
  bananaG.destroyEach();
  monkey.addAnimation("monkey",monkey_run);
  
}


function obs(){
  if(frameCount % 200 === 0){
    obstacle = createSprite(610,431);
    obstacle.addImage("obs",obstaceI);
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    obstacle.lifetime = 150;
    obstacleG.add(obstacle);
  }
}

function bananas(){
  if(frameCount % 100 === 0){
    banana =  createSprite(610,Math.round(random(100,350)));
    banana.addImage("banana",bananaI);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 150;
    bananaG.add(banana);
  }
}

