// ============================================================
// HISTORY.JS - Borrowing History
// ============================================================

function initHistory() {
  renderHistory();
}

function renderHistory() {
  const tbody = document.getElementById("history-table-body");
  if (!tbody) return;

  let peminjaman = getAllPeminjaman();

  // Apply filters
  const searchQuery = (
    document.getElementById("history-search")?.value || ""
  ).toLowerCase();
  const filterProgram =
    document.getElementById("history-filter-program")?.value || "";
  const filterStatus =
    document.getElementById("history-filter-status")?.value || "";

  if (searchQuery) {
    peminjaman = peminjaman.filter((p) =>
      p.nama.toLowerCase().includes(searchQuery)
    );
  }
  if (filterProgram) {
    peminjaman = peminjaman.filter((p) => p.program === filterProgram);
  }
  if (filterStatus) {
    peminjaman = peminjaman.filter((p) => p.status === filterStatus);
  }

  if (peminjaman.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="7">
        <div class="empty-state">
          <div class="empty-state-icon">📭</div>
          <h3>Belum Ada Riwayat</h3>
          <p>Data peminjaman akan muncul di sini</p>
        </div>
      </td></tr>
    `;
    return;
  }

  tbody.innerHTML = peminjaman
    .map((p, i) => {
      const programInfo = getProgramInfo(p.program);
      const programName = programInfo ? programInfo.name : p.program;
      const programBadgeClass =
        p.program === "fiber_optik" ? "badge-info" : "badge-purple";
      const statusBadge =
        p.status === "dipinjam"
          ? '<span class="badge badge-warning">⏳ Dipinjam</span>'
          : '<span class="badge badge-success">✅ Dikembalikan</span>';
      const itemCount = p.items ? p.items.length : 0;
      const tanggal = new Date(p.tanggal).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      return `
      <tr>
        <td>${i + 1}</td>
        <td>${tanggal}</td>
        <td><strong>${p.nama}</strong></td>
        <td><span class="badge ${programBadgeClass}">${programName}</span></td>
        <td>${itemCount} item</td>
        <td>${statusBadge}</td>
        <td>
          <div style="display:flex; gap:4px; flex-wrap:wrap;">
            <button class="btn btn-ghost btn-sm" onclick="viewPeminjamanDetail('${p.id}')" title="Detail">👁️</button>
            ${
              p.status === "dipinjam"
                ? `<button class="btn btn-ghost btn-sm" onclick="returnPeminjaman('${p.id}')" title="Kembalikan">↩️</button>`
                : ""
            }
            <button class="btn btn-ghost btn-sm" onclick="reprintPeminjaman('${p.id}')" title="Cetak Ulang">🖨️</button>
          </div>
        </td>
      </tr>
    `;
    })
    .join("");
}

function filterHistory() {
  renderHistory();
}

function viewPeminjamanDetail(id) {
  const peminjaman = getAllPeminjaman();
  const p = peminjaman.find((item) => item.id === id);
  if (!p) return;

  const programInfo = getProgramInfo(p.program);
  const tanggal = new Date(p.tanggal).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const allUnits = getUnitKompetensi(p.program);
  const ukNames = allUnits
    .filter((uk) => (p.unitKompetensi || []).includes(uk.kode))
    .map((uk) => `<li>${uk.nama} <small>(${uk.kode})</small></li>`);

  document.getElementById("modal-title").textContent =
    "Detail Peminjaman";
  document.getElementById("modal-body").innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div class="info-row">
        <span class="info-row-label">ID Peminjaman</span>
        <span class="info-row-value font-mono">${p.id}</span>
      </div>
      <div class="info-row">
        <span class="info-row-label">Nama</span>
        <span class="info-row-value">${p.nama}</span>
      </div>
      <div class="info-row">
        <span class="info-row-label">NIP/NIK</span>
        <span class="info-row-value">${p.nip || "-"}</span>
      </div>
      <div class="info-row">
        <span class="info-row-label">Program</span>
        <span class="info-row-value">${programInfo ? programInfo.name : p.program}</span>
      </div>
      <div class="info-row">
        <span class="info-row-label">Angkatan</span>
        <span class="info-row-value">${p.angkatan || "-"}</span>
      </div>
      <div class="info-row">
        <span class="info-row-label">Tanggal Pinjam</span>
        <span class="info-row-value">${tanggal}</span>
      </div>
      <div class="info-row">
        <span class="info-row-label">Status</span>
        <span class="info-row-value">${p.status === "dipinjam" ? '<span class="badge badge-warning">Dipinjam</span>' : '<span class="badge badge-success">Dikembalikan</span>'}</span>
      </div>
      ${
        p.tanggalKembali
          ? `
        <div class="info-row">
          <span class="info-row-label">Tanggal Kembali</span>
          <span class="info-row-value">${new Date(p.tanggalKembali).toLocaleDateString("id-ID")}</span>
        </div>
      `
          : ""
      }
      ${
        ukNames.length > 0
          ? `
        <div style="margin-top:8px;">
          <p style="font-weight:600; font-size:0.82rem; margin-bottom:8px;">Unit Kompetensi:</p>
          <ol style="font-size:0.8rem; padding-left:20px; color:var(--text-secondary);">${ukNames.join("")}</ol>
        </div>
      `
          : ""
      }
      <div style="margin-top:8px;">
        <p style="font-weight:600; font-size:0.82rem; margin-bottom:8px;">Item (${p.items ? p.items.length : 0}):</p>
        <ul class="selected-items-list">
          ${
            p.items
              ? p.items
                  .map(
                    (item) => `
              <li class="selected-item" style="cursor:default;">
                <div class="selected-item-info">
                  <div class="selected-item-name">${item.nama}</div>
                  <div class="selected-item-spec">${item.tipe} · ${item.qty} ${item.satuan}</div>
                </div>
              </li>
            `
                  )
                  .join("")
              : '<li class="text-muted">Tidak ada item</li>'
          }
        </ul>
      </div>
      ${p.keterangan ? `<div class="info-row"><span class="info-row-label">Keterangan</span><span class="info-row-value">${p.keterangan}</span></div>` : ""}
    </div>
  `;

  document.getElementById("modal-footer").innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Tutup</button>
    <button class="btn btn-primary" onclick="reprintPeminjaman('${p.id}'); closeModal();">🖨️ Cetak</button>
  `;

  openModal();
}

function returnPeminjaman(id) {
  if (!confirm("Konfirmasi pengembalian peralatan?")) return;

  updatePeminjamanStatus(id, "dikembalikan");
  renderHistory();
  refreshDashboard();
  renderAvailabilityTable();
  showToast("Peralatan berhasil dikembalikan! ✅", "success");
}

function reprintPeminjaman(id) {
  const peminjaman = getAllPeminjaman();
  const p = peminjaman.find((item) => item.id === id);
  if (!p) return;

  // Temporarily load data into form state and generate preview
  const programInfo = getProgramInfo(p.program);
  const tanggalFormatted = new Date(p.tanggal).toLocaleDateString(
    "id-ID",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );

  const allUnits = getUnitKompetensi(p.program);
  const selectedUKNamesReprint = allUnits
    .filter((uk) => (p.unitKompetensi || []).includes(uk.kode))
    .map((uk) => uk.nama);

  const peralatanItems = (p.items || []).filter(
    (i) => i.tipe === "Peralatan" || i.tipe === "Custom"
  );
  const bahanItems = (p.items || []).filter((i) => i.tipe === "Bahan");

  // Create a temporary print window
  const printContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Bukti Peminjaman - ${p.nama}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, sans-serif; color: #111; padding: 24px; font-size: 11pt; }
        .header { text-align: center; padding-bottom: 12px; border-bottom: 3px double #333; margin-bottom: 16px; }
        .header h2 { font-size: 13pt; }
        .header h3 { font-size: 11pt; margin-top: 4px; }
        .header p { font-size: 9pt; color: #666; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; }
        .info-item { display: flex; gap: 8px; font-size: 10pt; }
        .info-label { color: #666; min-width: 110px; }
        .info-value { font-weight: 600; }
        table { width: 100%; border-collapse: collapse; font-size: 9.5pt; margin-bottom: 16px; }
        th { background: #f5f5f5; padding: 6px 8px; text-align: left; border: 1px solid #ddd; font-size: 9pt; }
        td { padding: 5px 8px; border: 1px solid #ddd; }
        .signatures { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin-top: 36px; text-align: center; }
        .sig-line { height: 70px; border-bottom: 1px solid #333; margin: 12px 24px; }
        .sig-name { font-weight: 600; font-size: 10pt; }
        .footer { margin-top: 16px; text-align: center; font-size: 8pt; color: #999; border-top: 1px solid #eee; padding-top: 8px; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <p style="font-size:9pt; margin-bottom:4px;">KEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA</p>
        <h2>BALAI PELATIHAN VOKASI DAN PRODUKTIVITAS SORONG</h2>
        <h3>WORKSHOP ELEKTRONIKA</h3>
        <hr style="margin: 8px 0; border: 1px solid #333;">
        <h3 style="margin-top:6px;">BUKTI PEMINJAMAN PERALATAN & PENGGUNAAN BAHAN</h3>
        <p style="margin-top:4px;">No: ${p.id}</p>
      </div>
      <div class="info-grid">
        <div class="info-item"><span class="info-label">Nama:</span><span class="info-value">${p.nama}</span></div>
        <div class="info-item"><span class="info-label">NIP/NIK:</span><span class="info-value">${p.nip || "-"}</span></div>
        <div class="info-item"><span class="info-label">Program:</span><span class="info-value">${programInfo ? programInfo.name : "-"}</span></div>
        <div class="info-item"><span class="info-label">Angkatan:</span><span class="info-value">${p.angkatan || "-"}</span></div>
        <div class="info-item"><span class="info-label">Tanggal:</span><span class="info-value">${tanggalFormatted}</span></div>
        <div class="info-item"><span class="info-label">Keterangan:</span><span class="info-value">${p.keterangan || "-"}</span></div>
      </div>
      ${
        selectedUKNamesReprint.length > 0
          ? `<p style="font-weight:600; font-size:10pt; margin-bottom:6px;">Unit Kompetensi:</p>
         <ol style="padding-left:18px; font-size:9.5pt; margin-bottom:12px;">${selectedUKNamesReprint.map((uk) => `<li>${uk}</li>`).join("")}</ol>`
          : ""
      }
      ${
        peralatanItems.length > 0
          ? `<p style="font-weight:600; font-size:10pt; margin-bottom:6px;">A. Peralatan:</p>
         <table><thead><tr><th>No</th><th>Nama</th><th>Spesifikasi</th><th>Qty</th><th>Satuan</th><th>Kondisi</th></tr></thead>
         <tbody>${peralatanItems.map((it, i) => `<tr><td style="text-align:center">${i + 1}</td><td>${it.nama}</td><td>${it.spesifikasi || "-"}</td><td style="text-align:center">${it.qty}</td><td style="text-align:center">${it.satuan}</td><td>Baik</td></tr>`).join("")}</tbody></table>`
          : ""
      }
      ${
        bahanItems.length > 0
          ? `<p style="font-weight:600; font-size:10pt; margin-bottom:6px;">B. Bahan:</p>
         <table><thead><tr><th>No</th><th>Nama</th><th>Spesifikasi</th><th>Qty</th><th>Satuan</th><th>Ket</th></tr></thead>
         <tbody>${bahanItems.map((it, i) => `<tr><td style="text-align:center">${i + 1}</td><td>${it.nama}</td><td>${it.spesifikasi || "-"}</td><td style="text-align:center">${it.qty}</td><td style="text-align:center">${it.satuan}</td><td>-</td></tr>`).join("")}</tbody></table>`
          : ""
      }
      <div class="signatures">
        <div><p>Peminjam</p><div class="sig-line"></div><p class="sig-name">${p.nama}</p></div>
        <div><p>Instruktur</p><div class="sig-line"></div><p class="sig-name">( ........................ )</p></div>
        <div><p>Kepala Sub. Bagian</p><div class="sig-line"></div><p class="sig-name">( ........................ )</p></div>
      </div>
      <div class="footer">Dokumen ini digenerate oleh Sistem Peminjaman Digital BPVP Sorong</div>
      <script>window.onload = function() { window.print(); }<\/script>
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(printContent);
  printWindow.document.close();
}

function exportHistory() {
  const peminjaman = getAllPeminjaman();
  if (peminjaman.length === 0) {
    showToast("Tidak ada data untuk diekspor", "warning");
    return;
  }

  let csv = "No,ID,Tanggal,Nama,NIP,Program,Angkatan,Jumlah Item,Status,Keterangan\n";
  peminjaman.forEach((p, i) => {
    const programInfo = getProgramInfo(p.program);
    csv += `${i + 1},"${p.id}","${p.tanggal}","${p.nama}","${p.nip || ""}","${programInfo ? programInfo.name : p.program}","${p.angkatan || ""}",${p.items ? p.items.length : 0},"${p.status}","${p.keterangan || ""}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `riwayat_peminjaman_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();

  showToast("Data berhasil diekspor ke CSV", "success");
}
