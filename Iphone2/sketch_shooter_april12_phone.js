let topic = "group17";
let threshold = 10; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('red');
  setupMQTT(topic);
  
}

function onMessage(message) {
  // empty by design
}


function draw() {
      if(orientationSensor.hasNewValue) {
        let gyro = orientationSensor.get()
        
        let message = {
            "from": config.myID,
            "alphaHour": gyro.alpha,
        };
        
        sendMessage(message);
      }
}


function touchStarted(){
  setupOrientation(threshold);
}
