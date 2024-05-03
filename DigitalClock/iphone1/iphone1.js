let topic = "group17dc";
let threshold = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('orange');
  setupMQTT(topic);
}

let beta = 0;

function draw() {
    if (orientationSensor.hasNewValue) {
      let gyro = orientationSensor.get();
      
      let message = {
        "from": config.myID,
        "betasluk": gyro.beta
      };
      
      sendMessage(message);
    }
    

}

function onMessage(message) {
}

function touchStarted() {
  setupOrientation(threshold);

}
