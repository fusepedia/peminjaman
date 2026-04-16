// ============================================================
// AVAILABILITY.JS - Real-time Equipment Availability
// ============================================================

let currentAvailProgram = "fiber_optik";
let currentAvailType = "peralatan";

function initAvailability() {
  renderAvailabilityTable();
}

function switchAvailProgram(programId) {
  currentAvailProgram = programId;

  // Update tabs
  document
    .querySelectorAll("#avail-program-tabs .tab-btn")
    .forEach((btn, i) => {
      const progs = ["fiber_optik", "teknisi_selular"];
      btn.classList.toggle("active", progs[i] === programId);
    });

  renderAvailabilityTable();
}

function switchAvailType(type) {
  currentAvailType = type;

  // Update tabs
  document
    .querySelectorAll("#avail-type-tabs .tab-btn")
    .forEach((btn, i) => {
      const types = ["peralatan", "bahan"];
      btn.classList.toggle("active", types[i] === type);
    });

  renderAvailabilityTable();
}

function renderAvailabilityTable() {
  const tbody = document.getElementById("avail-table-body");
  if (!tbody) return;

  const items =
    currentAvailType === "peralatan"
      ? getAllPeralatan(currentAvailProgram)
      : getAllBahan(currentAvailProgram);

  const stock = getLocalStock();
  const searchQuery = (
    document.getElementById("avail-search")?.value || ""
  ).toLowerCase();

  let filtered = items;
  if (searchQuery) {
    filtered = filtered.filter(
      (i) =>
        i.nama.toLowerCase().includes(searchQuery) ||
        i.spesifikasi.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="8">
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <h3>Tidak Ditemukan</h3>
        </div>
      </td></tr>
    `;
    return;
  }

  tbody.innerHTML = filtered
    .map((item, i) => {
      const s = stock[item.id] || {
        total: item.jumlah,
        dipinjam: 0,
        tersedia: item.jumlah,
      };
      const percent =
        s.total > 0 ? Math.round((s.tersedia / s.total) * 100) : 0;
      let statusBadge, barClass;

      if (percent >= 70) {
        statusBadge = '<span class="badge badge-success">Tersedia</span>';
        barClass = "high";
      } else if (percent >= 30) {
        statusBadge = '<span class="badge badge-warning">Terbatas</span>';
        barClass = "medium";
      } else if (percent > 0) {
        statusBadge = '<span class="badge badge-danger">Hampir Habis</span>';
        barClass = "low";
      } else {
        statusBadge = '<span class="badge badge-danger">Habis</span>';
        barClass = "low";
      }

      return `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${item.nama}</strong></td>
        <td><span class="font-mono text-muted text-small">${item.spesifikasi}</span></td>
        <td>${s.total} ${item.satuan}</td>
        <td>${s.dipinjam}</td>
        <td><strong>${s.tersedia}</strong></td>
        <td>${statusBadge}</td>
        <td style="min-width:100px;">
          <div class="stock-bar">
            <div class="stock-bar-fill ${barClass}" style="width: ${percent}%"></div>
          </div>
          <span class="text-small text-muted">${percent}%</span>
        </td>
      </tr>
    `;
    })
    .join("");
}

function filterAvailability() {
  renderAvailabilityTable();
}

function refreshAvailability() {
  renderAvailabilityTable();
  showToast("Data ketersediaan diperbarui", "info");
}
