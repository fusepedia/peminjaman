// ============================================================
// SHEETS.JS - Google Sheets Integration via Apps Script
// ============================================================

// *** IMPORTANT: Replace this URL with your deployed Google Apps Script Web App URL ***
const SHEETS_API_URL = "";

// Local storage keys
const LS_PEMINJAMAN = "bpvp_peminjaman";
const LS_STOCK = "bpvp_stock";
const LS_LAST_SYNC = "bpvp_last_sync";

let isOnline = false;
let lastSyncTime = null;

// Initialize connection
function initSheets() {
  checkConnection();
  loadLocalData();
  // Auto-sync every 5 minutes
  setInterval(checkConnection, 300000);
}

// Check if API is available
async function checkConnection() {
  if (!SHEETS_API_URL) {
    isOnline = false;
    updateSyncStatus();
    return;
  }

  try {
    const response = await fetch(SHEETS_API_URL + "?action=ping", {
      method: "GET",
      mode: "cors",
    });
    if (response.ok) {
      isOnline = true;
      lastSyncTime = new Date();
      localStorage.setItem(LS_LAST_SYNC, lastSyncTime.toISOString());
    } else {
      isOnline = false;
    }
  } catch (e) {
    isOnline = false;
  }
  updateSyncStatus();
}

// Update sync status UI
function updateSyncStatus() {
  const dot = document.getElementById("sync-dot");
  const text = document.getElementById("sync-text");

  if (isOnline) {
    dot.classList.remove("offline");
    text.textContent = "Online";
  } else {
    dot.classList.add("offline");
    text.textContent = SHEETS_API_URL ? "Offline" : "Local Mode";
  }
}

// Load local data
function loadLocalData() {
  const data = localStorage.getItem(LS_PEMINJAMAN);
  return data ? JSON.parse(data) : [];
}

// Save peminjaman locally
function saveLocalPeminjaman(peminjaman) {
  const list = loadLocalData();
  list.unshift(peminjaman);
  localStorage.setItem(LS_PEMINJAMAN, JSON.stringify(list));
}

// Get all peminjaman
function getAllPeminjaman() {
  return loadLocalData();
}

// Update peminjaman status
function updatePeminjamanStatus(id, status) {
  const list = loadLocalData();
  const index = list.findIndex((p) => p.id === id);
  if (index >= 0) {
    list[index].status = status;
    list[index].tanggalKembali =
      status === "dikembalikan" ? new Date().toISOString() : null;
    localStorage.setItem(LS_PEMINJAMAN, JSON.stringify(list));
  }
  return list;
}

// Submit peminjaman to Google Sheets
async function submitToSheets(peminjaman) {
  if (!SHEETS_API_URL) {
    // Save locally only
    saveLocalPeminjaman(peminjaman);
    showToast("Data tersimpan secara lokal", "info");
    return { success: true, local: true };
  }

  try {
    const response = await fetch(SHEETS_API_URL, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "addPeminjaman",
        data: peminjaman,
      }),
    });

    if (response.ok) {
      saveLocalPeminjaman(peminjaman);
      showToast("Data berhasil disimpan ke Google Sheets! ✅", "success");
      return { success: true };
    } else {
      throw new Error("API Error");
    }
  } catch (e) {
    // Fallback: save locally
    saveLocalPeminjaman(peminjaman);
    showToast(
      "Koneksi gagal. Data tersimpan secara lokal.",
      "warning"
    );
    return { success: true, local: true };
  }
}

// Fetch stock from Google Sheets
async function fetchStockFromSheets() {
  if (!SHEETS_API_URL) {
    return getLocalStock();
  }

  try {
    const response = await fetch(
      SHEETS_API_URL + "?action=getStock",
      {
        method: "GET",
        mode: "cors",
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem(LS_STOCK, JSON.stringify(data));
      return data;
    }
  } catch (e) {
    console.log("Failed to fetch stock, using local data");
  }
  return getLocalStock();
}

// Get local stock data (based on original data minus borrowed)
function getLocalStock() {
  const peminjaman = loadLocalData();
  const stock = {};

  // Initialize with full stock from data.js
  Object.keys(APP_DATA.programs).forEach((progId) => {
    const prog = APP_DATA.programs[progId];
    [...prog.peralatan, ...prog.bahan].forEach((item) => {
      stock[item.id] = {
        total: item.jumlah,
        dipinjam: 0,
        tersedia: item.jumlah,
      };
    });
  });

  // Subtract borrowed items
  peminjaman.forEach((p) => {
    if (p.status === "dipinjam" && p.items) {
      p.items.forEach((item) => {
        if (stock[item.id]) {
          stock[item.id].dipinjam += item.qty || 1;
          stock[item.id].tersedia = Math.max(
            0,
            stock[item.id].total - stock[item.id].dipinjam
          );
        }
      });
    }
  });

  return stock;
}

// Generate unique ID
function generateId() {
  return (
    "PJM-" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase()
  );
}
