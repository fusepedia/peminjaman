// ============================================================
// APP.JS - Main App Controller, Router, Toast, Modal
// ============================================================

// ---- App Initialization ----
document.addEventListener("DOMContentLoaded", () => {
  // Hide loading screen after short delay
  setTimeout(() => {
    document.getElementById("loading-screen").classList.add("hidden");
  }, 1200);

  // Initialize modules
  initSheets();
  initForm();
  initDashboard();
  initAvailability();
  initHistory();

  // Handle hash routing
  handleRoute();
  window.addEventListener("hashchange", handleRoute);

  // Close sidebar on mobile when clicking outside
  document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("mobile-menu-toggle");
    if (
      window.innerWidth <= 768 &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      toggleSidebar();
    }
  });

  // Touch swipe for mobile sidebar
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    const sidebar = document.getElementById("sidebar");

    if (diff > 80 && touchStartX < 40 && !sidebar.classList.contains("open")) {
      // Swipe right from left edge → open sidebar
      toggleSidebar();
    } else if (diff < -80 && sidebar.classList.contains("open")) {
      // Swipe left → close sidebar
      toggleSidebar();
    }
  }
});

// ---- Router ----
function handleRoute() {
  const hash = window.location.hash.replace("#", "") || "dashboard";
  navigateTo(hash, false);
}

function navigateTo(page, updateHash = true) {
  // Update hash
  if (updateHash) {
    window.location.hash = page;
  }

  // Update page sections
  document.querySelectorAll(".page-section").forEach((section) => {
    section.classList.remove("active");
  });
  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  // Update nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  // Update header title
  const titles = {
    dashboard: "Dashboard",
    peminjaman: "Form Peminjaman",
    ketersediaan: "Ketersediaan Alat & Bahan",
    riwayat: "Riwayat Peminjaman",
    tentang: "Tentang Sistem",
  };
  const headerTitle = document.getElementById("header-title");
  if (headerTitle) {
    headerTitle.textContent = titles[page] || "Dashboard";
  }

  // Refresh page data
  if (page === "dashboard") refreshDashboard();
  if (page === "ketersediaan") renderAvailabilityTable();
  if (page === "riwayat") renderHistory();

  // Close mobile sidebar
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---- Sidebar Toggle ----
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
}

// ---- Theme Toggle ----
function toggleTheme() {
  // For this implementation we keep the dark theme as primary
  // but toggle a subtle variation
  showToast("Mode tema gelap aktif (default)", "info");
}

// ---- Toast Notifications ----
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || "ℹ️"}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Auto-remove after 4s
  setTimeout(() => {
    toast.classList.add("hiding");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ---- Modal ----
function openModal() {
  document.getElementById("modal-overlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("active");
  document.body.style.overflow = "";
}

// Close modal on overlay click
document
  .getElementById("modal-overlay")
  ?.addEventListener("click", (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  });

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
