class Player {
  acc = 0.1;
  speed = 0;
  xSpeed = 0;
  ySpeed = 0;
  angle = 0;
  turnChange = 5;
  width = 10;
  height = 20;

  constructor(x, y, gameArea) {
    this.x = x;
    this.y = y;
    this.gameArea = gameArea;
    this.ctx = gameArea.context;

    this.draw();
  }

  draw() {
    this.ctx.save();

    this.ctx.fillStyle = "red";

    const widthTranslate = this.x + this.width / 2;
    const heightTranslate = this.y + this.height / 2;

    this.ctx.translate(widthTranslate, heightTranslate);
    this.ctx.rotate(this.toRadians(this.angle));
    this.ctx.translate(-widthTranslate, -heightTranslate);

    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(
      widthTranslate - this.width / 2 - 0.5,
      heightTranslate - this.height / 2,
      this.width,
      this.height / 3
    );

    this.ctx.restore();
  }

  update() {
    this.rotate();
    this.move();

    this.draw();
  }

  move() {
    if (this.gameArea.up || this.gameArea.down) {
      if (this.gameArea.up) {
        this.speed = this.acc;
      } else if (this.gameArea.down) {
        this.speed = -this.acc;
      }
      this.xSpeed += this.speed * Math.sin(this.toRadians(this.angle));
      this.ySpeed -= this.speed * Math.cos(this.toRadians(this.angle));
    }
    if (this.gameArea.space) {
      this.speed = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
    }
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    console.log(
      "speed:",
      this.speed,
      "\nxSpeed:",
      this.xSpeed,
      "\nySpeed:",
      this.ySpeed,
      "\nangle:",
      this.angle,
      "\nradian:",
      this.angle * (Math.PI / 180),
      "\nx:",
      Math.round(this.x),
      "y:",
      Math.round(this.y)
    );
  }
  rotate() {
    if (this.gameArea.left) {
      this.angle -= this.turnChange;
    } else if (this.gameArea.right) {
      this.angle += this.turnChange;
    } else if (this.gameArea.a) {
      this.angle = Math.ceil(this.angle - 90);
    } else if (this.gameArea.d) {
      this.angle = Math.ceil(this.angle + 90);
    }

    if (this.angle <= -this.turnChange) this.angle = 360 - this.turnChange;
    if (this.angle >= 360) this.angle = 0;
  }

  toRadians(angle) {
    return (angle * Math.PI) / 180;
  }
}
