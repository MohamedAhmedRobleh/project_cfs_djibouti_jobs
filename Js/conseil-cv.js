// ===== Script principal complet (animations, menu, accordéon, téléchargements, générateur de CV) =====
document.addEventListener('DOMContentLoaded', function () {
  // --- Animation au défilement ---
  const animatedElements = document.querySelectorAll('.stat-item, .template-card, .step, .question-category');
  if (animatedElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeIn 0.8s forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  // --- Menu mobile ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => nav.classList.toggle('active'));

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (event) => {
      if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn') && nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  }

  // --- Accordéon des conseils ---
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;
    header.addEventListener('click', () => {
      // fermer les autres
      accordionItems.forEach(other => {
        if (other !== item && other.classList.contains('active')) other.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });

  // --- Simulation de téléchargement (exclut le bouton de téléchargement CV) ---
  const downloadButtons = document.querySelectorAll('.download-btn');
  downloadButtons.forEach(button => {
    // skip the real CV download button so it can perform the real download
    if (button.id === 'download-cv') return;

    button.addEventListener('click', function (e) {
      e.preventDefault();
      const originalHTML = button.innerHTML;
      const originalBg = button.style.background;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
      button.style.opacity = '0.7';

      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Téléchargé !';
        button.style.background = 'var(--success)';
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.background = originalBg || '';
          button.style.opacity = '1';
        }, 2000);
      }, 1400);
    });
  });

  // --- Navigation fluide ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        window.scrollTo({ top: targetEl.offsetTop - 80, behavior: 'smooth' });
        if (nav && nav.classList.contains('active')) nav.classList.remove('active');
      }
    });
  });

  // ==========================
  // Générateur de CV
  // ==========================
  const generateBtn = document.getElementById('generate-cv');
  const cvOutput = document.getElementById('cv-output'); // textarea pour l'aperçu
  const downloadCvBtn = document.getElementById('download-cv');

  if (generateBtn && cvOutput) {
    // assure que le bouton ne trigger pas un submit s'il est dans un form
    try { generateBtn.setAttribute('type', 'button'); } catch (e) { /* ignore */ }

    generateBtn.addEventListener('click', function (e) {
      e.preventDefault();

      // récupération des champs (IDs matchant ton HTML)
      const name = (document.getElementById('cv-name')?.value || '').trim();
      const email = (document.getElementById('cv-email')?.value || '').trim();
      const phone = (document.getElementById('cv-phone')?.value || '').trim();
      const address = (document.getElementById('cv-address')?.value || '').trim();
      const skillsRaw = (document.getElementById('cv-skills')?.value || '').trim();
      const education = (document.getElementById('cv-education')?.value || '').trim();
      const experience = (document.getElementById('cv-experience')?.value || '').trim();
      const languages = (document.getElementById('cv-languages')?.value || '').trim();

      // validation minimale
      if (!name) {
        alert("Veuillez entrer votre nom complet.");
        return;
      }

      // formater les compétences (une par ligne si séparées par virgule)
      const skillsList = skillsRaw
        ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean)
        : [];

      // construire le contenu du CV (texte simple, adapté à la textarea + téléchargement .txt)
      let cvText = `Nom complet : ${name}\n`;
      if (email) cvText += `Email : ${email}\n`;
      if (phone) cvText += `Téléphone : ${phone}\n`;
      if (address) cvText += `Adresse : ${address}\n`;
      cvText += `\n=== Compétences ===\n`;
      if (skillsList.length) {
        cvText += skillsList.map(s => `- ${s}`).join('\n') + '\n';
      } else if (skillsRaw) {
        cvText += `${skillsRaw}\n`;
      } else {
        cvText += `N/A\n`;
      }
      cvText += `\n=== Formations ===\n${education || 'N/A'}\n`;
      cvText += `\n=== Expériences professionnelles ===\n${experience || 'N/A'}\n`;
      cvText += `\n=== Langues ===\n${languages || 'N/A'}\n`;

      // afficher dans la textarea d'aperçu
      cvOutput.value = cvText;
      // placer le focus sur la zone d'aperçu pour que l'utilisateur voie le résultat
      cvOutput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  } else {
    // si on ne trouve pas les éléments, log utile pour debug
    if (!generateBtn) console.warn("Générateur CV : bouton #generate-cv introuvable.");
    if (!cvOutput) console.warn("Générateur CV : textarea #cv-output introuvable.");
  }

  // Téléchargement du CV en .txt (bouton dédié)
  if (downloadCvBtn && cvOutput) {
    downloadCvBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const text = (cvOutput.value || '').trim();
      if (!text) {
        alert("Générez d'abord votre CV avant de le télécharger.");
        return;
      }
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'mon_cv.txt';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    });
  }
});
