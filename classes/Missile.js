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
    this.x = x;
    this.y = y;
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

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.draw();
  }

  toRadians(angle) {
    return (angle * Math.PI) / 180;
  }
}
