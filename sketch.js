var cols, rows;
var  w = 25;
var grid = [], stack = [], route = [], deadend = [];
var current;
var framerate = 21;
var state = 'renderMaze';
var start, finish, mompos;
var bg;

function setup() {
  frameRate(framerate);
  createCanvas(600, 600);
  cols = floor(width / w);
  rows = floor(height / w);
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {
      var cell = new Cell(x,y);
      grid.push(cell);
    }
  }
  current = grid[index(0,0)];
  start = grid[0];
  mompos = start;
  mompos.isstart = true;
  finish = grid[grid.length - 1];
  finish.isfinish = true;
}

function draw() {
  background(0);
  if (state === 'renderMaze') {renderMaze()}
  if (state ===  'solveMaze') { solveMaze()}
  textSize(24);
  stroke(2);
  text('↑ = schneller', 20, height - 80);
  text('↓ = langsamer', 20, height - 60);
  text('← = render Maze', 20, height - 40);
  text('→ = solve Maze', 20, height - 20);
}

function renderMaze() {
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.highlight(220,220,220,255);
  current.visited = true;
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current,next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

function solveMaze() {
  if (mompos != finish) {
    var next = mompos.nextCell();
    if (next) {
      route.push(mompos);
      mompos = next;
      mompos.isway = true;
    }
    else if (route.length > 0) {
      deadend.push(mompos);
      mompos = route.pop();
    }
    else {
      noLoop();
    }
  } else {
    console.log('He did it!');
    noLoop();
  }
  showRoute();
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    framerate += 5;
    frameRate(framerate);
    console.log('Framerate: ' + framerate);
  }
  else if (keyCode == DOWN_ARROW) {
    framerate -= 5;
    frameRate(framerate);
    if (framerate < 0) {framerate = 1}
    console.log('Framerate: ' + framerate);
  }
  else if (keyCode == LEFT_ARROW) {
    state = 'renderMaze';
    console.log('renderMaze');
  }
  else if (keyCode == RIGHT_ARROW) {
    state = 'solveMaze';
    console.log('solveMaze');
  }
}

function index(x,y) {
  if (x < 0 || y < 0 || x > cols-1 ||y > cols-1) {
    return -1;
  }
  return y + x * cols;
}

function removeWalls(a, b) {
  var x = a.x - b.x;
  if (x === 1) {
    a.left = false;
    b.right = false;
  } else if (x === -1) {
    a.right = false;
    b.left = false;
  }
    var y = a.y - b.y;
    if (y === 1) {
      a.top = false;
      b.bot = false;
    } else if (y === -1) {
      a.bot = false;
      b.top = false;
    }
}

function showRoute() {
  current.highlight(192,255,0,100);
  for (var i = 0; i < route.length; i++) {
    route[i].highlight(255,255,120,100);
  }
  for (var i = 0; i < deadend.length; i++) {
    deadend[i].highlight(50, 50, 50, 255);
  }
}

















// scrollen macht spaß
