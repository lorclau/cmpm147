/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
  return [
    {
      name: "Avocado", 
      assetUrl: "img/2.png",
      credit: "www.canva.com"
    },
    {
      name: "Apple", 
      assetUrl: "img/3.png",
      credit: "www.canva.com"
    },
    {
      name: "Pear", 
      assetUrl: "img/4.png",
      credit: "www.canva.com"
    }
  ];
}

function initDesign(inspiration) {
  let shapeCount = 200; // Increased number of shapes for better detail
  let design = {
    ellipses: []
  };

  // Use more, smaller ellipses to capture detailed contours
  for (let i = 0; i < shapeCount; i++) {
    design.ellipses.push({
      x: random(width),
      y: random(height),
      w: random(5, 30), // Smaller width for more precision
      h: random(5, 30), // Smaller height for more precision
      a: random(50, 200) // semi-transparent for blending
    });
  }

  return design;
}

function renderDesign(design, inspiration) {
  background(255); // white background for silhouette contrast
  noStroke();
  fill(0); // black color for ellipses to contrast on white background
  
  // Draw all ellipses
  for (let e of design.ellipses) {
    fill(0, e.a); // semi-transparent black to allow blending
    ellipse(e.x, e.y, e.w, e.h);
  }
}

function mutateDesign(design, inspiration, rate) {
  const mutationAmount = rate; // Rate determines mutation strength (0.01 to 1.0)

  for (let e of design.ellipses) {
    // Mutate position, size, and transparency with small incremental changes
    if (random() < mutationAmount) e.x += random(-2, 2); // Smaller mutation range for finer detail
    if (random() < mutationAmount) e.y += random(-2, 2); // Smaller mutation range for finer detail
    if (random() < mutationAmount) e.w += random(-2, 2); // Slight changes to width
    if (random() < mutationAmount) e.h += random(-2, 2); // Slight changes to height
    if (random() < mutationAmount) e.a += random(-5, 5); // Slight transparency changes

    // Ensure values stay within reasonable bounds
    e.x = constrain(e.x, 0, width);
    e.y = constrain(e.y, 0, height);
    e.w = constrain(e.w, 2, 40); // Smaller max width for finer detail
    e.h = constrain(e.h, 2, 40); // Smaller max height for finer detail
    e.a = constrain(e.a, 50, 255); // Keep some transparency for blending
  }
}