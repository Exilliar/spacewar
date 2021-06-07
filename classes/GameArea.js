class GameArea {
  canvas = document.createElement("canvas");
  controlsHold = {
    up: {
      key: "ArrowUp",
      pressed: false,
    },
    down: {
      key: "ArrowDown",
      pressed: false,
    },
    left: {
      key: "ArrowLeft",
      pressed: false,
    },
    right: {
      key: "ArrowRight",
      pressed: false,
    },
    space: {
      key: " ",
      pressed: false,
    },
    r: {
      key: "r",
      pressed: false,
    },
    a: {
      key: "a",
      pressed: false,
    },
    d: {
      key: "d",
      pressed: false,
    },
  };
  controlsPressed = {
    shoot: {
      key: "c",
      pressed: false,
      action: false,
    },
  };

  missiles = [];

  start() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style = "background-color: black";
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    // framerate/update cycle
    requestAnimationFrame(this.updateGameArea.bind(this));

    this.sun = new Sun(this);
    this.player = new Player(400, 300, this, this.sun);

    this.addListeners();
  }

  clear() {
    if (!this.controlsHold.r.pressed) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  updateGameArea() {
    requestAnimationFrame(this.updateGameArea.bind(this));
    this.clear();
    this.fire();
    this.player.update();
    this.sun.draw();

    this.updateMissiles();
  }

  updateMissiles() {
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
          missile.x <= this.canvas.width &&
          missile.x >= 0 &&
          missile.y <= this.canvas.height &&
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
          this.missiles.x <= this.canvas.width &&
          this.missiles.x >= 0 &&
          this.missiles.y <= this.canvas.height &&
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
      this.controlsPressed.shoot.pressed &&
      !this.controlsPressed.shoot.action
    ) {
      this.missiles.push(
        new Missile(
          this.player.x + this.player.width / 2,
          this.player.y + this.player.height / 2,
          this.player.angle,
          this,
          this.player.xSpeed,
          this.player.ySpeed
        )
      );
      this.controlsPressed.shoot.action = true;
    }
  }

  addListeners() {
    let vm = this;

    window.addEventListener("keydown", function (e) {
      const defaultKeys = [
        "ArrowDown",
        "ArrowUp",
        "ArrowLeft",
        "ArrowRight",
        " ",
      ];
      if (defaultKeys.indexOf(e.key) > -1) {
        e.preventDefault();
      }
      Object.keys(vm.controlsHold).forEach((k) => {
        if (vm.controlsHold[k].key === e.key) {
          vm.controlsHold[k].pressed = true;
        }
      });
      Object.keys(vm.controlsPressed).forEach((k) => {
        if (vm.controlsPressed[k].key === e.key) {
          vm.controlsPressed[k].pressed = true;
        }
      });
    });
    window.addEventListener("keyup", function (e) {
      Object.keys(vm.controlsHold).forEach((k) => {
        if (vm.controlsHold[k].key === e.key) {
          vm.controlsHold[k].pressed = false;
        }
      });
      Object.keys(vm.controlsPressed).forEach((k) => {
        if (vm.controlsPressed[k].key === e.key) {
          vm.controlsPressed[k].pressed = false;
          vm.controlsPressed[k].action = false;
        }
      });
    });
  }
}
