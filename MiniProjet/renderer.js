


document.getElementById('passwordForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const site = document.getElementById('site').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = { site, email, password };

  alert('Appel de save Data');

  window.api.saveData(data);

});

window.api.onSaveDataSuccess((event, savedData) => {
    alert('Données enregistrées avec succès:', savedData);
    addRowToTable(savedData);
});
  
window.api.onSaveDataError((event, errorMessage) => {
    alert('Erreur lors de l\'enregistrement des données:', errorMessage);
});

window.api.onPasswordData((event, data) => {
    alert('Données de mot de passe récupérées:', data);
    data.forEach((row) => {
      addRowToTable(row);
    });
});

function addRowToTable(data) {
    const table = document.getElementById('passwordTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
  
    const siteCell = newRow.insertCell(0);
    const emailCell = newRow.insertCell(1);
    const passwordCell = newRow.insertCell(2);
    const showPasswordCell = newRow.insertCell(3);
    const hiddenPasswordCell = newRow.insertCell(4);
  
    siteCell.textContent = data.site;
    emailCell.textContent = data.email;
    passwordCell.textContent = '*******';
    showPasswordCell.innerHTML = `<input type="checkbox" onclick="togglePassword(this, 'password${table.rows.length}')">`;
    hiddenPasswordCell.textContent = data.password;
    hiddenPasswordCell.id = `password${table.rows.length}`;
    hiddenPasswordCell.hidden = true;
  }

function togglePassword(checkbox, passwordId) {
    const passwordCell = document.getElementById(passwordId);
    const displayCell = checkbox.parentElement.previousElementSibling;

    if (checkbox.checked) {
        displayCell.textContent = passwordCell.textContent;
    } else {
        displayCell.textContent = "*******";
    }
}
