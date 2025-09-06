const form = document.getElementById("applicationForm");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const newApplicationBtn = document.getElementById("newApplication");

// Validation des champs en temps réel
const inputs = form.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('blur', function() {
    validateField(this);
  });
});

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.id;
  
  // Réinitialiser le message d'erreur
  removeError(field);
  
  // Validation spécifique selon le champ
  if (field.hasAttribute('required') && !value) {
    showError(field, 'Ce champ est obligatoire');
    return false;
  }
  
  switch(fieldName) {
    case 'email':
      if (!isValidEmail(value)) {
        showError(field, 'Veuillez entrer une adresse email valide');
        return false;
      }
      break;
    case 'telephone':
      if (!isValidPhone(value)) {
        showError(field, 'Veuillez entrer un numéro de téléphone valide');
        return false;
      }
      break;
    case 'cv':
      if (field.files.length > 0) {
        const file = field.files[0];
        if (!isValidFile(file)) {
          showError(field, 'Le fichier doit être au format PDF ou DOC et faire moins de 2MB');
          return false;
        }
      }
      break;
  }
  
  return true;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidPhone(phone) {
  const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
  return re.test(phone);
}

function isValidFile(file) {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const maxSize = 2 * 1024 * 1024; // 2MB
  
  return allowedTypes.includes(file.type) && file.size <= maxSize;
}

function showError(field, message) {
  removeError(field);
  
  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;
  error.style.color = '#dc3545';
  error.style.fontSize = '0.8rem';
  error.style.marginTop = '0.3rem';
  
  field.parentNode.appendChild(error);
  field.style.borderColor = '#dc3545';
}

function removeError(field) {
  const error = field.parentNode.querySelector('.error-message');
  if (error) {
    error.remove();
  }
  field.style.borderColor = '';
}

// Gestion de la soumission du formulaire
form.addEventListener("submit", function(e){
  e.preventDefault();
  
  // Valider tous les champs
  let isValid = true;
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    // Faire défiler jusqu'au premier champ erroné
    const firstError = form.querySelector('.error-message');
    if (firstError) {
      firstError.closest('.form-group').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
    return;
  }
  
  // Sauvegarde dans LocalStorage
  const candidature = {
    nom: document.getElementById("nom").value.trim(),
    email: document.getElementById("email").value.trim(),
    telephone: document.getElementById("telephone").value.trim(),
    poste: document.getElementById("poste").value.trim(),
    message: document.getElementById("message").value.trim(),
    date: new Date().toISOString()
  };

  let candidats = JSON.parse(localStorage.getItem("candidats")) || [];
  candidats.push(candidature);
  localStorage.setItem("candidats", JSON.stringify(candidats));
  
  // Envoyer les données (simulation)
  simulateApplicationSend()
    .then(() => {
      // Affichage popup
      popup.classList.add("show");
      form.reset();
    })
    .catch(error => {
      alert("Une erreur s'est produite lors de l'envoi de votre candidature. Veuillez réessayer.");
      console.error(error);
    });
});

// Simulation d'envoi de candidature
function simulateApplicationSend() {
  return new Promise((resolve, reject) => {
    // Simuler un délai réseau
    setTimeout(() => {
      // Simuler un succès 90% du temps
      if (Math.random() > 0.1) {
        resolve();
      } else {
        reject(new Error("Erreur de connexion"));
      }
    }, 1500);
  });
}

// Gestion de la popup
closePopup.addEventListener("click", function(){
  popup.classList.remove("show");
});

newApplicationBtn.addEventListener("click", function(){
  popup.classList.remove("show");
  // Faire défiler jusqu'au formulaire
  form.scrollIntoView({ behavior: 'smooth' });
});

// Menu mobile
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
  document.querySelector('nav').classList.toggle('active');
});

// Mise à jour de l'interface des fichiers
const fileInputs = document.querySelectorAll('input[type="file"]');
fileInputs.forEach(input => {
  input.addEventListener('change', function() {
    const fileName = this.files[0]?.name || 'Aucun fichier choisi';
    const label = this.nextElementSibling;
    label.textContent = fileName;
    
    // Valider le fichier
    validateField(this);
  });
});