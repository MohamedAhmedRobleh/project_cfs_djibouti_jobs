// Données pour le simulateur d'entretien
const interviewQuestions = {
  technique: [
    "Décrivez un projet technique complexe que vous avez mené et les défis que vous avez rencontrés.",
    "Comment assurez-vous la qualité de votre code?",
    "Quelles méthodologies de développement utilisez-vous et pourquoi?",
    "Comment gérez-vous les délais serrés dans un projet technique?",
    "Quels sont les outils de développement que vous maîtrisez le mieux?",
    "Comment restez-vous à jour avec les nouvelles technologies?",
    "Décrivez votre processus de débogage lorsqu'un problème survient.",
    "Comment priorisez-vous les tâches techniques dans un projet?",
    "Avez-vous de l'expérience avec [technologie spécifique]?",
    "Comment gérez-vous les conflits techniques au sein d'une équipe?"
  ],
  comportemental: [
    "Parlez-moi d'une situation où vous avez dû surmonter un conflit au travail.",
    "Décrivez un moment où vous avez fait preuve de leadership.",
    "Comment gérez-vous les critiques constructives?",
    "Parlez-moi d'un échec professionnel et de ce que vous en avez appris.",
    "Comment travaillez-vous sous pression?",
    "Décrivez une situation où vous avez dû prendre une décision difficile.",
    "Comment gérez-vous les délais serrés et les priorités conflictuelles?",
    "Parlez-moi d'un projet d'équipe réussi et de votre contribution.",
    "Comment motivez-vous les autres membres de l'équipe?",
    "Décrivez une situation où vous avez dû vous adapter à un changement important."
  ],
  mixte: [
    "Pourquoi souhaitez-vous travailler dans notre entreprise?",
    "Qu'est-ce qui vous différencie des autres candidats?",
    "Où vous voyez-vous dans 5 ans?",
    "Quelles sont vos attentes salariales?",
    "Parlez-moi de votre parcours professionnel.",
    "Qu'est-ce qui vous motive dans votre travail?",
    "Comment gérez-vous le stress et la pression?",
    "Quels sont vos plus grands strengths et weaknesses?",
    "Pourquoi avez-vous quitté votre dernier emploi?",
    "Quelles questions avez-vous pour moi?"
  ]
};

// Variables globales pour le simulateur
let currentQuestions = [];
let currentQuestionIndex = 0;
let timerInterval = null;
let remainingTime = 0;
let mediaRecorder = null;
let audioChunks = [];
let startTime = null;

// Animation au défilement
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
  
  // Initialisation du simulateur d'entretien
  initInterviewSimulator();
  
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

// Initialisation du simulateur d'entretien
function initInterviewSimulator() {
  const startBtn = document.getElementById('start-simulation');
  const restartBtn = document.getElementById('restart-simulation');
  const recordBtn = document.getElementById('record-btn');
  const stopBtn = document.getElementById('stop-btn');
  const nextBtn = document.getElementById('next-btn');
  
  startBtn.addEventListener('click', startSimulation);
  restartBtn.addEventListener('click', restartSimulation);
  recordBtn.addEventListener('click', startRecording);
  stopBtn.addEventListener('click', stopRecording);
  nextBtn.addEventListener('click', nextQuestion);
  
  // Demander l'accès au microphone au chargement
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        console.log("Accès microphone autorisé");
      })
      .catch(function(err) {
        console.log("Impossible d'accéder au microphone: ", err);
        alert("L'enregistrement audio ne fonctionnera pas sans accès au microphone. Veuillez vérifier les permissions de votre navigateur.");
      });
  }
}

// Démarrer une nouvelle simulation
function startSimulation() {
  const interviewType = document.getElementById('interview-type').value;
  const questionCount = parseInt(document.getElementById('question-count').value);
  const timerValue = parseInt(document.getElementById('timer').value);
  
  // Sélectionner les questions aléatoirement
  currentQuestions = getRandomQuestions(interviewType, questionCount);
  currentQuestionIndex = 0;
  remainingTime = timerValue;
  
  // Masquer l'écran d'accueil, afficher le simulateur
  document.getElementById('simulator-welcome').style.display = 'none';
  document.getElementById('simulator-active').style.display = 'block';
  document.getElementById('simulator-results').style.display = 'none';
  
  // Démarrer avec la première question
  displayCurrentQuestion();
  
  // Démarrer le minuteur si activé
  if (timerValue > 0) {
    startTimer();
  } else {
    document.getElementById('timer-display').style.display = 'none';
  }
}

// Obtenir des questions aléatoires
function getRandomQuestions(type, count) {
  const questions = interviewQuestions[type];
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Afficher la question actuelle
function displayCurrentQuestion() {
  if (currentQuestionIndex < currentQuestions.length) {
    document.getElementById('current-question').textContent = currentQuestions[currentQuestionIndex];
    document.getElementById('response-feedback').style.display = 'none';
    document.getElementById('record-btn').disabled = false;
    document.getElementById('stop-btn').disabled = true;
    document.getElementById('next-btn').disabled = true;
    
    // Réinitialiser le minuteur
    if (remainingTime > 0) {
      resetTimer();
    }
  } else {
    // Fin de la simulation
    endSimulation();
  }
}

// Démarrer l'enregistrement
function startRecording() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        audioChunks = [];
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = function(event) {
          audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = function() {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audioElement = document.getElementById('recorded-audio');
          audioElement.src = audioUrl;
          
          // Afficher les conseils de feedback
          document.getElementById('response-feedback').style.display = 'block';
          document.getElementById('next-btn').disabled = false;
        };
        
        mediaRecorder.start();
        document.getElementById('record-btn').disabled = true;
        document.getElementById('stop-btn').disabled = false;
        startTime = new Date();
      })
      .catch(function(err) {
        console.log("Erreur d'accès au microphone: ", err);
        alert("Impossible d'accéder au microphone. Veuillez vérifier les permissions de votre navigateur.");
      });
  }
}

// Arrêter l'enregistrement
function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    document.getElementById('record-btn').disabled = true;
    document.getElementById('stop-btn').disabled = true;
    
    // Arrêter le minuteur
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  }
}

// Passer à la question suivante
function nextQuestion() {
  currentQuestionIndex++;
  displayCurrentQuestion();
}

// Démarrer le minuteur
function startTimer() {
  resetTimer();
  document.getElementById('timer-display').style.display = 'block';
  
  timerInterval = setInterval(function() {
    remainingTime--;
    updateTimerDisplay();
    
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      stopRecording();
      // Auto-passer à la question suivante après un délai
      setTimeout(nextQuestion, 2000);
    }
  }, 1000);
}

// Réinitialiser le minuteur
function resetTimer() {
  const timerValue = parseInt(document.getElementById('timer').value);
  remainingTime = timerValue;
  updateTimerDisplay();
  
  if (timerInterval) {
    clearInterval(timerInterval);
  }
}

// Mettre à jour l'affichage du minuteur
function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  document.getElementById('timer-display').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Changement de couleur quand le temps est presque écoulé
  if (remainingTime <= 10) {
    document.getElementById('timer-display').style.color = 'var(--danger)';
    document.getElementById('timer-display').style.animation = 'pulse 1s infinite';
  } else {
    document.getElementById('timer-display').style.color = 'var(--primary)';
    document.getElementById('timer-display').style.animation = 'none';
  }
}

// Terminer la simulation
function endSimulation() {
  document.getElementById('simulator-active').style.display = 'none';
  document.getElementById('simulator-results').style.display = 'block';
  
  // Calculer et afficher les résultats
  const totalQuestions = currentQuestions.length;
  const answeredQuestions = currentQuestionIndex;
  
  document.getElementById('questions-answered').textContent = answeredQuestions;
  document.getElementById('questions-total').textContent = totalQuestions;
  
  // Simulation de résultats (dans une vraie application, ces données seraient réelles)
  document.getElementById('average-time').textContent = "45s";
  document.getElementById('preparation-level').textContent = 
    answeredQuestions >= totalQuestions * 0.8 ? "Avancé" : 
    answeredQuestions >= totalQuestions * 0.5 ? "Intermédiaire" : "Débutant";
}

// Redémarrer la simulation
function restartSimulation() {
  document.getElementById('simulator-results').style.display = 'none';
  document.getElementById('simulator-welcome').style.display = 'block';
  
  // Réinitialiser les paramètres
  if (timerInterval) {
    clearInterval(timerInterval);
  }
}