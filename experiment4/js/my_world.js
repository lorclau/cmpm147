"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

let tilesetImage;

function p3_preload() {
  tilesetImage = loadImage("./img/puzzle.png");
}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

// Original 32W and 16H, other 94 x 47 or 64 x 32
function p3_tileWidth() {
  return 94;
}
function p3_tileHeight() {
  return 47;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = ((clicks[key] | 0) + 1) % 80;  // Cycle 0–79
}

let tileState = {}; // Stores z and zTarget for each tile


function p3_drawBefore() {
  background(0);

  // Reset all tile targets to flat
  for (let key in tileState) {
    tileState[key].zTarget = 0;
  }
}

function p3_drawTile(i, j) {
  push();

  let key = [i, j].toString();
  let tileIndex = clicks[key] !== undefined
    ? clicks[key]
    : XXH.h32("tile:" + [i, j], worldSeed) % 80;

  let sx = (tileIndex % 10) * 256;
  let sy = Math.floor(tileIndex / 10) * 128;

  imageMode(CENTER);
  image(tilesetImage, 0, 0, tw * 2, th * 2, sx, sy, 256, 128);

  pop();
}

// Hover to select tile
function p3_drawSelectedTile(i, j) {
  let key = [i, j].toString();

  if (!tileState[key]) {
    tileState[key] = { z: 0, zTarget: -10 };
  }

  // Update animation state (easing)
  tileState[key].zTarget = -10;
  tileState[key].z = lerp(tileState[key].z, tileState[key].zTarget, 0.2);

  push();

  // Redraw tile base to "erase" the one below
  fill(0);
  noStroke();
  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  // Shadow at base
  fill(200, 100);
  ellipse(0, 0, 20, 10);

  // Apply lift
  translate(0, tileState[key].z);

  // Redraw tile image
  let tileIndex = clicks[key] !== undefined
    ? clicks[key]
    : XXH.h32("tile:" + [i, j], worldSeed) % 80;

  let sx = (tileIndex % 10) * 256;
  let sy = Math.floor(tileIndex / 10) * 128;

  imageMode(CENTER);
  image(tilesetImage, 0, 0, tw * 2, th * 2, sx, sy, 256, 128);

  pop();
}

function p3_drawAfter() {}