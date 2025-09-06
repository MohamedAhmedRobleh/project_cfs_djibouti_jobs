// Animation au défilement
document.addEventListener('DOMContentLoaded', function() {
  // Animation des éléments au scroll
  const animatedElements = document.querySelectorAll('.stat, .team-member, .testimonial');
  
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
  
  // Animation des statistiques
  const stats = document.querySelectorAll('.stat h3');
  if (stats.length > 0) {
    const statValues = [500, 120, 85];
    let animated = false;
    
    function animateStats() {
      if (animated) return;
      
      stats.forEach((stat, index) => {
        let current = 0;
        const target = statValues[index];
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / (target / increment);
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(timer);
            stat.textContent = target + (index === 2 ? '%' : '+');
          } else {
            stat.textContent = Math.floor(current) + (index === 2 ? '%' : '+');
          }
        }, stepTime);
      });
      
      animated = true;
    }
    
    // Observer pour déclencher l'animation des stats quand elles sont visibles
    const statsSection = document.querySelector('.mission-stats');
    if (statsSection) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.5
      });
      
      statsObserver.observe(statsSection);
    }
  }
  
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
});