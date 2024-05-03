let clockFont;
let timeStr;
let topic = "group17dc";
let sound;
let threshold = 20;
let betasluk;

function preload() {
  // Load the sound file
  sound = loadSound('https://isamsa.dk/EXPProject/DigitalClock/Laptop/assests/audio.mp3'); // Replace 'your_sound_file.mp3' with the path to your sound file
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  clockFont = loadFont("digital-7.ttf");
  
  // Ensure audio starts after user interaction
  userStartAudio();

  setupMQTT(topic);
}

function draw() {
  background(0);
  clock();
  drawRect();
}

function clock() {
  fill("orange");
  // text of clock
  textFont(clockFont);
  textAlign(CENTER, CENTER);
  textSize(80);
  
  // define hour, min, secs, noon
  let Hour = hour();
  let min = minute();
  let secs = second();
  let noon = Hour >= 12? " PM" : " AM";
  
  // show clock
  if (min < 10) {
    min = "0" + min;
  }
  Hour %= 12;
  timeStr = Hour + ":" + min + ":" + secs + noon;
  text(timeStr, width/2, height/2);  
  
  // play sound
  if (secs == 0) {
    sound.play();
  }
}

function drawRect() {
  // Draw rectangle
  let rectWidth = textWidth(timeStr) + 20; // Width of the rectangle (text width + some padding)
  let rectHeight = textAscent() + textDescent() + 20; // Height of the rectangle (text height + some padding)
  noFill(); // No fill color for the rectangle
  stroke("purple"); // Stroke color for the rectangle
  strokeWeight(4);
  rect(width/2 - rectWidth/2, height/2 - rectHeight/2, rectWidth, rectHeight);
}

function onMessage(message) {
  if (message["betasluk"] != undefined) {
    betasluk = message["betasluk"];

    // Stop sound if betasluk is between 0 and 20
    if (betasluk >= 0 && betasluk <= 20) {
      sound.stop();
    }
  }

  console.log(betasluk);
}
