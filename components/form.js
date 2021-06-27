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
