document.addEventListener("DOMContentLoaded", () => {
  // Year update
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Reviews carousel
  const reviews = document.querySelectorAll(".review");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let current = 0;

  function showReview(index) {
    reviews.forEach(r => r.classList.remove("active"));
    reviews[index].classList.add("active");
  }

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + reviews.length) % reviews.length;
    showReview(current);
  });
  nextBtn.addEventListener("click", () => {
    current = (current + 1) % reviews.length;
    showReview(current);
  });

  // Auto rotate reviews
  setInterval(() => {
    current = (current + 1) % reviews.length;
    showReview(current);
  }, 6000);

  // Contact form
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    if (!name || !email || !message) {
      showMessage("Please fill in all fields.", "error");
      return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      showMessage("Invalid email address.", "error");
      return;
    }

    showMessage("Sending message...", "info");
    setTimeout(() => {
      contactForm.reset();
      showMessage("Message sent successfully! We'll be in touch.", "success");
    }, 1000);
  });

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.style.color = type === "error" ? "#ffb3c6" : type === "success" ? "#bff7d6" : "#fff";
  }
});
