const gameArea = new GameArea();

function startGame() {
  gameArea.start();
}

function toggleGrav() {
  console.log("toggle grav");
  gameArea.toggleGrav();
}

function updateGrav() {
  console.log("submit");
  const form = document.getElementById("gravSettings");
  console.log(form);
  for(let i = 0; i < form.length; i++) {
    console.log(`${i}: ${form.elements[i].value}`);
  }
  console.log("form.elements:", form.elements);
  console.log(`gravity: ${form.elements.gravity.value}\nmass: ${form.elements.mass.value}`);
}