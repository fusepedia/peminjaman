// ============================================================
// SHEETS.JS - Google Sheets Integration (FIXED VERSION)
// ============================================================

// *** GANTI DENGAN URL DEPLOYMENT ANDA ***
const SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbzTVeJZbMKrLPFACG_yXFAUBNn2yMMLtxSnv9iAtAeyvTtZSc5AN0wpLSt8jqqLvnxn/exec"; // <-- ISI DI SINI

// Local storage keys
const LS_PEMINJAMAN = "bpvp_peminjaman";
const LS_STOCK = "bpvp_stock";
const LS_LAST_SYNC = "bpvp_last_sync";
const LS_PENDING_SYNC = "bpvp_pending_sync";

let isOnline = false;
let lastSyncTime = null;
let connectionCheckInterval = null;

// ============================================================
// INITIALIZE
// ============================================================
function initSheets() {
  console.log("Initializing sheets connection...");
  loadLocalData();
  checkConnection();
  
  // Auto-sync setiap 5 menit
  if (connectionCheckInterval) clearInterval(connectionCheckInterval);
  connectionCheckInterval = setInterval(checkConnection, 300000);
}

// ============================================================
// CONNECTION CHECK
// ============================================================
async function checkConnection() {
  if (!SHEETS_API_URL || SHEETS_API_URL.trim() === "") {
    isOnline = false;
    updateSyncStatus("local");
    console.log("Mode: Local (no API URL configured)");
    return false;
  }

  try {
    console.log("Checking connection to:", SHEETS_API_URL);
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 detik timeout
    
    const response = await fetch(
      `${SHEETS_API_URL}?action=ping&t=${Date.now()}`, 
      {
        method: "GET",
        signal: controller.signal,
      }
    );
    
    clearTimeout(timeout);
    
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'ok') {
        isOnline = true;
        lastSyncTime = new Date();
        localStorage.setItem(LS_LAST_SYNC, lastSyncTime.toISOString());
        updateSyncStatus("online");
        console.log("✅ Connected to Google Sheets API");
        
        // Coba sync pending data
        syncPendingData();
        return true;
      }
    }
    
    throw new Error(`Response not ok: ${response.status}`);
    
  } catch (err) {
    if (err.name === 'AbortError') {
      console.warn("⚠️ Connection timeout");
    } else {
      console.warn("⚠️ Connection failed:", err.message);
    }
    isOnline = false;
    updateSyncStatus("offline");
    return false;
  }
}

// ============================================================
// UI STATUS UPDATE
// ============================================================
function updateSyncStatus(mode) {
  const dot = document.getElementById("sync-dot");
  const text = document.getElementById("sync-text");
  
  if (!dot || !text) return;

  // Reset classes
  dot.classList.remove("online", "offline", "local");
  
  switch(mode) {
    case "online":
      dot.classList.add("online");
      dot.style.backgroundColor = "#22c55e";
      text.textContent = lastSyncTime 
        ? `Online • ${formatTime(lastSyncTime)}` 
        : "Online";
      break;
      
    case "offline":
      dot.classList.add("offline");
      dot.style.backgroundColor = "#ef4444";
      text.textContent = "Offline (Data Lokal)";
      break;
      
    case "local":
      dot.style.backgroundColor = "#f59e0b";
      text.textContent = "Mode Lokal";
      break;
      
    default:
      dot.style.backgroundColor = "#6b7280";
      text.textContent = "Menghubungkan...";
  }
}

function formatTime(date) {
  return date.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

// ============================================================
// LOCAL DATA MANAGEMENT
// ============================================================
function loadLocalData() {
  try {
    const data = localStorage.getItem(LS_PEMINJAMAN);
    return data ? JSON.parse(data) : [];
  } catch(e) {
    console.error("Error loading local data:", e);
    return [];
  }
}

function saveLocalPeminjaman(peminjaman) {
  try {
    const list = loadLocalData();
    
    // Cek duplikasi
    const existingIndex = list.findIndex(p => p.id === peminjaman.id);
    if (existingIndex >= 0) {
      list[existingIndex] = peminjaman; // Update
    } else {
      list.unshift(peminjaman); // Tambah di depan
    }
    
    localStorage.setItem(LS_PEMINJAMAN, JSON.stringify(list));
    console.log("💾 Saved locally:", peminjaman.id);
    return true;
  } catch(e) {
    console.error("Error saving local data:", e);
    return false;
  }
}

function getAllPeminjaman() {
  return loadLocalData();
}

// ============================================================
// PENDING SYNC QUEUE
// ============================================================
function addToPendingSync(peminjaman) {
  try {
    const pending = getPendingSync();
    if (!pending.find(p => p.id === peminjaman.id)) {
      pending.push(peminjaman);
      localStorage.setItem(LS_PENDING_SYNC, JSON.stringify(pending));
    }
  } catch(e) {
    console.error("Error adding to pending sync:", e);
  }
}

function getPendingSync() {
  try {
    const data = localStorage.getItem(LS_PENDING_SYNC);
    return data ? JSON.parse(data) : [];
  } catch(e) {
    return [];
  }
}

function removeFromPendingSync(id) {
  try {
    const pending = getPendingSync().filter(p => p.id !== id);
    localStorage.setItem(LS_PENDING_SYNC, JSON.stringify(pending));
  } catch(e) {}
}

async function syncPendingData() {
  const pending = getPendingSync();
  if (pending.length === 0) return;
  
  console.log(`📤 Syncing ${pending.length} pending items...`);
  
  for (const item of pending) {
    try {
      const result = await apiCall("addPeminjaman", { data: item });
      if (result.success) {
        removeFromPendingSync(item.id);
        console.log("✅ Synced:", item.id);
      }
    } catch(e) {
      console.warn("Failed to sync:", item.id);
      break; // Stop jika ada error
    }
  }
}

// ============================================================
// API CALL HELPER
// ============================================================
async function apiCall(action, body = {}) {
  if (!SHEETS_API_URL) throw new Error("API URL tidak dikonfigurasi");
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  
  try {
    const response = await fetch(SHEETS_API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "text/plain", // GAS butuh text/plain untuk CORS
      },
      body: JSON.stringify({ action, ...body }),
      signal: controller.signal,
    });
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    const text = await response.text();
    
    try {
      return JSON.parse(text);
    } catch(e) {
      throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
    }
    
  } catch(err) {
    clearTimeout(timeout);
    throw err;
  }
}

// ============================================================
// SUBMIT PEMINJAMAN
// ============================================================
async function submitToSheets(peminjaman) {
  // Selalu simpan lokal dulu
  saveLocalPeminjaman(peminjaman);
  
  // Update local stock
  updateLocalStock(peminjaman);
  
  if (!SHEETS_API_URL || SHEETS_API_URL.trim() === "") {
    showToast("💾 Data tersimpan secara lokal (Mode Lokal)", "info");
    return { success: true, local: true };
  }

  if (!isOnline) {
    // Tambah ke queue pending sync
    addToPendingSync(peminjaman);
    showToast("📱 Offline: Data tersimpan lokal, akan sync otomatis saat online", "warning");
    return { success: true, local: true, pending: true };
  }

  try {
    showToast("📤 Menyimpan ke Google Sheets...", "info");
    
    const result = await apiCall("addPeminjaman", { data: peminjaman });
    
    if (result && result.success) {
      lastSyncTime = new Date();
      updateSyncStatus("online");
      showToast("✅ Data berhasil disimpan ke Google Sheets!", "success");
      return { success: true, id: result.id };
    } else {
      throw new Error(result?.error || "Unknown error");
    }
    
  } catch (err) {
    console.error("Submit error:", err);
    
    // Tambah ke pending sync
    addToPendingSync(peminjaman);
    
    isOnline = false;
    updateSyncStatus("offline");
    showToast(`⚠️ Gagal sync: ${err.message}. Data tersimpan lokal.`, "warning");
    
    return { success: true, local: true, error: err.message };
  }
}

// ============================================================
// UPDATE STATUS PEMINJAMAN
// ============================================================
async function updatePeminjamanStatusAPI(id, status) {
  // Update lokal dulu
  const list = loadLocalData();
  const index = list.findIndex(p => p.id === id);
  
  if (index < 0) {
    return { success: false, error: "Peminjaman tidak ditemukan" };
  }
  
  const oldStatus = list[index].status;
  list[index].status = status;
  
  if (status === "dikembalikan") {
    list[index].tanggalKembali = new Date().toISOString();
    // Restore local stock
    restoreLocalStock(list[index]);
  }
  
  localStorage.setItem(LS_PEMINJAMAN, JSON.stringify(list));
  
  // Sync ke Sheets jika online
  if (isOnline && SHEETS_API_URL) {
    try {
      const result = await apiCall("updateStatus", { id, status });
      if (result.success) {
        console.log("✅ Status updated in Sheets");
      }
    } catch(e) {
      console.warn("Failed to update status in Sheets:", e.message);
    }
  }
  
  return { success: true, list };
}

// Backward compatible wrapper
function updatePeminjamanStatus(id, status) {
  const list = loadLocalData();
  const index = list.findIndex((p) => p.id === id);
  
  if (index >= 0) {
    list[index].status = status;
    list[index].tanggalKembali =
      status === "dikembalikan" ? new Date().toISOString() : null;
    localStorage.setItem(LS_PEMINJAMAN, JSON.stringify(list));
    
    if (status === "dikembalikan") {
      restoreLocalStock(list[index]);
    }
  }
  
  // Async update ke sheets
  if (isOnline && SHEETS_API_URL) {
    apiCall("updateStatus", { id, status }).catch(e => 
      console.warn("Sheets sync failed:", e.message)
    );
  }
  
  return list;
}

// ============================================================
// STOCK MANAGEMENT
// ============================================================

// Update local stock setelah peminjaman
function updateLocalStock(peminjaman) {
  try {
    const stock = getLocalStock();
    
    if (peminjaman.items) {
      peminjaman.items.forEach(item => {
        if (item.isCustom || !item.id) return;
        
        if (stock[item.id]) {
          const qty = Number(item.qty) || 1;
          stock[item.id].dipinjam = (stock[item.id].dipinjam || 0) + qty;
          stock[item.id].tersedia = Math.max(
            0, 
            stock[item.id].total - stock[item.id].dipinjam
          );
        }
      });
    }
    
    localStorage.setItem(LS_STOCK, JSON.stringify(stock));
  } catch(e) {
    console.error("Error updating local stock:", e);
  }
}

// Restore local stock setelah pengembalian
function restoreLocalStock(peminjaman) {
  try {
    const stock = getLocalStock();
    
    if (peminjaman.items) {
      peminjaman.items.forEach(item => {
        if (item.isCustom || !item.id) return;
        
        if (stock[item.id]) {
          const qty = Number(item.qty) || 1;
          stock[item.id].dipinjam = Math.max(
            0, 
            (stock[item.id].dipinjam || 0) - qty
          );
          stock[item.id].tersedia = Math.min(
            stock[item.id].total,
            stock[item.id].total - stock[item.id].dipinjam
          );
        }
      });
    }
    
    localStorage.setItem(LS_STOCK, JSON.stringify(stock));
  } catch(e) {
    console.error("Error restoring local stock:", e);
  }
}

// Fetch stock dari Google Sheets
async function fetchStockFromSheets() {
  if (!SHEETS_API_URL || !isOnline) {
    return getLocalStock();
  }

  try {
    const response = await fetch(
      `${SHEETS_API_URL}?action=getStock&t=${Date.now()}`,
      { method: "GET" }
    );

    if (response.ok) {
      const data = await response.json();
      
      if (data && !data.error) {
        localStorage.setItem(LS_STOCK, JSON.stringify(data));
        console.log("✅ Stock fetched from Sheets:", Object.keys(data).length, "items");
        return data;
      }
    }
  } catch (e) {
    console.warn("Failed to fetch stock:", e.message);
  }
  
  return getLocalStock();
}

// Get local stock (kalkulasi dari APP_DATA + peminjaman lokal)
function getLocalStock() {
  // Coba load dari cache dulu
  try {
    const cached = localStorage.getItem(LS_STOCK);
    if (cached) {
      const data = JSON.parse(cached);
      if (Object.keys(data).length > 0) {
        return recalculateStock(data);
      }
    }
  } catch(e) {}
  
  return recalculateStock(null);
}

// Hitung ulang stok berdasarkan peminjaman aktif
function recalculateStock(baseStock) {
  const stock = {};
  
  // Inisialisasi dari APP_DATA
  if (typeof APP_DATA !== 'undefined') {
    Object.keys(APP_DATA.programs || {}).forEach(progId => {
      const prog = APP_DATA.programs[progId];
      const items = [...(prog.peralatan || []), ...(prog.bahan || [])];
      
      items.forEach(item => {
        stock[item.id] = {
          nama: item.nama || '',
          total: Number(item.jumlah) || 0,
          dipinjam: 0,
          tersedia: Number(item.jumlah) || 0,
          satuan: item.satuan || 'unit'
        };
      });
    });
  } else if (baseStock) {
    // Gunakan base stock dari cache
    Object.assign(stock, baseStock);
    // Reset dipinjam untuk dihitung ulang
    Object.keys(stock).forEach(id => {
      stock[id].dipinjam = 0;
      stock[id].tersedia = stock[id].total;
    });
  }
  
  // Kurangi dengan peminjaman aktif
  const peminjaman = loadLocalData();
  peminjaman.forEach(p => {
    if (p.status === "dipinjam" && p.items) {
      p.items.forEach(item => {
        if (item.isCustom || !item.id) return;
        
        if (stock[item.id]) {
          const qty = Number(item.qty) || 1;
          stock[item.id].dipinjam = (stock[item.id].dipinjam || 0) + qty;
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

// ============================================================
// UTILITY
// ============================================================
function generateId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PJM-${timestamp}-${random}`;
}

// Debug helper
function debugSheets() {
  console.log("=== SHEETS DEBUG ===");
  console.log("API URL:", SHEETS_API_URL || "(not set)");
  console.log("Online:", isOnline);
  console.log("Last sync:", lastSyncTime);
  console.log("Local peminjaman:", loadLocalData().length);
  console.log("Pending sync:", getPendingSync().length);
  console.log("Stock keys:", Object.keys(getLocalStock()).length);
  console.log("===================");
}
