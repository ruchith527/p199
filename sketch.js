var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudimg;
var cactus;
var c1, c2, c3, c4, c5, c6;
var jumpSound;
var collided;
var cactusGroup, cloudsGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;




function preload() {
  trex_running = loadAnimation("images/d1.png", "images/d2.png", "images/d3.png" , "images/d4.png" , "images/d5.png", "images/d6.png");
  trex_collided = loadImage("images/d6.png");

  groundImage = loadImage("images/background.jpg");

  cloudimg = loadImage("images/spider.png");

  c1 = loadImage("obstacle1.png");
  //load images for cactus
  c2 = loadImage("images/turtle.gif");
  c3 = loadImage("images/turtleshow.gif");
  c4 = loadImage("obstacle4.png");
  c5 = loadImage("obstacle5.png");
  c6 = loadImage("images/turtlechill.png");
  goimg = loadImage("gameOver.png");
  reimg = loadImage("restart.png");
 haunted = loadImage("images/haunted.png");
  jumpSound = loadSound("jump.wav");
  collided = loadSound("collided.wav")
}


function setup() {

  createCanvas(windowWidth,windowHeight)
  ground = createSprite(width/2,height/2,width,height);
  ground.addImage("ground", groundImage);
  ground.scale = 2.5
  ground.x = ground.width / 2;
  //create a trex sprite
  trex = createSprite(50, height-150, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  house =createSprite(200, height-300, 20, 50);
  house .addImage("h", haunted)
  //create a ground sprite
 

  //creating invisible ground
  invisibleGround = createSprite(width/2, height-100, width, 10);
  invisibleGround.visible = false;

  //create group
  cactusGroup = createGroup();
  cloudsGroup = createGroup();


  trex.setCollider('circle', 0, 0, 50)

  gameOver = createSprite(width/2, height/2)
  gameOver.addImage(goimg);
  gameOver.scale = 0.6
  restart = createSprite(width/2, height/2+100)
  restart.addImage(reimg)
  restart.scale = 0.09
}

function draw() {
  //set background color
  background("skyblue");

  console.log(trex.y);
  textSize(15);

  fill(rgb(20, random(20, 100), random(30, 200)));
  text("Score : " + score, 50, 30)



  if (gameState === PLAY) {

    ground.velocityX = -(4 + score / 100);

    score = score + Math.round(getFrameRate() / 60);
    gameOver.visible = false;
    restart.visible = false;

    //jump when the space key is pressed
    if ((touches.length > 0 || keyDown("space")) && trex.y >= 160) {
      trex.velocityY = -10;
      jumpSound.play();
      touches = []
    }
    trex.velocityY = trex.velocityY + 0.6
    //infinite ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //infinite ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    movingClouds();
    movingcactus();
    if (trex.isTouching(cactusGroup)) {
      gameState = END
      collided.play()
      // jumpSound.play();
      //trex.velocityY = -12;
    }
  } else if (gameState === END) {

    ground.velocityX = 0;
    trex.velocityY = 0
    cactusGroup.setVelocityXEach(0)

    cloudsGroup.setVelocityXEach(0)

    cactusGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    gameOver.visible = true
    restart.visible = true

    trex.changeAnimation("collided", trex_collided);
    
    if(touches.length > 0 || mousePressedOver(restart)){
      reset();
      touches = []
    }

  }







  //stop trex from falling down
  trex.collide(invisibleGround);



  drawSprites();

}

function movingClouds() {

  if (frameCount % 80 === 0) {
    cloud = createSprite(width+20, height-900, 40, 10);
    cloud.velocityX = -3;
    cloud.addImage("cloud", cloudimg)
    cloud.scale = 0.2
    cloud.y = Math.round(random(200, 400));
    cloud.lifetime = width/cloud.velocityX;

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1

    cloudsGroup.add(cloud);

  }


}

function movingcactus() {

  if (frameCount % 90 === 0) {

    //create a sprite
    cactus = createSprite(width+20 , height-130, 10, 50)

    cactus.velocityX = -(5 + score / 100)

    //create a variable to store random number in it
    var rand = Math.round(random(1, 6));
    cactus.scale = 0.5;
    cactus.lifetime = width/cactus.velocityX;
    cactusGroup.add(cactus);
    cactus.setCollider('rectangle', 0, 0, 20, 50)
    //use switch statement
    switch (rand) {
      case 1:
        cactus.addImage("c1", c1);
        cactus.scale = 0.15;
        cactus.y = height-130
        cactus.setCollider('rectangle', 0, 0, 10, 50)

        break;
      case 2:
        cactus.addImage("c2", c2);
        cactus.scale = 0.15;
        cactus.y = height-130


        break;

      case 3:
        cactus.addImage("c3", c3);


        break;

      case 4:
        cactus.addImage("c4", c4);


        break;

      case 5:
        cactus.addImage("c5", c5);


        break;

      case 6:
        cactus.addImage("c6", c6);


        break;
      default:

        break;

    }


  }

}
function reset(){
  //change the gameState to play
  gameState=PLAY
  
  //make the score 0
  score=0
  
  //destroy the obstacles and the clouds
  cactusGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running)
  
  
}








