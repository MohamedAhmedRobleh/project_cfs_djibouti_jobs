// Animation au défilement
document.addEventListener('DOMContentLoaded', function() {
  // Animation des éléments au scroll
  const animatedElements = document.querySelectorAll('.stat-item, .template-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.8s forwards';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
  });
  
  // Menu mobile
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    nav.classList.toggle('active');
  });
  
  // Fermer le menu en cliquant à l'extérieur
  document.addEventListener('click', function(event) {
    if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn') && nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });
  
  // Accordéon des conseils
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', function() {
      // Fermer tous les autres items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Basculer l'item actuel
      item.classList.toggle('active');
    });
  });
  
  // Simulation de téléchargement
  const downloadButtons = document.querySelectorAll('.download-btn');
  
  downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Animation de téléchargement
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
      button.style.opacity = '0.7';
      
      // Simulation du téléchargement
      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Téléchargé !';
        button.style.background = 'var(--success)';
        
        // Réinitialiser après 2 secondes
        setTimeout(() => {
          button.innerHTML = originalText;
          button.style.background = '';
          button.style.opacity = '1';
        }, 2000);
      }, 1500);
    });
  });
  
  // Navigation fluide
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Fermer le menu mobile si ouvert
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
        }
      }
    });
  });
  
  // Sauvegarde de la checklist
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  
  // Charger l'état sauvegardé
  checkboxes.forEach(checkbox => {
    const savedState = localStorage.getItem(checkbox.id);
    if (savedState === 'true') {
      checkbox.checked = true;
    }
    
    // Sauvegarder lors du changement
    checkbox.addEventListener('change', function() {
      localStorage.setItem(this.id, this.checked);
    });
  });
  
  // Bouton pour réinitialiser la checklist
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Réinitialiser la checklist';
  resetButton.style.display = 'block';
  resetButton.style.margin = '1rem auto 0';
  resetButton.style.padding = '0.5rem 1rem';
  resetButton.style.background = 'var(--light-gray)';
  resetButton.style.border = 'none';
  resetButton.style.borderRadius = '4px';
  resetButton.style.cursor = 'pointer';
  resetButton.style.transition = 'background 0.3s';
  
  resetButton.addEventListener('mouseover', function() {
    this.style.background = '#d1d9e0';
  });
  
  resetButton.addEventListener('mouseout', function() {
    this.style.background = 'var(--light-gray)';
  });
  
  resetButton.addEventListener('click', function() {
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
      localStorage.setItem(checkbox.id, 'false');
    });
  });
  
  document.querySelector('.checklist').appendChild(resetButton);
});