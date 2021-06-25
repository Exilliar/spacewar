const gameArea = new GameArea();

function startGame() {
  gameArea.start();
  genForms();
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
  genForm([{
    title: "Gravity",
    id: "gravSettings",
    onSubmitName: "updateGrav",
    inputs: [{
      title: "Gravity value:",
      id: "gravity",
      type: "number",
      defaultValue: gameArea.sun.G
    }, {
      title: "Sun mass:",
      id: "mass",
      type: "number",
      defaultValue: gameArea.sun.mass
    }]
  }]);
}

function genForm(formData) { // formData: { title: string, id: string, onSubmitName: string, inputs: { title: string, id: string, type: string, defaultValue: number | string }[] }[]
  const settings = document.getElementById("settings");
  formData.forEach(form => {
    let html = `
        <h3>${form.title}</h3>
        <form
          id="${form.id}"
          class="center"
          onsubmit="${form.onSubmitName}(); return false"
        >
          <div class="grid form-grid">
    `;
    form.inputs.forEach(input => {
      html += `
          <label for="${input.id}">${input.title}</label>
          <input type="${input.type}" id="${input.id}" ${input.type === "number" ? "step='0.01'" : ""} value="${input.defaultValue}">
      `;
    });
    html += `</div><button type="submit">Submit</button></form>`;

    settings.innerHTML += html;
  });
}
