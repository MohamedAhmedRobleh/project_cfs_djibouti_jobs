// ==================== Script Principal ====================

document.addEventListener('DOMContentLoaded', function() {
  // Animation des éléments au scroll
  const animatedElements = document.querySelectorAll('.stat-item, .step, .question-category');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.8s forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
  });

  // Menu mobile
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
    document.addEventListener('click', function(event) {
      if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn') && nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  }

  // Sauvegarde de la checklist
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    const savedState = localStorage.getItem(checkbox.id);
    if (savedState === 'true') checkbox.checked = true;
    checkbox.addEventListener('change', function() {
      localStorage.setItem(this.id, this.checked);
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
        if (nav && nav.classList.contains('active')) nav.classList.remove('active');
      }
    });
  });

  // Initialisation du générateur de lettres
  initLetterGenerator();
});

// ==================== Générateur de lettres de motivation ====================

function initLetterGenerator() {
  const generateBtn = document.getElementById("generate-letter");
  const letterOutput = document.getElementById("letter-output");
  const downloadBtn = document.getElementById("download-letter");

  if (!generateBtn || !letterOutput) {
    console.warn("Le bouton ou la zone de sortie de la lettre n'a pas été trouvé.");
    return;
  }

  // Empêche le bouton de soumettre un form par défaut
  generateBtn.setAttribute('type', 'button');
  const parentForm = generateBtn.closest('form');
  if (parentForm) parentForm.addEventListener('submit', e => e.preventDefault());

  // Fonction pour récupérer la valeur d'un champ ou placeholder
  function getValue(selectors, fallback = '') {
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (!el) continue;
      if (['INPUT','TEXTAREA','SELECT'].includes(el.tagName)) {
        const val = el.value.trim();
        if (val) return val;
        if (el.placeholder && el.placeholder.trim()) return el.placeholder.trim();
      } else {
        const txt = (el.textContent || el.getAttribute('value') || '').trim();
        if (txt) return txt;
      }
    }
    return fallback;
  }

  // Sélecteurs pour chaque champ
  const nameSelectors = ['#name', 'input[name="name"]'];
  const posteSelectors = ['#job-title', '#poste', 'input[name="poste"]'];
  const entrepriseSelectors = ['#company-name', '#entreprise', 'input[name="company"]'];
  const secteurSelectors = ['#sector', '#secteur', 'input[name="sector"]'];
  const toneSelectors = ['#tone', 'select[name="tone"]'];

  // Génération de la lettre
  generateBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const name = getValue(nameSelectors, '[Votre Nom]');
    const poste = getValue(posteSelectors, 'un poste');
    const entreprise = getValue(entrepriseSelectors, 'votre entreprise');
    const secteur = getValue(secteurSelectors, 'votre secteur');
    const tone = getValue(toneSelectors, 'formel');

    console.log('[Generator] Nom:', name, 'Poste:', poste, 'Entreprise:', entreprise, 'Secteur:', secteur, 'Style:', tone);

    // Lettres selon style (simple exemple)
    let lettre = '';
    switch (tone) {
      case 'convaincant':
        lettre = `Bonjour,

Je vous écris pour vous convaincre que ma candidature au poste de ${poste} chez ${entreprise} est idéale. Avec mon expérience dans ${secteur}, je suis sûr de pouvoir exceller et apporter une forte valeur ajoutée à votre équipe.

Je suis impatient(e) de vous rencontrer pour discuter de ma motivation.

Cordialement,
${name}`;
        break;

      case 'créatif':
        lettre = `Cher(e) recruteur(se),

Passionné(e) par le domaine ${secteur}, je souhaite rejoindre ${entreprise} en tant que ${poste}. Mon approche créative et mes compétences variées me permettront de contribuer de façon originale et efficace à vos projets.

Au plaisir de vous rencontrer,
${name}`;
        break;

      default: // formel
        lettre = `Madame, Monsieur,

Actuellement à la recherche d’une nouvelle opportunité, je souhaite vous proposer ma candidature pour le poste de ${poste} au sein de ${entreprise}.

Je possède des compétences solides dans le domaine de ${secteur}, que j’ai développées au cours de mes expériences précédentes. Mon sens de l’organisation, ma rigueur et ma capacité d’adaptation me permettront de contribuer efficacement aux missions confiées.

Motivé(e), dynamique et désireux(se) d’apporter une réelle valeur ajoutée à votre équipe, je suis convaincu(e) que ma candidature saura retenir votre attention.

Je reste à votre disposition pour un entretien afin de vous exposer plus en détail ma motivation.

Veuillez agréer, Madame, Monsieur, l’expression de mes salutations distinguées.

Cordialement,
${name}`;
    }

    letterOutput.value = lettre;
  });

  // Téléchargement de la lettre
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const text = (letterOutput.value || '').trim();
      if (!text) return alert("Veuillez d'abord générer une lettre !");
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "lettre_motivation.word";
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    });
  } else {
    console.warn("Bouton de téléchargement non trouvé.");
  }
}
