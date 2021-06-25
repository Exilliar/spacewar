const gameArea = new GameArea();

function startGame() {
  gameArea.start();
}

function toggleGrav() {
  gameArea.toggleGrav();
}

function updateGrav(event) {
  event.preventDefault();

  const G = form.elements.gravity.value;
  const mass = form.elements.gravity.mass;

  // gameArea.updateGrav(G, mass);
}