function playerInfoComponent(player) {
  const pControls = player.controls;
  let html = `
      <div class="column">
        <h3>Player ${player.id + 1}</h3>
        <h4>Controls</h4>
        <div class="grid">
          <p>Movement:</p>
          <p>${
            pControls.up === "ArrowUp"
              ? "arrow keys"
              : pControls.up + pControls.left + pControls.down + pControls.right
          }</p>
          <p>Shoot:</p>
          <p>${pControls.shoot}</p>
          <div class="grid-break"></div>
          <div></div>
          <h4>Score</h4>
          <p id="player${player.id}-score">0</p>
        </div>
      </div>
    `;

  return html;
}
