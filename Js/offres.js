// Sélecteurs
const offersList = document.getElementById("offersList");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const typeSelect = document.getElementById("type");
const experienceSelect = document.getElementById("experience");
const sortSelect = document.getElementById("sort");
const filterBtn = document.getElementById("filterBtn");
const resultsCount = document.getElementById("resultsCount");
const pagination = document.getElementById("pagination");

// Variables globales
let currentPage = 1;
const offersPerPage = 6;
let filteredOffers = [];

// Fonction pour formater la date
function formatDate(dateString) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Fonction pour afficher les offres
function afficherOffres(data, page = 1) {
  offersList.innerHTML = "";
  
  if (data.length === 0) {
    offersList.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search fa-3x"></i>
        <h3>Aucune offre trouvée</h3>
        <p>Essayez de modifier vos critères de recherche</p>
      </div>
    `;
    return;
  }
  
  // Calcul de la pagination
  const startIndex = (page - 1) * offersPerPage;
  const endIndex = startIndex + offersPerPage;
  const paginatedOffers = data.slice(startIndex, endIndex);
  
  paginatedOffers.forEach((offre, index) => {
    const delay = index * 0.1;
    const card = document.createElement("div");
    card.className = "offer-card";
    card.style.animationDelay = `${delay}s`;
    
    card.innerHTML = `
      <span class="offer-type">${offre.type === "emploi" ? "Emploi" : "Stage"}</span>
      <h3>${offre.titre}</h3>
      <span class="company">${offre.entreprise || "Entreprise confidentielle"}</span>
      
      <div class="offer-details">
        <span class="offer-detail"><i class="fas fa-map-marker-alt"></i> ${offre.localisation || "Djibouti Ville"}</span>
        <span class="offer-detail"><i class="far fa-clock"></i> ${offre.duree || "Non précisé"}</span>
        <span class="offer-detail"><i class="fas fa-graduation-cap"></i> ${offre.niveau || "Bac+3"}</span>
      </div>
      
      <p class="description">${offre.description}</p>
      
      <div class="offer-footer">
        <span class="publish-date">Publié le ${formatDate(offre.datePublication || new Date())}</span>
        <a href="postuler.html?id=${offre.id}" class="apply-btn">Postuler <i class="fas fa-arrow-right"></i></a>
      </div>
    `;
    
    offersList.appendChild(card);
  });
  
  // Mise à jour du compteur de résultats
  resultsCount.textContent = data.length;
  
  // Génération de la pagination
  generatePagination(data.length, page);
}

// Fonction pour générer la pagination
function generatePagination(totalOffers, currentPage) {
  const totalPages = Math.ceil(totalOffers / offersPerPage);
  
  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }
  
  let paginationHTML = "";
  
  // Bouton précédent
  if (currentPage > 1) {
    paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage - 1})"><i class="fas fa-chevron-left"></i></button>`;
  }
  
  // Pages
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationHTML += `<button class="pagination-btn active">${i}</button>`;
    } else {
      paginationHTML += `<button class="pagination-btn" onclick="changePage(${i})">${i}</button>`;
    }
  }
  
  // Bouton suivant
  if (currentPage < totalPages) {
    paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})"><i class="fas fa-chevron-right"></i></button>`;
  }
  
  pagination.innerHTML = paginationHTML;
}

// Fonction pour changer de page
function changePage(page) {
  currentPage = page;
  afficherOffres(filteredOffers, page);
  window.scrollTo({ top: offersList.offsetTop - 100, behavior: 'smooth' });
}

// Fonction de filtrage
function filtrerOffres() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;
  const selectedType = typeSelect.value;
  const selectedExperience = experienceSelect.value;
  const selectedSort = sortSelect.value;
  
  filteredOffers = offresData.filter(offre => {
    // Filtre par texte
    const matchText = searchText === "" || 
      offre.titre.toLowerCase().includes(searchText) || 
      offre.description.toLowerCase().includes(searchText) ||
      (offre.entreprise && offre.entreprise.toLowerCase().includes(searchText)) ||
      (offre.competences && offre.competences.some(comp => comp.toLowerCase().includes(searchText)));
    
    // Filtre par catégorie
    const matchCategory = selectedCategory === "all" || offre.categorie === selectedCategory;
    
    // Filtre par type
    const matchType = selectedType === "all" || offre.type === selectedType;
    
    // Filtre par expérience
    const matchExperience = selectedExperience === "all" || 
      (offre.experience && offre.experience.toLowerCase() === selectedExperience);
    
    return matchText && matchCategory && matchType && matchExperience;
  });
  
  // Tri des résultats
  switch(selectedSort) {
    case "newest":
      filteredOffers.sort((a, b) => new Date(b.datePublication || 0) - new Date(a.datePublication || 0));
      break;
    case "oldest":
      filteredOffers.sort((a, b) => new Date(a.datePublication || 0) - new Date(b.datePublication || 0));
      break;
    case "title-asc":
      filteredOffers.sort((a, b) => a.titre.localeCompare(b.titre));
      break;
    case "title-desc":
      filteredOffers.sort((a, b) => b.titre.localeCompare(a.titre));
      break;
  }
  
  // Réinitialiser à la première page
  currentPage = 1;
  
  // Afficher les résultats
  afficherOffres(filteredOffers, currentPage);
}

// Event listeners
searchInput.addEventListener("input", filtrerOffres);
categorySelect.addEventListener("change", filtrerOffres);
typeSelect.addEventListener("change", filtrerOffres);
experienceSelect.addEventListener("change", filtrerOffres);
sortSelect.addEventListener("change", filtrerOffres);
filterBtn.addEventListener("click", filtrerOffres);

// Menu mobile
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
  document.querySelector('nav').classList.toggle('active');
});

// Affichage initial
document.addEventListener('DOMContentLoaded', function() {
  // Ajouter des données supplémentaires si nécessaire
  offresData.forEach(offre => {
    if (!offre.datePublication) {
      // Générer une date aléatoire dans les 30 derniers jours
      const randomDays = Math.floor(Math.random() * 30);
      offre.datePublication = new Date(Date.now() - randomDays * 24 * 60 * 60 * 1000).toISOString();
    }
    
    if (!offre.entreprise && Math.random() > 0.3) {
      const entreprises = ["Telecom Djibouti", "Port de Djibouti", "Bank of Africa", "SDTV", "Djibouti Telecom", "Hôtel Kempinski", "Université de Djibouti"];
      offre.entreprise = entreprises[Math.floor(Math.random() * entreprises.length)];
    }
    
    if (!offre.localisation && Math.random() > 0.2) {
      const localisations = ["Djibouti Ville", "Ali Sabieh", "Tadjourah", "Obock", "Arta", "Dikhil"];
      offre.localisation = localisations[Math.floor(Math.random() * localisations.length)];
    }
  });
  
  filteredOffers = [...offresData];
  filtrerOffres();
});