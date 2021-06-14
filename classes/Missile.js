class Missile {
  speed = 1;
  xSpeed = 0;
  ySpeed = 0;
  angle = 0;
  x = null;
  y = null;
  width = 5;
  height = 10;

  constructor(x, y, angle, gameArea, xSpd, ySpd, color) {
    this.x = x - this.width / 2; // adjust x and y so that they come out at the center of the player
    this.y = y - this.height / 2;
    this.xSpeed = xSpd;
    this.ySpeed = ySpd;
    this.angle = angle;
    this.gameArea = gameArea;
    this.ctx = gameArea.context;
    this.color = color;
  }

  draw() {
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

  update() {
    this.xSpeed += this.speed * Math.sin(this.toRadians(this.angle));
    this.ySpeed -= this.speed * Math.cos(this.toRadians(this.angle));

    this.collision();

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.draw();
  }

  toRadians(angle) {
    return (angle * Math.PI) / 180;
  }

  collision() {
    let xi = Math.sign(this.xSpeed);
    let yi = Math.sign(this.ySpeed);

    let posXSpeed = this.makePos(this.xSpeed);
    let posYSpeed = this.makePos(this.ySpeed);

    let incX;
    let incY;

    if (posXSpeed > posYSpeed) {
      incX = Math.sign(this.xSpeed);
      let xpercentage = 1/posXSpeed;
      incY = (posYSpeed * xpercentage) * Math.sign(this.ySpeed);
    } else {
      incY = Math.sign(this.ySpeed);
      let ypercentage = 1 / posYSpeed;
      incX = (posXSpeed * ypercentage) * Math.sign(this.xSpeed);
    }

    while (this.makePos(xi) < posXSpeed && this.makePos(yi) < posYSpeed) {
      this.ctx.fillStyle = "orange";
      // this.ctx.fillRect(this.x + xi, this.y + yi, this.width, this.height);

      const adjustedX = (this.x + xi) + this.width / 2;
      const adjustedY = (this.y + yi) + this.height / 2;
      var circle = new Path2D();
      circle.arc(adjustedX, adjustedY, 1, 0, 2 * Math.PI);
      this.ctx.fill(circle);


      xi += incX;
      yi += incY;
    }
  }

  makePos(num) {
    return num > 0 ? num : num * -1;
  }

  get cornerBR() {// corner bottom right
    return this.getPointRotated(adjustedX, adjustedY, this.angle, this.width/2, this.height/2);
  }
  get cornerBL() {// corner bottom left
    return this.getPointRotated(adjustedX, adjustedY, this.angle, -this.width/2, this.height/2);
  }
  get cornerTL() {// corner top left
    return this.getPointRotated(adjustedX, adjustedY, this.angle, -this.width/2, -this.height/2);
  }
  get cornerTR() {// corner top right
    return this.getPointRotated(adjustedX, adjustedY, this.angle, this.width/2, -this.height/2);
  }
}
