let cols = 100;//define the resolution of the display
let rows = 100;
let grid = [];//initialise a grid to store each cell
let lastUpdate = [];
let delayTime = 100;
let cellSize = 6;  //size of each cell allows for visual scaling

function setup() {//initialise the display
  createCanvas(cols * cellSize, rows * cellSize);

  for (let i = 0; i < cols; i++) {
    grid.push([]);
    lastUpdate.push([]);
    for (let j = 0; j < rows; j++) {
      grid[i].push(0);//populate the grid with empty cells
      lastUpdate[i].push(0);//keep track of time between updates to prevent accidental double clicks
    }
  }
}

function draw() {//this loop runs every frame
  background(000);

  let x = Math.floor(mouseX / cellSize);//which cell is the mouse on?
  let y = Math.floor(mouseY / cellSize);

  if (mouseIsPressed && x >= 0 && x < cols && y >= 0 && y < rows) {//is mouse down and within the display
    if (mouseButton === LEFT) {//left click to slow add sand
      if (millis() - lastUpdate[x][y] > delayTime) {
        grid[x][y] += 60;//slow add uses delayTime
        lastUpdate[x][y] = millis();
      }
    } else {
      grid[x][y] += 60;//right click does not use a delay
      lastUpdate[x][y] = millis();
    }
  }

  for (let i = 1; i < cols - 1; i++) {//scan through each cell
    for (let j = 1; j < rows - 1; j++) {
      if (grid[i][j] > 239) {//if the cell has too much sand
        grid[i][j] -= 240;//it topples, losing all the sand
        grid[i + 1][j] += 60;//the sand spills over to the neighbours
        grid[i - 1][j] += 60;
        grid[i][j + 1] += 60;
        grid[i][j - 1] += 60;
      }
    }
  }

  noStroke();//draw rectangles to output to display the new state
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(252, 186, 3, grid[i][j]);
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}
