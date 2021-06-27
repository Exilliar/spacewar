const gameArea = new GameArea();

function startGame() {
  gameArea.start();
  genForms();
  genPlayerInfo();
}

function toggleGrav() {
  gameArea.toggleGrav();
}

function updateGrav() {
  const form = document.getElementById("gravSettings");

  const G = form.elements.gravity.value;
  const mass = form.elements.mass.value;

  gameArea.updateGrav(G, mass);
}

function genForms() {
  forms = [
    {
      title: "Gravity",
      id: "gravSettings",
      onSubmitName: "updateGrav",
      inputs: [
        {
          title: "Gravity value:",
          id: "gravity",
          type: "number",
          defaultValue: gameArea.sun.G,
        },
        {
          title: "Sun mass:",
          id: "mass",
          type: "number",
          defaultValue: gameArea.sun.mass,
        },
      ],
    },
  ]; // forms: { title: string, id: string, onSubmitName: string, inputs: { title: string, id: string, type: string, defaultValue: number | string }[] }[]

  const settings = document.getElementById("settings");
  forms.forEach((form) => {
    settings.innerHTML += formComponent(form);
  });
}

function genPlayerInfo() {
  const playerInfo = document.getElementById("player-info");
  gameArea.players.forEach((player) => {
    playerInfo.innerHTML += playerInfoComponent(player.player);
  });
}
