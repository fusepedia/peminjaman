// ============================================================
// DASHBOARD.JS - Dashboard & Statistics
// ============================================================

let chartPeminjaman = null;
let chartProgram = null;

function initDashboard() {
  updateStats();
  initCharts();
  updateActivityList();
}

function updateStats() {
  const peminjaman = getAllPeminjaman();
  const aktif = peminjaman.filter((p) => p.status === "dipinjam").length;
  const totalPeralatan =
    APP_DATA.programs.fiber_optik.peralatan.length +
    APP_DATA.programs.teknisi_selular.peralatan.length;
  const totalBahan =
    APP_DATA.programs.fiber_optik.bahan.length +
    APP_DATA.programs.teknisi_selular.bahan.length;

  animateCounter("stat-total", peminjaman.length);
  animateCounter("stat-peralatan", totalPeralatan);
  animateCounter("stat-bahan", totalBahan);
  animateCounter("stat-aktif", aktif);

  // Update badge
  const badge = document.getElementById("nav-badge-riwayat");
  if (aktif > 0) {
    badge.style.display = "inline";
    badge.textContent = aktif;
  } else {
    badge.style.display = "none";
  }
}

function animateCounter(elementId, target) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const duration = 1200;
  const start = parseInt(el.textContent) || 0;
  const diff = target - start;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + diff * eased);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function initCharts() {
  const peminjaman = getAllPeminjaman();

  // Peminjaman per month chart
  const ctx1 = document.getElementById("chart-peminjaman");
  if (!ctx1) return;

  const monthData = getMonthlyData(peminjaman);

  if (chartPeminjaman) chartPeminjaman.destroy();
  chartPeminjaman = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: monthData.labels,
      datasets: [
        {
          label: "Peminjaman",
          data: monthData.values,
          backgroundColor: "rgba(37, 99, 235, 0.6)",
          borderColor: "rgba(37, 99, 235, 1)",
          borderWidth: 1,
          borderRadius: 6,
          barPercentage: 0.6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#94a3b8", font: { size: 11 } },
        },
        y: {
          beginAtZero: true,
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: {
            color: "#94a3b8",
            font: { size: 11 },
            stepSize: 1,
          },
        },
      },
    },
  });

  // Program distribution chart
  const ctx2 = document.getElementById("chart-program");
  if (!ctx2) return;

  const foCount = peminjaman.filter(
    (p) => p.program === "fiber_optik"
  ).length;
  const tsCount = peminjaman.filter(
    (p) => p.program === "teknisi_selular"
  ).length;

  if (chartProgram) chartProgram.destroy();
  chartProgram = new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: ["Fiber Optik", "Teknisi Selular"],
      datasets: [
        {
          data: [foCount || 1, tsCount || 1],
          backgroundColor: [
            "rgba(37, 99, 235, 0.7)",
            "rgba(124, 58, 237, 0.7)",
          ],
          borderColor: [
            "rgba(37, 99, 235, 1)",
            "rgba(124, 58, 237, 1)",
          ],
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#94a3b8",
            padding: 20,
            font: { size: 12 },
          },
        },
      },
    },
  });
}

function getMonthlyData(peminjaman) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const now = new Date();
  const currentMonth = now.getMonth();
  const labels = [];
  const values = [];

  for (let i = 5; i >= 0; i--) {
    const m = (currentMonth - i + 12) % 12;
    labels.push(months[m]);
    const count = peminjaman.filter((p) => {
      const d = new Date(p.tanggal);
      return d.getMonth() === m && d.getFullYear() === now.getFullYear();
    }).length;
    values.push(count);
  }

  return { labels, values };
}

function updateActivityList() {
  const peminjaman = getAllPeminjaman();
  const list = document.getElementById("activity-list");
  if (!list) return;

  if (peminjaman.length === 0) {
    list.innerHTML = `
      <li class="empty-state">
        <div class="empty-state-icon">📭</div>
        <h3>Belum Ada Aktivitas</h3>
        <p>Mulai dengan membuat peminjaman baru</p>
      </li>
    `;
    return;
  }

  const recent = peminjaman.slice(0, 8);
  list.innerHTML = recent
    .map((p) => {
      const programInfo = getProgramInfo(p.program);
      const itemCount = p.items ? p.items.length : 0;
      const timeAgo = getTimeAgo(p.tanggal);
      const isBorrow = p.status === "dipinjam";

      return `
      <li class="activity-item">
        <div class="activity-dot ${isBorrow ? "borrow" : "return"}"></div>
        <div class="activity-text">
          <strong>${p.nama}</strong>
          <p>${isBorrow ? "Meminjam" : "Mengembalikan"} ${itemCount} item — ${programInfo ? programInfo.name : p.program}</p>
        </div>
        <span class="activity-time">${timeAgo}</span>
      </li>
    `;
    })
    .join("");
}

function getTimeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 7) return `${days} hari lalu`;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function refreshDashboard() {
  updateStats();
  initCharts();
  updateActivityList();
}
