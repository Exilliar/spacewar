class GameArea {
  canvas = document.createElement("canvas");
  controlsHold = {
    ArrowUp: {
      key: "ArrowUp",
      pressed: false,
    },
    ArrowDown: {
      key: "ArrowDown",
      pressed: false,
    },
    ArrowLeft: {
      key: "ArrowLeft",
      pressed: false,
    },
    ArrowRight: {
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
    w: {
      key: "w",
      pressed: false,
    },
    s: {
      key: "s",
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
    c: {
      key: "c",
      pressed: false,
      action: false,
    },
    m: {
      key: "m",
      pressed: false,
      action: false,
    }
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
    this.player1 = new Player(100, window.innerHeight/2, this, this.sun, {
      up: "ArrowUp",
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
      stop: "space",
      shoot: "m",
    }, {
      color1: "red",
      color2: "blue",
      missileColor: "blue"
    });
    this.player2 = new Player(window.innerWidth - 100, window.innerHeight/2, this, this.sun, {
      up: "w",
      down: "s",
      left: "a",
      right: "d",
      stop: "space",
      shoot: "c"
    }, {
      color1: "blue",
      color2: "red",
      missileColor: "red"
    });

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
    this.player1.update();
    this.player2.update();
    this.sun.draw();

    this.player1.updateMissiles(this.player2);
    this.player2.updateMissiles(this.player1);
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
