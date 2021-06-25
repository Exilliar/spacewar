class Sun {
  width = 20;
  height = 20;

  G = 9.8; // gravitational constant
  mass = 500;

  constructor(gameArea) {
    this.gameArea = gameArea;
    this.x = (gameArea.canvas.width - this.width / 2) / 2;
    this.y = (gameArea.canvas.height - this.height / 2) / 2;
    this.draw();
  }

  draw() {
    const ctx = this.gameArea.context;
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
