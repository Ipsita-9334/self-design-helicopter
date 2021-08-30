var PLAY = 1;
var END = 0;
var gameState = PLAY;


var sea, invisibleGround, seaImage;
var purpleBirdAnimation, blueBirdAnimation;
var helicopterRightImg, helicopterLeftImg;
var cloud1Img, cloud2Img, cloud3Img, darkcloud1Img,darkcloud2Img;
var ship1Img, ship2Img;
var cloudsGroup, darkCloudsGroup, shipsGroup1,shipsGroup2, purpleBirdsGroup, BlueBirdsGroup;
var helicopter;
var score = 0;

function preload(){
  seaImage = loadImage("IMAGES/sea1.png");
  purpleBirdAnimation = loadAnimation("IMAGES/purpleB1.png", "IMAGES/purpleB2.png", "IMAGES/purpleB3.png");
  blueBirdAnimation = loadAnimation("IMAGES/blueB1.png", "IMAGES/blueB2.png", "IMAGES/blueB3.png", "IMAGES/blueB4.png", 
  "IMAGES/blueB5.png", "IMAGES/blueB6.png", "IMAGES/blueB8.png","IMAGES/blueB9.png");
  helicopterLeftImg  = loadImage("IMAGES/helicopterLeft.png");
  helicopterRightImg = loadImage("IMAGES/helicopterRight.jpg");
  cloud1Img = loadImage("IMAGES/c1.png");
  cloud2Img = loadImage("IMAGES/c2.png");
  cloud3Img = loadImage("IMAGES/c3.png");
  darkcloud1Img = loadImage("IMAGES/dc1.png");
  darkcloud2Img = loadImage("IMAGES/dc2.png");
  ship1Img = loadImage("IMAGES/ship1.png");
  ship2Img = loadImage("IMAGES/ship2.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sea = createSprite(width/2, height + 50, width, 300);
  sea.addImage(seaImage);
  sea.scale = 5;
  sea.x = sea.width/2;
  sea.setCollider("rectangle", 0,0, sea.width, sea.height - 100);

  helicopter = createSprite(width/2, 100, 10,10);
  helicopter.addImage("left", helicopterLeftImg);
  helicopter.addImage("right", helicopterRightImg);
  helicopter.scale = 0.1;

  sea.debug = true;
  helicopter.debug = true;

  cloudsGroup = new Group();
  darkCloudsGroup = new Group();
  shipsGroup1 = new Group();
  shipsGroup2 = new Group();
  purpleBirdsGroup = new Group();
  blueBirdsGroup = new Group();


}

function draw() {
  //trex.debug = true;
  background(225);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  if(gameState === PLAY){
    score = score +Math.round(getFrameRate()/30);
    if(helicopter.isTouching(darkCloudsGroup)){
      score = score - 1;
      darkCloudsGroup.destroyEach();
    }

    if(helicopter.isTouching(purpleBirdsGroup)){
      score = score - 5;
      purpleBirdsGroup.destroyEach();
    }

    if(helicopter.isTouching(blueBirdsGroup)){
      score = score - 10;
      blueBirdsGroup.destroyEach();
    }

    sea.velocityX = 0.5;
    if(sea.x < 100){
      sea.x = sea.width/2;
    }
    sea.depth = helicopter.depth + 1;

    helicopter.velocityY = helicopter.velocityY + 0.5;
    if(keyDown("SPACE")){
      helicopter.velocityY = -5;
    }
    if(keyDown("LEFT_ARROW")){
      helicopter.x = helicopter.x - 3;
    }
    if(keyDown("RIGHT_ARROW")){
      helicopter.x = helicopter.x + 3;
    }


    helicopter.collide(shipsGroup1);
    helicopter.collide(shipsGroup2);

    if(helicopter.isTouching(sea)){
      gameState = END;
    }

    var rand = Math.round(random(1,4))
    if(frameCount % 100 === 0){
      switch(rand){
        case 1:
              spawnClouds();
              break;
        case 2:
              spawnPurpleBird()  
              break;
        case 3:
              spawnDarkClouds();
              break;
        case 4:
               spawnbluebird();
               break;   
      }
    }
    var rand2 = Math.random(round(1,2))
    if(frameCount % 300 === 0){
      switch(rand2){
        case 1:
          spawnShip1();
          break;
        case 2:
          spawnShip2();
          break;  
      }
    }
  }
  else if(gameState === END){
    sea.velocityX = 0;
    shipsGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    darkCloudsGroup.setVelocityXEach(0);
    purpleBirdsGroup.setVelocityXEach(0);
    blueBirdsGroup.setVelocityXEach(0); 
  }


  
  
  
  drawSprites();
}

function spawnClouds(){
  if(frameCount % 150 === 0){
     var cloud = createSprite(width+20, height-300,40,10);
     cloud.y = Math.round(random(100,350));
     var rand = Math.round(random(1,3));
     switch(rand){
       case 1: cloud.addImage(cloud1Img);
       cloud.scale = 0.2;
       break;
       case 2 : cloud.addImage(cloud2Img);
       cloud.scale = 0.7;
       break;
       case 3: cloud.addImage(cloud3Img);
       cloud.scale = 0.9;
       break;
     }
    
    cloud.velocityX = -3;
    cloud.lifetime = windowWidth;
    cloud.debug = true; 
    cloudsGroup.add(cloud);
  }
}

function spawnShip1(){
 
    var ship = createSprite(width, height-250, 10,10);
    ship.velocityX = -2;
    
   ship.addImage(ship1Img);
    ship.scale = 2.5;
    ship.lifetime = width;
    ship.depth = sea.depth + 1;
    shipsGroup.add(ship);
    ship.debug = true;
  
}

function spawnShip2(){
 
    var ship = createSprite(width, height-250, 10,10);
    ship.velocityX = -2;
    ship.setCollider("rectangle", 0,0, ship.Width-50, ship.height/2);
    ship.addImage(ship2Img);
    ship.scale = 2.5;
    ship.lifetime = width;
    ship.depth = sea.depth + 1;
    shipsGroup.add(ship);
    ship.debug = true;
  
}

function spawnDarkClouds(){
  if(frameCount % 300 ===0 ){
    var darkCloud = createSprite(width+30, height-100, 30, 100);
    darkCloud.y = Math.round(random(50,100));
    darkCloud.y = Math.round(random(100,300));
     var rand = Math.round(random(1,2));
     switch(rand){
       case 1: darkCloud.addImage(darkcloud1Img);
       darkCloud.scale = 0.2;
       break;
       case 2 : darkCloud.addImage(darkcloud2Img);
       darkCloud.scale = 0.7;
       break;
     }
    darkCloud.scale = 0.5;
    darkCloud.velocityX = -2;
    darkCloud.lifetime = windowWidth;
    darkCloudsGroup.add(darkCloud);
    darkCloud.debug = true;
  }
}

function spawnPurpleBird(){
  if(frameCount % 200 === 0){
    var purplebird = createSprite(600,height-95,20,30);
    purplebird.velocityX = -3;
    purplebird.addAnimation(purpleBirdAnimation);
    purplebird.scale = 1;
    purplebird.lifetime = displayWidth;
    purpleBirdsGroup.add(purplebird);
    purplebird.debug = true;
  }
}

function spawnbluebird(){
  if(frameCount % 250 === 0){
    var bluebird = createSprite(600, height - 85, 20, 30);
    bluebird.velocityX = -4;
    bluebird.addAnimation(blueBirdAnimation);
    bluebird.scale = 2;
    bluebird.lifetime = displayWidth;
    blueBirdsGroup.add(bluebird);
    bluebird.debug = true;
  }
}
