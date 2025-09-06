// Sélecteur pour les offres récentes
const recentJobs = document.getElementById("recentJobs");

// On prend les 3 dernières offres
const recent = offresData.slice(-3).reverse();

// Création des cartes dynamiques
recent.forEach((job, index) => {
  const div = document.createElement("div");
  div.className = "job-card";  
  div.style.animationDelay = `${index * 0.2}s`;
  div.innerHTML = `
    <span class="job-type">${job.type === "emploi" ? "Emploi" : "Stage"}</span>
    <h4>${job.titre}</h4>
    <p><i class="fas fa-briefcase"></i> ${job.categorie}</p>
    <p><i class="fas fa-map-marker-alt"></i> ${job.localisation || "Djibouti Ville"}</p>
    <p><i class="far fa-clock"></i> Publié il y a ${Math.floor(Math.random() * 5) + 1} jours</p>
  `;
  recentJobs.appendChild(div);
});

// Gestion de la recherche
document.getElementById("searchBtn").addEventListener("click", function() {
  const searchTerm = document.getElementById("searchInput").value.trim();
  if (searchTerm) {
    window.location.href = `offres.html?search=${encodeURIComponent(searchTerm)}`;
  }
});

document.getElementById("searchInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});

// Menu mobile
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
  document.querySelector('nav').classList.toggle('active');
});