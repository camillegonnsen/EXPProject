// topic for mqtt network
let topic = "group17";

function setup() {
  createCanvas(windowWidth, windowHeight); // full screen
  setupMQTT(topic); // start network library
}


function onMessage(message) {
  // network message
  let x = message["x"];
  let y = message["y"];
  
  background(y,x,255);
  
}


function draw() {

}

// this function is only for testing
// will shoot at where the mouse is clicked
function mouseClicked() {
    shoot(mouseX-50, mouseY-53.5);
}
