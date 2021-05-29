class GameArea {
  canvas = document.createElement("canvas");
  up = false;
  down = false;
  left = false;
  right = false;
  space = false;
  a = false;
  d = false;

  start() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style = "background-color: black";
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    // framerate/update cycle
    requestAnimationFrame(this.updateGameArea.bind(this));

    this.player = new Player(400, 300, this);

    this.addListeners();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateGameArea() {
    requestAnimationFrame(this.updateGameArea.bind(this));
    this.clear();
    this.player.update();
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
      switch (e.key) {
        case "ArrowUp":
          vm.up = true;
          break;
        case "ArrowDown":
          vm.down = true;
          break;
        case "ArrowRight":
          vm.right = true;
          break;
        case "ArrowLeft":
          vm.left = true;
          break;
        case " ":
          vm.space = true;
          break;
        case "a":
          vm.a = true;
          break;
        case "d":
          vm.b = true;
          break;
      }
    });
    window.addEventListener("keyup", function (e) {
      switch (e.key) {
        case "ArrowUp":
          vm.up = false;
          break;
        case "ArrowDown":
          vm.down = false;
          break;
        case "ArrowRight":
          vm.right = false;
          break;
        case "ArrowLeft":
          vm.left = false;
          break;
        case " ":
          vm.space = false;
          break;
        case "a":
          vm.a = false;
          break;
        case "d":
          vm.d = false;
      }
    });
  }
}
