// sketch.js - experiment 2, living impressions
// Author: Lorraine Torres
// Date: 4/12/25

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

let cloudGraphics;
let cloudOffsetX = 0;
let cloudOffsetY = 0;
let mountainOffsets = [];

let trianglePeakX, trianglePeakY, triangleBaseLeftX;
let smallPeakX, smallPeakY, smallBaseRightX;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  noStroke();
  colorMode(HSB, 380, 100, 100, 100);

  cloudGraphics = createGraphics(width, height);
  cloudGraphics.clear();
  cloudGraphics.noStroke();

  // Get initial random offsets for each mountain layer
  let layers = 6;
  for (let i = 0; i < layers; i++) {
    mountainOffsets.push(random(1000));
  }
  
  // Generate random mountain peak and base (only once)
  trianglePeakX = random(width * 0.7, width * 0.95); // Peak remains close to right side
  trianglePeakY = random(-10, height * 0.6); // Allow peak to go off-screen
  triangleBaseLeftX = random(width * 0.1, width * 0.4); // Start base much further left for wider triangle
  
    // Generate random shape for small triangle mountain (left side)
  smallPeakX = random(width * 0.15, width * 0.35);
  smallPeakY = random(height * 0.50, height * 0.80);
  smallBaseRightX = random(width * 0.4, width * 0.6);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);    
  // call a method on the instance
  myInstance.myMethod();

  drawSkyGradient();

  let layers = mountainOffsets.length;
  for (let i = 0; i < layers; i++) {
    let baseHue = 205;

    // Increase saturation for the darkest layer
    let saturation = map(i, 0, layers - 1, 40, 70); // Increase saturation for closer layers

    // Invert brightness & alpha for realistic depth
    let brightness = map(i, 0, layers, 90, 30); // far = light, close = dark
    let alpha = map(i, 0, layers, 30, 100);     // far = transparent, close = opaque

    let yOffset = map(i, 0, layers, height * 0.3, height * 0.9);
    let noiseDetailLevel = map(i, 0, layers, 0.005, 0.02);

    let mountainColor = color(baseHue, saturation, brightness, alpha); // Increased saturation dynamically
    drawMountainLayer(yOffset, noiseDetailLevel, mountainColor, mountainOffsets[i]);
  }
  
  drawSmallTriangleMountain();
  drawBigTriangleMountain();

  drawClouds();
}

function drawBigTriangleMountain() {
  fill(220, 80, 20, 100); // Dark blue in HSB
  noStroke();

  beginShape();
  vertex(triangleBaseLeftX, height);  // Base left (precomputed)
  vertex(trianglePeakX, trianglePeakY); // Peak (precomputed)
  vertex(width, height); // Base right (fixed)
  endShape(CLOSE);
}

function drawSmallTriangleMountain() {
  fill(220, 60, 30, 80); // Slightly lighter dark blue, a bit more transparent
  noStroke();

  beginShape();
  vertex(0, height);                // Base left (fixed)
  vertex(smallPeakX, smallPeakY);  // Peak (precomputed)
  vertex(smallBaseRightX, height); // Base right (precomputed)
  endShape(CLOSE);
}

function drawSkyGradient() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let skyColor = lerpColor(color(210, 50, 100), color(220, 60, 70), inter);
    stroke(skyColor);
    line(0, y, width, y);
  }
}

function drawMountainLayer(yOffset, noiseScale, mountainColor, offsetX) {
  noStroke();
  fill(mountainColor);
  beginShape();
  for (let x = 0; x <= width; x += 20) {
    let y = noise(x * noiseScale + offsetX) * 200 + yOffset;
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function drawClouds() {
  cloudGraphics.clear();
  cloudGraphics.colorMode(RGB); // ensure pure white
  cloudGraphics.noStroke();

  for (let x = 0; x < width; x += 5) {
    for (let y = 0; y < height * 0.6; y += 5) {
      let noiseVal = noise(x * 0.01 + cloudOffsetX, y * 0.01 + cloudOffsetY);
      if (noiseVal > 0.55) {
        let alpha = map(noiseVal, 0.55, 1, 0, 60); // brighter, more visible
        cloudGraphics.fill(255, 255, 255, alpha); // white in RGB
        cloudGraphics.ellipse(x, y, 20, 15);
      }
    }
  }

  image(cloudGraphics, 0, 0);
  cloudOffsetX += 0.001;
  cloudOffsetY += 0.0003;
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}