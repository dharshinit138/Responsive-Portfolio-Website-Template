// ---- Theme toggle (persisted) ----
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.setAttribute("aria-pressed", theme === "dark");
  themeToggle.querySelector(".theme-icon").textContent = theme === "dark" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

// ---- Contact form validation ----
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + "Error");
  const wrapper = field.closest(".field");
  errorEl.textContent = message;
  wrapper.classList.toggle("invalid", Boolean(message));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let valid = true;

  if (!name) {
    setError("name", "Enter your name.");
    valid = false;
  } else {
    setError("name", "");
  }

  if (!email) {
    setError("email", "Enter your email.");
    valid = false;
  } else if (!isValidEmail(email)) {
    setError("email", "Enter a valid email address.");
    valid = false;
  } else {
    setError("email", "");
  }

  if (!message) {
    setError("message", "Add a short message.");
    valid = false;
  } else {
    setError("message", "");
  }

  if (!valid) return;

  status.textContent = "Message ready to send — connect this form to your email service or backend.";
  form.reset();
});

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();
