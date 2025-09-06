const tableBody = document.querySelector("#candidaturesTable tbody");

// Fonction pour afficher les candidatures
function afficherCandidatures() {
  tableBody.innerHTML = "";
  const candidatures = JSON.parse(localStorage.getItem("candidatures")) || [];

  candidatures.forEach((candidature, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${candidature.nom}</td>
      <td>${candidature.email}</td>
      <td>${candidature.offre}</td>
      <td>${candidature.message}</td>
      <td><button class="delete-btn" data-index="${index}">Supprimer</button></td>
    `;
    tableBody.appendChild(tr);
  });

  // Ajouter event listener pour supprimer
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      supprimerCandidature(btn.dataset.index);
    });
  });
}

// Fonction pour supprimer une candidature
function supprimerCandidature(index) {
  let candidatures = JSON.parse(localStorage.getItem("candidatures")) || [];
  candidatures.splice(index, 1);
  localStorage.setItem("candidatures", JSON.stringify(candidatures));
  afficherCandidatures();
}

// Initial display
afficherCandidatures();
