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
  missiles = [];

  constructor(x, y, gameArea, sun, controls, drawOptions) {
    this.x = x;
    this.y = y;
    this.gameArea = gameArea;
    this.ctx = gameArea.context;
    this.sun = sun;
    this.controls = controls;
    this.drawOptions = drawOptions;

    this.draw();
  }

  draw() {
    this.ctx.save();

    this.ctx.fillStyle = this.drawOptions.color1;

    const widthTranslate = this.x + this.width / 2;
    const heightTranslate = this.y + this.height / 2;

    this.ctx.translate(widthTranslate, heightTranslate);
    this.ctx.rotate(this.toRadians(this.angle));
    this.ctx.translate(-widthTranslate, -heightTranslate);

    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    this.ctx.fillStyle = this.drawOptions.color2;
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

    this.fire();

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
    const up = this.gameArea.controlsHold[this.controls.up].pressed;
    const down = this.gameArea.controlsHold[this.controls.down].pressed;
    if (up || down) {
      if (up) {
        this.speed = this.acc;
      } else if (down) {
        this.speed = -this.acc;
      }
      this.xSpeed += this.speed * Math.sin(this.toRadians(this.angle));
      this.ySpeed -= this.speed * Math.cos(this.toRadians(this.angle));
    }
    if (this.gameArea.controlsHold[this.controls.stop].pressed) {
      this.speed = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
    }
  }
  rotate() {
    if (this.gameArea.controlsHold[this.controls.left].pressed) {
      this.angle -= this.turnChange;
    } else if (this.gameArea.controlsHold[this.controls.right].pressed) {
      this.angle += this.turnChange;
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

  updateMissiles(otherPlayer) { // otherPlayer = either player 1 or 2 (the player that is not this one) which the missile can collide with
    if (this.missiles.length >= 1) {
      // > 1 as reduce doesn't return an array when given an array of legnth one, having one missle update won't affect performance
      this.missiles = this.missiles.reduce((prev, missile) => {
        // if this is the first loop, prev will not be an array. Below if statement converts it to an array if needed
        let arr;
        if (Array.isArray(prev)) {
          arr = prev;
        } else {
          prev.update();
          arr = [prev];
        }
        // update the missle
        missile.update();
        // if the missile has left the screen, remove it from the array, the garbage collector should remove it from memory
        if (
          missile.x <= this.gameArea.canvas.width &&
          missile.x >= 0 &&
          missile.y <= this.gameArea.canvas.height &&
          missile.y >= 0
        ) {
          arr.push(missile);
          return arr;
        } else {
          return arr;
        }
      });
      // if there is only one missile, reduce does not return an array and will not run the function
      // below if statement handles this and updates the single missile
      if (!Array.isArray(this.missiles)) {
        this.missiles.update();
        if (
          this.missiles.x <= this.gameArea.canvas.width &&
          this.missiles.x >= 0 &&
          this.missiles.y <= this.gameArea.canvas.height &&
          this.missiles.y >= 0
        ) {
          this.missiles = [this.missiles];
        } else {
          this.missiles = [];
        }
      }
    }
  }

  fire() {
    if (
      this.gameArea.controlsPressed[this.controls.shoot].pressed &&
      !this.gameArea.controlsPressed[this.controls.shoot].action
    ) {
      this.missiles.push(
        new Missile(
          this.x + this.width / 2,
          this.y + this.height / 2,
          this.angle,
          this.gameArea,
          this.xSpeed,
          this.ySpeed,
          this.drawOptions.missileColor
        )
      );
      this.gameArea.controlsPressed[this.controls.shoot].action = true;
    }
  }
}
