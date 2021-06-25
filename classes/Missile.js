class Missile {
  speed = 1;
  xSpeed = 0;
  ySpeed = 0;
  angle = 0;
  x = null;
  y = null;
  width = 5;
  height = 10;

  hit = false;

  constructor(x, y, angle, gameArea, xSpd, ySpd, color) {
    this.x = x - this.width / 2; // adjust x and y so that they come out at the center of the player
    this.y = y - this.height / 2;
    this.xSpeed = xSpd;
    this.ySpeed = ySpd;
    this.angle = angle;
    this.gameArea = gameArea;
    this.ctx = gameArea.context;
    this.color = color;

    this.adjustedX = this.x + this.width / 2;
    this.adjustedY = this.y + this.height / 2;
  }

  draw() {
    if (!this.hit){
      this.ctx.save();

      this.ctx.fillStyle = this.color;

      const widthTranslate = this.x + this.width / 2;
      const heightTranslate = this.y + this.height / 2;

      this.ctx.translate(widthTranslate, heightTranslate);
      this.ctx.rotate(this.toRadians(this.angle));
      this.ctx.translate(-widthTranslate, -heightTranslate);

      this.ctx.fillRect(this.x, this.y, this.width, this.height);

      this.ctx.restore();
    }
  }

  update(players) {
    this.xSpeed += this.speed * Math.sin(this.toRadians(this.angle));
    this.ySpeed -= this.speed * Math.cos(this.toRadians(this.angle));

    this.collision(players);

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.draw();
  }

  toRadians(angle) {
    return (angle * Math.PI) / 180;
  }

  collision(players) {
    const startX = this.x;
    const startY = this.y;
    const endX = this.x + this.xSpeed;
    const endY = this.y + this.ySpeed;

    const playerLines = players.map(player => {
      return {
        left: {
          x1: player.cornerBL.x,
          y1: player.cornerBL.y,
          x2: player.cornerTL.x,
          y2: player.cornerTL.y
        },
        right: {
          x1: player.cornerBR.x,
          y1: player.cornerBR.y,
          x2: player.cornerTR.x,
          y2: player.cornerTR.y
        },
        top: {
          x1: player.cornerTR.x,
          y1: player.cornerTR.y,
          x2: player.cornerTL.x,
          y2: player.cornerTL.y
        },
        bottom: {
          x1: player.cornerBR.x,
          y1: player.cornerBR.y,
          x2: player.cornerBL.x,
          y2: player.cornerBL.y
        }
      }
    });

    const intersects = this.intersectsWrapper(startX, startY, endX, endY);

    for (let i = 0; i < playerLines.length; i++) {
      const player = playerLines[i];
      if (
        intersects(player.left.x1, player.left.y1, player.left.x2, player.left.y2) ||
        intersects(player.right.x1, player.right.y1, player.right.x2, player.right.y2) ||
        intersects(player.top.x1, player.top.y1, player.top.x2, player.top.y2) ||
        intersects(player.bottom.x1, player.bottom.y1, player.bottom.x2, player.bottom.y2)
      ) {
        this.gameArea.hit(players[i], this);
      }
    };
  }

  intersectsWrapper(a,b,c,d) {
    // returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
    // got from https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
    return function intersects(p,q,r,s) {
      var det, gamma, lambda;
      det = (c - a) * (s - q) - (r - p) * (d - b);
      if (det === 0) {
        return false;
      } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
      }
    };
  }

  makePos(num) {
    return num > 0 ? num : num * -1;
  }

  get center() {// center point
    return {
      x: (this.x + xi) + this.width / 2,
      y: (this.y + yi) + this.height / 2
    }
  }
  get cornerBR() {// corner bottom right
    const adjustedX = this.x + this.width / 2;
    const adjustedY = this.y + this.height / 2;
    return this.getPointRotated(adjustedX, adjustedY, this.angle, this.width/2, this.height/2);
  }
  get cornerBL() {// corner bottom left
    const adjustedX = this.x + this.width / 2;
    const adjustedY = this.y + this.height / 2;
    return this.getPointRotated(adjustedX, adjustedY, this.angle, -this.width/2, this.height/2);
  }
  get cornerTL() {// corner top left
    const adjustedX = this.x + this.width / 2;
    const adjustedY = this.y + this.height / 2;
    return this.getPointRotated(adjustedX, adjustedY, this.angle, -this.width/2, -this.height/2);
  }
  get cornerTR() {// corner top right
    const adjustedX = this.x + this.width / 2;
    const adjustedY = this.y + this.height / 2;
    return this.getPointRotated(adjustedX, adjustedY, this.angle, this.width/2, -this.height/2);
  }

  getPointRotated(X, Y, R, Xos, Yos){
    // Cx, Cy // the coordinates of your center point in world coordinates
    // W      // the width of your rectangle
    // H      // the height of your rectangle
    // θ      // the angle you wish to rotate

    //The offset of a corner in local coordinates (i.e. relative to the pivot point)
    //(which corner will depend on the coordinate reference system used in your environment)

    //The rotated position of this corner in world coordinates
    var rotatedX = X + (Xos  * Math.cos(this.toRadians(R))) - (Yos * Math.sin(this.toRadians(R)));
    var rotatedY = Y + (Xos  * Math.sin(this.toRadians(R))) + (Yos * Math.cos(this.toRadians(R)));

    return {
      x: rotatedX,
      y: rotatedY
    }
  }

  toRadians(angle) {
    return (angle * Math.PI) / 180;
  }
  toDegrees(radian) {
    return radian * (180 / Math.PI);
  }
}
