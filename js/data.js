// ============================================================
// DATA.JS - Equipment, Materials & Curriculum Data
// Based on Proglat Kemnaker Programs
// ============================================================

const APP_DATA = {
  institution: {
    name: "BPVP Sorong",
    fullName: "Balai Pelatihan Vokasi dan Produktivitas Sorong",
    department: "Workshop Elektronika",
    address: "Sorong, Papua Barat Daya",
    year: 2026,
  },

  programs: {
    fiber_optik: {
      id: "fiber_optik",
      name: "Instalasi Fiber Optik",
      code: "FO",
      totalJP: 260,
      durasiJP: 45, // menit
      icon: "🔌",
      color: "#2563eb",
      gradient: "linear-gradient(135deg, #2563eb, #06b6d4)",
      proglatUrl:
        "https://proglat.kemnaker.go.id/programs/2ad91f2e-20df-4f95-a2c3-bfc50a706448/versions/3",
      unitKompetensi: [
        {
          kode: "J.61IFO00.016.2",
          nama: "Mengoperasikan Optical Time Domain Reflectometer (OTDR)",
          jp: 40,
        },
        {
          kode: "J.61IFO00.014.2",
          nama: "Melakukan Penyambungan Kabel Serat Optik dengan Fusion Splicer",
          jp: 50,
        },
        {
          kode: "J.61IFO00.004.2",
          nama: "Membuat Laporan Tertulis",
          jp: 30,
        },
        {
          kode: "J.61IFO00.007.2",
          nama: "Merencanakan Pekerjaan Instalasi Fiber Optik",
          jp: 30,
        },
        {
          kode: "J.61IFO00.015.2",
          nama: "Melakukan Penyambungan Kabel Serat Optik dengan Mechanical Splice",
          jp: 30,
        },
        {
          kode: "J.61IFO00.017.2",
          nama: "Melakukan Evaluasi Instalasi Fiber Optik Menggunakan OTDR",
          jp: 42,
        },
        {
          kode: "J.61IFO00.006.2",
          nama: "Melaksanakan Pekerjaan Secara Tim (Teamwork)",
          jp: 10,
        },
      ],
      peralatan: [
        {
          id: "fo_p01",
          nama: "Fusion Splicer",
          spesifikasi: "Sumitomo T-72C / setara",
          jumlah: 4,
          satuan: "Unit",
          kategori: "Peralatan Utama",
        },
        {
          id: "fo_p02",
          nama: "OTDR (Optical Time Domain Reflectometer)",
          spesifikasi: "Yokogawa AQ7280 / setara",
          jumlah: 2,
          satuan: "Unit",
          kategori: "Peralatan Utama",
        },
        {
          id: "fo_p03",
          nama: "Mechanical Splicer Kit",
          spesifikasi: "3M Fibrlok / setara",
          jumlah: 8,
          satuan: "Set",
          kategori: "Peralatan Utama",
        },
        {
          id: "fo_p04",
          nama: "ToolBox Set",
          spesifikasi: "Tekiro/Krisbow lengkap",
          jumlah: 8,
          satuan: "Set",
          kategori: "Peralatan Tangan",
        },
        {
          id: "fo_p05",
          nama: "Tang Potong",
          spesifikasi: "6 inch",
          jumlah: 8,
          satuan: "Pcs",
          kategori: "Peralatan Tangan",
        },
        {
          id: "fo_p06",
          nama: "Tang Buaya / Long Nose Plier",
          spesifikasi: "6 inch",
          jumlah: 8,
          satuan: "Pcs",
          kategori: "Peralatan Tangan",
        },
        {
          id: "fo_p07",
          nama: "Tang Kombinasi",
          spesifikasi: "8 inch",
          jumlah: 8,
          satuan: "Pcs",
          kategori: "Peralatan Tangan",
        },
        {
          id: "fo_p08",
          nama: "Cutter / Pisau Potong",
          spesifikasi: "Stanley / setara",
          jumlah: 8,
          satuan: "Pcs",
          kategori: "Peralatan Tangan",
        },
        {
          id: "fo_p09",
          nama: "Gunting Potong Kabel (Cable Cutter)",
          spesifikasi: "Heavy duty",
          jumlah: 8,
          satuan: "Pcs",
          kategori: "Peralatan Tangan",
        },
        {
          id: "fo_p10",
          nama: "Pemotong Pipa PVC",
          spesifikasi: "42mm",
          jumlah: 4,
          satuan: "Pcs",
          kategori: "Peralatan Tangan",
        },
        {
          id: "fo_p11",
          nama: "Gergaji Besi",
          spesifikasi: "12 inch",
          jumlah: 4,
          satuan: "Pcs",
          kategori: "Peralatan Tangan",
        },
        {
          id: "fo_p12",
          nama: "Kunci Pas Set",
          spesifikasi: "8-24mm",
          jumlah: 4,
          satuan: "Set",
          kategori: "Peralatan Tangan",
        },
        {
          id: "fo_p13",
          nama: "Hot Gun / Heat Gun",
          spesifikasi: "2000W",
          jumlah: 4,
          satuan: "Unit",
          kategori: "Peralatan Pendukung",
        },
        {
          id: "fo_p14",
          nama: "Tangga Lipat Aluminium",
          spesifikasi: "4 meter",
          jumlah: 2,
          satuan: "Unit",
          kategori: "Peralatan Pendukung",
        },
        {
          id: "fo_p15",
          nama: "Kuas Cleaner Splicer",
          spesifikasi: "Anti-static",
          jumlah: 8,
          satuan: "Pcs",
          kategori: "Peralatan Pendukung",
        },
        {
          id: "fo_p16",
          nama: "Sleeve Protector Storage",
          spesifikasi: "Organizer box",
          jumlah: 8,
          satuan: "Pcs",
          kategori: "Peralatan Pendukung",
        },
        {
          id: "fo_p17",
          nama: "Komputer / Laptop",
          spesifikasi: "Min Core i5, 8GB RAM",
          jumlah: 2,
          satuan: "Unit",
          kategori: "Peralatan Pendukung",
        },
        {
          id: "fo_p18",
          nama: "Printer",
          spesifikasi: "Inkjet A4",
          jumlah: 1,
          satuan: "Unit",
          kategori: "Peralatan Pendukung",
        },
      ],
      bahan: [
        {
          id: "fo_b01",
          nama: "Kabel Pigtail SC/UPC",
          spesifikasi: "Singlemode 9/125, 1.5m",
          jumlah: 40,
          satuan: "Pcs",
          kategori: "Kabel & Konektor",
        },
        {
          id: "fo_b02",
          nama: "Kabel Patchcord SC-SC",
          spesifikasi: "Singlemode 9/125, 3m",
          jumlah: 20,
          satuan: "Pcs",
          kategori: "Kabel & Konektor",
        },
        {
          id: "fo_b03",
          nama: "Kabel Drop Fiber Optik",
          spesifikasi: "2 core, per meter",
          jumlah: 500,
          satuan: "Meter",
          kategori: "Kabel & Konektor",
        },
        {
          id: "fo_b04",
          nama: "Kabel Distribusi Fiber Optik",
          spesifikasi: "6 core outdoor",
          jumlah: 200,
          satuan: "Meter",
          kategori: "Kabel & Konektor",
        },
        {
          id: "fo_b05",
          nama: "Protection Sleeve / Splice Protector",
          spesifikasi: "60mm",
          jumlah: 200,
          satuan: "Pcs",
          kategori: "Aksesoris Splicing",
        },
        {
          id: "fo_b06",
          nama: "Tissue Splicing / Lint Free Wipes",
          spesifikasi: "Non-woven",
          jumlah: 10,
          satuan: "Pack",
          kategori: "Aksesoris Splicing",
        },
        {
          id: "fo_b07",
          nama: "Heatshrink Tube",
          spesifikasi: "Berbagai ukuran",
          jumlah: 100,
          satuan: "Pcs",
          kategori: "Aksesoris Splicing",
        },
        {
          id: "fo_b08",
          nama: "Kabel Ties / Cable Tie",
          spesifikasi: "20cm",
          jumlah: 200,
          satuan: "Pcs",
          kategori: "Aksesoris Instalasi",
        },
        {
          id: "fo_b09",
          nama: "Isolasi / Electrical Tape 3M",
          spesifikasi: "Scotch 35",
          jumlah: 20,
          satuan: "Roll",
          kategori: "Aksesoris Instalasi",
        },
        {
          id: "fo_b10",
          nama: "Kertas HVS A4",
          spesifikasi: "80gsm",
          jumlah: 2,
          satuan: "Rim",
          kategori: "ATK",
        },
        {
          id: "fo_b11",
          nama: "Bolpoint / Pulpen",
          spesifikasi: "Hitam & Biru",
          jumlah: 16,
          satuan: "Pcs",
          kategori: "ATK",
        },
        {
          id: "fo_b12",
          nama: "Spidol Permanen",
          spesifikasi: "Hitam",
          jumlah: 8,
          satuan: "Pcs",
          kategori: "ATK",
        },
      ],
    },

    teknisi_selular: {
      id: "teknisi_selular",
      name: "Teknisi Telepon Seluler",
      code: "TS",
      totalJP: 260,
      durasiJP: 45,
      icon: "📱",
      color: "#7c3aed",
      gradient: "linear-gradient(135deg, #7c3aed, #ec4899)",
      proglatUrl:
        "https://proglat.kemnaker.go.id/programs/de2e2789-6e7b-4b1f-84b0-05f248d0c703/versions/2",
      unitKompetensi: [
        {
          kode: "S.951200.021.01",
          nama: "Memperbaiki Kerusakan Telepon Seluler pada Aktifasi Ulang / Restart",
          jp: 20,
        },
        {
          kode: "S.951200.006.01",
          nama: "Mencetak Ulang Kaki IC BGA (Ball Grid Array)",
          jp: 20,
        },
        {
          kode: "S.951200.018.01",
          nama: "Memperbaiki Kerusakan Telepon Seluler pada Kamera",
          jp: 10,
        },
        {
          kode: "S.951200.026.01",
          nama: "Mengoperasikan Fungsi Menu Program Flashing",
          jp: 40,
        },
        {
          kode: "S.951200.019.01",
          nama: "Memperbaiki Kerusakan Telepon Seluler SIM Card Tidak Terbaca",
          jp: 12,
        },
        {
          kode: "S.951200.025.01",
          nama: "Memperbaiki Kerusakan Telepon Seluler Touchscreen Tidak Berfungsi",
          jp: 20,
        },
        {
          kode: "S.951200.013.01",
          nama: "Memperbaiki Kerusakan Telepon Seluler Tidak Ada Signal",
          jp: 20,
        },
        {
          kode: "S.951200.015.01",
          nama: "Memperbaiki Kerusakan Telepon Seluler pada MIC",
          jp: 10,
        },
        {
          kode: "S.951200.024.01",
          nama: "Memperbaiki Kerusakan Telepon Seluler Trackpad Tidak Berfungsi",
          jp: 10,
        },
        {
          kode: "S.951200.009.01",
          nama: "Memperbaiki Telepon Seluler Tidak Ada Tampilan / Blank",
          jp: 20,
        },
        {
          kode: "S.951200.011.01",
          nama: "Memperbaiki Kerusakan Telepon Seluler Tidak Ada Dering / Buzzer",
          jp: 10,
        },
        {
          kode: "S.951200.008.01",
          nama: "Memperbaiki Kerusakan Lampu LED Telepon Seluler",
          jp: 10,
        },
        {
          kode: "S.951200.007.01",
          nama: "Memperbaiki Kerusakan Telepon Seluler Mati Total",
          jp: 30,
        },
      ],
      peralatan: [
        {
          id: "ts_p01",
          nama: "Multitester Digital",
          spesifikasi: "Sanwa CD800a / setara",
          jumlah: 16,
          satuan: "Unit",
          kategori: "Peralatan Ukur",
        },
        {
          id: "ts_p02",
          nama: "Solder Uap (Hot Air Rework Station)",
          spesifikasi: "Quick 861DW / setara",
          jumlah: 16,
          satuan: "Unit",
          kategori: "Peralatan Solder",
        },
        {
          id: "ts_p03",
          nama: "Solder Station",
          spesifikasi: "Hakko FX-888D / setara",
          jumlah: 16,
          satuan: "Unit",
          kategori: "Peralatan Solder",
        },
        {
          id: "ts_p04",
          nama: "Pinset Lurus (Tweezers)",
          spesifikasi: "ESD Anti-static",
          jumlah: 16,
          satuan: "Pcs",
          kategori: "Peralatan Tangan",
        },
        {
          id: "ts_p05",
          nama: "Obeng Set HP (Precision Screwdriver)",
          spesifikasi: "Jakemy / setara",
          jumlah: 16,
          satuan: "Set",
          kategori: "Peralatan Tangan",
        },
        {
          id: "ts_p06",
          nama: "Lampu Service / Magnifier Lamp",
          spesifikasi: "LED dengan kaca pembesar",
          jumlah: 16,
          satuan: "Unit",
          kategori: "Peralatan Pendukung",
        },
        {
          id: "ts_p07",
          nama: "Penjepit PCB (PCB Holder)",
          spesifikasi: "Adjustable",
          jumlah: 16,
          satuan: "Unit",
          kategori: "Peralatan Pendukung",
        },
        {
          id: "ts_p08",
          nama: "Dudukan Solder (Solder Stand)",
          spesifikasi: "Cast iron base",
          jumlah: 16,
          satuan: "Unit",
          kategori: "Peralatan Pendukung",
        },
        {
          id: "ts_p09",
          nama: "Kaca Pembesar (Magnifying Glass)",
          spesifikasi: "10x magnification",
          jumlah: 8,
          satuan: "Pcs",
          kategori: "Peralatan Pendukung",
        },
        {
          id: "ts_p10",
          nama: "Sikat Pembersih PCB",
          spesifikasi: "Anti-static brush",
          jumlah: 16,
          satuan: "Pcs",
          kategori: "Peralatan Pendukung",
        },
        {
          id: "ts_p11",
          nama: "Power Supply DC Adjustable",
          spesifikasi: "0-30V, 0-5A",
          jumlah: 8,
          satuan: "Unit",
          kategori: "Peralatan Ukur",
        },
        {
          id: "ts_p12",
          nama: "UFI Box (Android Tool)",
          spesifikasi: "UFI Box + Adaptor",
          jumlah: 4,
          satuan: "Set",
          kategori: "Peralatan Software",
        },
        {
          id: "ts_p13",
          nama: "Power Supply Predator / Boot Cable",
          spesifikasi: "Universal boot cable",
          jumlah: 8,
          satuan: "Set",
          kategori: "Peralatan Ukur",
        },
        {
          id: "ts_p14",
          nama: "Komputer / Laptop",
          spesifikasi: "Min Core i5, 8GB RAM",
          jumlah: 4,
          satuan: "Unit",
          kategori: "Peralatan Software",
        },
        {
          id: "ts_p15",
          nama: "Botol Alkohol Dispenser",
          spesifikasi: "IPA 99%, 250ml",
          jumlah: 8,
          satuan: "Pcs",
          kategori: "Peralatan Pendukung",
        },
      ],
      bahan: [
        {
          id: "ts_b01",
          nama: "Timah Cair / Solder Paste",
          spesifikasi: "Sn63/Pb37, syringe",
          jumlah: 20,
          satuan: "Tube",
          kategori: "Bahan Solder",
        },
        {
          id: "ts_b02",
          nama: "Mata Solder Station (Tips)",
          spesifikasi: "Berbagai ukuran (T18 series)",
          jumlah: 32,
          satuan: "Pcs",
          kategori: "Bahan Solder",
        },
        {
          id: "ts_b03",
          nama: "Pasta Solder / Flux Paste",
          spesifikasi: "Amtech / setara",
          jumlah: 16,
          satuan: "Jar",
          kategori: "Bahan Solder",
        },
        {
          id: "ts_b04",
          nama: "Solder Wick / Desoldering Braid",
          spesifikasi: "2.5mm width",
          jumlah: 32,
          satuan: "Roll",
          kategori: "Bahan Solder",
        },
        {
          id: "ts_b05",
          nama: "LCD + Touchscreen HP",
          spesifikasi: "Berbagai merk (Samsung/Oppo/Vivo)",
          jumlah: 16,
          satuan: "Pcs",
          kategori: "Spare Part",
        },
        {
          id: "ts_b06",
          nama: "IC EMMC",
          spesifikasi: "Berbagai kapasitas",
          jumlah: 20,
          satuan: "Pcs",
          kategori: "Komponen IC",
        },
        {
          id: "ts_b07",
          nama: "IC Power (PMIC)",
          spesifikasi: "Sesuai mesin HP pelatihan",
          jumlah: 20,
          satuan: "Pcs",
          kategori: "Komponen IC",
        },
        {
          id: "ts_b08",
          nama: "IC RF / IC Signal",
          spesifikasi: "Sesuai mesin HP pelatihan",
          jumlah: 20,
          satuan: "Pcs",
          kategori: "Komponen IC",
        },
        {
          id: "ts_b09",
          nama: "IC Charging (IC Cas)",
          spesifikasi: "Sesuai mesin HP pelatihan",
          jumlah: 20,
          satuan: "Pcs",
          kategori: "Komponen IC",
        },
        {
          id: "ts_b10",
          nama: "Mic HP (Microphone)",
          spesifikasi: "Universal / khusus merk",
          jumlah: 16,
          satuan: "Pcs",
          kategori: "Spare Part",
        },
        {
          id: "ts_b11",
          nama: "LED HP / Lampu Indikator",
          spesifikasi: "SMD LED",
          jumlah: 30,
          satuan: "Pcs",
          kategori: "Spare Part",
        },
        {
          id: "ts_b12",
          nama: "Buzzer HP / Speaker",
          spesifikasi: "Universal",
          jumlah: 16,
          satuan: "Pcs",
          kategori: "Spare Part",
        },
        {
          id: "ts_b13",
          nama: "Konektor Charging (Charging Port)",
          spesifikasi: "Micro USB / Type-C",
          jumlah: 20,
          satuan: "Pcs",
          kategori: "Spare Part",
        },
        {
          id: "ts_b14",
          nama: "Konektor Baterai",
          spesifikasi: "FPC Connector",
          jumlah: 20,
          satuan: "Pcs",
          kategori: "Spare Part",
        },
        {
          id: "ts_b15",
          nama: "Switch On-Off / Power Button",
          spesifikasi: "SMD Switch",
          jumlah: 20,
          satuan: "Pcs",
          kategori: "Spare Part",
        },
        {
          id: "ts_b16",
          nama: "SIM Card Connector",
          spesifikasi: "6 pin / 8 pin",
          jumlah: 20,
          satuan: "Pcs",
          kategori: "Spare Part",
        },
        {
          id: "ts_b17",
          nama: "Kabel Data USB",
          spesifikasi: "Micro USB & Type-C",
          jumlah: 16,
          satuan: "Pcs",
          kategori: "Aksesoris",
        },
        {
          id: "ts_b18",
          nama: "Mesin HP Android (Training Unit)",
          spesifikasi: "Bekas layak / dummy board",
          jumlah: 16,
          satuan: "Unit",
          kategori: "Unit Latihan",
        },
        {
          id: "ts_b19",
          nama: "Kabel Jumper / Kawat Email",
          spesifikasi: "0.02mm",
          jumlah: 16,
          satuan: "Roll",
          kategori: "Aksesoris",
        },
        {
          id: "ts_b20",
          nama: "Plat Cetak BGA (Stencil BGA)",
          spesifikasi: "Universal BGA stencil kit",
          jumlah: 8,
          satuan: "Set",
          kategori: "Alat Bantu",
        },
        {
          id: "ts_b21",
          nama: "Plat Cetak IC EMMC (Stencil EMMC)",
          spesifikasi: "EMMC reballing stencil",
          jumlah: 8,
          satuan: "Set",
          kategori: "Alat Bantu",
        },
        {
          id: "ts_b22",
          nama: "Ragum HP (Phone Clamp)",
          spesifikasi: "Adjustable",
          jumlah: 8,
          satuan: "Pcs",
          kategori: "Alat Bantu",
        },
        {
          id: "ts_b23",
          nama: "PCB Lubang (Perfboard)",
          spesifikasi: "5x7cm",
          jumlah: 30,
          satuan: "Pcs",
          kategori: "Alat Bantu",
        },
        {
          id: "ts_b24",
          nama: "Pinset Lancip",
          spesifikasi: "ESD Safe",
          jumlah: 16,
          satuan: "Pcs",
          kategori: "Peralatan Tangan",
        },
        {
          id: "ts_b25",
          nama: "Pinset Bengkok (Curved Tweezers)",
          spesifikasi: "ESD Safe",
          jumlah: 16,
          satuan: "Pcs",
          kategori: "Peralatan Tangan",
        },
        {
          id: "ts_b26",
          nama: "Pisau IC / IC Pry Tool",
          spesifikasi: "Thin blade",
          jumlah: 16,
          satuan: "Pcs",
          kategori: "Peralatan Tangan",
        },
        {
          id: "ts_b27",
          nama: "Flux Cair / Liquid Flux",
          spesifikasi: "RMA type, bottle",
          jumlah: 16,
          satuan: "Botol",
          kategori: "Bahan Solder",
        },
      ],
    },
  },
};

// Helper functions
function getAllPeralatan(programId) {
  return APP_DATA.programs[programId]?.peralatan || [];
}

function getAllBahan(programId) {
  return APP_DATA.programs[programId]?.bahan || [];
}

function getAllItems(programId) {
  const program = APP_DATA.programs[programId];
  if (!program) return [];
  return [
    ...program.peralatan.map((p) => ({ ...p, tipe: "Peralatan" })),
    ...program.bahan.map((b) => ({ ...b, tipe: "Bahan" })),
  ];
}

function getUnitKompetensi(programId) {
  return APP_DATA.programs[programId]?.unitKompetensi || [];
}

function getProgramInfo(programId) {
  return APP_DATA.programs[programId] || null;
}

function searchItems(programId, query) {
  const items = getAllItems(programId);
  const q = query.toLowerCase();
  return items.filter(
    (item) =>
      item.nama.toLowerCase().includes(q) ||
      item.spesifikasi.toLowerCase().includes(q) ||
      item.kategori.toLowerCase().includes(q)
  );
}

function getItemsByCategory(programId, tipe) {
  const items =
    tipe === "Peralatan"
      ? getAllPeralatan(programId)
      : getAllBahan(programId);
  const categories = {};
  items.forEach((item) => {
    if (!categories[item.kategori]) {
      categories[item.kategori] = [];
    }
    categories[item.kategori].push(item);
  });
  return categories;
}
