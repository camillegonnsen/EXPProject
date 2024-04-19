let topic = "group17";
let threshold = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('red');
  setupMQTT(topic);
  
}

function onMessage(message) {
  // empty by design
}

let alpha = 0.0;
let beta = 0.0;

function draw() {
  if(orientationSensor.hasNewValue) {
    let gyro = orientationSensor.get();
    alpha = gyro.alpha;
    beta = gyro.beta;
  }
}

function touchStarted() {
  setupOrientation(threshold);

  sendMessage({
    "from": config.myID,
    "x": mouseX,
    "y": mouseY
  });
}
