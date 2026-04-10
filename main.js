document.addEventListener("DOMContentLoaded", function () {
  // Starfield
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 280; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.2,
        a: Math.random(),
        speed: Math.random() * 0.3 + 0.05,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
  }

  let t = 0;
  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    t += 0.016;
    stars.forEach((s) => {
      const alpha =
        s.a * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
      // slow parallax on scroll
      s.y += s.speed * 0.05;
      if (s.y > H) {
        s.y = 0;
        s.x = Math.random() * W;
      }
    });
    requestAnimationFrame(drawStars);
  }

  resize();
  initStars();
  drawStars();
  window.addEventListener("resize", () => {
    resize();
    initStars();
  });

  // Nav scroll effect
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      nav.style.background = "rgba(0, 8, 20, 0.97)";
    } else {
      nav.style.background = "rgba(0, 8, 20, 0.85)";
    }
  });

  // Orbit counter animation
  let orbitCount = 32847;
  setInterval(() => {
    const el = document.getElementById("orbit-count");
    if (el) {
      orbitCount += Math.floor(Math.random() * 3);
      el.textContent = orbitCount.toLocaleString();
    }
  }, 8000);

  // Newsletter button
  const newsBtn = document.querySelector(".newsletter-form button");
  const newsInput = document.querySelector(".newsletter-form input");
  if (newsBtn) {
    newsBtn.addEventListener("click", () => {
      if (newsInput.value.trim()) {
        newsBtn.textContent = "Subscribed ✓";
        newsBtn.style.background = "#2ecc71";
        newsInput.value = "";
        setTimeout(() => {
          newsBtn.textContent = "Subscribe";
          newsBtn.style.background = "";
        }, 3000);
      }
    });
  }

  // Smooth scroll nav links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ── CUSTOM CURSOR ──
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");

  if (cursorDot && cursorRing) {
    let ringX = 0,
      ringY = 0,
      dotX = 0,
      dotY = 0;

    document.addEventListener("mousemove", (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
      // Dot follows immediately via transform
      cursorDot.style.left = dotX + "px";
      cursorDot.style.top = dotY + "px";
    });

    (function animateRing() {
      ringX += (dotX - ringX) * 0.14;
      ringY += (dotY - ringY) * 0.14;
      cursorRing.style.left = ringX + "px";
      cursorRing.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    })();

    document
      .querySelectorAll("a, button, .mission-card, .explore-card, .news-card")
      .forEach((el) => {
        el.addEventListener("mouseenter", () =>
          document.body.classList.add("cursor-hover"),
        );
        el.addEventListener("mouseleave", () =>
          document.body.classList.remove("cursor-hover"),
        );
      });
  }

  // ── BACK TO TOP ──
  const backBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    backBtn.classList.toggle("visible", window.scrollY > 400);
  });
  backBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  // ── THEME TOGGLE ──
  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    themeBtn.textContent = document.body.classList.contains("light-theme")
      ? "🌙"
      : "☀";
  });

  // ── COUNTDOWN TIMER (target: Jan 1, 2027 — Artemis III placeholder) ──
  const launchDate = new Date("2027-01-01T00:00:00Z");
  function updateCountdown() {
    const diff = launchDate - Date.now();
    if (diff <= 0) return;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById("cd-days").textContent = String(d).padStart(3, "0");
    document.getElementById("cd-hours").textContent = String(h).padStart(
      2,
      "0",
    );
    document.getElementById("cd-mins").textContent = String(m).padStart(2, "0");
    document.getElementById("cd-secs").textContent = String(s).padStart(2, "0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ── SPACE QUIZ ──
  const quizData = [
    {
      q: "What year did humans first land on the Moon?",
      opts: ["1965", "1969", "1972", "1974"],
      ans: 1,
    },
    {
      q: "Which planet has the most moons?",
      opts: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      ans: 1,
    },
    {
      q: "How far is the Sun from Earth (approx)?",
      opts: [
        "93 million miles",
        "150 million km",
        "Both A & B",
        "None of above",
      ],
      ans: 2,
    },
    {
      q: "What does NASA stand for?",
      opts: [
        "National Air & Space Agency",
        "National Aeronautics & Space Administration",
        "National Aviation & Satellite Agency",
        "None of above",
      ],
      ans: 1,
    },
    {
      q: "Which rover is currently active on Mars?",
      opts: [
        "Spirit",
        "Opportunity",
        "Curiosity & Perseverance",
        "Only Perseverance",
      ],
      ans: 2,
    },
    {
      q: "The James Webb Space Telescope launched in which year?",
      opts: ["2019", "2020", "2021", "2022"],
      ans: 3,
    },
    {
      q: "What is the name of the first artificial satellite?",
      opts: ["Explorer 1", "Sputnik 1", "Vostok 1", "Luna 1"],
      ans: 1,
    },
    {
      q: "Light from the Sun takes how long to reach Earth?",
      opts: ["~1 minute", "~8 minutes", "~20 minutes", "~1 hour"],
      ans: 1,
    },
  ];

  let qIndex = 0,
    score = 0,
    answered = false;
  const modal = document.getElementById("quiz-modal");
  const qText = document.getElementById("quiz-question");
  const qOpts = document.getElementById("quiz-options");
  const qResult = document.getElementById("quiz-result");
  const qScore = document.getElementById("quiz-score");
  const qNext = document.getElementById("quiz-next");

  function loadQuestion() {
    const q = quizData[qIndex];
    qText.textContent = `Q${qIndex + 1}. ${q.q}`;
    qOpts.innerHTML = "";
    qResult.textContent = "";
    qNext.style.display = "none";
    answered = false;
    q.opts.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = opt;
      btn.addEventListener("click", () => handleAnswer(i, q.ans, btn));
      qOpts.appendChild(btn);
    });
    qScore.textContent = `Score: ${score} / ${qIndex}`;
  }

  function handleAnswer(chosen, correct, btn) {
    if (answered) return;
    answered = true;
    const btns = qOpts.querySelectorAll(".quiz-option");
    btns.forEach((b) => (b.disabled = true));
    if (chosen === correct) {
      btn.classList.add("correct");
      score++;
      qResult.textContent = "✓ Correct! Well done, astronaut.";
      qResult.style.color = "#2ecc71";
    } else {
      btn.classList.add("wrong");
      btns[correct].classList.add("correct");
      qResult.textContent = `✗ Wrong. The answer was: ${quizData[qIndex].opts[correct]}`;
      qResult.style.color = "#e74c3c";
    }
    qScore.textContent = `Score: ${score} / ${qIndex + 1}`;
    if (qIndex + 1 < quizData.length) {
      qNext.style.display = "block";
    } else {
      qNext.textContent = `Finish — ${score}/${quizData.length}`;
      qNext.style.display = "block";
    }
  }

  qNext.addEventListener("click", () => {
    qIndex++;
    if (qIndex >= quizData.length) {
      qIndex = 0;
      score = 0;
      qNext.textContent = "Next Question →";
    }
    loadQuestion();
  });

  document.getElementById("quiz-trigger").addEventListener("click", () => {
    modal.classList.add("open");
    loadQuestion();
  });
  document
    .getElementById("quiz-close")
    .addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".mission-card, .news-card, .explore-card, .stat-item")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
});
