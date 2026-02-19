// ================================================================
// PRELOADER
// ================================================================
function hidePreloader() {
    var preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(function () { preloader.style.display = 'none'; }, 600);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(hidePreloader, 1200);
    initApp();
});
window.addEventListener('load', function () { setTimeout(hidePreloader, 500); });
setTimeout(hidePreloader, 4000);

// ================================================================
// DATA
// ================================================================
var DATA = {
    unitSelular: [
        { code: 'S.951200.006.01', name: 'Mencetak Ulang Kaki IC BGA', jp: 20 },
        { code: 'S.951200.007.01', name: 'Memperbaiki Kerusakan Telepon Seluler Mati Total', jp: 30 },
        { code: 'S.951200.008.01', name: 'Memperbaiki Kerusakan Lampu LED Telepon Seluler', jp: 10 },
        { code: 'S.951200.009.01', name: 'Memperbaiki Kerusakan Telepon Seluler Tidak Ada Tampilan dan Tidak Bisa Dimatikan dari Tombol On-Off', jp: 20 },
        { code: 'S.951200.010.01', name: 'Memperbaiki Kerusakan Telepon Seluler Sim Card tidak Terbaca', jp: 12 },
        { code: 'S.951200.011.01', name: 'Memperbaiki Kerusakan Telepon Seluler Tidak Ada Dering Buzzer', jp: 10 },
        { code: 'S.951200.013.01', name: 'Memperbaiki Kerusakan Telepon Seluler Tidak Ada Signal', jp: 20 },
        { code: 'S.951200.015.01', name: 'Memperbaiki Kerusakan Telepon Seluler pada Mic', jp: 10 },
        { code: 'S.951200.018.01', name: 'Memperbaiki Kerusakan Telepon Seluler pada Kamera', jp: 10 },
        { code: 'S.951200.021.01', name: 'Membaca Skema Telepon Seluler Aktifasi Ulang/Restart', jp: 20 },
        { code: 'S.951200.024.01', name: 'Memperbaiki Kerusakan Telepon Seluler Tracpad tidak Fungsi', jp: 10 },
        { code: 'S.951200.025.01', name: 'Memperbaiki Kerusakan Telepon Seluler Touchscreen tidak Berfungsi', jp: 20 },
        { code: 'S.951200.026.01', name: 'Mengoperasikan Fungsi Menu Program Flashing', jp: 40 }
    ],
    unitFiber: [
        { code: 'J.61IFO00.006.2', name: 'Melaksanakan Pekerjaan Secara Tim', jp: 10 },
        { code: 'J.61IFO00.004.2', name: 'Membuat Laporan Tertulis', jp: 30 },
        { code: 'J.61IFO00.007.2', name: 'Merencanakan Instalasi Fiber Optik Berdasarkan Peta As Planned Drawing', jp: 30 },
        { code: 'J.61IFO00.014.2', name: 'Melaksanakan Penyambungan Fiber Optik Dengan Fusion Splicer', jp: 50 },
        { code: 'J.61IFO00.015.2', name: 'Melaksanakan Penyambungan Fiber Optik Dengan Mechanical Splice', jp: 30 },
        { code: 'J.61IFO00.016.2', name: 'Mengoperasikan OTDR (Optical Time Domain Reflectometer)', jp: 40 },
        { code: 'J.61IFO00.017.2', name: 'Melaksanakan Evaluasi Instalasi Fiber Optik Menggunakan OTDR', jp: 42 }
    ],
    alatSelular: [
        'Multitester', 'Solder Uap', 'Solder Station', 'Pinset', 'Obeng Handphone',
        'Lampu Service', 'Penjepit PCB', 'Dudukan Solder', 'Kaca Pembesar',
        'Sikat Pembersih', 'Power Supply', 'UFI Box', 'Power Supply Predator',
        'Komputer', 'Botol Alkohol'
    ],
    bahanSelular: [
        'Timah Gulung', 'Timah Cair', 'Mata Solder Station', 'Pasta Solder',
        'Solder Wick', 'Flux', 'LCD + Touch Screen', 'IC EMMC', 'IC Power',
        'IC RF', 'IC Charging', 'Mic', 'LED', 'Buzzer', 'Konektor Charging',
        'Konektor Baterai', 'Switch On-Off', 'Simcard Connector', 'Kabel Data',
        'Mesin HP Android', 'Kabel Jumper', 'Plat Cetak IC Universal',
        'Plat Cetak IC EMMC', 'Ragum HP', 'PCB Lubang', 'Pinset Lancip',
        'Pinset Bengkok', 'Pisau IC', 'Obeng Khusus HP', 'Isolasi Kertas',
        'Isolasi Aluminium', 'Resistor SMD', 'Kapasitor SMD', 'Tiner',
        'Botol Tiner', 'Sikat Gigi', 'Kertas A4', 'Kotak P3K', 'Tisu',
        'Kain Majun', 'Masker Kain'
    ],
    alatFiber: [
        'Kertas', 'Bolpoint', 'Komputer', 'Printer',
        'Alat Peraga Komponen Aktif/Pasif', 'Tang Potong Sedang',
        'Tang Potong Kecil', 'Tang Buaya', 'Tang Kombinasi', 'Cutter',
        'Gunting Kabel', 'Fusion Splicer', 'Hot Gun', 'Pemotong Piva',
        'Gergaji Besi', 'ToolBox', 'Mechanical Splicer', 'Kunci Pas',
        'Tangga Telescopic 4m', 'Kuas Cleaner', 'Sleeve Protector', 'OTDR'
    ],
    bahanFiber: [
        'Kabel Ties 10cm', 'Kabel Ties 15cm', 'Label', 'Tissue Splicing',
        'Sealer Karet', 'Heatshrink (berbagai ukuran)', 'Flexible Spiral Kabel',
        'Spidol Permanen', 'Solasi 3M', 'Double Tip Clamp', 'Minyak Tanah',
        'Kabel Optik', 'Karpet Plastik 2x2m'
    ]
};

// ================================================================
// STATE
// ================================================================
var currentStep = 1;
var selectedItems = [];
var customItems = [];

// ================================================================
// LOGO KEMNAKER BASE64
// ================================================================
var LOGO_KEMNAKER = 'data:image/svg+xml;base64,' + btoa(
    '<svg xmlns="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_of_the_Ministry_of_Manpower_of_the_Republic_of_Indonesia.svg" viewBox="0 0 200 200">' +
    '<circle cx="100" cy="100" r="95" fill="none" stroke="#1a237e" stroke-width="4"/>' +
    '<circle cx="100" cy="100" r="85" fill="none" stroke="#ffc107" stroke-width="3"/>' +
    '<polygon points="100,25 112,65 155,65 120,90 132,130 100,105 68,130 80,90 45,65 88,65" fill="#1a237e"/>' +
    '<circle cx="100" cy="80" r="12" fill="#ffc107"/>' +
    '<path d="M75,120 Q100,160 125,120" fill="none" stroke="#1a237e" stroke-width="4"/>' +
    '<path d="M70,140 L100,170 L130,140" fill="none" stroke="#1a237e" stroke-width="3"/>' +
    '<text x="100" y="195" text-anchor="middle" font-size="11" font-weight="bold" fill="#1a237e" font-family="Arial">KEMNAKER RI</text>' +
    '</svg>'
);

// ================================================================
// INIT
// ================================================================
function initApp() {
    try {
        createParticles();
        initNavigation();
        initTrainingSelection();
        initScrollEffects();
        setDefaultDateTime();
        generateUnitList('unitSelularList', DATA.unitSelular);
        generateUnitList('unitFiberList', DATA.unitFiber);
        animateStats();
    } catch (e) {
        console.error('Init error:', e);
    }
}

// ================================================================
// PARTICLES
// ================================================================
function createParticles() {
    var c = document.getElementById('particles-container');
    if (!c) return;
    var colors = ['#4f46e5', '#0ea5e9', '#10b981', '#818cf8', '#f59e0b'];
    for (var i = 0; i < 40; i++) {
        var p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        var s = Math.random() * 4 + 1;
        p.style.width = s + 'px';
        p.style.height = s + 'px';
        p.style.animationDuration = (Math.random() * 15 + 10) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        p.style.opacity = Math.random() * 0.25 + 0.05;
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.appendChild(p);
    }
}

// ================================================================
// NAVIGATION
// ================================================================
function initNavigation() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
    var links = document.querySelectorAll('.nav-link');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo(this.getAttribute('data-section'));
            if (toggle) toggle.classList.remove('active');
            if (menu) menu.classList.remove('active');
        });
    }
}

function navigateTo(id) {
    var links = document.querySelectorAll('.nav-link');
    for (var i = 0; i < links.length; i++) links[i].classList.remove('active');
    var al = document.querySelector('.nav-link[data-section="' + id + '"]');
    if (al) al.classList.add('active');
    var secs = document.querySelectorAll('.section');
    for (var i = 0; i < secs.length; i++) secs[i].classList.remove('active');
    var t = document.getElementById(id);
    if (t) { t.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
}

// ================================================================
// SCROLL
// ================================================================
function initScrollEffects() {
    window.addEventListener('scroll', function () {
        var nb = document.getElementById('navbar');
        var bt = document.getElementById('backToTop');
        if (nb) { if (window.scrollY > 50) nb.classList.add('scrolled'); else nb.classList.remove('scrolled'); }
        if (bt) { if (window.scrollY > 300) bt.classList.add('visible'); else bt.classList.remove('visible'); }
    });
}

// ================================================================
// DATE/TIME
// ================================================================
function setDefaultDateTime() {
    var now = new Date();
    var d = document.getElementById('tanggalPinjam');
    var t = document.getElementById('waktuPinjam');
    if (d) d.value = now.toISOString().split('T')[0];
    if (t) t.value = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

// ================================================================
// STEPS
// ================================================================
function goToStep(target) {
    if (target > currentStep && !validateStep(currentStep)) return;
    var steps = document.querySelectorAll('.step-indicator .step');
    var lines = document.querySelectorAll('.step-indicator .step-line');
    for (var i = 0; i < steps.length; i++) {
        steps[i].classList.remove('active', 'completed');
        if (i < target - 1) steps[i].classList.add('completed');
        if (i === target - 1) steps[i].classList.add('active');
    }
    for (var i = 0; i < lines.length; i++) {
        if (i < target - 1) lines[i].classList.add('active'); else lines[i].classList.remove('active');
    }
    var fs = document.querySelectorAll('.form-step');
    for (var i = 0; i < fs.length; i++) fs[i].classList.remove('active');
    var ts = document.getElementById('step' + target);
    if (ts) ts.classList.add('active');
    currentStep = target;
    if (target === 3) loadItemsForTraining();
    if (target === 4) generatePreview();
    window.scrollTo({ top: 180, behavior: 'smooth' });
}

function validateStep(step) {
    if (step === 1) {
        if (!document.getElementById('namaPeserta').value.trim()) { showToast('Nama peserta harus diisi!', 'error'); return false; }
        if (!document.getElementById('noPeserta').value.trim()) { showToast('No. Peserta / NIK harus diisi!', 'error'); return false; }
        if (!document.getElementById('tanggalPinjam').value) { showToast('Tanggal peminjaman harus diisi!', 'error'); return false; }
        if (!document.querySelector('input[name="instruktur"]:checked')) { showToast('Silakan pilih instruktur!', 'error'); return false; }
        return true;
    }
    if (step === 2) {
        var pl = document.querySelector('input[name="jenisPelatihan"]:checked');
        if (!pl) { showToast('Silakan pilih jenis pelatihan!', 'error'); return false; }
        var lid = pl.value.indexOf('Telepon') !== -1 ? 'unitSelularList' : 'unitFiberList';
        if (document.querySelectorAll('#' + lid + ' input[type="checkbox"]:checked').length === 0) { showToast('Pilih minimal 1 unit kompetensi!', 'error'); return false; }
        return true;
    }
    if (step === 3) {
        collectSelectedItems();
        if (selectedItems.length === 0) { showToast('Pilih minimal 1 alat atau bahan!', 'error'); return false; }
        return true;
    }
    return true;
}

// ================================================================
// TRAINING
// ================================================================
function initTrainingSelection() {
    var radios = document.querySelectorAll('input[name="jenisPelatihan"]');
    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', function () {
            var us = document.getElementById('unitSelular');
            var uf = document.getElementById('unitFiber');
            if (this.value.indexOf('Telepon') !== -1) {
                us.className = 'unit-container show'; uf.className = 'unit-container hidden-section';
            } else {
                uf.className = 'unit-container show'; us.className = 'unit-container hidden-section';
            }
            selectedItems = []; customItems = [];
            var cl = document.getElementById('customItemsList'); if (cl) cl.innerHTML = '';
        });
    }
}

// ================================================================
// UNIT LIST
// ================================================================
function generateUnitList(cid, units) {
    var c = document.getElementById(cid); if (!c) return; c.innerHTML = '';
    for (var i = 0; i < units.length; i++) {
        var u = units[i], l = document.createElement('label');
        l.className = 'unit-item';
        l.innerHTML = '<input type="checkbox" name="unit_' + cid + '" value="' + u.code + '||' + u.name + '||' + u.jp + '"><div class="unit-info"><div class="unit-check"><i class="fas fa-check"></i></div><div class="unit-detail"><div class="unit-code">' + u.code + '</div><div class="unit-name">1.' + (i + 1) + '. ' + u.name + '</div></div><div class="unit-jp">' + u.jp + ' JP</div></div>';
        c.appendChild(l);
    }
}

function toggleSelectAll(type) {
    var cbId = type === 'selular' ? 'selectAllSelular' : 'selectAllFiber';
    var lid = type === 'selular' ? 'unitSelularList' : 'unitFiberList';
    var v = document.getElementById(cbId).checked;
    var b = document.querySelectorAll('#' + lid + ' input[type="checkbox"]');
    for (var i = 0; i < b.length; i++) b[i].checked = v;
}

// ================================================================
// TABS
// ================================================================
function switchTab(tab) {
    var btns = document.querySelectorAll('.tab-btn');
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
    var ab = document.querySelector('.tab-btn[data-tab="' + tab + '"]'); if (ab) ab.classList.add('active');
    var cs = document.querySelectorAll('.tab-content');
    for (var i = 0; i < cs.length; i++) cs[i].classList.remove('active');
    var at = document.getElementById('tab-' + tab); if (at) at.classList.add('active');
}

// ================================================================
// ITEMS
// ================================================================
function loadItemsForTraining() {
    var pl = document.querySelector('input[name="jenisPelatihan"]:checked'); if (!pl) return;
    var isS = pl.value.indexOf('Telepon') !== -1;
    buildItemGrid('alatGrid', isS ? DATA.alatSelular : DATA.alatFiber, 'alat');
    buildItemGrid('bahanGrid', isS ? DATA.bahanSelular : DATA.bahanFiber, 'bahan');
    for (var i = 0; i < customItems.length; i++) {
        var ci = customItems[i];
        appendCustomToGrid(ci, ci.type === 'Peralatan' ? 'alatGrid' : 'bahanGrid', ci.type === 'Peralatan' ? 'alat' : 'bahan');
    }
    updateSelectedSummary();
}

function buildItemGrid(gid, items, type) {
    var g = document.getElementById(gid); if (!g) return; g.innerHTML = '';
    for (var i = 0; i < items.length; i++) {
        var name = items[i], prev = null;
        for (var j = 0; j < selectedItems.length; j++) { if (selectedItems[j].name === name) { prev = selectedItems[j]; break; } }
        var c = document.createElement('label');
        c.className = 'item-card'; c.setAttribute('data-name', name.toLowerCase());
        c.innerHTML = '<input type="checkbox" name="items_' + type + '" value="' + type + '||' + name + '" ' + (prev ? 'checked' : '') + ' onchange="updateSelectedSummary()"><div class="item-content"><div class="item-icon ' + type + '"><i class="fas fa-' + (type === 'alat' ? 'wrench' : 'cube') + '"></i></div><span class="item-name-text">' + name + '</span><div class="item-qty"><input type="number" min="1" value="' + (prev ? prev.qty : 1) + '" onclick="event.stopPropagation()" onchange="updateSelectedSummary()" class="qty-input" data-item="' + name + '"></div></div>';
        g.appendChild(c);
    }
}

function filterItems(type) {
    var q = document.getElementById(type === 'alat' ? 'searchAlat' : 'searchBahan').value.toLowerCase();
    var cards = document.querySelectorAll('#' + (type === 'alat' ? 'alatGrid' : 'bahanGrid') + ' .item-card');
    for (var i = 0; i < cards.length; i++) cards[i].style.display = cards[i].getAttribute('data-name').indexOf(q) !== -1 ? '' : 'none';
}

function toggleSelectAllItems(type) {
    var v = document.getElementById(type === 'alat' ? 'selectAllAlat' : 'selectAllBahan').checked;
    var b = document.querySelectorAll('#' + (type === 'alat' ? 'alatGrid' : 'bahanGrid') + ' input[type="checkbox"]');
    for (var i = 0; i < b.length; i++) { var c = b[i].closest('.item-card'); if (c && c.style.display !== 'none') b[i].checked = v; }
    updateSelectedSummary();
}

// ================================================================
// CUSTOM
// ================================================================
function addCustomItem() {
    var name = document.getElementById('customItemName').value.trim();
    var type = document.getElementById('customItemType').value;
    var qty = parseInt(document.getElementById('customItemQty').value) || 1;
    var note = document.getElementById('customItemNote').value.trim();
    if (!name) { showToast('Nama alat/bahan harus diisi!', 'error'); return; }
    for (var i = 0; i < customItems.length; i++) { if (customItems[i].name.toLowerCase() === name.toLowerCase()) { showToast('Item sudah ada!', 'warning'); return; } }
    var ci = { name: name, type: type, qty: qty, note: note };
    customItems.push(ci);
    appendCustomToGrid(ci, type === 'Peralatan' ? 'alatGrid' : 'bahanGrid', type === 'Peralatan' ? 'alat' : 'bahan');
    renderCustomItemsList();
    document.getElementById('customItemName').value = ''; document.getElementById('customItemQty').value = '1'; document.getElementById('customItemNote').value = '';
    showToast('"' + name + '" berhasil ditambahkan!', 'success');
    updateSelectedSummary();
}

function appendCustomToGrid(ci, gid, it) {
    var g = document.getElementById(gid); if (!g) return;
    var c = document.createElement('label'); c.className = 'item-card'; c.setAttribute('data-name', ci.name.toLowerCase());
    c.innerHTML = '<input type="checkbox" name="items_' + it + '" value="' + it + '||' + ci.name + '" checked onchange="updateSelectedSummary()"><div class="item-content" style="border-color:rgba(245,158,11,.3);"><div class="item-icon custom-icon"><i class="fas fa-star"></i></div><span class="item-name-text">' + ci.name + (ci.note ? ' (' + ci.note + ')' : '') + ' <em style="font-size:10px;color:#f59e0b;">[Custom]</em></span><div class="item-qty"><input type="number" min="1" value="' + ci.qty + '" onclick="event.stopPropagation()" onchange="updateSelectedSummary()" class="qty-input" data-item="' + ci.name + '"></div></div>';
    g.appendChild(c);
}

function renderCustomItemsList() {
    var l = document.getElementById('customItemsList'); if (!l) return; l.innerHTML = '';
    for (var i = 0; i < customItems.length; i++) {
        var ci = customItems[i], t = document.createElement('div'); t.className = 'custom-item-tag';
        t.innerHTML = '<span><i class="fas fa-star" style="color:#f59e0b;margin-right:8px;"></i><strong>' + ci.name + '</strong> — ' + ci.type + ' — Qty: ' + ci.qty + (ci.note ? ' (' + ci.note + ')' : '') + '</span><span class="remove-custom" onclick="removeCustomItem(' + i + ')"><i class="fas fa-times-circle"></i></span>';
        l.appendChild(t);
    }
}

function removeCustomItem(idx) {
    var r = customItems.splice(idx, 1)[0]; renderCustomItemsList();
    var cards = document.querySelectorAll('.item-card');
    for (var i = 0; i < cards.length; i++) { if (cards[i].getAttribute('data-name') === r.name.toLowerCase()) cards[i].remove(); }
    updateSelectedSummary(); showToast('"' + r.name + '" dihapus', 'info');
}

// ================================================================
// SELECTED
// ================================================================
function collectSelectedItems() {
    selectedItems = [];
    var ch = document.querySelectorAll('input[name^="items_"]:checked');
    for (var i = 0; i < ch.length; i++) {
        var p = ch[i].value.split('||'), c = ch[i].closest('.item-card'), q = c ? c.querySelector('.qty-input') : null;
        selectedItems.push({ type: p[0], name: p[1], qty: q ? (parseInt(q.value) || 1) : 1 });
    }
}

function updateSelectedSummary() {
    collectSelectedItems();
    var l = document.getElementById('selectedList'), c = document.getElementById('selectedCount');
    if (!l || !c) return; c.textContent = selectedItems.length;
    if (selectedItems.length === 0) { l.innerHTML = '<p class="empty-selected">Belum ada item yang dipilih</p>'; return; }
    l.innerHTML = '';
    for (var i = 0; i < selectedItems.length; i++) {
        var t = document.createElement('span'); t.className = 'selected-tag';
        t.innerHTML = '<i class="fas fa-' + (selectedItems[i].type === 'alat' ? 'wrench' : 'cube') + '"></i> ' + selectedItems[i].name + ' (' + selectedItems[i].qty + ')';
        l.appendChild(t);
    }
}

// ================================================================
// KOP SURAT RESMI DENGAN LOGO
// ================================================================
function buildKopSurat() {
    return '' +
        '<table style="width:100%;border-collapse:collapse;border:none;margin-bottom:0;">' +
        '<tr>' +
        // LOGO KIRI
        '<td style="width:80px;vertical-align:middle;text-align:center;border:none;padding:0 10px 0 0;">' +
        '<img src="' + LOGO_KEMNAKER + '" alt="Logo Kemnaker" style="width:70px;height:70px;">' +
        '</td>' +
        // TEKS KOP
        '<td style="vertical-align:middle;text-align:center;border:none;padding:0;">' +
        '<p style="font-size:11pt;font-weight:bold;margin:0;letter-spacing:0.5px;line-height:1.3;">KEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA</p>' +
        '<p style="font-size:10pt;font-weight:bold;margin:0;line-height:1.3;">DIREKTORAT JENDERAL</p>' +
        '<p style="font-size:10pt;font-weight:bold;margin:0;line-height:1.3;">PEMBINAAN PELATIHAN VOKASI DAN PRODUKTIVITAS</p>' +
        '<p style="font-size:11.5pt;font-weight:bold;margin:2px 0 0;line-height:1.3;">BALAI PELATIHAN VOKASI DAN PRODUKTIVITAS SORONG</p>' +
        '<p style="font-size:8pt;margin:2px 0 0;line-height:1.2;">Jl. Basuki Rahmat KM. 9,5 Telp/Fax (0951) 324776 Sorong Papua Barat Daya</p>' +
        '<p style="font-size:8pt;margin:1px 0 0;line-height:1.2;">Website: https://bpvpsorong.kemnaker.go.id</p>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '<div style="border-bottom:3px double #000;margin:8px 0 15px;"></div>';
}

// ================================================================
// TANDA TANGAN - SEJAJAR DI BAWAH "MENGETAHUI"
// ================================================================
function buildTTDPeminjaman(namaPeserta, namaInstruktur) {
    return '' +
        '<div style="text-align:center;margin-top:40px;margin-bottom:8px;">' +
        '<p style="font-size:11pt;font-weight:bold;margin:0;">Mengetahui,</p>' +
        '</div>' +
        '<table style="width:100%;border-collapse:collapse;border:none;">' +
        '<tr>' +
        '<td style="width:50%;text-align:center;vertical-align:top;border:none;padding:5px 20px 0;">' +
        '<p style="font-size:10.5pt;margin:0 0 5px;">Peminjam / Peserta</p>' +
        '<div style="height:80px;width:180px;margin:0 auto;border-bottom:1px solid #000;"></div>' +
        '<p style="font-weight:bold;font-size:10.5pt;margin:6px 0 0;text-decoration:underline;">' + namaPeserta + '</p>' +
        '<p style="font-size:7.5pt;color:#888;font-style:italic;margin:2px 0 0;">TTD Basah</p>' +
        '</td>' +
        '<td style="width:50%;text-align:center;vertical-align:top;border:none;padding:5px 20px 0;">' +
        '<p style="font-size:10.5pt;margin:0 0 5px;">Instruktur Pelatihan</p>' +
        '<div style="height:80px;width:180px;margin:0 auto;border-bottom:1px solid #000;"></div>' +
        '<p style="font-weight:bold;font-size:10.5pt;margin:6px 0 0;text-decoration:underline;">' + namaInstruktur + '</p>' +
        '<p style="font-size:7.5pt;color:#888;font-style:italic;margin:2px 0 0;">TTD Basah</p>' +
        '</td>' +
        '</tr>' +
        '</table>';
}

function buildTTDPengembalian(namaPeserta, namaInstruktur) {
    return '' +
        '<div style="text-align:center;margin-top:40px;margin-bottom:8px;">' +
        '<p style="font-size:11pt;font-weight:bold;margin:0;">Mengetahui,</p>' +
        '</div>' +
        '<table style="width:100%;border-collapse:collapse;border:none;">' +
        '<tr>' +
        '<td style="width:50%;text-align:center;vertical-align:top;border:none;padding:5px 20px 0;">' +
        '<p style="font-size:10.5pt;margin:0 0 5px;">Yang Mengembalikan</p>' +
        '<div style="height:80px;width:180px;margin:0 auto;border-bottom:1px solid #000;"></div>' +
        '<p style="font-weight:bold;font-size:10.5pt;margin:6px 0 0;text-decoration:underline;">' + namaPeserta + '</p>' +
        '<p style="font-size:7.5pt;color:#888;font-style:italic;margin:2px 0 0;">TTD Basah</p>' +
        '</td>' +
        '<td style="width:50%;text-align:center;vertical-align:top;border:none;padding:5px 20px 0;">' +
        '<p style="font-size:10.5pt;margin:0 0 5px;">Yang Menerima / Instruktur</p>' +
        '<div style="height:80px;width:180px;margin:0 auto;border-bottom:1px solid #000;"></div>' +
        '<p style="font-weight:bold;font-size:10.5pt;margin:6px 0 0;text-decoration:underline;">' + namaInstruktur + '</p>' +
        '<p style="font-size:7.5pt;color:#888;font-style:italic;margin:2px 0 0;">TTD Basah</p>' +
        '</td>' +
        '</tr>' +
        '</table>';
}

// ================================================================
// HELPER: Info table, th, td
// ================================================================
function buildInfoTable(nama, noP, tgl, wkt, pel, ins) {
    return '<table style="width:100%;border-collapse:collapse;margin-bottom:14px;">' +
        '<tr><td style="padding:3px 8px;width:170px;font-weight:bold;font-size:10.5pt;border:none;">Nama Peserta</td><td style="padding:3px 8px;font-size:10.5pt;border:none;">: ' + nama + '</td></tr>' +
        '<tr><td style="padding:3px 8px;font-weight:bold;font-size:10.5pt;border:none;">No. Peserta / NIK</td><td style="padding:3px 8px;font-size:10.5pt;border:none;">: ' + noP + '</td></tr>' +
        '<tr><td style="padding:3px 8px;font-weight:bold;font-size:10.5pt;border:none;">Tanggal</td><td style="padding:3px 8px;font-size:10.5pt;border:none;">: ' + formatDate(tgl) + '</td></tr>' +
        '<tr><td style="padding:3px 8px;font-weight:bold;font-size:10.5pt;border:none;">Waktu</td><td style="padding:3px 8px;font-size:10.5pt;border:none;">: ' + (wkt || '-') + '</td></tr>' +
        '<tr><td style="padding:3px 8px;font-weight:bold;font-size:10.5pt;border:none;">Jenis Pelatihan</td><td style="padding:3px 8px;font-size:10.5pt;border:none;">: ' + pel + '</td></tr>' +
        '<tr><td style="padding:3px 8px;font-weight:bold;font-size:10.5pt;border:none;">Instruktur</td><td style="padding:3px 8px;font-size:10.5pt;border:none;">: ' + ins + '</td></tr>' +
        '</table>';
}

function TH(text, w) {
    return '<th style="border:1px solid #000;padding:4px 5px;background:#e8e8e8;text-align:center;font-size:9pt;font-weight:bold;' + (w ? 'width:' + w + ';' : '') + '">' + text + '</th>';
}
function TD(text, al, b) {
    return '<td style="border:1px solid #000;padding:3px 5px;font-size:9pt;' + (al ? 'text-align:' + al + ';' : '') + (b ? 'font-weight:bold;' : '') + '">' + text + '</td>';
}

// ================================================================
// PREVIEW GENERATOR
// ================================================================
function generatePreview() {
    collectSelectedItems();
    var nama = document.getElementById('namaPeserta').value;
    var noP = document.getElementById('noPeserta').value;
    var tgl = document.getElementById('tanggalPinjam').value;
    var wkt = document.getElementById('waktuPinjam').value;
    var ins = document.querySelector('input[name="instruktur"]:checked').value;
    var pel = document.querySelector('input[name="jenisPelatihan"]:checked').value;
    var cat = document.getElementById('catatanTambahan').value;
    var isS = pel.indexOf('Telepon') !== -1;
    var lid = isS ? 'unitSelularList' : 'unitFiberList';

    var units = [], ub = document.querySelectorAll('#' + lid + ' input[type="checkbox"]:checked');
    for (var i = 0; i < ub.length; i++) { var p = ub[i].value.split('||'); units.push({ code: p[0], name: p[1], jp: p[2] }); }
    var tJP = 0; for (var i = 0; i < units.length; i++) tJP += parseInt(units[i].jp) || 0;

    var aI = [], bI = [];
    for (var i = 0; i < selectedItems.length; i++) {
        if (selectedItems[i].type === 'alat') aI.push(selectedItems[i]); else bI.push(selectedItems[i]);
    }

    // ==========================================
    // HALAMAN 1: FORMULIR PEMINJAMAN
    // ==========================================
    var p1 = buildKopSurat();
    p1 += '<p style="text-align:center;margin:15px 0;font-size:12pt;font-weight:bold;text-decoration:underline;letter-spacing:0.3px;">FORMULIR PEMINJAMAN PERALATAN DAN PENGGUNAAN BAHAN PELATIHAN</p>';
    p1 += buildInfoTable(nama, noP, tgl, wkt, pel, ins);

    // Unit Kompetensi
    p1 += '<p style="font-weight:bold;margin:10px 0 5px;font-size:10pt;">I. UNIT KOMPETENSI YANG DIPELAJARI</p>';
    p1 += '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;"><thead><tr>' + TH('No', '28px') + TH('Kode Unit', '120px') + TH('Unit Kompetensi', '') + TH('JP', '35px') + '</tr></thead><tbody>';
    for (var i = 0; i < units.length; i++) p1 += '<tr>' + TD(i + 1, 'center') + TD(units[i].code) + TD(units[i].name) + TD(units[i].jp, 'center') + '</tr>';
    p1 += '<tr><td colspan="3" style="border:1px solid #000;padding:3px 5px;text-align:right;font-weight:bold;font-size:9pt;">Total JP</td>' + TD(tJP, 'center', true) + '</tr></tbody></table>';

    var sec = 2;
    if (aI.length > 0) {
        p1 += '<p style="font-weight:bold;margin:10px 0 5px;font-size:10pt;">II. PERALATAN YANG DIPINJAM</p>';
        p1 += '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;"><thead><tr>' + TH('No', '28px') + TH('Nama Peralatan', '') + TH('Jml', '35px') + TH('Kondisi Pinjam', '80px') + TH('Kondisi Kembali', '80px') + '</tr></thead><tbody>';
        for (var i = 0; i < aI.length; i++) p1 += '<tr>' + TD(i + 1, 'center') + TD(aI[i].name) + TD(aI[i].qty, 'center') + TD('Baik', 'center') + TD('') + '</tr>';
        p1 += '</tbody></table>'; sec = 3;
    }
    if (bI.length > 0) {
        p1 += '<p style="font-weight:bold;margin:10px 0 5px;font-size:10pt;">' + (sec === 3 ? 'III' : 'II') + '. BAHAN YANG DIGUNAKAN</p>';
        p1 += '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;"><thead><tr>' + TH('No', '28px') + TH('Nama Bahan', '') + TH('Jml', '35px') + TH('Keterangan', '130px') + '</tr></thead><tbody>';
        for (var i = 0; i < bI.length; i++) p1 += '<tr>' + TD(i + 1, 'center') + TD(bI[i].name) + TD(bI[i].qty, 'center') + TD('') + '</tr>';
        p1 += '</tbody></table>';
    }
    if (cat) p1 += '<p style="margin:8px 0;font-size:9pt;"><strong>Catatan:</strong> ' + cat + '</p>';
    p1 += buildTTDPeminjaman(nama, ins);
    p1 += '<div style="margin-top:25px;text-align:center;font-size:7pt;color:#bbb;border-top:1px solid #eee;padding-top:6px;">Halaman 1 — Formulir Peminjaman | Sistem Digitalisasi BPVP Sorong &copy; 2026</div>';

    // ==========================================
    // HALAMAN 2: FORMULIR PENGEMBALIAN
    // ==========================================
    var p2 = buildKopSurat();
    p2 += '<p style="text-align:center;margin:15px 0;font-size:12pt;font-weight:bold;text-decoration:underline;letter-spacing:0.3px;">FORMULIR PENGEMBALIAN PERALATAN DAN BAHAN PELATIHAN</p>';
    p2 += buildInfoTable(nama, noP, tgl, wkt, pel, ins);

    // Tanggal Pengembalian
    p2 += '<table style="width:100%;border-collapse:collapse;margin-bottom:14px;border:none;">' +
        '<tr><td style="padding:3px 8px;width:170px;font-weight:bold;font-size:10.5pt;border:none;">Tanggal Pengembalian</td><td style="padding:3px 8px;font-size:10.5pt;border:none;">: ........................................</td></tr>' +
        '<tr><td style="padding:3px 8px;font-weight:bold;font-size:10.5pt;border:none;">Waktu Pengembalian</td><td style="padding:3px 8px;font-size:10.5pt;border:none;">: ........................................</td></tr>' +
        '</table>';

    if (aI.length > 0) {
        p2 += '<p style="font-weight:bold;margin:10px 0 5px;font-size:10pt;">I. PENGEMBALIAN PERALATAN</p>';
        p2 += '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;"><thead><tr>' + TH('No', '28px') + TH('Nama Peralatan', '') + TH('Jml Pinjam', '50px') + TH('Jml Kembali', '50px') + TH('Kondisi', '75px') + TH('Ket.', '85px') + '</tr></thead><tbody>';
        for (var i = 0; i < aI.length; i++) p2 += '<tr>' + TD(i + 1, 'center') + TD(aI[i].name) + TD(aI[i].qty, 'center') + TD('', 'center') + TD('') + TD('') + '</tr>';
        p2 += '</tbody></table>';
    }
    if (bI.length > 0) {
        var rr = aI.length > 0 ? 'II' : 'I';
        p2 += '<p style="font-weight:bold;margin:10px 0 5px;font-size:10pt;">' + rr + '. PENGEMBALIAN / SISA BAHAN</p>';
        p2 += '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;"><thead><tr>' + TH('No', '28px') + TH('Nama Bahan', '') + TH('Jml Pakai', '48px') + TH('Jml Sisa', '48px') + TH('Jml Kembali', '50px') + TH('Ket.', '85px') + '</tr></thead><tbody>';
        for (var i = 0; i < bI.length; i++) p2 += '<tr>' + TD(i + 1, 'center') + TD(bI[i].name) + TD(bI[i].qty, 'center') + TD('', 'center') + TD('', 'center') + TD('') + '</tr>';
        p2 += '</tbody></table>';
    }

    // Checklist
    p2 += '<p style="font-weight:bold;margin:10px 0 5px;font-size:10pt;">Catatan Pengembalian:</p>';
    p2 += '<table style="width:100%;border-collapse:collapse;margin-bottom:8px;">' +
        '<tr>' + TD('1', 'center') + '<td style="border:1px solid #000;padding:3px 5px;font-size:9pt;">Semua peralatan dikembalikan dalam kondisi baik</td>' + TD('Ya / Tidak *)', 'center') + '</tr>' +
        '<tr>' + TD('2', 'center') + '<td style="border:1px solid #000;padding:3px 5px;font-size:9pt;">Ada peralatan yang rusak / hilang</td>' + TD('Ya / Tidak *)', 'center') + '</tr>' +
        '<tr>' + TD('3', 'center') + '<td style="border:1px solid #000;padding:3px 5px;font-size:9pt;">Sisa bahan telah dikembalikan</td>' + TD('Ya / Tidak *)', 'center') + '</tr>' +
        '</table>';
    p2 += '<p style="font-size:7.5pt;color:#666;font-style:italic;margin:0 0 5px;">*) Coret yang tidak perlu</p>';
    p2 += '<p style="font-size:9pt;margin:6px 0;">Keterangan: ..........................................................................................................................................................................................................................................................</p>';

    p2 += buildTTDPengembalian(nama, ins);
    p2 += '<div style="margin-top:25px;text-align:center;font-size:7pt;color:#bbb;border-top:1px solid #eee;padding-top:6px;">Halaman 2 — Formulir Pengembalian | Sistem Digitalisasi BPVP Sorong &copy; 2026</div>';

    // GABUNGKAN
    var full = '<div class="page-peminjaman">' + p1 + '</div>' +
        '<div style="page-break-before:always;"></div>' +
        '<div class="page-pengembalian">' + p2 + '</div>';

    var pv = document.getElementById('previewDocument');
    if (pv) pv.innerHTML = full;
}

// ================================================================
// CETAK
// ================================================================
function cetakDokumen() {
    var pv = document.getElementById('previewDocument'); if (!pv) return;
    var content = pv.innerHTML;
    var pw = window.open('', '_blank');
    if (!pw) { showToast('Pop-up diblokir! Izinkan pop-up browser.', 'error'); return; }
    pw.document.open();
    pw.document.write('<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">' +
        '<title>Formulir Peminjaman & Pengembalian - BPVP Sorong</title>' +
        '<style>' +
        '@page{margin:12mm 15mm;size:A4;}' +
        '*{margin:0;padding:0;box-sizing:border-box;}' +
        'body{font-family:"Times New Roman",Times,serif;font-size:12pt;line-height:1.4;color:#000;background:#fff;padding:5px;}' +
        'h2,h3,h4,p,td,th,span,strong,em{color:#000!important;}' +
        'table{border-collapse:collapse;page-break-inside:auto;}' +
        'tr{page-break-inside:avoid;page-break-after:auto;}' +
        '.page-pengembalian{page-break-before:always;}' +
        'img{-webkit-print-color-adjust:exact;print-color-adjust:exact;}' +
        '</style></head><body>' +
        content +
        '<script>window.onload=function(){setTimeout(function(){window.print();},500);};<\/script>' +
        '</body></html>');
    pw.document.close();
}

// ================================================================
// RESET
// ================================================================
function resetFormFull() {
    if (!confirm('Buat peminjaman baru? Form akan direset.')) return;
    var f = document.getElementById('formPeminjaman'); if (f) f.reset();
    currentStep = 1; selectedItems = []; customItems = [];
    var fs = document.querySelectorAll('.form-step'); for (var i = 0; i < fs.length; i++) fs[i].classList.remove('active');
    document.getElementById('step1').classList.add('active');
    var st = document.querySelectorAll('.step-indicator .step');
    for (var i = 0; i < st.length; i++) { st[i].classList.remove('active', 'completed'); if (i === 0) st[i].classList.add('active'); }
    var ln = document.querySelectorAll('.step-line'); for (var i = 0; i < ln.length; i++) ln[i].classList.remove('active');
    document.getElementById('unitSelular').className = 'unit-container hidden-section';
    document.getElementById('unitFiber').className = 'unit-container hidden-section';
    var cl = document.getElementById('customItemsList'); if (cl) cl.innerHTML = '';
    var ag = document.getElementById('alatGrid'); if (ag) ag.innerHTML = '';
    var bg = document.getElementById('bahanGrid'); if (bg) bg.innerHTML = '';
    setDefaultDateTime();
    window.scrollTo({ top: 180, behavior: 'smooth' });
    showToast('Form berhasil direset!', 'success');
}

// ================================================================
// TOAST
// ================================================================
function showToast(msg, type) {
    var c = document.getElementById('toastContainer'); if (!c) return;
    var t = document.createElement('div'); t.className = 'toast ' + (type || 'info');
    var ic = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    t.innerHTML = '<i class="fas ' + (ic[type] || ic.info) + '"></i> ' + msg;
    c.appendChild(t);
    setTimeout(function () { t.classList.add('removing'); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 300); }, 3500);
}

// ================================================================
// UTILITY
// ================================================================
function formatDate(s) {
    if (!s) return '-';
    var m = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var d = new Date(s); return d.getDate() + ' ' + m[d.getMonth()] + ' ' + d.getFullYear();
}
function animateStats() {
    setTimeout(function () {
        animateNum('totalAlat', DATA.alatSelular.length + DATA.alatFiber.length);
        animateNum('totalBahan', DATA.bahanSelular.length + DATA.bahanFiber.length);
    }, 2000);
}
function animateNum(id, tgt) {
    var e = document.getElementById(id); if (!e) return;
    var c = 0, s = Math.ceil(tgt / 25);
    var t = setInterval(function () { c += s; if (c >= tgt) { c = tgt; clearInterval(t); } e.textContent = c; }, 40);
}