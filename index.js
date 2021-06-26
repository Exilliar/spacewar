const gameArea = new GameArea();

function startGame() {
  gameArea.start();
  genForms();
  genControls();
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

function formComponent(form) {
  let html = `
        <h3>${form.title}</h3>
        <form
          id="${form.id}"
          class="center"
          onsubmit="${form.onSubmitName}(); return false"
        >
          <div class="grid form-grid">
    `;
  form.inputs.forEach((input) => {
    html += `
          <label for="${input.id}">${input.title}</label>
          <input type="${input.type}" id="${input.id}" ${
      input.type === "number" ? "step='0.01'" : ""
    } value="${input.defaultValue}">
      `;
  });
  html += `</div><button type="submit">Submit</button></form>`;

  return html;
}

function genControls() {
  const controls = document.getElementById("controls");
  console.log("gameArea:", gameArea)
  gameArea.players.forEach(player => {
    controls.innerHTML += controlsComponent(player.player);
  });
}

function controlsComponent(player) {
  const pControls = player.controls;
  let html = `
    <div class="column">
      <h3>Player ${player.id + 1}</h3>
      <div class="grid">
        <p>Movement:</p>
        <p>${pControls.up === "ArrowUp" ? "arrow keys" : pControls.up + pControls.left + pControls.down + pControls.right}</p>
        <p>Shoot:</p>
        <p>${pControls.shoot}</p>
      </div>
    </div>
  `;

  return html;
}
