class GameArea {
  canvas = document.createElement("canvas");
  controlsHold = controls.controlsHold;
  controlsPressed = controls.controlsPressed;
  gravityOn = true;
  players = []; // { score: number, player: obj }[]

  missiles = [];

  intervalGap = 20;

  gameOver = false;

  start() {
    const halfWidth = window.innerWidth * 0.5;
    const halfHeight = window.innerHeight * 0.5;
    this.canvas.width = halfWidth >= 960 ? halfWidth : 960;
    this.canvas.height = halfHeight >= 540 ? halfHeight : 540;
    this.canvas.style = "background-color: black; border: 1px solid white;";
    this.context = this.canvas.getContext("2d");

    const gameDiv = document.getElementById("game");
    gameDiv.appendChild(this.canvas);

    this.sun = new Sun(this);

    this.startGame();

    this.addListeners();
  }

  startGame() {
    let restartContainer = document.getElementById("restart-button-container");
    restartContainer.innerHTML = "";

    this.gameOver = false;
    this.players = [];

    if (this.interval) {
      clearInterval(this.interval);
    }

    // framerate/update cycle
    this.interval = setInterval(this.updateGameArea.bind(this), this.intervalGap);

    this.player1 = new Player(this.sun.x + 200, this.canvas.height/2, this, this.sun, {
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
    }, {
      xSpeed: 0,
      ySpeed: -5,
    });
    this.player2 = new Player(this.sun.x - 200, this.canvas.height/2, this, this.sun, {
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
    }, {
      xSpeed: 0,
      ySpeed: 5,
    });

    this.players.push(this.player1);
    this.players.push(this.player2);
  }

  clear() {
    if (!this.controlsHold.r.pressed) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  updateGameArea() {
    this.clear();
    this.player1.update();
    this.player2.update();
    this.sun.draw();

    this.player1.updateMissiles([this.player2]);
    this.player2.updateMissiles([this.player1]);
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

  toggleGrav() {
    this.gravityOn = !this.gravityOn;
    this.players.forEach(player => {
      player.gravityOn = this.gravityOn;
    });
    const gravButton = document.getElementById("gravButton");
    gravButton.textContent = `Turn gravity ${this.gravityOn ? "off" : "on"}`;
  }

  hit(player, bullet) {
    player.hit = true;
    bullet.hit = true;

    if (!this.gameOver) {
      let btn = document.createElement("button");
      btn.innerText = "Restart";
      btn.id = "restart-button";
      btn.className = "restart-button";
      btn.onclick = this.startGame.bind(this);
      document.getElementById("restart-button-container").appendChild(btn);
      setTimeout(() => {
        clearInterval(this.interval);
      }, 1000);
    }

    this.gameOver = true;
  }

  updateGrav(G, mass) {
    this.sun.G = G ? G : this.sun.G;
    this.sun.mass = mass ? mass : this.sun.mass;
  }
}
