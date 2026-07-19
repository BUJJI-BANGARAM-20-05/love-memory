"use strict";

// =========================================================
// 1. EASY PERSONALIZATION
// Change the name here. It will appear on the home page.
// =========================================================
const birthdayName = "Love Journey";

// =========================================================
// 2. QUIZ QUESTIONS
// Replace these with personal questions whenever you like.
// correctAnswer uses the option number: 0, 1, 2 or 3.
// =========================================================
const quizQuestions = [
  {
    question: "What is the safest way to make you smile?",
    options: [
      "Give you chocolate",
      "Send a cute message",
      "Annoy you lovingly",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What is your most dangerous power?",
    options: [
      "Your smile",
      "Your attitude",
      "Your cute anger",
      "Your silent treatment"
    ],
    answer: 0
  },
  {
    question: "If you get angry, what should someone do first?",
    options: [
      "Say sorry quickly",
      "Bring food",
      "Stay silent and pray",
      "Call it cute and run away"
    ],
    answer: 1
  },
  {
    question: "What makes you extra special?",
    options: [
      "Your heart",
      "Your madness",
      "Your smile",
      "Everything together"
    ],
    answer: 3
  },
  {
    question: "On your birthday, what do you deserve the most?",
    options: [
      "Cake",
      "Gifts",
      "Love and attention",
      "Unlimited pampering"
    ],
    answer: 3
  },
  {
    question: "What should never disappear from your face?",
    options: [
      "Your smile",
      "Your cute expressions",
      "Your confidence",
      "All of these"
    ],
    answer: 3
  },
  {
    question: "What is your cutest habit?",
    options: [
      "Getting angry for small things",
      "Smiling without reason",
      "Acting innocent after doing drama",
      "All of these"
    ],
    answer: 3
  },
  {
    question: "What happens when you say 'I am fine'?",
    options: [
      "Everything is actually fine",
      "Danger level increases",
      "Someone should immediately apologize",
      "Both B and C"
    ],
    answer: 3
  },
  {
    question: "What is the best birthday gift for you?",
    options: [
      "A cute surprise",
      "A long sweet message",
      "A beautiful memory",
      "All of these together"
    ],
    answer: 3
  },
  {
    question: "Why is this website made for you?",
    options: [
      "Because you are special",
      "Because your smile matters",
      "Because you deserve something different",
      "All of the above"
    ],
    answer: 3
  }
];

// =========================================================
// COMMON PAGE INITIALIZATION
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  setBirthdayName();
  initRevealAnimations();
  initMusic();
  initCelebrationButtons();
  initQuiz();
  initGallery();
  initLetter();
  launchConfetti(85);
});

function setBirthdayName() {
  const nameElement = document.getElementById("birthdayName");
  if (nameElement) nameElement.textContent = birthdayName;
  document.title = document.title.replace("Little Star", birthdayName);
}

function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach(element => observer.observe(element));
}

// =========================================================
// BACKGROUND MUSIC
// Music cannot autoplay on many phones, so the visitor taps once.
// =========================================================
function initMusic() {
  const audio = document.getElementById("backgroundMusic");
  const button = document.getElementById("musicToggle");
  const icon = document.getElementById("musicIcon");
  if (!audio || !button || !icon) return;

  audio.volume = 0.55;

  button.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        button.classList.add("playing");
        icon.textContent = "❚❚";
      } else {
        audio.pause();
        button.classList.remove("playing");
        icon.textContent = "♫";
      }
    } catch (error) {
      console.warn("Music could not be played:", error);
    }
  });
}

// =========================================================
// QUIZ
// =========================================================
function initQuiz() {
  const quizCard = document.getElementById("quizCard");
  if (!quizCard) return;

  const questionCounter = document.getElementById("questionCounter");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const progressBar = document.getElementById("quizProgressBar");
  const questionEmoji = document.getElementById("questionEmoji");
  const questionText = document.getElementById("questionText");
  const answerButtons = document.getElementById("answerButtons");
  const feedback = document.getElementById("quizFeedback");
  const nextButton = document.getElementById("nextQuestionBtn");
  const quizContent = document.getElementById("quizContent");
  const quizResult = document.getElementById("quizResult");
  const resultTitle = document.getElementById("resultTitle");
  const resultText = document.getElementById("resultText");
  const finalScore = document.getElementById("finalScore");
  const restartButton = document.getElementById("restartQuizBtn");

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    answered = false;
    const item = quizQuestions[currentQuestion];

    questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    scoreDisplay.textContent = `Score: ${score}`;
    progressBar.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;
    questionEmoji.textContent = item.emoji;
    questionText.textContent = item.question;
    feedback.textContent = "";
    nextButton.classList.add("hidden");
    answerButtons.innerHTML = "";

    item.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "answer-btn";
      button.type = "button";
      button.textContent = option;
      button.addEventListener("click", () => selectAnswer(index, button));
      answerButtons.appendChild(button);
    });
  }

  function selectAnswer(selectedIndex, selectedButton) {
    if (answered) return;
    answered = true;

    const item = quizQuestions[currentQuestion];
    const buttons = [...answerButtons.querySelectorAll(".answer-btn")];
    buttons.forEach(button => (button.disabled = true));

    if (selectedIndex === item.correctAnswer) {
      score += 1;
      selectedButton.classList.add("correct");
      feedback.textContent = `✅ ${item.explanation}`;
      launchConfetti(32);
    } else {
      selectedButton.classList.add("wrong");
      buttons[item.correctAnswer].classList.add("correct");
      feedback.textContent = `😄 ${item.explanation}`;
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextButton.textContent = currentQuestion === quizQuestions.length - 1
      ? "See My Result ✨"
      : "Next Question →";
    nextButton.classList.remove("hidden");
  }

  function showResult() {
    quizContent.classList.add("hidden");
    quizResult.classList.remove("hidden");
    progressBar.style.width = "100%";

    const percentage = Math.round((score / quizQuestions.length) * 100);
    finalScore.textContent = `${score}/${quizQuestions.length}`;

    if (percentage === 100) {
      resultTitle.textContent = "Perfect Birthday Genius! 👑";
      resultText.textContent = "You spotted every trick. That deserves extra cake and unlimited birthday applause.";
    } else if (percentage >= 70) {
      resultTitle.textContent = "Amazing Job, Superstar! 🌟";
      resultText.textContent = "Your brain is almost impossible to trick. Almost!";
    } else if (percentage >= 40) {
      resultTitle.textContent = "Fun and Fearless! 🎉";
      resultText.textContent = "A few questions fooled you, but your birthday spirit is unbeatable.";
    } else {
      resultTitle.textContent = "Officially Too Cute for Tricky Questions! 💖";
      resultText.textContent = "The quiz may have won, but the birthday girl always gets the final prize.";
    }

    launchConfetti(180);
  }

  nextButton.addEventListener("click", () => {
    currentQuestion += 1;
    if (currentQuestion < quizQuestions.length) renderQuestion();
    else showResult();
  });

  restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    quizContent.classList.remove("hidden");
    quizResult.classList.add("hidden");
    renderQuestion();
  });

  renderQuestion();
}

// =========================================================
// PHOTO LIGHTBOX
// =========================================================
function initGallery() {
  const cards = document.querySelectorAll(".photo-card");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeButton = document.getElementById("lightboxClose");

  if (!cards.length || !lightbox || !lightboxImage || !closeButton) return;

  function openCard(card) {
    const image = card.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = card.dataset.caption || "A beautiful birthday memory.";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  cards.forEach(card => {
    card.addEventListener("click", () => openCard(card));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") openCard(card);
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
  });
}

// =========================================================
// ENVELOPE LETTER
// =========================================================
function initLetter() {
  const button = document.getElementById("openLetterBtn");
  const paper = document.getElementById("letterPaper");
  const hint = document.getElementById("tapHint");
  if (!button || !paper) return;

  button.addEventListener("click", () => {
    button.classList.add("open");
    if (hint) hint.textContent = "Opening your special message...";

    window.setTimeout(() => {
      document.getElementById("envelopeScene")?.classList.add("hidden");
      paper.classList.remove("hidden");
      paper.scrollIntoView({ behavior: "smooth", block: "start" });
      launchConfetti(120);
    }, 1050);
  });
}

function initCelebrationButtons() {
  ["celebrateBtn", "letterCelebrateBtn"].forEach(id => {
    const button = document.getElementById(id);
    if (!button) return;
    button.addEventListener("click", () => launchConfetti(180));
  });
}

// =========================================================
// LIGHTWEIGHT CONFETTI — NO EXTERNAL LIBRARY REQUIRED
// =========================================================
function launchConfetti(amount = 100) {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const colors = ["#ff6f91", "#8f7cff", "#ffd166", "#7bdff2", "#b8f2e6", "#ffffff"];
  let pieces = [];
  let animationFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeCanvas();

  for (let i = 0; i < amount; i += 1) {
    pieces.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 160,
      y: window.innerHeight * 0.18 + Math.random() * 60,
      width: 5 + Math.random() * 8,
      height: 8 + Math.random() * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 10,
      speedY: -4 - Math.random() * 8,
      gravity: 0.18 + Math.random() * 0.08,
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
      opacity: 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    pieces.forEach(piece => {
      piece.speedY += piece.gravity;
      piece.x += piece.speedX;
      piece.y += piece.speedY;
      piece.rotation += piece.rotationSpeed;
      if (piece.y > window.innerHeight * 0.78) piece.opacity -= 0.018;

      ctx.save();
      ctx.globalAlpha = Math.max(piece.opacity, 0);
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
      ctx.restore();
    });

    pieces = pieces.filter(piece => piece.opacity > 0 && piece.y < window.innerHeight + 80);
    if (pieces.length) animationFrame = requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  animate();

  window.setTimeout(() => {
    cancelAnimationFrame(animationFrame);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }, 7000);
}
