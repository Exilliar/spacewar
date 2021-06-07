class Player {
  acc = 0.1;
  speed = 0;
  xSpeed = 0;
  ySpeed = 0;
  angle = 0;
  turnChange = 5;
  width = 10;
  height = 20;
  gravity = 0;
  gravityAngle = 0;

  constructor(x, y, gameArea, sun) {
    this.x = x;
    this.y = y;
    this.gameArea = gameArea;
    this.ctx = gameArea.context;
    this.sun = sun;

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
      widthTranslate - this.width / 2,
      heightTranslate - this.height / 2,
      this.width,
      this.height / 3
    );

    this.ctx.restore();
  }

  update() {
    this.rotate();
    this.move();
    this.applyGrav();

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.draw();
  }

  applyGrav() {
    const x1 = this.x;
    const y1 = this.y;
    const x2 = this.sun.x;
    const y2 = this.sun.y;

    const rSqr = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2); // distance squared
    this.gravity = (this.sun.mass * this.sun.G) / rSqr;

    const hyp = Math.sqrt(rSqr);
    let opp = Math.abs(y1 - y2);

    let zone;
    if (x2 > x1 && y2 < y1) {
      zone = 0;
    } else if (x2 > x1 && y2 > y1) {
      zone = 1;
    } else if (x2 < x1 && y2 > y1) {
      zone = 2;
    } else if (x2 < x1 && y2 < y1) {
      zone = 3;
    }
    const a = Math.asin(opp / hyp);
    let angle;
    switch (zone) {
      case 0:
        angle = this.toRadians(90) - a;
        break;
      case 1:
        angle = this.toRadians(90) + a;
        break;
      case 2:
        angle = this.toRadians(270) - a;
        break;
      case 3:
        angle = this.toRadians(270) + a;
        break;
    }

    this.xSpeed += this.gravity * Math.sin(angle);
    this.ySpeed -= this.gravity * Math.cos(angle);
  }

  move() {
    const up = this.gameArea.controlsHold.up.pressed;
    const down = this.gameArea.controlsHold.down.pressed;
    if (up || down) {
      if (up) {
        this.speed = this.acc;
      } else if (down) {
        this.speed = -this.acc;
      }
      this.xSpeed += this.speed * Math.sin(this.toRadians(this.angle));
      this.ySpeed -= this.speed * Math.cos(this.toRadians(this.angle));
    }
    if (this.gameArea.controlsHold.space.pressed) {
      this.speed = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
    }
    // console.log(
    //   "speed:",
    //   this.speed,
    //   "\nxSpeed:",
    //   this.xSpeed,
    //   "\nySpeed:",
    //   this.ySpeed,
    //   "\nangle:",
    //   this.angle,
    //   "\nradian:",
    //   this.angle * (Math.PI / 180),
    //   "\nx:",
    //   Math.round(this.x),
    //   "y:",
    //   Math.round(this.y)
    // );
  }
  rotate() {
    if (this.gameArea.controlsHold.left.pressed) {
      this.angle -= this.turnChange;
    } else if (this.gameArea.controlsHold.right.pressed) {
      this.angle += this.turnChange;
    } else if (this.gameArea.controlsHold.a.pressed) {
      this.angle = Math.ceil(this.angle - 90);
    } else if (this.gameArea.controlsHold.d.pressed) {
      this.angle = Math.ceil(this.angle + 90);
    }

    if (this.angle <= -this.turnChange) this.angle = 360 - this.turnChange;
    if (this.angle >= 360) this.angle = 0;
  }

  toRadians(angle) {
    return (angle * Math.PI) / 180;
  }
  toDegrees(radian) {
    return radian * (180 / Math.PI);
  }
}
