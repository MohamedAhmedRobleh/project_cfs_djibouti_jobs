// Variables globales
let allCandidates = [];
let filteredCandidates = [];
let currentPage = 1;
const candidatesPerPage = 10;
let sortField = 'date';
let sortDirection = 'desc';

// Éléments DOM
const tableBody = document.querySelector("#candidaturesTable tbody");
const totalCandidatesEl = document.getElementById("total-candidates");
const newCandidatesEl = document.getElementById("new-candidates");
const reviewedCandidatesEl = document.getElementById("reviewed-candidates");
const contactedCandidatesEl = document.getElementById("contacted-candidates");
const statusFilter = document.getElementById("status-filter");
const offerFilter = document.getElementById("offer-filter");
const dateFilter = document.getElementById("date-filter");
const filterBtn = document.querySelector(".filter-btn");
const exportBtn = document.querySelector(".export-btn");
const deleteAllBtn = document.querySelector(".delete-all-btn");
const selectAllCheckbox = document.getElementById("select-all");
const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const pageNumbersEl = document.getElementById("page-numbers");
const detailsModal = document.getElementById("details-modal");
const confirmModal = document.getElementById("confirm-modal");
const closeModalButtons = document.querySelectorAll(".close-modal");

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  loadCandidates();
  setupEventListeners();
  updateStats();
});

// Charger les candidatures
function loadCandidates() {
  allCandidates = JSON.parse(localStorage.getItem("candidatures")) || [];
  
  // Ajouter des données de statut si elles n'existent pas
  allCandidates.forEach(candidate => {
    if (!candidate.status) {
      candidate.status = 'new';
    }
    if (!candidate.date) {
      candidate.date = new Date().toISOString();
    }
  });
  
  // Sauvegarder les modifications
  localStorage.setItem("candidatures", JSON.stringify(allCandidates));
  
  filteredCandidates = [...allCandidates];
  populateOfferFilter();
  sortCandidates();
  displayCandidates();
  updatePagination();
}

// Configurer les écouteurs d'événements
function setupEventListeners() {
  // Filtres
  filterBtn.addEventListener('click', applyFilters);
  statusFilter.addEventListener('change', applyFilters);
  offerFilter.addEventListener('change', applyFilters);
  dateFilter.addEventListener('change', applyFilters);
  
  // Actions
  exportBtn.addEventListener('click', exportCandidates);
  deleteAllBtn.addEventListener('click', confirmDeleteAll);
  
  // Tri des colonnes
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const field = th.getAttribute('data-sort');
      if (sortField === field) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        sortField = field;
        sortDirection = 'asc';
      }
      sortCandidates();
      displayCandidates();
      updateSortIndicators();
    });
  });
  
  // Pagination
  prevPageBtn.addEventListener('click', goToPrevPage);
  nextPageBtn.addEventListener('click', goToNextPage);
  
  // Modals
  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', closeModals);
  });
  
  // Fermer les modals en cliquant à l'extérieur
  window.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
      closeModals();
    }
    if (e.target === confirmModal) {
      closeModals();
    }
  });
  
  // Sélectionner tout
  selectAllCheckbox.addEventListener('change', toggleSelectAll);
}

// Appliquer les filtres
function applyFilters() {
  const status = statusFilter.value;
  const offer = offerFilter.value;
  const date = dateFilter.value;
  
  filteredCandidates = allCandidates.filter(candidate => {
    let matches = true;
    
    if (status !== 'all' && candidate.status !== status) {
      matches = false;
    }
    
    if (offer !== 'all' && candidate.poste !== offer) {
      matches = false;
    }
    
    if (date) {
      const candidateDate = new Date(candidate.date).toLocaleDateString('fr-CA');
      if (candidateDate !== date) {
        matches = false;
      }
    }
    
    return matches;
  });
  
  currentPage = 1;
  sortCandidates();
  displayCandidates();
  updatePagination();
  updateStats();
}

// Peupler le filtre des offres
function populateOfferFilter() {
  const offers = [...new Set(allCandidates.map(candidate => candidate.poste))];
  
  // Vider les options existantes (garder seulement "Toutes les offres")
  while (offerFilter.options.length > 1) {
    offerFilter.remove(1);
  }
  
  // Ajouter les offres
  offers.forEach(offer => {
    if (offer) {
      const option = document.createElement('option');
      option.value = offer;
      option.textContent = offer;
      offerFilter.appendChild(option);
    }
  });
}

// Trier les candidatures
function sortCandidates() {
  filteredCandidates.sort((a, b) => {
    let valueA, valueB;
    
    switch (sortField) {
      case 'nom':
        valueA = a.nom.toLowerCase();
        valueB = b.nom.toLowerCase();
        break;
      case 'email':
        valueA = a.email.toLowerCase();
        valueB = b.email.toLowerCase();
        break;
      case 'offre':
        valueA = a.poste.toLowerCase();
        valueB = b.poste.toLowerCase();
        break;
      case 'status':
        valueA = a.status;
        valueB = b.status;
        break;
      case 'date':
      default:
        valueA = new Date(a.date);
        valueB = new Date(b.date);
        break;
    }
    
    if (valueA < valueB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

// Mettre à jour les indicateurs de tri
function updateSortIndicators() {
  document.querySelectorAll('th[data-sort] i').forEach(icon => {
    icon.className = 'fas fa-sort';
  });
  
  const currentSortHeader = document.querySelector(`th[data-sort="${sortField}"]`);
  if (currentSortHeader) {
    const icon = currentSortHeader.querySelector('i');
    if (icon) {
      icon.className = sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    }
  }
}

// Afficher les candidatures
function displayCandidates() {
  tableBody.innerHTML = "";
  
  if (filteredCandidates.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td colspan="7" style="text-align: center; padding: 2rem; color: var(--gray);">
        <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
        <p>Aucune candidature trouvée</p>
      </td>
    `;
    tableBody.appendChild(tr);
    return;
  }
  
  const startIndex = (currentPage - 1) * candidatesPerPage;
  const endIndex = Math.min(startIndex + candidatesPerPage, filteredCandidates.length);
  const pageCandidates = filteredCandidates.slice(startIndex, endIndex);
  
  pageCandidates.forEach((candidate, index) => {
    const globalIndex = filteredCandidates.findIndex(c => c === candidate);
    const tr = document.createElement('tr');
    
    // Formater la date
    const date = new Date(candidate.date);
    const formattedDate = date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    // Déterminer la classe du badge de statut
    let statusClass = 'status-new';
    let statusText = 'Nouveau';
    
    switch (candidate.status) {
      case 'reviewed':
        statusClass = 'status-reviewed';
        statusText = 'Examiné';
        break;
      case 'contacted':
        statusClass = 'status-contacted';
        statusText = 'Contacté';
        break;
      case 'hired':
        statusClass = 'status-hired';
        statusText = 'Embauché';
        break;
      case 'rejected':
        statusClass = 'status-rejected';
        statusText = 'Rejeté';
        break;
    }
    
    tr.innerHTML = `
      <td><input type="checkbox" class="candidate-checkbox" data-index="${globalIndex}"></td>
      <td>${candidate.nom}</td>
      <td>${candidate.email}</td>
      <td>${candidate.poste}</td>
      <td>${formattedDate}</td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
      <td>
        <div class="action-buttons">
          <button class="view-btn" data-index="${globalIndex}"><i class="fas fa-eye"></i></button>
          <button class="contact-btn" data-index="${globalIndex}"><i class="fas fa-envelope"></i></button>
          <button class="download-btn" data-index="${globalIndex}"><i class="fas fa-download"></i></button>
          <button class="delete-btn" data-index="${globalIndex}"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    `;
    
    tableBody.appendChild(tr);
  });
  
  // Ajouter les événements aux boutons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => viewCandidate(btn.dataset.index));
  });
  
  document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', () => contactCandidate(btn.dataset.index));
  });
  
  document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', () => downloadCandidate(btn.dataset.index));
  });
  
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => confirmDeleteCandidate(btn.dataset.index));
  });
  
  document.querySelectorAll('.candidate-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateSelectAllState);
  });
  
  updateSelectAllState();
}

// Mettre à jour la pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
  
  // Masquer la pagination si une seule page
  if (totalPages <= 1) {
    document.querySelector('.pagination').style.display = 'none';
    return;
  }
  
  document.querySelector('.pagination').style.display = 'flex';
  
  // Boutons précédent/suivant
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;
  
  // Numéros de page
  pageNumbersEl.innerHTML = '';
  
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = 'page-btn';
    if (i === currentPage) {
      pageBtn.classList.add('active');
    }
    pageBtn.textContent = i;
    pageBtn.addEventListener('click', () => goToPage(i));
    pageNumbersEl.appendChild(pageBtn);
  }
}

// Aller à une page spécifique
function goToPage(page) {
  currentPage = page;
  displayCandidates();
  updatePagination();
}

// Aller à la page précédente
function goToPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayCandidates();
    updatePagination();
  }
}

// Aller à la page suivante
function goToNextPage() {
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayCandidates();
    updatePagination();
  }
}

// Mettre à jour les statistiques
function updateStats() {
  const total = allCandidates.length;
  const newCount = allCandidates.filter(c => c.status === 'new').length;
  const reviewedCount = allCandidates.filter(c => c.status === 'reviewed').length;
  const contactedCount = allCandidates.filter(c => c.status === 'contacted').length;
  
  totalCandidatesEl.textContent = total;
  newCandidatesEl.textContent = newCount;
  reviewedCandidatesEl.textContent = reviewedCount;
  contactedCandidatesEl.textContent = contactedCount;
}

// Voir les détails d'une candidature
function viewCandidate(index) {
  const candidate = filteredCandidates[index];
  
  // Remplir les détails dans le modal
  document.getElementById('detail-nom').textContent = candidate.nom;
  document.getElementById('detail-email').textContent = candidate.email;
  document.getElementById('detail-telephone').textContent = candidate.telephone || 'Non renseigné';
  document.getElementById('detail-poste').textContent = candidate.poste;
  document.getElementById('detail-message').textContent = candidate.message || 'Aucun message';
  document.getElementById('detail-nom-cv').textContent = candidate.nom;
  document.getElementById('detail-nom-lettre').textContent = candidate.nom;
  document.getElementById('detail-status').value = candidate.status;
  
  // Sauvegarder le statut
  document.getElementById('save-status').onclick = () => {
    candidate.status = document.getElementById('detail-status').value;
    localStorage.setItem("candidatures", JSON.stringify(allCandidates));
    displayCandidates();
    updateStats();
    closeModals();
  };
  
  // Afficher le modal
  detailsModal.classList.add('show');
}

// Contacter un candidat
function contactCandidate(index) {
  const candidate = filteredCandidates[index];
  window.open(`mailto:${candidate.email}?subject=Response to your application&body=Dear ${candidate.nom},`, '_blank');
}

// Télécharger le CV d'un candidat (simulation)
function downloadCandidate(index) {
  const candidate = filteredCandidates[index];
  
  // Simulation de téléchargement
  const a = document.createElement('a');
  a.href = 'data:text/plain;charset=utf-8,CV de ' + candidate.nom;
  a.download = `CV_${candidate.nom}.pdf`;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Confirmer la suppression d'une candidature
function confirmDeleteCandidate(index) {
  const confirmDeleteBtn = document.querySelector('.confirm-delete-btn');
  
  confirmDeleteBtn.onclick = () => {
    deleteCandidate(index);
    closeModals();
  };
  
  confirmModal.classList.add('show');
}

// Supprimer une candidature
function deleteCandidate(index) {
  const candidate = filteredCandidates[index];
  const globalIndex = allCandidates.findIndex(c => 
    c.nom === candidate.nom && 
    c.email === candidate.email && 
    c.date === candidate.date
  );
  
  if (globalIndex !== -1) {
    allCandidates.splice(globalIndex, 1);
    localStorage.setItem("candidatures", JSON.stringify(allCandidates));
    loadCandidates(); // Recharger les données
  }
}

// Confirmer la suppression de toutes les candidatures
function confirmDeleteAll() {
  if (allCandidates.length === 0) return;
  
  const confirmDeleteBtn = document.querySelector('.confirm-delete-btn');
  
  confirmDeleteBtn.onclick = () => {
    localStorage.removeItem("candidatures");
    loadCandidates(); // Recharger les données
    closeModals();
  };
  
  confirmModal.classList.add('show');
}

// Exporter les candidatures
function exportCandidates() {
  if (filteredCandidates.length === 0) return;
  
  // Créer un CSV
  let csv = 'Nom,Email,Téléphone,Offre,Date,Statut,Message\n';
  
  filteredCandidates.forEach(candidate => {
    const row = [
      candidate.nom,
      candidate.email,
      candidate.telephone || '',
      candidate.poste,
      new Date(candidate.date).toLocaleDateString('fr-FR'),
      candidate.status,
      candidate.message ? `"${candidate.message.replace(/"/g, '""')}"` : ''
    ];
    
    csv += row.join(',') + '\n';
  });
  
  // Créer un blob et un lien de téléchargement
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  
  a.href = url;
  a.download = `candidatures_djibouti_jobs_${date}.csv`;
  a.style.display = 'none';
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Fermer tous les modals
function closeModals() {
  detailsModal.classList.remove('show');
  confirmModal.classList.remove('show');
}

// Sélectionner/désélectionner toutes les candidatures
function toggleSelectAll() {
  const checkboxes = document.querySelectorAll('.candidate-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = selectAllCheckbox.checked;
  });
}

// Mettre à jour l'état de la case "Sélectionner tout"
function updateSelectAllState() {
  const checkboxes = document.querySelectorAll('.candidate-checkbox');
  const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
  
  if (checkboxes.length === 0) {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = false;
  } else if (checkedCount === checkboxes.length) {
    selectAllCheckbox.checked = true;
    selectAllCheckbox.indeterminate = false;
  } else if (checkedCount > 0) {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = true;
  } else {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = false;
  }
}