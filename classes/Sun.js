class Sun {
  width = 20;
  height = 20;
  x = (window.innerWidth - this.width / 2) / 2;
  y = (window.innerHeight - this.height / 2) / 2;

  G = 9.8; // gravitational constant
  mass = 10;

  constructor(gameArea) {
    this.gameArea = gameArea;
    this.draw();
  }

  draw() {
    const ctx = this.gameArea.context;
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
