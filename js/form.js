// ============================================================
// FORM.JS - Multi-Step Borrowing Form Wizard
// ============================================================

let currentStep = 1;
const totalSteps = 4;
let selectedProgram = null;
let selectedUnitKompetensi = [];
let selectedItems = [];
let currentItemTab = "peralatan";

function initForm() {
  // Set today's date
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("input-tanggal");
  if (dateInput) dateInput.value = today;

  // Load draft from localStorage
  loadFormDraft();
}

// ---- Wizard Navigation ----
function wizardNext() {
  if (!validateStep(currentStep)) return;

  if (currentStep < totalSteps) {
    currentStep++;
    updateWizard();

    // On entering step 3, render items
    if (currentStep === 3) {
      renderItemGrid();
    }

    // On entering step 4, render preview
    if (currentStep === 4) {
      renderPreview();
    }

    saveFormDraft();
  }
}

function wizardPrev() {
  if (currentStep > 1) {
    currentStep--;
    updateWizard();
  }
}

function updateWizard() {
  // Update step pages
  document.querySelectorAll(".wizard-page").forEach((page, i) => {
    page.classList.toggle("active", i + 1 === currentStep);
  });

  // Update step indicators
  document.querySelectorAll(".wizard-step-dot").forEach((dot, i) => {
    const step = i + 1;
    dot.classList.remove("active", "completed");
    if (step === currentStep) dot.classList.add("active");
    else if (step < currentStep) dot.classList.add("completed");
  });

  // Update lines
  document.querySelectorAll(".wizard-line").forEach((line, i) => {
    line.classList.remove("active", "completed");
    if (i + 1 < currentStep) line.classList.add("completed");
    else if (i + 1 === currentStep) line.classList.add("active");
  });

  // Update buttons
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  btnPrev.style.display = currentStep > 1 ? "inline-flex" : "none";

  if (currentStep === totalSteps) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "inline-flex";
    btnNext.textContent = "Selanjutnya →";
  }

  // Scroll to top of form
  document.querySelector(".form-wizard").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function validateStep(step) {
  if (step === 1) {
    let valid = true;
    const nama = document.getElementById("input-nama");
    const tanggal = document.getElementById("input-tanggal");

    if (!nama.value.trim()) {
      nama.closest(".form-group").classList.add("error");
      valid = false;
    } else {
      nama.closest(".form-group").classList.remove("error");
    }

    if (!tanggal.value) {
      tanggal.closest(".form-group").classList.add("error");
      valid = false;
    } else {
      tanggal.closest(".form-group").classList.remove("error");
    }

    if (!valid) {
      showToast("Mohon lengkapi data yang wajib diisi", "error");
    }
    return valid;
  }

  if (step === 2) {
    if (!selectedProgram) {
      showToast("Pilih program pelatihan terlebih dahulu", "error");
      return false;
    }
    return true;
  }

  if (step === 3) {
    if (selectedItems.length === 0) {
      showToast("Pilih minimal satu peralatan atau bahan", "error");
      return false;
    }
    return true;
  }

  return true;
}

// ---- Program Selection ----
function selectProgram(programId) {
  selectedProgram = programId;
  selectedUnitKompetensi = [];
  selectedItems = [];

  // Update UI
  document.querySelectorAll(".program-card").forEach((card) => {
    card.classList.toggle(
      "selected",
      card.dataset.program === programId
    );
  });

  // Show unit kompetensi
  renderUnitKompetensi(programId);
}

function renderUnitKompetensi(programId) {
  const section = document.getElementById("unit-kompetensi-section");
  const list = document.getElementById("unit-kompetensi-list");
  const units = getUnitKompetensi(programId);

  section.style.display = "block";

  list.innerHTML = units
    .map(
      (uk, i) => `
    <label class="form-check">
      <input type="checkbox" value="${uk.kode}" onchange="toggleUnitKompetensi('${uk.kode}')">
      <span class="form-check-label">
        ${uk.nama}
        <small>${uk.kode} — ${uk.jp} JP</small>
      </span>
    </label>
  `
    )
    .join("");
}

function toggleUnitKompetensi(kode) {
  const idx = selectedUnitKompetensi.indexOf(kode);
  if (idx >= 0) {
    selectedUnitKompetensi.splice(idx, 1);
  } else {
    selectedUnitKompetensi.push(kode);
  }
}

// ---- Item Selection ----
function switchItemTab(tab) {
  currentItemTab = tab;

  // Update tab buttons
  document.querySelectorAll("#item-tabs .tab-btn").forEach((btn, i) => {
    const tabs = ["peralatan", "bahan", "selected"];
    btn.classList.toggle("active", tabs[i] === tab);
  });

  if (tab === "selected") {
    renderSelectedItemsList();
  } else {
    renderItemGrid();
  }
}

function renderItemGrid() {
  if (!selectedProgram) return;

  const grid = document.getElementById("item-grid");
  const catTabs = document.getElementById("category-tabs");
  const panel = document.getElementById("selected-items-panel");

  if (currentItemTab === "selected") {
    grid.style.display = "none";
    catTabs.innerHTML = "";
    panel.style.display = "block";
    renderSelectedItemsList();
    return;
  }

  grid.style.display = "grid";
  panel.style.display = "none";

  const items =
    currentItemTab === "peralatan"
      ? getAllPeralatan(selectedProgram)
      : getAllBahan(selectedProgram);

  const searchQuery = (
    document.getElementById("item-search")?.value || ""
  ).toLowerCase();

  // Get categories
  const categories = [
    ...new Set(items.map((i) => i.kategori)),
  ];
  const activeCategory =
    document.querySelector(".category-tab.active")?.dataset.category ||
    "all";

  // Render category tabs
  catTabs.innerHTML =
    `<button class="category-tab ${activeCategory === "all" ? "active" : ""}" data-category="all" onclick="filterByCategory('all')">Semua</button>` +
    categories
      .map(
        (cat) =>
          `<button class="category-tab ${activeCategory === cat ? "active" : ""}" data-category="${cat}" onclick="filterByCategory('${cat}')">${cat}</button>`
      )
      .join("");

  // Filter items
  let filtered = items;
  if (activeCategory !== "all") {
    filtered = filtered.filter((i) => i.kategori === activeCategory);
  }
  if (searchQuery) {
    filtered = filtered.filter(
      (i) =>
        i.nama.toLowerCase().includes(searchQuery) ||
        i.spesifikasi.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon">🔍</div>
        <h3>Tidak Ditemukan</h3>
        <p>Coba ubah kata kunci pencarian</p>
      </div>
    `;
    return;
  }

  // Get stock data
  const stock = getLocalStock();

  grid.innerHTML = filtered
    .map((item) => {
      const isSelected = selectedItems.some((s) => s.id === item.id);
      const selItem = selectedItems.find((s) => s.id === item.id);
      const qty = selItem ? selItem.qty : 1;
      const stockInfo = stock[item.id] || {
        total: item.jumlah,
        dipinjam: 0,
        tersedia: item.jumlah,
      };
      const tipe = currentItemTab === "peralatan" ? "Peralatan" : "Bahan";

      return `
      <div class="item-card ${isSelected ? "selected" : ""}" data-id="${item.id}" onclick="toggleItem('${item.id}', '${tipe}')">
        <div class="item-card-check">${isSelected ? "✓" : ""}</div>
        <div class="item-card-name">${item.nama}</div>
        <div class="item-card-spec">${item.spesifikasi}</div>
        <div class="item-card-meta">
          <span class="item-card-badge ${tipe.toLowerCase()}">${tipe}</span>
          <span class="item-card-stock">Stok: ${stockInfo.tersedia}/${stockInfo.total} ${item.satuan}</span>
        </div>
        ${
          isSelected
            ? `
          <div class="item-card-qty" onclick="event.stopPropagation()">
            <button class="qty-btn" onclick="event.stopPropagation(); changeQty('${item.id}', -1)">−</button>
            <input type="number" class="qty-input" value="${qty}" min="1" max="${stockInfo.tersedia}" onchange="event.stopPropagation(); setQty('${item.id}', this.value)" onclick="event.stopPropagation()">
            <button class="qty-btn" onclick="event.stopPropagation(); changeQty('${item.id}', 1)">+</button>
            <span class="text-muted text-small" style="margin-left:4px">${item.satuan}</span>
          </div>
        `
            : ""
        }
      </div>
    `;
    })
    .join("");

  updateSelectedCount();
}

function toggleItem(itemId, tipe) {
  const idx = selectedItems.findIndex((s) => s.id === itemId);
  if (idx >= 0) {
    selectedItems.splice(idx, 1);
  } else {
    // Find item data
    const program = APP_DATA.programs[selectedProgram];
    const allItems = [...program.peralatan, ...program.bahan];
    const item = allItems.find((i) => i.id === itemId);
    if (item) {
      selectedItems.push({
        id: item.id,
        nama: item.nama,
        spesifikasi: item.spesifikasi,
        satuan: item.satuan,
        tipe: tipe,
        qty: 1,
        kategori: item.kategori,
      });
    }
  }
  renderItemGrid();
  saveFormDraft();
}

function changeQty(itemId, delta) {
  const item = selectedItems.find((s) => s.id === itemId);
  if (item) {
    item.qty = Math.max(1, (item.qty || 1) + delta);
    renderItemGrid();
  }
}

function setQty(itemId, value) {
  const item = selectedItems.find((s) => s.id === itemId);
  if (item) {
    item.qty = Math.max(1, parseInt(value) || 1);
    renderItemGrid();
  }
}

function filterItems() {
  renderItemGrid();
}

function filterByCategory(category) {
  document
    .querySelectorAll(".category-tab")
    .forEach((tab) =>
      tab.classList.toggle("active", tab.dataset.category === category)
    );
  renderItemGrid();
}

function updateSelectedCount() {
  const countEl = document.getElementById("selected-count");
  if (countEl) countEl.textContent = selectedItems.length;
}

function renderSelectedItemsList() {
  const grid = document.getElementById("item-grid");
  const catTabs = document.getElementById("category-tabs");
  const panel = document.getElementById("selected-items-panel");

  grid.style.display = "none";
  catTabs.innerHTML = "";
  panel.style.display = "block";

  const list = document.getElementById("selected-items-list");

  if (selectedItems.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📦</div>
        <h3>Belum Ada Item Dipilih</h3>
        <p>Pilih peralatan atau bahan dari tab sebelumnya</p>
      </div>
    `;
    return;
  }

  list.innerHTML = selectedItems
    .map(
      (item) => `
    <li class="selected-item">
      <div class="selected-item-info">
        <div class="selected-item-name">${item.nama}</div>
        <div class="selected-item-spec">${item.spesifikasi || ""} · ${item.tipe} · ${item.qty} ${item.satuan}</div>
      </div>
      <div class="item-card-qty" style="margin:0">
        <button class="qty-btn" onclick="changeQty('${item.id}', -1); renderSelectedItemsList()">−</button>
        <input type="number" class="qty-input" value="${item.qty}" min="1" onchange="setQty('${item.id}', this.value); renderSelectedItemsList()">
        <button class="qty-btn" onclick="changeQty('${item.id}', 1); renderSelectedItemsList()">+</button>
      </div>
      <button class="selected-item-remove" onclick="removeSelectedItem('${item.id}')">✕</button>
    </li>
  `
    )
    .join("");
}

function removeSelectedItem(itemId) {
  selectedItems = selectedItems.filter((s) => s.id !== itemId);
  updateSelectedCount();
  renderSelectedItemsList();
}

// ---- Custom Item ----
function addCustomItem() {
  const nameInput = document.getElementById("custom-item-name");
  const specInput = document.getElementById("custom-item-spec");
  const qtyInput = document.getElementById("custom-item-qty");

  const name = nameInput.value.trim();
  const spec = specInput.value.trim();
  const qty = parseInt(qtyInput.value) || 1;

  if (!name) {
    showToast("Masukkan nama item", "error");
    return;
  }

  const customId = "custom_" + Date.now();
  selectedItems.push({
    id: customId,
    nama: name,
    spesifikasi: spec || "-",
    satuan: "Pcs",
    tipe: "Custom",
    qty: qty,
    kategori: "Custom",
    isCustom: true,
  });

  nameInput.value = "";
  specInput.value = "";
  qtyInput.value = "1";

  updateSelectedCount();
  showToast(`"${name}" ditambahkan`, "success");
  saveFormDraft();
}

// ---- Preview ----
function renderPreview() {
  const output = document.getElementById("preview-output");
  const programInfo = getProgramInfo(selectedProgram);
  const nama = document.getElementById("input-nama").value;
  const nip = document.getElementById("input-nip").value;
  const angkatan = document.getElementById("input-angkatan").value;
  const tanggal = document.getElementById("input-tanggal").value;
  const keterangan = document.getElementById("input-keterangan").value;
  const peminjamanId = generateId();

  const tanggalFormatted = new Date(tanggal).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get selected unit kompetensi names
  const allUnits = getUnitKompetensi(selectedProgram);
  const selectedUKNames = allUnits
    .filter((uk) => selectedUnitKompetensi.includes(uk.kode))
    .map((uk) => uk.nama);

  const peralatanItems = selectedItems.filter(
    (i) => i.tipe === "Peralatan" || i.tipe === "Custom"
  );
  const bahanItems = selectedItems.filter((i) => i.tipe === "Bahan");

  output.innerHTML = `
    <div class="preview-container" id="print-area">
      <div class="preview-header">
        <p style="font-size:0.75rem; margin-bottom:4px;">KEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA</p>
        <h2>BALAI PELATIHAN VOKASI DAN PRODUKTIVITAS SORONG</h2>
        <h3>WORKSHOP ELEKTRONIKA</h3>
        <hr style="margin: 12px 0; border: 1px solid #333;">
        <h3 style="font-size: 1rem; margin-top: 8px;">BUKTI PEMINJAMAN PERALATAN & PENGGUNAAN BAHAN</h3>
        <p style="margin-top:4px; font-size:0.75rem; color:#888;">No: ${peminjamanId}</p>
      </div>

      <div class="preview-info">
        <div class="preview-info-item">
          <span class="preview-info-label">Nama:</span>
          <span class="preview-info-value">${nama}</span>
        </div>
        <div class="preview-info-item">
          <span class="preview-info-label">NIP/NIK:</span>
          <span class="preview-info-value">${nip || "-"}</span>
        </div>
        <div class="preview-info-item">
          <span class="preview-info-label">Program:</span>
          <span class="preview-info-value">${programInfo ? programInfo.name : "-"}</span>
        </div>
        <div class="preview-info-item">
          <span class="preview-info-label">Angkatan:</span>
          <span class="preview-info-value">${angkatan || "-"}</span>
        </div>
        <div class="preview-info-item">
          <span class="preview-info-label">Tanggal:</span>
          <span class="preview-info-value">${tanggalFormatted}</span>
        </div>
        <div class="preview-info-item">
          <span class="preview-info-label">Keterangan:</span>
          <span class="preview-info-value">${keterangan || "-"}</span>
        </div>
      </div>

      ${
        selectedUKNames.length > 0
          ? `
        <div style="margin-bottom: 16px;">
          <p style="font-weight:600; font-size:0.85rem; margin-bottom:8px; color:#333;">Unit Kompetensi:</p>
          <ol style="padding-left:20px; font-size:0.8rem; color:#444;">
            ${selectedUKNames.map((uk) => `<li style="margin-bottom:4px;">${uk}</li>`).join("")}
          </ol>
        </div>
      `
          : ""
      }

      ${
        peralatanItems.length > 0
          ? `
        <p style="font-weight:600; font-size:0.85rem; margin-bottom:8px; color:#333;">A. Peralatan yang Dipinjam:</p>
        <table class="preview-table">
          <thead>
            <tr>
              <th style="width:40px; text-align:center;">No</th>
              <th>Nama Peralatan</th>
              <th>Spesifikasi</th>
              <th style="width:60px; text-align:center;">Qty</th>
              <th style="width:60px; text-align:center;">Satuan</th>
              <th>Kondisi</th>
            </tr>
          </thead>
          <tbody>
            ${peralatanItems
              .map(
                (item, i) => `
              <tr>
                <td style="text-align:center;">${i + 1}</td>
                <td>${item.nama}</td>
                <td>${item.spesifikasi}</td>
                <td style="text-align:center;">${item.qty}</td>
                <td style="text-align:center;">${item.satuan}</td>
                <td>Baik</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `
          : ""
      }

      ${
        bahanItems.length > 0
          ? `
        <p style="font-weight:600; font-size:0.85rem; margin-bottom:8px; color:#333;">B. Bahan yang Digunakan:</p>
        <table class="preview-table">
          <thead>
            <tr>
              <th style="width:40px; text-align:center;">No</th>
              <th>Nama Bahan</th>
              <th>Spesifikasi</th>
              <th style="width:60px; text-align:center;">Qty</th>
              <th style="width:60px; text-align:center;">Satuan</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            ${bahanItems
              .map(
                (item, i) => `
              <tr>
                <td style="text-align:center;">${i + 1}</td>
                <td>${item.nama}</td>
                <td>${item.spesifikasi}</td>
                <td style="text-align:center;">${item.qty}</td>
                <td style="text-align:center;">${item.satuan}</td>
                <td>-</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `
          : ""
      }

      <div class="preview-signatures">
        <div class="preview-signature-item">
          <p>Peminjam</p>
          <div class="preview-signature-line"></div>
          <p class="preview-signature-name">${nama}</p>
        </div>
        <div class="preview-signature-item">
          <p>Instruktur</p>
          <div class="preview-signature-line"></div>
          <p class="preview-signature-name">( .......................... )</p>
        </div>
        <div class="preview-signature-item">
          <p>Kepala Sub. Bagian</p>
          <div class="preview-signature-line"></div>
          <p class="preview-signature-name">( .......................... )</p>
        </div>
      </div>

      <div style="margin-top: 24px; text-align:center; font-size:0.7rem; color:#999; border-top: 1px solid #eee; padding-top:8px;">
        Dokumen ini digenerate oleh Sistem Peminjaman Digital BPVP Sorong — ${tanggalFormatted}
      </div>
    </div>
  `;

  // Store peminjaman id for submission
  output.dataset.peminjamanId = peminjamanId;
}

// ---- Submit ----
async function submitPeminjaman() {
  const peminjamanId =
    document.getElementById("preview-output").dataset.peminjamanId ||
    generateId();

  const peminjaman = {
    id: peminjamanId,
    nama: document.getElementById("input-nama").value.trim(),
    nip: document.getElementById("input-nip").value.trim(),
    angkatan: document.getElementById("input-angkatan").value.trim(),
    tanggal: document.getElementById("input-tanggal").value,
    keterangan: document.getElementById("input-keterangan").value.trim(),
    program: selectedProgram,
    unitKompetensi: selectedUnitKompetensi,
    items: selectedItems.map((i) => ({
      id: i.id,
      nama: i.nama,
      spesifikasi: i.spesifikasi,
      qty: i.qty,
      satuan: i.satuan,
      tipe: i.tipe,
    })),
    status: "dipinjam",
    createdAt: new Date().toISOString(),
    tanggalKembali: null,
  };

  const result = await submitToSheets(peminjaman);

  if (result.success) {
    // Reset form
    clearFormDraft();
    refreshDashboard();
    renderHistory();
    renderAvailabilityTable();

    showToast("Peminjaman berhasil dicatat! ✅", "success");
  }
}

// ---- Form Draft (localStorage) ----
function saveFormDraft() {
  const draft = {
    nama: document.getElementById("input-nama")?.value || "",
    nip: document.getElementById("input-nip")?.value || "",
    angkatan: document.getElementById("input-angkatan")?.value || "",
    tanggal: document.getElementById("input-tanggal")?.value || "",
    keterangan: document.getElementById("input-keterangan")?.value || "",
    selectedProgram,
    selectedUnitKompetensi,
    selectedItems,
    currentStep,
  };
  localStorage.setItem("bpvp_form_draft", JSON.stringify(draft));
}

function loadFormDraft() {
  const saved = localStorage.getItem("bpvp_form_draft");
  if (!saved) return;

  try {
    const draft = JSON.parse(saved);
    if (draft.nama)
      document.getElementById("input-nama").value = draft.nama;
    if (draft.nip)
      document.getElementById("input-nip").value = draft.nip;
    if (draft.angkatan)
      document.getElementById("input-angkatan").value = draft.angkatan;
    if (draft.tanggal)
      document.getElementById("input-tanggal").value = draft.tanggal;
    if (draft.keterangan)
      document.getElementById("input-keterangan").value =
        draft.keterangan;
    if (draft.selectedProgram) {
      selectedProgram = draft.selectedProgram;
      selectedUnitKompetensi = draft.selectedUnitKompetensi || [];
      selectedItems = draft.selectedItems || [];
    }
  } catch (e) {
    console.log("Failed to load draft");
  }
}

function clearFormDraft() {
  localStorage.removeItem("bpvp_form_draft");
  currentStep = 1;
  selectedProgram = null;
  selectedUnitKompetensi = [];
  selectedItems = [];

  // Reset form fields
  document.getElementById("input-nama").value = "";
  document.getElementById("input-nip").value = "";
  document.getElementById("input-angkatan").value = "";
  document.getElementById("input-keterangan").value = "";
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("input-tanggal").value = today;

  // Reset program cards
  document
    .querySelectorAll(".program-card")
    .forEach((c) => c.classList.remove("selected"));
  document.getElementById("unit-kompetensi-section").style.display =
    "none";

  updateWizard();
  updateSelectedCount();
}
