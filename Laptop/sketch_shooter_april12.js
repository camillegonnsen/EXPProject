// three different bullet hole images
let shot1;
let shot2;
let shot3;

// shot audio
let shotSound;

// topic for mqtt network
let topic = "group17";

function setup() {
  createCanvas(windowWidth, windowHeight); // full screen
  clean();
  setupMQTT(topic); // start network library
}

let userColors = {};
function getUserColor(user) {
  if(!(user in userColors)) {
    let randomColor = [random(255), random(255), random(255)];
    userColors[user] = randomColor;
  }
  return userColors[user];
}

function onMessage(message) {
  // call shoot function when receiving
  // network message
  let alpha = message["alpha"] * 2;
  let beta = message["beta"] * 2;
  
  let x0 = (alpha+180) % 360;
  let x = map(x0, 0, 360, windowWidth, 0);
  let y0 = beta + 180;
  let y = map(y0, 0, 360, windowHeight, 0);
  
  console.log(y);
  
  let user = message["from"];
  
  shoot(x, y, user);
}


function draw() {

}

/* 
  preload method is for loading images
  and audio before application is started
*/
function preload() {
  shot1 = loadImage('assets/1.png');
  shot2 = loadImage('assets/2.png');
  shot3 = loadImage('assets/3.png');
  
  // use mp3 format
  soundFormats('mp3');
  // load file without extension
  shotSound = loadSound('assets/shot');
}

let lastShot = 0;

function now() {
  return Date.now() / 1000.0;
}

// this function places a bullet hole at x,y
// and plays a shooting sound
function shoot(x, y, user) {
  if(now() - lastShot < 0.5) {
    return;    
  }
  
  // pick a random bullet image
  let randomImage = random([shot1, shot2, shot3]);
  let userColor = getUserColor(user);
  tint(userColor);
  // place image
  image(randomImage, x, y);
  // play audio
  shotSound.play();
  
  lastShot = now();
  
  setTimeout(clean, 3000);
}

function clean() {
  background([random(255), random(255), random(255)]);  
}

// this function is only for testing
// will shoot at where the mouse is clicked
function mouseClicked() {
    shoot(mouseX-50, mouseY-53.5);
}
