// Données des articles de blog
const blogArticles = [
  {
    id: 1,
    title: "10 Conseils pour Réussir votre Entretien d'Embauche à Djibouti",
    excerpt: "Découvrez les stratégies gagnantes pour impressionner les recruteurs et décrocher le poste de vos rêves dans le marché djiboutien.",
    category: "entretien",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDA4NmQ2Ii8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTAwIiByPSI2MCIgZmlsbD0iI2U1ZThlZiIvPjxyZWN0IHg9IjIxMCIgeT0iODAiIHdpZHRoPSIxNTAiIGhlaWdodD0iNDAiIHJ4PSI1IiBmaWxsPSIjZTVlOGVmIi8+PC9zdmc+",
    date: "2023-11-15",
    author: "Ahmed Hassan",
    authorAvatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNlOWVjZWYiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjE2IiByPSI4IiBmaWxsPSIjNmM3NTdkIi8+PHBhdGggZD0iTTggMzIgQzggMjggMTYgMjggMjQgMjggQzMyIDI4IDQwIDI4IDQwIDMyIFoiIGZpbGw9IiM2Yzc1N2QiLz48L3N2Zz4=",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Les Compétences les Plus Demandées sur le Marché de l'Emploi Djiboutien en 2023",
    excerpt: "Une analyse approfondie des tendances du marché et des compétences qui vous donneront un avantage concurrentiel.",
    category: "marche",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDA4M2ZmIi8+PHBhdGggZD0iTTAgMCBMMzAwIDE1MCBMMCAxNTAgWiIgZmlsbD0iI2U1ZThlZiIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjUwIiByPSIzMCIgZmlsbD0iI2U1ZThlZiIvPjwvc3ZnPg==",
    date: "2023-11-10",
    author: "Fatouma Ali",
    authorAvatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNlOWVjZWYiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjE2IiByPSI4IiBmaWxsPSIjNmM3NTdkIi8+PHBhdGggZD0iTTggMzIgQzggMjggMTYgMjggMjQgMjggQzMyIDI4IDQwIDI4IDQwIDMyIFoiIGZpbGw9IiM2Yzc1N2QiLz48L3N2Zz4=",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "Comment Rédiger un CV qui Sort du Lot : Le Guide Complet",
    excerpt: "Apprenez les techniques éprouvées pour créer un CV qui attire l'attention des recruteurs djiboutiens.",
    category: "cv",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDA4NmQ2Ii8+PHJlY3QgeD0iNTAiIHk9IjUwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgcng9IjEwIiBmaWxsPSIjZTVlOGVmIi8+PC9zdmc+",
    date: "2023-11-05",
    author: "Kadir Mahamoud",
    authorAvatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNlOWVjZWYiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjE2IiByPSI4IiBmaWxsPSIjNmM3NTdkIi8+PHBhdGggZD0iTTggMzIgQzggMjggMTYgMjggMjQgMjggQzMyIDI4IDQwIDI4IDQwIDMyIFoiIGZpbGw9IiM2Yzc1N2QiLz48L3N2Zz4=",
    readTime: "6 min"
  },
  {
    id: 4,
    title: "Réseautage Professionnel à Djibouti : Comment Élargir votre Cercle",
    excerpt: "Découvrez comment construire un réseau professionnel solide qui vous ouvrira des portes sur le marché djiboutien.",
    category: "conseils",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDA4M2ZmIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI0MCIgZmlsbD0iI2U1ZThlZiIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiNlNWU4ZWYiLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjZTVlOGVmIi8+PGxpbmUgeDE9IjEyMCIgeTE9IjEwMCIgeDI9IjE4MCIgeTI9IjEwMCIgc3Ryb2tlPSIjZTVlOGVmIiBzdHJva2Utd2lkdGg9IjgiLz48bGluZSB4MT0iMjIwIiB5MT0iMTAwIiB4Mj0iMjgwIiB5Mj0iMTAwIiBzdHJva2U9IiNlNWU4ZWYiIHN0cm9rZS13aWR0aD0iOCIvPjwvc3ZnPg==",
    date: "2023-10-28",
    author: "Aïcha Mohamed",
    authorAvatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNlOWVjZWYiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjE2IiByPSI4IiBmaWxsPSIjNmM3NTdkIi8+PHBhdGggZD0iTTggMzIgQzggMjggMTYgMjggMjQgMjggQzMyIDI4IDQwIDI4IDQwIDMyIFoiIGZpbGw9IiM2Yzc1N2QiLz48L3N2Zz4=",
    readTime: "8 min"
  },
  {
    id: 5,
    title: "Transition de Carrière : Comment Changer de Voie Professionnelle à Djibouti",
    excerpt: "Guide pratique pour ceux qui souhaitent se réorienter professionnellement dans le contexte djiboutien.",
    category: "conseils",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDA4NmQ2Ii8+PHBhdGggZD0iTTAgMCBMMCAyMDAgTDIwMCAxMDAgWiIgZmlsbD0iI2U1ZThlZiIvPjxwYXRoIGQ9Ik0yMDAgMCBMMjAwIDIwMCBMNDAwIDEwMCBaIiBmaWxsPSIjZTVlOGVmIi8+PC9zdmc+",
    date: "2023-10-20",
    author: "Hassan Omar",
    authorAvatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNlOWVjZWYiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjE2IiByPSI4IiBmaWxsPSIjNmM3NTdkIi8+PHBhdGggZD0iTTggMzIgQzggMjggMTYgMjggMjQgMjggQzMyIDI4IDQwIDI4IDQwIDMyIFoiIGZpbGw9IiM2Yzc1N2QiLz48L3N2Zz4=",
    readTime: "10 min"
  },
  {
    id: 6,
    title: "Télétravail à Djibouti : Opportunités et Défis",
    excerpt: "Explorez les possibilités de travail à distance dans le contexte djiboutien et comment en tirer profit.",
    category: "marche",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDA4M2ZmIi8+PHJlY3QgeD0iNTAiIHk9IjUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjEwIiBmaWxsPSIjZTVlOGVmIi8+PHJlY3QgeD0iMjUwIiB5PSI1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSIxMCIgZmlsbD0iI2U1ZThlZiIvPjwvc3ZnPg==",
    date: "2023-10-15",
    author: "Farah Abdi",
    authorAvatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNlOWVjZWYiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjE2IiByPSI4IiBmaWxsPSIjNmM3NTdkIi8+PHBhdGggZD0iTTggMzIgQzggMjggMTYgMjggMjQgMjggQzMyIDI4IDQwIDI4IDQwIDMyIFoiIGZpbGw9IiM2Yzc1N2QiLz48L3N2Zz4=",
    readTime: "9 min"
  }
];

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  loadArticles();
  setupEventListeners();
});

// Charger les articles
function loadArticles() {
  const articlesGrid = document.getElementById('articles-grid');
  articlesGrid.innerHTML = '';
  
  blogArticles.forEach(article => {
    const articleCard = createArticleCard(article);
    articlesGrid.appendChild(articleCard);
  });
}

// Créer une carte d'article
function createArticleCard(article) {
  const articleDate = new Date(article.date);
  const formattedDate = articleDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  
  // Déterminer le nom de la catégorie
  let categoryName = 'Conseils';
  switch(article.category) {
    case 'entretien':
      categoryName = 'Entretiens';
      break;
    case 'cv':
      categoryName = 'CV & Lettres';
      break;
    case 'marche':
      categoryName = 'Marché emploi';
      break;
  }
  
  const articleElement = document.createElement('div');
  articleElement.className = 'article-card';
  articleElement.innerHTML = `
    <div class="article-image">
      <img src="${article.image}" alt="${article.title}">
      <span class="article-category">${categoryName}</span>
    </div>
    <div class="article-content">
      <div class="article-date">${formattedDate} • ${article.readTime} de lecture</div>
      <h3 class="article-title">${article.title}</h3>
      <p class="article-excerpt">${article.excerpt}</p>
      <div class="article-footer">
        <div class="article-author">
          <img src="${article.authorAvatar}" alt="${article.author}" class="author-avatar">
          <span class="author-name">${article.author}</span>
        </div>
        <a href="#" class="read-more">Lire plus <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>
  `;
  
  return articleElement;
}

// Configurer les écouteurs d'événements
function setupEventListeners() {
  // Recherche d'articles
  const searchInput = document.getElementById('blog-search');
  searchInput.addEventListener('input', filterArticles);
  
  // Filtrage par catégorie
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      filterByCategory(category);
    });
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
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    subscribeNewsletter(email);
  });
}

// Filtrer les articles par recherche
function filterArticles() {
  const searchTerm = document.getElementById('blog-search').value.toLowerCase();
  const articlesGrid = document.getElementById('articles-grid');
  
  articlesGrid.innerHTML = '';
  
  const filteredArticles = blogArticles.filter(article => 
    article.title.toLowerCase().includes(searchTerm) || 
    article.excerpt.toLowerCase().includes(searchTerm) ||
    article.author.toLowerCase().includes(searchTerm) ||
    article.category.toLowerCase().includes(searchTerm)
  );
  
  if (filteredArticles.length === 0) {
    articlesGrid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search fa-3x"></i>
        <h3>Aucun article trouvé</h3>
        <p>Essayez d'autres mots-clés</p>
      </div>
    `;
    return;
  }
  
  filteredArticles.forEach(article => {
    const articleCard = createArticleCard(article);
    articlesGrid.appendChild(articleCard);
  });
}

// Filtrer par catégorie
function filterByCategory(category) {
  const articlesGrid = document.getElementById('articles-grid');
  
  articlesGrid.innerHTML = '';
  
  const filteredArticles = blogArticles.filter(article => 
    article.category === category
  );
  
  if (filteredArticles.length === 0) {
    articlesGrid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-folder-open fa-3x"></i>
        <h3>Aucun article dans cette catégorie</h3>
        <p>D'autres articles seront bientôt disponibles</p>
      </div>
    `;
    return;
  }
  
  filteredArticles.forEach(article => {
    const articleCard = createArticleCard(article);
    articlesGrid.appendChild(articleCard);
  });
  
  // Mettre à jour l'interface pour indiquer la catégorie active
  document.querySelectorAll('.category-card').forEach(card => {
    card.style.opacity = card.getAttribute('data-category') === category ? '1' : '0.7';
  });
}

// S'inscrire à la newsletter
function subscribeNewsletter(email) {
  // Simulation d'envoi
  const newsletterForm = document.querySelector('.newsletter-form');
  const button = newsletterForm.querySelector('button');
  const originalText = button.innerHTML;
  
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription...';
  button.disabled = true;
  
  setTimeout(() => {
    button.innerHTML = '<i class="fas fa-check"></i> Inscrit!';
    button.style.background = 'var(--success)';
    
    // Réinitialiser après 2 secondes
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
      button.style.background = '';
      newsletterForm.reset();
    }, 2000);
  }, 1500);
  
  // Enregistrer l'email (dans une vraie application, l'envoyer au serveur)
  let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
  }
}

// Animation au défilement
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

// Observer les éléments à animer
document.querySelectorAll('.article-card, .category-card, .testimonial-card').forEach(element => {
  element.style.opacity = '0';
  observer.observe(element);
});