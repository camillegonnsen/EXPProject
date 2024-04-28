// topic for mqtt network
let topic = "group17";
let cx, cy;
let dotRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
let frameColor;
let clockBackgroundColor;

let hourHandx;
let hourHandy;
let alphaHour;

let alphaMinute;

function setup() {
  createCanvas(720, 400);
  stroke(255);

  let radius = min(width, height) / 2;
  dotRadius = radius * 0.71;
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

  // Draw the clock frame and background
  noStroke();
  fill(frameColor);
  ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill(clockBackgroundColor);
  ellipse(cx, cy, clockDiameter, clockDiameter);



  // Map alphaHour to a value between 0 and TWO_PI, then subtract HALF_PI to make it start at the top
  let h = map(alphaHour, 360, 0, 0, TWO_PI) - HALF_PI;

  // Calculate the x and y coordinates for the hour hand based on the alphaHour value
  hourHandx = cx + cos(h) * hoursRadius;
  hourHandy = cy + sin(h) * hoursRadius;


  // Draw the hands of the clock
  stroke(255);
 
  strokeWeight(2);
  line(cx, cy, 280,280);
  strokeWeight(4);
  line(cx, cy, hourHandx, hourHandy); // Use the calculated x and y coordinates for the hour hand

  // Draw the minute ticks
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * dotRadius;
    let y = cy + sin(angle) * dotRadius;
    vertex(x, y);
  }
  endShape();
}



function onMessage(message) {
  // network message
  alphaHour = message["alphaHour"]
  alphaMinute = message["alphaMinute"];
  console.log(alphaHour);
  console.log(alphaMinute);
}
