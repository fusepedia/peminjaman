// ============================================================
// Google Apps Script - Backend for Google Sheets Integration
// ============================================================
// 
// SETUP INSTRUCTIONS:
// 1. Buat Google Spreadsheet baru
// 2. Buka Extensions > Apps Script
// 3. Paste seluruh kode ini ke Code.gs
// 4. Klik Deploy > New Deployment
// 5. Pilih type: Web App
// 6. Execute as: Me
// 7. Who has access: Anyone
// 8. Klik Deploy dan copy URL
// 9. Paste URL ke SHEETS_API_URL di file js/sheets.js
//
// Sheet yang akan dibuat otomatis:
// - Peminjaman (data peminjaman)
// - Peralatan_FO (stok peralatan Fiber Optik)
// - Bahan_FO (stok bahan Fiber Optik)  
// - Peralatan_TS (stok peralatan Teknisi Selular)
// - Bahan_TS (stok bahan Teknisi Selular)
// - Log (activity log)
// ============================================================

const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doGet(e) {
  const action = e.parameter.action || 'ping';
  
  try {
    switch(action) {
      case 'ping':
        return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() });
      
      case 'getStock':
        return jsonResponse(getStockData());
      
      case 'getPeminjaman':
        return jsonResponse(getPeminjamanData());
      
      default:
        return jsonResponse({ error: 'Unknown action' }, 400);
    }
  } catch(err) {
    return jsonResponse({ error: err.message }, 500);
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;
    
    switch(action) {
      case 'addPeminjaman':
        return jsonResponse(addPeminjaman(body.data));
      
      case 'updateStatus':
        return jsonResponse(updatePeminjamanStatus(body.id, body.status));
      
      default:
        return jsonResponse({ error: 'Unknown action' }, 400);
    }
  } catch(err) {
    return jsonResponse({ error: err.message }, 500);
  }
}

function jsonResponse(data, code) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---- Initialize Sheets ----
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Peminjaman sheet
  let pSheet = ss.getSheetByName('Peminjaman');
  if (!pSheet) {
    pSheet = ss.insertSheet('Peminjaman');
    pSheet.appendRow([
      'ID', 'Tanggal', 'Nama', 'NIP', 'Program', 'Angkatan',
      'Items (JSON)', 'Unit Kompetensi (JSON)', 'Status', 
      'Keterangan', 'Created At', 'Tanggal Kembali'
    ]);
    pSheet.getRange(1, 1, 1, 12).setFontWeight('bold');
  }
  
  // Stock sheets
  const stockSheets = [
    { name: 'Peralatan_FO', headers: ['ID', 'Nama', 'Spesifikasi', 'Total', 'Dipinjam', 'Tersedia', 'Satuan'] },
    { name: 'Bahan_FO', headers: ['ID', 'Nama', 'Spesifikasi', 'Total', 'Dipinjam', 'Tersedia', 'Satuan'] },
    { name: 'Peralatan_TS', headers: ['ID', 'Nama', 'Spesifikasi', 'Total', 'Dipinjam', 'Tersedia', 'Satuan'] },
    { name: 'Bahan_TS', headers: ['ID', 'Nama', 'Spesifikasi', 'Total', 'Dipinjam', 'Tersedia', 'Satuan'] },
  ];
  
  stockSheets.forEach(config => {
    let sheet = ss.getSheetByName(config.name);
    if (!sheet) {
      sheet = ss.insertSheet(config.name);
      sheet.appendRow(config.headers);
      sheet.getRange(1, 1, 1, config.headers.length).setFontWeight('bold');
    }
  });
  
  // Log sheet
  let logSheet = ss.getSheetByName('Log');
  if (!logSheet) {
    logSheet = ss.insertSheet('Log');
    logSheet.appendRow(['Timestamp', 'Action', 'Details']);
    logSheet.getRange(1, 1, 1, 3).setFontWeight('bold');
  }
}

// ---- Add Peminjaman ----
function addPeminjaman(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Peminjaman');
  if (!sheet) {
    initializeSheets();
    sheet = ss.getSheetByName('Peminjaman');
  }
  
  sheet.appendRow([
    data.id,
    data.tanggal,
    data.nama,
    data.nip || '',
    data.program,
    data.angkatan || '',
    JSON.stringify(data.items || []),
    JSON.stringify(data.unitKompetensi || []),
    data.status || 'dipinjam',
    data.keterangan || '',
    new Date().toISOString(),
    ''
  ]);
  
  // Update stock
  updateStockAfterBorrow(data);
  
  // Log
  addLog('ADD_PEMINJAMAN', `${data.nama} - ${data.program} - ${(data.items || []).length} items`);
  
  return { success: true, id: data.id };
}

// ---- Update Stock After Borrow ----
function updateStockAfterBorrow(data) {
  if (!data.items || !data.program) return;
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const suffix = data.program === 'fiber_optik' ? 'FO' : 'TS';
  
  data.items.forEach(item => {
    if (item.isCustom) return;
    
    const sheetName = (item.tipe === 'Peralatan' ? 'Peralatan_' : 'Bahan_') + suffix;
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === item.id) {
        const dipinjam = (values[i][4] || 0) + (item.qty || 1);
        const tersedia = Math.max(0, (values[i][3] || 0) - dipinjam);
        sheet.getRange(i + 1, 5).setValue(dipinjam);
        sheet.getRange(i + 1, 6).setValue(tersedia);
        break;
      }
    }
  });
}

// ---- Get Stock Data ----
function getStockData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const stock = {};
  
  ['Peralatan_FO', 'Bahan_FO', 'Peralatan_TS', 'Bahan_TS'].forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      stock[data[i][0]] = {
        total: data[i][3] || 0,
        dipinjam: data[i][4] || 0,
        tersedia: data[i][5] || 0
      };
    }
  });
  
  return stock;
}

// ---- Get Peminjaman Data ----
function getPeminjamanData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Peminjaman');
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  const result = [];
  
  for (let i = 1; i < data.length; i++) {
    result.push({
      id: data[i][0],
      tanggal: data[i][1],
      nama: data[i][2],
      nip: data[i][3],
      program: data[i][4],
      angkatan: data[i][5],
      items: JSON.parse(data[i][6] || '[]'),
      unitKompetensi: JSON.parse(data[i][7] || '[]'),
      status: data[i][8],
      keterangan: data[i][9],
      createdAt: data[i][10],
      tanggalKembali: data[i][11]
    });
  }
  
  return result;
}

// ---- Update Peminjaman Status ----
function updatePeminjamanStatus(id, status) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Peminjaman');
  if (!sheet) return { success: false, error: 'Sheet not found' };
  
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      sheet.getRange(i + 1, 9).setValue(status);
      if (status === 'dikembalikan') {
        sheet.getRange(i + 1, 12).setValue(new Date().toISOString());
      }
      
      addLog('UPDATE_STATUS', `${id} -> ${status}`);
      return { success: true };
    }
  }
  
  return { success: false, error: 'Not found' };
}

// ---- Add Log ----
function addLog(action, details) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Log');
  if (!sheet) {
    initializeSheets();
    sheet = ss.getSheetByName('Log');
  }
  
  sheet.appendRow([new Date().toISOString(), action, details]);
}

// Run this function once to set up all sheets
function setup() {
  initializeSheets();
  SpreadsheetApp.getUi().alert('Sheets berhasil diinisialisasi!');
}
