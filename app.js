// ================================================================
// PRELOADER - Triple fallback
// ================================================================
function hidePreloader() {
    var preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(function () {
            preloader.style.display = 'none';
        }, 600);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(hidePreloader, 1200);
    initApp();
});

window.addEventListener('load', function () {
    setTimeout(hidePreloader, 500);
});

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
            var section = this.getAttribute('data-section');
            navigateTo(section);
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
    var sections = document.querySelectorAll('.section');
    for (var i = 0; i < sections.length; i++) sections[i].classList.remove('active');
    var target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ================================================================
// SCROLL
// ================================================================
function initScrollEffects() {
    window.addEventListener('scroll', function () {
        var navbar = document.getElementById('navbar');
        var btt = document.getElementById('backToTop');
        if (navbar) {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
        if (btt) {
            if (window.scrollY > 300) btt.classList.add('visible');
            else btt.classList.remove('visible');
        }
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
    if (target > currentStep) {
        if (!validateStep(currentStep)) return;
    }
    var steps = document.querySelectorAll('.step-indicator .step');
    var lines = document.querySelectorAll('.step-indicator .step-line');
    for (var i = 0; i < steps.length; i++) {
        steps[i].classList.remove('active', 'completed');
        if (i < target - 1) steps[i].classList.add('completed');
        if (i === target - 1) steps[i].classList.add('active');
    }
    for (var i = 0; i < lines.length; i++) {
        if (i < target - 1) lines[i].classList.add('active');
        else lines[i].classList.remove('active');
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
        var n = document.getElementById('namaPeserta').value.trim();
        var p = document.getElementById('noPeserta').value.trim();
        var t = document.getElementById('tanggalPinjam').value;
        var inst = document.querySelector('input[name="instruktur"]:checked');
        if (!n) { showToast('Nama peserta harus diisi!', 'error'); return false; }
        if (!p) { showToast('No. Peserta / NIK harus diisi!', 'error'); return false; }
        if (!t) { showToast('Tanggal peminjaman harus diisi!', 'error'); return false; }
        if (!inst) { showToast('Silakan pilih instruktur!', 'error'); return false; }
        return true;
    }
    if (step === 2) {
        var pl = document.querySelector('input[name="jenisPelatihan"]:checked');
        if (!pl) { showToast('Silakan pilih jenis pelatihan!', 'error'); return false; }
        var listId = pl.value.indexOf('Telepon') !== -1 ? 'unitSelularList' : 'unitFiberList';
        var checked = document.querySelectorAll('#' + listId + ' input[type="checkbox"]:checked');
        if (checked.length === 0) { showToast('Pilih minimal 1 unit kompetensi!', 'error'); return false; }
        return true;
    }
    if (step === 3) {
        collectSelectedItems();
        if (selectedItems.length === 0) {
            showToast('Pilih minimal 1 alat atau bahan!', 'error');
            return false;
        }
        return true;
    }
    return true;
}

// ================================================================
// TRAINING SELECTION
// ================================================================
function initTrainingSelection() {
    var radios = document.querySelectorAll('input[name="jenisPelatihan"]');
    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', function () {
            var us = document.getElementById('unitSelular');
            var uf = document.getElementById('unitFiber');
            if (this.value.indexOf('Telepon') !== -1) {
                us.className = 'unit-container show';
                uf.className = 'unit-container hidden-section';
            } else {
                uf.className = 'unit-container show';
                us.className = 'unit-container hidden-section';
            }
            selectedItems = [];
            customItems = [];
            var cl = document.getElementById('customItemsList');
            if (cl) cl.innerHTML = '';
        });
    }
}

// ================================================================
// UNIT KOMPETENSI
// ================================================================
function generateUnitList(containerId, units) {
    var c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = '';
    for (var i = 0; i < units.length; i++) {
        var u = units[i];
        var label = document.createElement('label');
        label.className = 'unit-item';
        label.innerHTML =
            '<input type="checkbox" name="unit_' + containerId + '" value="' + u.code + '||' + u.name + '||' + u.jp + '">' +
            '<div class="unit-info">' +
            '<div class="unit-check"><i class="fas fa-check"></i></div>' +
            '<div class="unit-detail">' +
            '<div class="unit-code">' + u.code + '</div>' +
            '<div class="unit-name">1.' + (i + 1) + '. ' + u.name + '</div>' +
            '</div>' +
            '<div class="unit-jp">' + u.jp + ' JP</div>' +
            '</div>';
        c.appendChild(label);
    }
}

function toggleSelectAll(type) {
    var cbId = type === 'selular' ? 'selectAllSelular' : 'selectAllFiber';
    var listId = type === 'selular' ? 'unitSelularList' : 'unitFiberList';
    var val = document.getElementById(cbId).checked;
    var boxes = document.querySelectorAll('#' + listId + ' input[type="checkbox"]');
    for (var i = 0; i < boxes.length; i++) boxes[i].checked = val;
}

// ================================================================
// TABS
// ================================================================
function switchTab(tab) {
    var btns = document.querySelectorAll('.tab-btn');
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
    var ab = document.querySelector('.tab-btn[data-tab="' + tab + '"]');
    if (ab) ab.classList.add('active');
    var contents = document.querySelectorAll('.tab-content');
    for (var i = 0; i < contents.length; i++) contents[i].classList.remove('active');
    var at = document.getElementById('tab-' + tab);
    if (at) at.classList.add('active');
}

// ================================================================
// LOAD ITEMS
// ================================================================
function loadItemsForTraining() {
    var pl = document.querySelector('input[name="jenisPelatihan"]:checked');
    if (!pl) return;
    var isS = pl.value.indexOf('Telepon') !== -1;
    buildItemGrid('alatGrid', isS ? DATA.alatSelular : DATA.alatFiber, 'alat');
    buildItemGrid('bahanGrid', isS ? DATA.bahanSelular : DATA.bahanFiber, 'bahan');
    for (var i = 0; i < customItems.length; i++) {
        var ci = customItems[i];
        appendCustomToGrid(ci, ci.type === 'Peralatan' ? 'alatGrid' : 'bahanGrid', ci.type === 'Peralatan' ? 'alat' : 'bahan');
    }
    updateSelectedSummary();
}

function buildItemGrid(gridId, items, type) {
    var grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = '';
    for (var i = 0; i < items.length; i++) {
        var name = items[i];
        var prev = null;
        for (var j = 0; j < selectedItems.length; j++) {
            if (selectedItems[j].name === name) { prev = selectedItems[j]; break; }
        }
        var card = document.createElement('label');
        card.className = 'item-card';
        card.setAttribute('data-name', name.toLowerCase());
        card.innerHTML =
            '<input type="checkbox" name="items_' + type + '" value="' + type + '||' + name + '" ' +
            (prev ? 'checked' : '') + ' onchange="updateSelectedSummary()">' +
            '<div class="item-content">' +
            '<div class="item-icon ' + type + '"><i class="fas fa-' + (type === 'alat' ? 'wrench' : 'cube') + '"></i></div>' +
            '<span class="item-name-text">' + name + '</span>' +
            '<div class="item-qty"><input type="number" min="1" value="' + (prev ? prev.qty : 1) + '" ' +
            'onclick="event.stopPropagation()" onchange="updateSelectedSummary()" class="qty-input" data-item="' + name + '"></div>' +
            '</div>';
        grid.appendChild(card);
    }
}

function filterItems(type) {
    var q = document.getElementById(type === 'alat' ? 'searchAlat' : 'searchBahan').value.toLowerCase();
    var cards = document.querySelectorAll('#' + (type === 'alat' ? 'alatGrid' : 'bahanGrid') + ' .item-card');
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.display = cards[i].getAttribute('data-name').indexOf(q) !== -1 ? '' : 'none';
    }
}

function toggleSelectAllItems(type) {
    var val = document.getElementById(type === 'alat' ? 'selectAllAlat' : 'selectAllBahan').checked;
    var boxes = document.querySelectorAll('#' + (type === 'alat' ? 'alatGrid' : 'bahanGrid') + ' input[type="checkbox"]');
    for (var i = 0; i < boxes.length; i++) {
        var card = boxes[i].closest('.item-card');
        if (card && card.style.display !== 'none') boxes[i].checked = val;
    }
    updateSelectedSummary();
}

// ================================================================
// CUSTOM ITEMS
// ================================================================
function addCustomItem() {
    var name = document.getElementById('customItemName').value.trim();
    var type = document.getElementById('customItemType').value;
    var qty = parseInt(document.getElementById('customItemQty').value) || 1;
    var note = document.getElementById('customItemNote').value.trim();
    if (!name) { showToast('Nama alat/bahan harus diisi!', 'error'); return; }
    for (var i = 0; i < customItems.length; i++) {
        if (customItems[i].name.toLowerCase() === name.toLowerCase()) { showToast('Item sudah ada!', 'warning'); return; }
    }
    var ci = { name: name, type: type, qty: qty, note: note };
    customItems.push(ci);
    appendCustomToGrid(ci, type === 'Peralatan' ? 'alatGrid' : 'bahanGrid', type === 'Peralatan' ? 'alat' : 'bahan');
    renderCustomItemsList();
    document.getElementById('customItemName').value = '';
    document.getElementById('customItemQty').value = '1';
    document.getElementById('customItemNote').value = '';
    showToast('"' + name + '" berhasil ditambahkan!', 'success');
    updateSelectedSummary();
}

function appendCustomToGrid(ci, gridId, itemType) {
    var grid = document.getElementById(gridId);
    if (!grid) return;
    var card = document.createElement('label');
    card.className = 'item-card';
    card.setAttribute('data-name', ci.name.toLowerCase());
    card.innerHTML =
        '<input type="checkbox" name="items_' + itemType + '" value="' + itemType + '||' + ci.name + '" checked onchange="updateSelectedSummary()">' +
        '<div class="item-content" style="border-color:rgba(245,158,11,.3);">' +
        '<div class="item-icon custom-icon"><i class="fas fa-star"></i></div>' +
        '<span class="item-name-text">' + ci.name + (ci.note ? ' (' + ci.note + ')' : '') + ' <em style="font-size:10px;color:#f59e0b;">[Custom]</em></span>' +
        '<div class="item-qty"><input type="number" min="1" value="' + ci.qty + '" onclick="event.stopPropagation()" onchange="updateSelectedSummary()" class="qty-input" data-item="' + ci.name + '"></div>' +
        '</div>';
    grid.appendChild(card);
}

function renderCustomItemsList() {
    var list = document.getElementById('customItemsList');
    if (!list) return;
    list.innerHTML = '';
    for (var i = 0; i < customItems.length; i++) {
        var ci = customItems[i];
        var tag = document.createElement('div');
        tag.className = 'custom-item-tag';
        tag.innerHTML = '<span><i class="fas fa-star" style="color:#f59e0b;margin-right:8px;"></i><strong>' + ci.name + '</strong> — ' + ci.type + ' — Qty: ' + ci.qty + (ci.note ? ' (' + ci.note + ')' : '') + '</span>' +
            '<span class="remove-custom" onclick="removeCustomItem(' + i + ')" title="Hapus"><i class="fas fa-times-circle"></i></span>';
        list.appendChild(tag);
    }
}

function removeCustomItem(idx) {
    var removed = customItems.splice(idx, 1)[0];
    renderCustomItemsList();
    var cards = document.querySelectorAll('.item-card');
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].getAttribute('data-name') === removed.name.toLowerCase()) cards[i].remove();
    }
    updateSelectedSummary();
    showToast('"' + removed.name + '" dihapus', 'info');
}

// ================================================================
// SELECTED ITEMS
// ================================================================
function collectSelectedItems() {
    selectedItems = [];
    var checked = document.querySelectorAll('input[name^="items_"]:checked');
    for (var i = 0; i < checked.length; i++) {
        var parts = checked[i].value.split('||');
        var card = checked[i].closest('.item-card');
        var qtyInput = card ? card.querySelector('.qty-input') : null;
        var qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
        selectedItems.push({ type: parts[0], name: parts[1], qty: qty });
    }
}

function updateSelectedSummary() {
    collectSelectedItems();
    var list = document.getElementById('selectedList');
    var count = document.getElementById('selectedCount');
    if (!list || !count) return;
    count.textContent = selectedItems.length;
    if (selectedItems.length === 0) {
        list.innerHTML = '<p class="empty-selected">Belum ada item yang dipilih</p>';
        return;
    }
    list.innerHTML = '';
    for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];
        var tag = document.createElement('span');
        tag.className = 'selected-tag';
        tag.innerHTML = '<i class="fas fa-' + (item.type === 'alat' ? 'wrench' : 'cube') + '"></i> ' + item.name + ' (' + item.qty + ')';
        list.appendChild(tag);
    }
}

// ================================================================
// HELPER: Build Print Header
// ================================================================
function buildPrintHeader() {
    return '<div style="text-align:center;border-bottom:3px double #000;padding-bottom:12px;margin-bottom:18px;">' +
        '<p style="font-size:13pt;font-weight:bold;margin:0 0 2px;letter-spacing:0.5px;">KEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA</p>' +
        '<p style="font-size:12pt;font-weight:bold;margin:0 0 2px;">BALAI PELATIHAN VOKASI DAN PRODUKTIVITAS SORONG</p>' +
        '<p style="font-size:11pt;margin:0 0 2px;"><strong>Workshop Elektronika</strong></p>' +
        '<p style="font-size:8pt;margin:0;color:#555;">Jl. Basuki Rahmat KM.11,5 Sorong — Papua Barat Daya</p>' +
        '</div>';
}

// ================================================================
// HELPER: Build Signature Block (sejajar rata)
// ================================================================
function buildSignatureBlock(namaPeserta, namaInstruktur, labelKiri, labelKanan) {
    return '<table style="width:100%;margin-top:45px;border:none;border-collapse:collapse;">' +
        '<tr>' +
        '<td style="width:50%;text-align:center;vertical-align:top;padding:0 15px;border:none;">' +
        '<p style="font-size:11pt;margin:0 0 5px;">' + (labelKiri || 'Peminjam / Peserta,') + '</p>' +
        '<div style="height:85px;margin:0 auto;width:200px;border-bottom:1px solid #000;"></div>' +
        '<p style="font-weight:bold;font-size:11pt;margin:8px 0 0;">' + namaPeserta + '</p>' +
        '<p style="font-size:7.5pt;color:#777;font-style:italic;margin:2px 0 0;">( Tanda tangan basah di atas garis )</p>' +
        '</td>' +
        '<td style="width:50%;text-align:center;vertical-align:top;padding:0 15px;border:none;">' +
        '<p style="font-size:11pt;margin:0 0 5px;">' + (labelKanan || 'Mengetahui,<br>Instruktur Pelatihan') + '</p>' +
        '<div style="height:85px;margin:0 auto;width:200px;border-bottom:1px solid #000;"></div>' +
        '<p style="font-weight:bold;font-size:11pt;margin:8px 0 0;">' + namaInstruktur + '</p>' +
        '<p style="font-size:7.5pt;color:#777;font-style:italic;margin:2px 0 0;">( Tanda tangan basah di atas garis )</p>' +
        '</td>' +
        '</tr></table>';
}

// ================================================================
// HELPER: Build Info Table
// ================================================================
function buildInfoTable(nama, noPeserta, tanggal, waktu, pelatihan, instruktur) {
    return '<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">' +
        '<tr><td style="padding:3px 8px;width:170px;font-weight:bold;font-size:11pt;">Nama Peserta</td><td style="padding:3px 8px;font-size:11pt;">: ' + nama + '</td></tr>' +
        '<tr><td style="padding:3px 8px;font-weight:bold;font-size:11pt;">No. Peserta / NIK</td><td style="padding:3px 8px;font-size:11pt;">: ' + noPeserta + '</td></tr>' +
        '<tr><td style="padding:3px 8px;font-weight:bold;font-size:11pt;">Tanggal</td><td style="padding:3px 8px;font-size:11pt;">: ' + formatDate(tanggal) + '</td></tr>' +
        '<tr><td style="padding:3px 8px;font-weight:bold;font-size:11pt;">Waktu</td><td style="padding:3px 8px;font-size:11pt;">: ' + (waktu || '-') + '</td></tr>' +
        '<tr><td style="padding:3px 8px;font-weight:bold;font-size:11pt;">Jenis Pelatihan</td><td style="padding:3px 8px;font-size:11pt;">: ' + pelatihan + '</td></tr>' +
        '<tr><td style="padding:3px 8px;font-weight:bold;font-size:11pt;">Instruktur</td><td style="padding:3px 8px;font-size:11pt;">: ' + instruktur + '</td></tr>' +
        '</table>';
}

// ================================================================
// HELPER: Table Header Cell
// ================================================================
function th(text, width) {
    return '<th style="border:1px solid #000;padding:5px 6px;background:#e8e8e8;text-align:center;font-size:9.5pt;font-weight:bold;' + (width ? 'width:' + width + ';' : '') + '">' + text + '</th>';
}

function td(text, align, bold) {
    return '<td style="border:1px solid #000;padding:4px 6px;font-size:9.5pt;' + (align ? 'text-align:' + align + ';' : '') + (bold ? 'font-weight:bold;' : '') + '">' + text + '</td>';
}

// ================================================================
// PREVIEW - HALAMAN 1: PEMINJAMAN + HALAMAN 2: PENGEMBALIAN
// ================================================================
function generatePreview() {
    collectSelectedItems();

    var nama = document.getElementById('namaPeserta').value;
    var noPeserta = document.getElementById('noPeserta').value;
    var tanggal = document.getElementById('tanggalPinjam').value;
    var waktu = document.getElementById('waktuPinjam').value;
    var instruktur = document.querySelector('input[name="instruktur"]:checked').value;
    var pelatihan = document.querySelector('input[name="jenisPelatihan"]:checked').value;
    var catatan = document.getElementById('catatanTambahan').value;

    var isSelular = pelatihan.indexOf('Telepon') !== -1;
    var listId = isSelular ? 'unitSelularList' : 'unitFiberList';

    var units = [];
    var unitBoxes = document.querySelectorAll('#' + listId + ' input[type="checkbox"]:checked');
    for (var i = 0; i < unitBoxes.length; i++) {
        var parts = unitBoxes[i].value.split('||');
        units.push({ code: parts[0], name: parts[1], jp: parts[2] });
    }
    var totalJP = 0;
    for (var i = 0; i < units.length; i++) totalJP += parseInt(units[i].jp) || 0;

    var alatItems = [];
    var bahanItems = [];
    for (var i = 0; i < selectedItems.length; i++) {
        if (selectedItems[i].type === 'alat') alatItems.push(selectedItems[i]);
        else bahanItems.push(selectedItems[i]);
    }

    // ---- HALAMAN 1: FORMULIR PEMINJAMAN ----
    var page1 = buildPrintHeader();

    page1 += '<p style="text-align:center;margin:18px 0;font-size:13pt;font-weight:bold;text-decoration:underline;letter-spacing:0.5px;">' +
        'FORMULIR PEMINJAMAN PERALATAN DAN PENGGUNAAN BAHAN PELATIHAN</p>';

    page1 += buildInfoTable(nama, noPeserta, tanggal, waktu, pelatihan, instruktur);

    // Unit Kompetensi
    page1 += '<p style="font-weight:bold;margin:12px 0 6px;font-size:10.5pt;">I. UNIT KOMPETENSI YANG DIPELAJARI</p>';
    page1 += '<table style="width:100%;border-collapse:collapse;margin-bottom:14px;">';
    page1 += '<thead><tr>' + th('No', '30px') + th('Kode Unit', '130px') + th('Unit Kompetensi', '') + th('JP', '40px') + '</tr></thead><tbody>';
    for (var i = 0; i < units.length; i++) {
        page1 += '<tr>' + td(i + 1, 'center') + td(units[i].code) + td(units[i].name) + td(units[i].jp, 'center') + '</tr>';
    }
    page1 += '<tr>' + '<td colspan="3" style="border:1px solid #000;padding:4px 6px;text-align:right;font-weight:bold;font-size:9.5pt;">Total JP</td>' +
        td(totalJP, 'center', true) + '</tr>';
    page1 += '</tbody></table>';

    // Peralatan
    var sectionRoman = 2;
    if (alatItems.length > 0) {
        page1 += '<p style="font-weight:bold;margin:12px 0 6px;font-size:10.5pt;">II. PERALATAN YANG DIPINJAM</p>';
        page1 += '<table style="width:100%;border-collapse:collapse;margin-bottom:14px;">';
        page1 += '<thead><tr>' + th('No', '30px') + th('Nama Peralatan', '') + th('Jml', '40px') + th('Kondisi Pinjam', '90px') + th('Kondisi Kembali', '90px') + '</tr></thead><tbody>';
        for (var i = 0; i < alatItems.length; i++) {
            page1 += '<tr>' + td(i + 1, 'center') + td(alatItems[i].name) + td(alatItems[i].qty, 'center') + td('Baik', 'center') + td('') + '</tr>';
        }
        page1 += '</tbody></table>';
        sectionRoman = 3;
    }

    // Bahan
    if (bahanItems.length > 0) {
        var romNum = sectionRoman === 3 ? 'III' : 'II';
        page1 += '<p style="font-weight:bold;margin:12px 0 6px;font-size:10.5pt;">' + romNum + '. BAHAN YANG DIGUNAKAN</p>';
        page1 += '<table style="width:100%;border-collapse:collapse;margin-bottom:14px;">';
        page1 += '<thead><tr>' + th('No', '30px') + th('Nama Bahan', '') + th('Jml', '40px') + th('Keterangan', '140px') + '</tr></thead><tbody>';
        for (var i = 0; i < bahanItems.length; i++) {
            page1 += '<tr>' + td(i + 1, 'center') + td(bahanItems[i].name) + td(bahanItems[i].qty, 'center') + td('') + '</tr>';
        }
        page1 += '</tbody></table>';
    }

    if (catatan) {
        page1 += '<p style="margin:10px 0;font-size:9.5pt;"><strong>Catatan:</strong> ' + catatan + '</p>';
    }

    // Tanda Tangan Peminjaman
    page1 += buildSignatureBlock(nama, instruktur, 'Peminjam / Peserta,', 'Mengetahui,<br>Instruktur Pelatihan');

    page1 += '<div style="margin-top:30px;text-align:center;font-size:7.5pt;color:#aaa;border-top:1px solid #ddd;padding-top:8px;">' +
        'Halaman 1 — Formulir Peminjaman | Sistem Digitalisasi BPVP Sorong &copy; 2026 — Artur Sebastian Kamajaya, S.Pd.</div>';

    // ---- HALAMAN 2: FORMULIR PENGEMBALIAN ----
    var page2 = buildPrintHeader();

    page2 += '<p style="text-align:center;margin:18px 0;font-size:13pt;font-weight:bold;text-decoration:underline;letter-spacing:0.5px;">' +
        'FORMULIR PENGEMBALIAN PERALATAN DAN BAHAN PELATIHAN</p>';

    page2 += buildInfoTable(nama, noPeserta, tanggal, waktu, pelatihan, instruktur);

    // Tanggal Pengembalian
    page2 += '<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">' +
        '<tr><td style="padding:3px 8px;width:170px;font-weight:bold;font-size:11pt;">Tanggal Pengembalian</td>' +
        '<td style="padding:3px 8px;font-size:11pt;">: ........................................</td></tr>' +
        '<tr><td style="padding:3px 8px;font-weight:bold;font-size:11pt;">Waktu Pengembalian</td>' +
        '<td style="padding:3px 8px;font-size:11pt;">: ........................................</td></tr>' +
        '</table>';

    // Tabel Pengembalian Peralatan
    if (alatItems.length > 0) {
        page2 += '<p style="font-weight:bold;margin:12px 0 6px;font-size:10.5pt;">I. PENGEMBALIAN PERALATAN</p>';
        page2 += '<table style="width:100%;border-collapse:collapse;margin-bottom:14px;">';
        page2 += '<thead><tr>' + th('No', '30px') + th('Nama Peralatan', '') + th('Jml Pinjam', '55px') + th('Jml Kembali', '55px') + th('Kondisi Kembali', '90px') + th('Keterangan', '100px') + '</tr></thead><tbody>';
        for (var i = 0; i < alatItems.length; i++) {
            page2 += '<tr>' + td(i + 1, 'center') + td(alatItems[i].name) + td(alatItems[i].qty, 'center') + td('', 'center') + td('') + td('') + '</tr>';
        }
        page2 += '</tbody></table>';
    }

    // Tabel Pengembalian/Sisa Bahan
    if (bahanItems.length > 0) {
        var romPengembalian = alatItems.length > 0 ? 'II' : 'I';
        page2 += '<p style="font-weight:bold;margin:12px 0 6px;font-size:10.5pt;">' + romPengembalian + '. PENGEMBALIAN / SISA BAHAN</p>';
        page2 += '<table style="width:100%;border-collapse:collapse;margin-bottom:14px;">';
        page2 += '<thead><tr>' + th('No', '30px') + th('Nama Bahan', '') + th('Jml Pakai', '55px') + th('Jml Sisa', '55px') + th('Jml Kembali', '55px') + th('Keterangan', '100px') + '</tr></thead><tbody>';
        for (var i = 0; i < bahanItems.length; i++) {
            page2 += '<tr>' + td(i + 1, 'center') + td(bahanItems[i].name) + td(bahanItems[i].qty, 'center') + td('', 'center') + td('', 'center') + td('') + '</tr>';
        }
        page2 += '</tbody></table>';
    }

    // Checklist Kondisi
    page2 += '<p style="font-weight:bold;margin:12px 0 6px;font-size:10.5pt;">Catatan Pengembalian:</p>';
    page2 += '<table style="width:100%;border-collapse:collapse;margin-bottom:14px;">' +
        '<tr><td style="border:1px solid #000;padding:5px 8px;font-size:9.5pt;width:30px;text-align:center;">1</td>' +
        '<td style="border:1px solid #000;padding:5px 8px;font-size:9.5pt;">Semua peralatan dikembalikan dalam kondisi baik</td>' +
        '<td style="border:1px solid #000;padding:5px 8px;font-size:9.5pt;width:100px;text-align:center;">Ya / Tidak *)</td></tr>' +
        '<tr><td style="border:1px solid #000;padding:5px 8px;font-size:9.5pt;text-align:center;">2</td>' +
        '<td style="border:1px solid #000;padding:5px 8px;font-size:9.5pt;">Ada peralatan yang rusak / hilang</td>' +
        '<td style="border:1px solid #000;padding:5px 8px;font-size:9.5pt;text-align:center;">Ya / Tidak *)</td></tr>' +
        '<tr><td style="border:1px solid #000;padding:5px 8px;font-size:9.5pt;text-align:center;">3</td>' +
        '<td style="border:1px solid #000;padding:5px 8px;font-size:9.5pt;">Sisa bahan telah dikembalikan</td>' +
        '<td style="border:1px solid #000;padding:5px 8px;font-size:9.5pt;text-align:center;">Ya / Tidak *)</td></tr>' +
        '</table>';
    page2 += '<p style="font-size:8pt;color:#555;font-style:italic;margin-bottom:5px;">*) Coret yang tidak perlu</p>';

    page2 += '<p style="font-size:9.5pt;margin:8px 0;">Keterangan tambahan: ..................................................................................................................................................................................................................</p>';

    // Tanda Tangan Pengembalian
    page2 += buildSignatureBlock(nama, instruktur, 'Yang Mengembalikan,', 'Yang Menerima,<br>Instruktur Pelatihan');

    page2 += '<div style="margin-top:30px;text-align:center;font-size:7.5pt;color:#aaa;border-top:1px solid #ddd;padding-top:8px;">' +
        'Halaman 2 — Formulir Pengembalian | Sistem Digitalisasi BPVP Sorong &copy; 2026 — Artur Sebastian Kamajaya, S.Pd.</div>';

    // Gabungkan dengan page break
    var fullHTML = '<div class="page-peminjaman">' + page1 + '</div>' +
        '<div style="page-break-before:always;margin-top:0;"></div>' +
        '<div class="page-pengembalian">' + page2 + '</div>';

    var preview = document.getElementById('previewDocument');
    if (preview) preview.innerHTML = fullHTML;
}

// ================================================================
// CETAK / PRINT
// ================================================================
function cetakDokumen() {
    var preview = document.getElementById('previewDocument');
    if (!preview) return;
    var content = preview.innerHTML;
    var printWin = window.open('', '_blank');
    if (!printWin) {
        showToast('Pop-up diblokir browser! Izinkan pop-up untuk mencetak.', 'error');
        return;
    }
    var printHTML = '<!DOCTYPE html>' +
        '<html lang="id"><head><meta charset="UTF-8">' +
        '<title>Formulir Peminjaman & Pengembalian - BPVP Sorong</title>' +
        '<style>' +
        '@page{margin:12mm 15mm;size:A4;}' +
        '*{margin:0;padding:0;box-sizing:border-box;}' +
        'body{font-family:"Times New Roman",Times,serif;font-size:12pt;line-height:1.5;color:#000;background:#fff;padding:5px;}' +
        'h2,h3,h4,p,td,th,span,strong,em{color:#000!important;}' +
        'table{page-break-inside:auto;border-collapse:collapse;}' +
        'tr{page-break-inside:avoid;page-break-after:auto;}' +
        '.page-pengembalian{page-break-before:always;}' +
        '</style></head><body>' +
        content +
        '<script>window.onload=function(){setTimeout(function(){window.print();},400);};<\/script>' +
        '</body></html>';
    printWin.document.open();
    printWin.document.write(printHTML);
    printWin.document.close();
}

// ================================================================
// RESET
// ================================================================
function resetFormFull() {
    if (!confirm('Buat peminjaman baru? Form akan direset.')) return;
    var form = document.getElementById('formPeminjaman');
    if (form) form.reset();
    currentStep = 1;
    selectedItems = [];
    customItems = [];
    var fs = document.querySelectorAll('.form-step');
    for (var i = 0; i < fs.length; i++) fs[i].classList.remove('active');
    document.getElementById('step1').classList.add('active');
    var steps = document.querySelectorAll('.step-indicator .step');
    for (var i = 0; i < steps.length; i++) {
        steps[i].classList.remove('active', 'completed');
        if (i === 0) steps[i].classList.add('active');
    }
    var lines = document.querySelectorAll('.step-line');
    for (var i = 0; i < lines.length; i++) lines[i].classList.remove('active');
    document.getElementById('unitSelular').className = 'unit-container hidden-section';
    document.getElementById('unitFiber').className = 'unit-container hidden-section';
    var cl = document.getElementById('customItemsList');
    if (cl) cl.innerHTML = '';
    var ag = document.getElementById('alatGrid');
    if (ag) ag.innerHTML = '';
    var bg = document.getElementById('bahanGrid');
    if (bg) bg.innerHTML = '';
    setDefaultDateTime();
    window.scrollTo({ top: 180, behavior: 'smooth' });
    showToast('Form berhasil direset!', 'success');
}

// ================================================================
// TOAST
// ================================================================
function showToast(message, type) {
    var container = document.getElementById('toastContainer');
    if (!container) return;
    var toast = document.createElement('div');
    toast.className = 'toast ' + (type || 'info');
    var icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    toast.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + '"></i> ' + message;
    container.appendChild(toast);
    setTimeout(function () {
        toast.classList.add('removing');
        setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
    }, 3500);
}

// ================================================================
// UTILITY
// ================================================================
function formatDate(str) {
    if (!str) return '-';
    var m = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var d = new Date(str);
    return d.getDate() + ' ' + m[d.getMonth()] + ' ' + d.getFullYear();
}

function animateStats() {
    setTimeout(function () {
        animateNum('totalAlat', DATA.alatSelular.length + DATA.alatFiber.length);
        animateNum('totalBahan', DATA.bahanSelular.length + DATA.bahanFiber.length);
    }, 2000);
}

function animateNum(id, target) {
    var el = document.getElementById(id);
    if (!el) return;
    var cur = 0;
    var step = Math.ceil(target / 25);
    var timer = setInterval(function () {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = cur;
    }, 40);
}