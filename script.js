// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
  }
});

// Project Category Filtering
const projectFilterBar = document.getElementById("projectFilterBar");
const projectCards = document.querySelectorAll(".project-card");

projectFilterBar.addEventListener("click", (e) => {
  const btn = e.target.closest(".proj-filter-btn");
  if (!btn) return;

  document.querySelectorAll(".proj-filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const filter = btn.dataset.filter;
  projectCards.forEach(card => {
    if (filter === "all" || card.dataset.category === filter) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
});

// Resume Tab Switching (Experience / Education / Certifications)
const resumeTabs = document.getElementById("resumeTabs");
const tabContents = {
  experience: document.getElementById("tab-experience"),
  education: document.getElementById("tab-education"),
  certifications: document.getElementById("tab-certifications")
};

resumeTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".resume-tab-btn");
  if (!btn) return;

  document.querySelectorAll(".resume-tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const targetTab = btn.dataset.tab;
  Object.keys(tabContents).forEach(key => {
    tabContents[key].classList.toggle("hidden", key !== targetTab);
  });
});

// Copy Contact Info Buttons
document.querySelectorAll("[data-copy]").forEach(btn => {
  btn.addEventListener("click", () => {
    const text = btn.dataset.copy;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    } else {
      const temp = document.createElement("textarea");
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
    }
    const orig = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = orig; }, 1400);
  });
});

// Contact Form Submission Handler
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("senderName").value.trim();
  formFeedback.textContent = `Thank you, ${name}! Your message for Mousa Wazir has been prepared. You can also reach out directly at mousa.wazir321@gmail.com.`;
  formFeedback.classList.remove("hidden");
  contactForm.reset();
});

// Scroll Reveal & Active Nav Link Observer
const revealSections = document.querySelectorAll(".reveal");
const navAnchors = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      const id = entry.target.getAttribute("id");
      if (id) {
        navAnchors.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    }
  });
}, { threshold: 0.2 });

revealSections.forEach(sec => observer.observe(sec));
