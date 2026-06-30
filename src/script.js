document.addEventListener("DOMContentLoaded", () => {

  // Scroll suave

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Logica

  const modal = document.getElementById("video-modal");
  const btnVerVideo = document.getElementById("ver-video");
  const closeModal = document.querySelector(".close-modal");
  const modalVideo = document.getElementById("modal-video");

  if (btnVerVideo && modal && modalVideo) {
    btnVerVideo.addEventListener("click", () => {
      modal.style.display = "flex";
      modalVideo.play();
    });
  }

  if (closeModal && modal && modalVideo) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      modalVideo.pause();
      modalVideo.currentTime = 0;
    });
  }

  // Cursor

  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      // Sombra dinamica del cursor

      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        const match = bgColor.match(/\d+/g);
        if (match) {
          const r = parseInt(match[0]);
          const g = parseInt(match[1]);
          const b = parseInt(match[2]);
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          const newMode =
            brightness > 125 ? "cursor-light-bg" : "cursor-dark-bg";
          if (cursor.className !== "custom-cursor " + newMode) {
            cursor.className = "custom-cursor " + newMode;
          }
        }
      }
    });
  }

  const observerOptions = {
    threshold: 0.1,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});
