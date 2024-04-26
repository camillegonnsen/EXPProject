// topic for mqtt network
let topic = "group17";
let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
let x;
let y;
let frameColor;
let clockBackgroundColor;

function setup() {
  createCanvas(720, 400);
  stroke(255);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

  cx = width / 2;
  cy = height / 2;
  
  frameColor = color(Math.random()*255,Math.random()*255,Math.random()*255);
  clockBackgroundColor = color(Math.random()*255,Math.random()*255,Math.random()*255);
  
  setupMQTT(topic); // start network library
}

function draw() {
  background(230);

  // Draw the clock background
  noStroke();
  
  fill(frameColor);
  ellipse(cx, cy, clockDiameter + 10, clockDiameter + 10);
  fill(clockBackgroundColor);
  ellipse(cx, cy, clockDiameter, clockDiameter);

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock
  stroke(255);
  //Seconds
  strokeWeight(1);
  line(cx, cy, 230, 170);
  strokeWeight(2);
  //Minutes
  line(cx, cy, 280,280);
  strokeWeight(4);
  //Hour
  line(cx, cy, 350,120);

  // Draw the minute ticks
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();
}

function onMessage(message) {
  // call shoot function when receiving
  // network message
  x = message["x"];
  y = message["y"];
  frameColor = color(x, y, 158);
  clockBackgroundColor = color(y, x, 93);
  
  
}

function mouseClicked() {
    shoot(mouseX-50, mouseY-53.5);
}
