function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.top = true;
  this.bot = true;
  this.left = true;
  this.right = true;
  this.visited = false;
  this.isway = false;
  this.isstart = false;
  this.isfinish = false;

  this.show = function() {
    var xpos = this.x * w;
    var ypos = this.y * w;
    stroke(255);
    strokeWeight(3);
    noFill();
    if (this.top)   {line(xpos,ypos,xpos+w,ypos)}
    if (this.bot)   {line(xpos+w,ypos,xpos+w,ypos)}
    if (this.left)  {line(xpos,ypos,xpos,ypos+w)}
    if (this.right) {line(xpos+w,ypos,xpos+w,ypos+w)}
    if(this.visited) {
      noStroke();
      fill(0,0,0,0);
    }
    if (this.isstart)  {fill(0,255,0,200);}
    if (this.isfinish) {fill(255,0,0,200);}
    rect(xpos,ypos,w,w);
  }

  this.highlight = function(r,g,b,h) {
    var xpos = this.x * w;
    var ypos = this.y * w;
    noStroke();
    fill(r,g,b,h);
    rect(xpos,ypos,w,w);
  }

  this.checkNeighbors = function() {
    var possibleways = [];
    var celltop   = grid[index(this.x,this.y-1)];
    var cellright = grid[index(this.x+1,this.y)];
    var cellbot   = grid[index(this.x,this.y+1)];
    var cellleft  = grid[index(this.x-1,this.y)];
    if (celltop && !celltop.visited)      possibleways.push(celltop);
    if (cellright && !cellright.visited)  possibleways.push(cellright);
    if (cellbot && !cellbot.visited)      possibleways.push(cellbot);
    if (cellleft && !cellleft.visited)    possibleways.push(cellleft);
    if(possibleways.length > 0) {
      var randy = floor(random(0, possibleways.length));
      // var randy = possibleways.length - 1;
      return possibleways[randy];
    } else {
      return undefined;
    }
  }

  this.nextCell = function() {
    var possibleways = [];
    var celltop   = grid[index(this.x,this.y-1)];
    var cellright = grid[index(this.x+1,this.y)];
    var cellbot   = grid[index(this.x,this.y+1)];
    var cellleft  = grid[index(this.x-1,this.y)];
    if (celltop && !celltop.isway && !this.top && !celltop.bot)           possibleways.push(celltop);
    if (cellbot && !cellbot.isway && !this.bot && !cellbot.top)           possibleways.push(cellbot);
    if (cellleft && !cellleft.isway && !this.left && !cellleft.right)     possibleways.push(cellleft);
    if (cellright && !cellright.isway && !this.right && !cellright.left)  possibleways.push(cellright);
    if(possibleways.length > 0) {
      //var randy = floor(random(0, possibleways.length));   //random
      var randy = possibleways.length - 1;                  //immer rechts > links > untern > oben
      return possibleways[randy];
    } else {
      return undefined;
    }
  }
}
