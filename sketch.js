const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;
var LOGO = 2;
var PLAY = 1;
var END = 0;
var justText

var gameState = LOGO;
//declaring characters of the game
var asteroid, asteroidImage;
var rocket, rocketImage;
var star, starImage;
var saturn, saturnImage;
var earth, earthImage; 
var mercury, mercuryImage;
var sun, sunImage; 
var moon, moonImage;
var galaxy2, galaxy2Image;
var galaxy1, galaxy1Image;
var logo, logoImage
var astronaut, astronaut_image
var nicePlanet, nicePlanet_image;
var flare, flareImage;
var sound1, sound2, sound3; 
var soundTrack;
var opener, openerImage;
var crashSound;
//declaring sprites for end states
var gameOver, gameOverImage;
var restart, restartImage

//declaring groups
var asteroidsGroup;
var starsGroup;
var moonGroup;
var mercuryGroup;
var sunGroup;
var galaxy1Group;
var galaxy2Group;
var saturnGroup;
var earthGroup;
var astronautGroup;

//declaring  score 
var score;
var attempts;

//declaring edges
var edges;

//assigning images to sprites
function preload() {
  sunImage = loadImage    ("images/sun.png");
  logoImage = loadImage   ("images/pic.jpg");
  moonImage = loadImage   ("images/moon.png");
  flareImage = loadImage  ("images/flare.png");
  earthImage = loadImage  ("images/earth.png");
  starImage = loadImage   ("images/star.png");
  saturnImage = loadImage ("images/saturn.png");
  galaxy2Image = loadImage("images/ufo.png");
  mercuryImage = loadImage("images/mercury.png");
  restartImage = loadImage("images/restart.png");
  openerImage = loadImage ("images/spacess.png");
  rocketImage = loadImage ("images/rocket.png");
  galaxy1Image = loadImage("images/red.png");
  asteroidImage =loadImage("images/asteroid.png");
  gameOver_Image=loadImage("images/gameover.png");
  nicePlanet_Image=loadImage("images/blue.png");
  astronaut_Image = loadImage("images/astt.png");
  rocketImage = loadImage    ("images/rocket.png");

  crashSound = loadSound("sounds/mixkit-falling-hit-757.wav");
  //gameoversound = loadSound("sounds/game over.wav");
  soundTrack=loadSound("sounds/soundtrack.mp3")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //declaring rocket
  rocket = createSprite(windowWidth / 2, windowHeight - 50, 20, 5);
  rocket.addImage("rocket", rocketImage);
  rocket.scale = 0.35;
  score = 0;
  attempts = 0;
  edges = createEdgeSprites();


  ///declaring groups
  asteroidsGroup = new Group();
  starsGroup = new Group();
  moonGroup = new Group();
  mercuryGroup = new Group();
  sunGroup = new Group();
  galaxy1Group = new Group();
  galaxy2Group = new Group();
  saturnGroup = new Group();
  earthGroup = new Group();
  astronautGroup = new Group();
  nicePlanetGroup = new Group();
  flareGroup = new Group();
  //Declaring logo
  logo = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
  logo.addImage(logoImage);
  logo.scale = 1.5;
  logo.visible = true;
  //declaring message for clicking space
  opener = createSprite(logo.y+ 300, windowHeight - 295, 500, 100);
 opener.addImage(openerImage);
  opener.scale = 1;
  opener.visible = true;
  //opener.velocityX=5;

  //declaring sprites for end Game state
  gameOver = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
  gameOver.addImage(gameOver_Image);
  gameOver.scale = 1.5;
  restart = createSprite(windowWidth - 360, windowHeight / 2, 10, 10);
  restart.addImage(restartImage);
  restart.scale = 1;
  //setting for deciding time for end state sprites
  gameOver.visible = false;
  restart.visible = false;
}


function draw() {
  //Engine.update(engine);
  textSize(30);
  fill("yellow")
  text("Attempts: " + attempts, windowWidth - 250, windowHeight - 400);
   
  textSize(35);
  //text("PRESS THE SPACE BUTTON TO START THE GAME", windowWidth-100,wndowHeight-500)
  edges = createEdgeSprites();
  if (gameState === LOGO) {
    soundTrack.play();
      if (opener.x>windowWidth+100){
    opener.x=0;
  }

    
    background(260);
    rocket.visible = false;
    if (keyDown("space")) {
      gameState = PLAY
    }
  }
  if (gameState === PLAY) {
    rocket.collide(edges);
    gameOver.visible = false;
    restart.visible = false;
    logo.visible = false;
    opener.visible = false;
    soundTrack.play();
    background(20);
    textSize(30);
    text("Score: " + score, windowWidth - 250, windowHeight - 350);
    score = score + Math.round(frameCount / 200);
    rocket.visible = true;
    if (keyDown("LEFT_ARROW")) {
      rocket.x = rocket.x - 34;
    }
    if (keyDown("RIGHT_ARROW")) {
      rocket.x = rocket.x + 34;
    }
    asteroidShower();
    rocketVelocity();
    rocket.setCollider("circle", 0, 0, 100);
    rocket.debug=false;

    if (asteroidsGroup.isTouching(rocket)) {

      attempts = attempts + 1;
      gameState = END;
      asteroid.velocityY = 0;
      
      crashSound.play();
    }



  }
  if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    soundTrack.stop();
    asteroidsGroup.setVelocityYEach(0);
    asteroidsGroup.destroyEach();
    sunGroup.destroyEach();
    moonGroup.destroyEach();
    galaxy1Group.destroyEach();
    galaxy2Group.destroyEach();
    mercuryGroup.destroyEach();
    saturnGroup.destroyEach();
    earthGroup.destroyEach();
    astronautGroup.destroyEach();
    flareGroup.destroyEach();
    nicePlanetGroup.destroyEach();
    starsGroup.setVelocityYEach(0);
    rocket.x = windowWidth - 1200;
    rocket.y = windowHeight / 2;
    //rocket.scale=1;
    if (mousePressedOver(restart)) {
      reset();
    }

  }
  drawSprites();
}
//adding obstacles
function asteroidShower() {
  if (frameCount % 10 === 0) {
    asteroid = createSprite(30, 0, 500, 500);
    asteroid.addImage("asteroid", asteroidImage);
    asteroid.setCollider("circle", 0, 40, 415);
    asteroid.debug=false;
    asteroid.setCollider("circle", 0, 0, 200);
    asteroid.x = Math.round(random(windowWidth));
    asteroid.velocityY = +(10 + 5 * score / 1000)
    asteroid.scale = 0.2;
    //adding asteroids in asteroids group
    asteroidsGroup.add(asteroid);
    asteroid.depth = asteroid.depth + 5;
  }


}


//creating illusion for making rocket move
function rocketVelocity() {
  if (frameCount % 0.5 === 0) {
    star = createSprite(500, 0, 40, 10);
    star.x = Math.round(random(windowWidth));
    star.addImage(starImage);
    star.velocityY = 45;
    star.depth = rocket.depth;
    rocket.depth = rocket.depth + 1;
    star.scale = 0.05;
    starsGroup.add(star);
  }

  if (frameCount % 425 === 0) {
    earth = createSprite(500, 0, 40, 10);
    earth.addImage(earthImage);
    earth.x = Math.round(random(windowWidth));
    earth.scale = 0.4;
    earth.velocityY = 10;
    earthGroup.add(earth);



  }


  if (frameCount % 336 === 0) {
    saturn = createSprite(500, 0, 40, 10);
    saturn.addImage(saturnImage);
    saturn.x = Math.round(random(windowWidth));
    saturn.scale = 0.4;
    saturn.velocityY =5;
    saturnGroup.add(saturn);


  }

  if (frameCount % 243 === 0) {
    galaxy2 = createSprite(500, 0, 40, 10);
    galaxy2.addImage(galaxy2Image);
    galaxy2.x = Math.round(random(windowWidth));
    galaxy2.scale = 0.5;
    galaxy2.velocityY = 5;
    galaxy2Group.add(galaxy2);
  }

  if (frameCount % 159 === 0) {
    galaxy1 = createSprite(500, 0, 40, 10);
    galaxy1.addImage(galaxy1Image);
    galaxy1.x = Math.round(random(windowWidth));
    galaxy1.scale = 0.9;
    galaxy1.velocityY = 5;
    galaxy1Group.add(galaxy1);
  }

  if (frameCount % 744 === 0) {
    sun = createSprite(500, 0, 40, 10);
    sun.addImage(sunImage);
    sun.x = Math.round(random(windowWidth));
    sun.scale = 0.5;
    sun.velocityY = 7;
    sunGroup.add(sun);

  }
  if (frameCount % 673 === 0) {
    mercury = createSprite(500, 0, 40, 10);
    mercury.addImage(mercuryImage);
    mercury.x = Math.round(random(windowWidth));
    mercury.scale = 0.5;
    mercury.velocityY = 5;
    mercuryGroup.add(mercury);
  }
  if (frameCount % 288 === 0) {
    moon = createSprite(500, 0, 40, 10);
    moon.addImage(moonImage);
    moon.scale = 0.5;
    moon.x = Math.round(random(windowWidth));
    moon.velocityY = 5;
    moonGroup.add(moon);

  }
  if (frameCount % 388 === 0) {
    astronaut = createSprite(0, 300, 40, 10);
    astronaut.addImage(astronaut_Image);
    astronaut.scale = 1;
    astronaut.y = Math.round(random(windowWidth));
    astronaut.velocityX = 3;
    astronautGroup.add(astronaut);

  }
  if (frameCount % 456 === 0) {
    nicePlanet = createSprite(500, 0, 40, 10);
    nicePlanet.addImage(nicePlanet_Image);
    nicePlanet.scale = 0.3;
    nicePlanet.x = Math.round(random(windowWidth));
    nicePlanet.velocityY = 5;
    nicePlanetGroup.add(nicePlanet);

  }
  if (frameCount % 233 === 0) {
    flare = createSprite(500, 0, 40, 10);
    flare.addImage(flareImage);
    flare.scale = 0.5;
    flare.x = Math.round(random(windowWidth));
    flare.velocityY = 5;
    flareGroup.add(flare);

  }
}
//to reset te game
function reset() {
  gameState = PLAY;
  starsGroup.destroyEach();
  score = 0;
  rocket.x = windowWidth / 2;
  rocket.y = windowHeight - 50;

}