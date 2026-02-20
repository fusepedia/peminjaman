// ================================================================
// PRELOADER
// ================================================================
function hidePreloader(){var p=document.getElementById('preloader');if(p){p.classList.add('hidden');setTimeout(function(){p.style.display='none';},600);}}
document.addEventListener('DOMContentLoaded',function(){setTimeout(hidePreloader,1200);initApp();});
window.addEventListener('load',function(){setTimeout(hidePreloader,500);});
setTimeout(hidePreloader,4000);

// ================================================================
// DATA
// ================================================================
var DATA={
unitSelular:[
{code:'S.951200.006.01',name:'Mencetak Ulang Kaki IC BGA',jp:20},
{code:'S.951200.007.01',name:'Memperbaiki Kerusakan Telepon Seluler Mati Total',jp:30},
{code:'S.951200.008.01',name:'Memperbaiki Kerusakan Lampu LED Telepon Seluler',jp:10},
{code:'S.951200.009.01',name:'Memperbaiki Kerusakan Telepon Seluler Tidak Ada Tampilan dan Tidak Bisa Dimatikan dari Tombol On-Off',jp:20},
{code:'S.951200.010.01',name:'Memperbaiki Kerusakan Telepon Seluler Sim Card tidak Terbaca',jp:12},
{code:'S.951200.011.01',name:'Memperbaiki Kerusakan Telepon Seluler Tidak Ada Dering Buzzer',jp:10},
{code:'S.951200.013.01',name:'Memperbaiki Kerusakan Telepon Seluler Tidak Ada Signal',jp:20},
{code:'S.951200.015.01',name:'Memperbaiki Kerusakan Telepon Seluler pada Mic',jp:10},
{code:'S.951200.018.01',name:'Memperbaiki Kerusakan Telepon Seluler pada Kamera',jp:10},
{code:'S.951200.021.01',name:'Membaca Skema Telepon Seluler Aktifasi Ulang/Restart',jp:20},
{code:'S.951200.024.01',name:'Memperbaiki Kerusakan Telepon Seluler Tracpad tidak Fungsi',jp:10},
{code:'S.951200.025.01',name:'Memperbaiki Kerusakan Telepon Seluler Touchscreen tidak Berfungsi',jp:20},
{code:'S.951200.026.01',name:'Mengoperasikan Fungsi Menu Program Flashing',jp:40}
],
unitFiber:[
{code:'J.61IFO00.006.2',name:'Melaksanakan Pekerjaan Secara Tim',jp:10},
{code:'J.61IFO00.004.2',name:'Membuat Laporan Tertulis',jp:30},
{code:'J.61IFO00.007.2',name:'Merencanakan Instalasi Fiber Optik Berdasarkan Peta As Planned Drawing',jp:30},
{code:'J.61IFO00.014.2',name:'Melaksanakan Penyambungan Fiber Optik Dengan Fusion Splicer',jp:50},
{code:'J.61IFO00.015.2',name:'Melaksanakan Penyambungan Fiber Optik Dengan Mechanical Splice',jp:30},
{code:'J.61IFO00.016.2',name:'Mengoperasikan OTDR (Optical Time Domain Reflectometer)',jp:40},
{code:'J.61IFO00.017.2',name:'Melaksanakan Evaluasi Instalasi Fiber Optik Menggunakan OTDR',jp:42}
],
alatSelular:['Multitester','Solder Uap','Solder Station','Pinset','Obeng Handphone','Lampu Service','Penjepit PCB','Dudukan Solder','Kaca Pembesar','Sikat Pembersih','Power Supply','UFI Box','Power Supply Predator','Komputer','Botol Alkohol'],
bahanSelular:['Timah Gulung','Timah Cair','Mata Solder Station','Pasta Solder','Solder Wick','Flux','LCD + Touch Screen','IC EMMC','IC Power','IC RF','IC Charging','Mic','LED','Buzzer','Konektor Charging','Konektor Baterai','Switch On-Off','Simcard Connector','Kabel Data','Mesin HP Android','Kabel Jumper','Plat Cetak IC Universal','Plat Cetak IC EMMC','Ragum HP','PCB Lubang','Pinset Lancip','Pinset Bengkok','Pisau IC','Obeng Khusus HP','Isolasi Kertas','Isolasi Aluminium','Resistor SMD','Kapasitor SMD','Tiner','Botol Tiner','Sikat Gigi','Kertas A4','Kotak P3K','Tisu','Kain Majun','Masker Kain'],
alatFiber:['Kertas','Bolpoint','Komputer','Printer','Alat Peraga Komponen Aktif/Pasif','Tang Potong Sedang','Tang Potong Kecil','Tang Buaya','Tang Kombinasi','Cutter','Gunting Kabel','Fusion Splicer','Hot Gun','Pemotong Piva','Gergaji Besi','ToolBox','Mechanical Splicer','Kunci Pas','Tangga Telescopic 4m','Kuas Cleaner','Sleeve Protector','OTDR'],
bahanFiber:['Kabel Ties 10cm','Kabel Ties 15cm','Label','Tissue Splicing','Sealer Karet','Heatshrink (berbagai ukuran)','Flexible Spiral Kabel','Spidol Permanen','Solasi 3M','Double Tip Clamp','Minyak Tanah','Kabel Optik','Karpet Plastik 2x2m']
};

var currentStep=1,selectedItems=[],customItems=[],isDark=true;

// ================================================================
// INIT
// ================================================================
function initApp(){try{createParticles();initNav();initTraining();initScroll();setDateTime();genUnits('unitSelularList',DATA.unitSelular);genUnits('unitFiberList',DATA.unitFiber);animateStats();}catch(e){console.error(e);}}

// ================================================================
// THEME
// ================================================================
function toggleTheme(){isDark=!isDark;document.body.classList.toggle('light',!isDark);var icon=document.getElementById('themeIcon');if(icon){icon.className=isDark?'fas fa-moon':'fas fa-sun';}showToast(isDark?'Mode gelap aktif':'Mode terang aktif','info');}

// ================================================================
// PARTICLES
// ================================================================
function createParticles(){var c=document.getElementById('particles-container');if(!c)return;var cl=['#6366f1','#06b6d4','#10b981','#a5b4fc','#f59e0b'];for(var i=0;i<35;i++){var p=document.createElement('div');p.className='particle';p.style.left=Math.random()*100+'%';var s=Math.random()*3+1;p.style.width=s+'px';p.style.height=s+'px';p.style.animationDuration=(Math.random()*20+12)+'s';p.style.animationDelay=(Math.random()*10)+'s';p.style.opacity=Math.random()*.2+.05;p.style.background=cl[Math.floor(Math.random()*cl.length)];c.appendChild(p);}}

// ================================================================
// NAV
// ================================================================
function initNav(){var tg=document.getElementById('navToggle'),mn=document.getElementById('navMenu');if(tg&&mn)tg.addEventListener('click',function(){tg.classList.toggle('active');mn.classList.toggle('active');});var lnks=document.querySelectorAll('.nav-link');for(var i=0;i<lnks.length;i++)lnks[i].addEventListener('click',function(e){e.preventDefault();navigateTo(this.getAttribute('data-section'));if(tg)tg.classList.remove('active');if(mn)mn.classList.remove('active');});}
function navigateTo(id){var lnks=document.querySelectorAll('.nav-link');for(var i=0;i<lnks.length;i++)lnks[i].classList.remove('active');var al=document.querySelector('.nav-link[data-section="'+id+'"]');if(al)al.classList.add('active');var secs=document.querySelectorAll('.section');for(var i=0;i<secs.length;i++)secs[i].classList.remove('active');var t=document.getElementById(id);if(t){t.classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}}

// ================================================================
// SCROLL
// ================================================================
function initScroll(){window.addEventListener('scroll',function(){var nb=document.getElementById('navbar'),bt=document.getElementById('backToTop');if(nb){if(window.scrollY>50)nb.classList.add('scrolled');else nb.classList.remove('scrolled');}if(bt){if(window.scrollY>300)bt.classList.add('visible');else bt.classList.remove('visible');}});}

// ================================================================
// DATETIME
// ================================================================
function setDateTime(){var n=new Date(),d=document.getElementById('tanggalPinjam'),t=document.getElementById('waktuPinjam');if(d)d.value=n.toISOString().split('T')[0];if(t)t.value=n.getHours().toString().padStart(2,'0')+':'+n.getMinutes().toString().padStart(2,'0');}

// ================================================================
// STEPS
// ================================================================
function goToStep(tgt){if(tgt>currentStep&&!validateStep(currentStep))return;var sts=document.querySelectorAll('.step-indicator .step'),lns=document.querySelectorAll('.step-indicator .step-line');for(var i=0;i<sts.length;i++){sts[i].classList.remove('active','completed');if(i<tgt-1)sts[i].classList.add('completed');if(i===tgt-1)sts[i].classList.add('active');}for(var i=0;i<lns.length;i++){if(i<tgt-1)lns[i].classList.add('active');else lns[i].classList.remove('active');}var fs=document.querySelectorAll('.form-step');for(var i=0;i<fs.length;i++)fs[i].classList.remove('active');var ts=document.getElementById('step'+tgt);if(ts)ts.classList.add('active');currentStep=tgt;if(tgt===3)loadItems();if(tgt===4)generatePreview();window.scrollTo({top:160,behavior:'smooth'});}
function validateStep(s){if(s===1){if(!document.getElementById('namaPeserta').value.trim()){showToast('Nama peserta harus diisi!','error');return false;}if(!document.getElementById('noPeserta').value.trim()){showToast('No. Peserta harus diisi!','error');return false;}if(!document.getElementById('tanggalPinjam').value){showToast('Tanggal harus diisi!','error');return false;}if(!document.querySelector('input[name="instruktur"]:checked')){showToast('Pilih instruktur!','error');return false;}return true;}if(s===2){var pl=document.querySelector('input[name="jenisPelatihan"]:checked');if(!pl){showToast('Pilih jenis pelatihan!','error');return false;}var lid=pl.value.indexOf('Telepon')!==-1?'unitSelularList':'unitFiberList';if(document.querySelectorAll('#'+lid+' input:checked').length===0){showToast('Pilih minimal 1 unit kompetensi!','error');return false;}return true;}if(s===3){collectItems();if(selectedItems.length===0){showToast('Pilih minimal 1 alat/bahan!','error');return false;}return true;}return true;}

// ================================================================
// TRAINING
// ================================================================
function initTraining(){var rs=document.querySelectorAll('input[name="jenisPelatihan"]');for(var i=0;i<rs.length;i++)rs[i].addEventListener('change',function(){var us=document.getElementById('unitSelular'),uf=document.getElementById('unitFiber');if(this.value.indexOf('Telepon')!==-1){us.className='unit-container show';uf.className='unit-container hidden-section';}else{uf.className='unit-container show';us.className='unit-container hidden-section';}selectedItems=[];customItems=[];var cl=document.getElementById('customItemsList');if(cl)cl.innerHTML='';});}

// ================================================================
// UNITS
// ================================================================
function genUnits(cid,units){var c=document.getElementById(cid);if(!c)return;c.innerHTML='';for(var i=0;i<units.length;i++){var u=units[i],l=document.createElement('label');l.className='unit-item';l.innerHTML='<input type="checkbox" name="unit_'+cid+'" value="'+u.code+'||'+u.name+'||'+u.jp+'"><div class="unit-info"><div class="unit-check"><i class="fas fa-check"></i></div><div class="unit-detail"><div class="unit-code">'+u.code+'</div><div class="unit-name">1.'+(i+1)+'. '+u.name+'</div></div><div class="unit-jp">'+u.jp+' JP</div></div>';c.appendChild(l);}}
function toggleSelectAll(t){var id=t==='selular'?'selectAllSelular':'selectAllFiber',lid=t==='selular'?'unitSelularList':'unitFiberList',v=document.getElementById(id).checked,bs=document.querySelectorAll('#'+lid+' input[type="checkbox"]');for(var i=0;i<bs.length;i++)bs[i].checked=v;}

// ================================================================
// TABS
// ================================================================
function switchTab(t){var bs=document.querySelectorAll('.tab-btn');for(var i=0;i<bs.length;i++)bs[i].classList.remove('active');var ab=document.querySelector('.tab-btn[data-tab="'+t+'"]');if(ab)ab.classList.add('active');var cs=document.querySelectorAll('.tab-content');for(var i=0;i<cs.length;i++)cs[i].classList.remove('active');var at=document.getElementById('tab-'+t);if(at)at.classList.add('active');}

// ================================================================
// ITEMS
// ================================================================
function loadItems(){var pl=document.querySelector('input[name="jenisPelatihan"]:checked');if(!pl)return;var isS=pl.value.indexOf('Telepon')!==-1;buildGrid('alatGrid',isS?DATA.alatSelular:DATA.alatFiber,'alat');buildGrid('bahanGrid',isS?DATA.bahanSelular:DATA.bahanFiber,'bahan');for(var i=0;i<customItems.length;i++){var ci=customItems[i];addToGrid(ci,ci.type==='Peralatan'?'alatGrid':'bahanGrid',ci.type==='Peralatan'?'alat':'bahan');}updateSummary();}
function buildGrid(gid,items,type){var g=document.getElementById(gid);if(!g)return;g.innerHTML='';for(var i=0;i<items.length;i++){var nm=items[i],pr=null;for(var j=0;j<selectedItems.length;j++){if(selectedItems[j].name===nm){pr=selectedItems[j];break;}}var c=document.createElement('label');c.className='item-card';c.setAttribute('data-name',nm.toLowerCase());c.innerHTML='<input type="checkbox" name="items_'+type+'" value="'+type+'||'+nm+'" '+(pr?'checked':'')+' onchange="updateSummary()"><div class="item-content"><div class="item-icon '+type+'"><i class="fas fa-'+(type==='alat'?'wrench':'cube')+'"></i></div><span class="item-name-text">'+nm+'</span><div class="item-qty"><input type="number" min="1" value="'+(pr?pr.qty:1)+'" onclick="event.stopPropagation()" onchange="updateSummary()" class="qty-input" data-item="'+nm+'"></div></div>';g.appendChild(c);}}
function filterItems(t){var q=document.getElementById(t==='alat'?'searchAlat':'searchBahan').value.toLowerCase(),cs=document.querySelectorAll('#'+(t==='alat'?'alatGrid':'bahanGrid')+' .item-card');for(var i=0;i<cs.length;i++)cs[i].style.display=cs[i].getAttribute('data-name').indexOf(q)!==-1?'':'none';}
function toggleSelectAllItems(t){var v=document.getElementById(t==='alat'?'selectAllAlat':'selectAllBahan').checked,bs=document.querySelectorAll('#'+(t==='alat'?'alatGrid':'bahanGrid')+' input[type="checkbox"]');for(var i=0;i<bs.length;i++){var c=bs[i].closest('.item-card');if(c&&c.style.display!=='none')bs[i].checked=v;}updateSummary();}

// ================================================================
// CUSTOM
// ================================================================
function addCustomItem(){var nm=document.getElementById('customItemName').value.trim(),tp=document.getElementById('customItemType').value,qt=parseInt(document.getElementById('customItemQty').value)||1,nt=document.getElementById('customItemNote').value.trim();if(!nm){showToast('Nama harus diisi!','error');return;}for(var i=0;i<customItems.length;i++){if(customItems[i].name.toLowerCase()===nm.toLowerCase()){showToast('Sudah ada!','warning');return;}}var ci={name:nm,type:tp,qty:qt,note:nt};customItems.push(ci);addToGrid(ci,tp==='Peralatan'?'alatGrid':'bahanGrid',tp==='Peralatan'?'alat':'bahan');renderCustomList();document.getElementById('customItemName').value='';document.getElementById('customItemQty').value='1';document.getElementById('customItemNote').value='';showToast('"'+nm+'" ditambahkan!','success');updateSummary();}
function addToGrid(ci,gid,it){var g=document.getElementById(gid);if(!g)return;var c=document.createElement('label');c.className='item-card';c.setAttribute('data-name',ci.name.toLowerCase());c.innerHTML='<input type="checkbox" name="items_'+it+'" value="'+it+'||'+ci.name+'" checked onchange="updateSummary()"><div class="item-content" style="border-color:rgba(245,158,11,.25);"><div class="item-icon custom-icon"><i class="fas fa-star"></i></div><span class="item-name-text">'+ci.name+(ci.note?' ('+ci.note+')':'')+' <em style="font-size:9px;color:var(--amber);">[Custom]</em></span><div class="item-qty"><input type="number" min="1" value="'+ci.qty+'" onclick="event.stopPropagation()" onchange="updateSummary()" class="qty-input" data-item="'+ci.name+'"></div></div>';g.appendChild(c);}
function renderCustomList(){var l=document.getElementById('customItemsList');if(!l)return;l.innerHTML='';for(var i=0;i<customItems.length;i++){var ci=customItems[i],t=document.createElement('div');t.className='custom-item-tag';t.innerHTML='<span><i class="fas fa-star" style="color:var(--amber);margin-right:6px;"></i><strong>'+ci.name+'</strong> — '+ci.type+' — Qty: '+ci.qty+(ci.note?' ('+ci.note+')':'')+'</span><span class="remove-custom" onclick="removeCustom('+i+')"><i class="fas fa-times-circle"></i></span>';l.appendChild(t);}}
function removeCustom(idx){var r=customItems.splice(idx,1)[0];renderCustomList();var cs=document.querySelectorAll('.item-card');for(var i=0;i<cs.length;i++){if(cs[i].getAttribute('data-name')===r.name.toLowerCase())cs[i].remove();}updateSummary();showToast('"'+r.name+'" dihapus','info');}

// ================================================================
// SELECTED
// ================================================================
function collectItems(){selectedItems=[];var ch=document.querySelectorAll('input[name^="items_"]:checked');for(var i=0;i<ch.length;i++){var p=ch[i].value.split('||'),c=ch[i].closest('.item-card'),q=c?c.querySelector('.qty-input'):null;selectedItems.push({type:p[0],name:p[1],qty:q?(parseInt(q.value)||1):1});}}
function updateSummary(){collectItems();var l=document.getElementById('selectedList'),c=document.getElementById('selectedCount');if(!l||!c)return;c.textContent=selectedItems.length;if(selectedItems.length===0){l.innerHTML='<p class="empty-msg">Belum ada item dipilih</p>';return;}l.innerHTML='';for(var i=0;i<selectedItems.length;i++){var t=document.createElement('span');t.className='selected-tag';t.innerHTML='<i class="fas fa-'+(selectedItems[i].type==='alat'?'wrench':'cube')+'"></i> '+selectedItems[i].name+' ('+selectedItems[i].qty+')';l.appendChild(t);}}

// ================================================================
// KOP SURAT (tanpa logo)
// ================================================================
function KOP(){
return '<div style="text-align:center;border-bottom:3px double #000;padding-bottom:10px;margin-bottom:15px;">'+
'<p style="font-size:12pt;font-weight:bold;margin:0;line-height:1.3;">KEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA</p>'+
'<p style="font-size:10.5pt;font-weight:bold;margin:0;line-height:1.3;">DIREKTORAT JENDERAL</p>'+
'<p style="font-size:10.5pt;font-weight:bold;margin:0;line-height:1.3;">PEMBINAAN PELATIHAN VOKASI DAN PRODUKTIVITAS</p>'+
'<p style="font-size:11.5pt;font-weight:bold;margin:3px 0 0;line-height:1.3;">BALAI PELATIHAN VOKASI DAN PRODUKTIVITAS SORONG</p>'+
'<p style="font-size:8pt;margin:3px 0 0;line-height:1.2;">Jl. Basuki Rahmat KM. 9,5 Telp/Fax (0951) 324776 Sorong Papua Barat Daya</p>'+
'<p style="font-size:8pt;margin:1px 0 0;line-height:1.2;">Website: https://bpvpsorong.kemnaker.go.id</p>'+
'</div>';}

// ================================================================
// TTD BLOCK
// ================================================================
function TTD(nmKiri,nmKanan,lblKiri,lblKanan){
return '<div style="text-align:center;margin-top:40px;"><p style="font-size:11pt;font-weight:bold;margin:0 0 5px;">Mengetahui,</p></div>'+
'<table style="width:100%;border-collapse:collapse;">'+
'<tr>'+
'<td style="width:50%;text-align:center;vertical-align:top;border:none;padding:5px 15px 0;">'+
'<p style="font-size:10.5pt;margin:0 0 3px;">'+lblKiri+'</p>'+
'<div style="height:80px;width:180px;margin:0 auto;border-bottom:1px solid #000;"></div>'+
'<p style="font-weight:bold;font-size:10.5pt;margin:6px 0 0;text-decoration:underline;">'+nmKiri+'</p>'+
'<p style="font-size:7pt;color:#888;font-style:italic;margin:2px 0 0;">TTD Basah</p>'+
'</td>'+
'<td style="width:50%;text-align:center;vertical-align:top;border:none;padding:5px 15px 0;">'+
'<p style="font-size:10.5pt;margin:0 0 3px;">'+lblKanan+'</p>'+
'<div style="height:80px;width:180px;margin:0 auto;border-bottom:1px solid #000;"></div>'+
'<p style="font-weight:bold;font-size:10.5pt;margin:6px 0 0;text-decoration:underline;">'+nmKanan+'</p>'+
'<p style="font-size:7pt;color:#888;font-style:italic;margin:2px 0 0;">TTD Basah</p>'+
'</td></tr></table>';}

function INFO(nm,np,tg,wk,pl,ins){
return '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;">'+
'<tr><td style="padding:2px 6px;width:160px;font-weight:bold;font-size:10.5pt;border:none;">Nama Peserta</td><td style="padding:2px 6px;font-size:10.5pt;border:none;">: '+nm+'</td></tr>'+
'<tr><td style="padding:2px 6px;font-weight:bold;font-size:10.5pt;border:none;">No. Peserta / NIK</td><td style="padding:2px 6px;font-size:10.5pt;border:none;">: '+np+'</td></tr>'+
'<tr><td style="padding:2px 6px;font-weight:bold;font-size:10.5pt;border:none;">Tanggal</td><td style="padding:2px 6px;font-size:10.5pt;border:none;">: '+formatDate(tg)+'</td></tr>'+
'<tr><td style="padding:2px 6px;font-weight:bold;font-size:10.5pt;border:none;">Waktu</td><td style="padding:2px 6px;font-size:10.5pt;border:none;">: '+(wk||'-')+'</td></tr>'+
'<tr><td style="padding:2px 6px;font-weight:bold;font-size:10.5pt;border:none;">Jenis Pelatihan</td><td style="padding:2px 6px;font-size:10.5pt;border:none;">: '+pl+'</td></tr>'+
'<tr><td style="padding:2px 6px;font-weight:bold;font-size:10.5pt;border:none;">Instruktur</td><td style="padding:2px 6px;font-size:10.5pt;border:none;">: '+ins+'</td></tr></table>';}

function TH(t,w){return '<th style="border:1px solid #000;padding:4px 5px;background:#e8e8e8;text-align:center;font-size:9pt;font-weight:bold;'+(w?'width:'+w+';':'')+'">'+ t+'</th>';}
function TD(t,a,b){return '<td style="border:1px solid #000;padding:3px 5px;font-size:9pt;'+(a?'text-align:'+a+';':'')+(b?'font-weight:bold;':'')+'">'+ t+'</td>';}

// ================================================================
// PREVIEW
// ================================================================
function generatePreview(){
collectItems();
var nm=document.getElementById('namaPeserta').value,np=document.getElementById('noPeserta').value,tg=document.getElementById('tanggalPinjam').value,wk=document.getElementById('waktuPinjam').value,ins=document.querySelector('input[name="instruktur"]:checked').value,pl=document.querySelector('input[name="jenisPelatihan"]:checked').value,cat=document.getElementById('catatanTambahan').value;
var isS=pl.indexOf('Telepon')!==-1,lid=isS?'unitSelularList':'unitFiberList';
var units=[],ub=document.querySelectorAll('#'+lid+' input:checked');
for(var i=0;i<ub.length;i++){var p=ub[i].value.split('||');units.push({code:p[0],name:p[1],jp:p[2]});}
var tJP=0;for(var i=0;i<units.length;i++)tJP+=parseInt(units[i].jp)||0;
var aI=[],bI=[];for(var i=0;i<selectedItems.length;i++){if(selectedItems[i].type==='alat')aI.push(selectedItems[i]);else bI.push(selectedItems[i]);}

// PAGE 1
var p1=KOP();
p1+='<p style="text-align:center;margin:14px 0;font-size:12pt;font-weight:bold;text-decoration:underline;">FORMULIR PEMINJAMAN PERALATAN DAN PENGGUNAAN BAHAN PELATIHAN</p>';
p1+=INFO(nm,np,tg,wk,pl,ins);
p1+='<p style="font-weight:bold;margin:10px 0 4px;font-size:10pt;">I. UNIT KOMPETENSI YANG DIPELAJARI</p>';
p1+='<table style="width:100%;border-collapse:collapse;margin-bottom:10px;"><thead><tr>'+TH('No','25px')+TH('Kode Unit','110px')+TH('Unit Kompetensi','')+TH('JP','32px')+'</tr></thead><tbody>';
for(var i=0;i<units.length;i++)p1+='<tr>'+TD(i+1,'center')+TD(units[i].code)+TD(units[i].name)+TD(units[i].jp,'center')+'</tr>';
p1+='<tr><td colspan="3" style="border:1px solid #000;padding:3px 5px;text-align:right;font-weight:bold;font-size:9pt;">Total</td>'+TD(tJP,'center',true)+'</tr></tbody></table>';

var sec=2;
if(aI.length>0){p1+='<p style="font-weight:bold;margin:8px 0 4px;font-size:10pt;">II. PERALATAN YANG DIPINJAM</p>';p1+='<table style="width:100%;border-collapse:collapse;margin-bottom:10px;"><thead><tr>'+TH('No','25px')+TH('Nama Peralatan','')+TH('Jml','30px')+TH('Kondisi Pinjam','75px')+TH('Kondisi Kembali','75px')+'</tr></thead><tbody>';for(var i=0;i<aI.length;i++)p1+='<tr>'+TD(i+1,'center')+TD(aI[i].name)+TD(aI[i].qty,'center')+TD('Baik','center')+TD('')+'</tr>';p1+='</tbody></table>';sec=3;}
if(bI.length>0){p1+='<p style="font-weight:bold;margin:8px 0 4px;font-size:10pt;">'+(sec===3?'III':'II')+'. BAHAN YANG DIGUNAKAN</p>';p1+='<table style="width:100%;border-collapse:collapse;margin-bottom:10px;"><thead><tr>'+TH('No','25px')+TH('Nama Bahan','')+TH('Jml','30px')+TH('Keterangan','120px')+'</tr></thead><tbody>';for(var i=0;i<bI.length;i++)p1+='<tr>'+TD(i+1,'center')+TD(bI[i].name)+TD(bI[i].qty,'center')+TD('')+'</tr>';p1+='</tbody></table>';}
if(cat)p1+='<p style="font-size:9pt;margin:6px 0;"><strong>Catatan:</strong> '+cat+'</p>';
p1+=TTD(nm,ins,'Peminjam / Peserta','Instruktur Pelatihan');
p1+='<div style="margin-top:20px;text-align:center;font-size:7pt;color:#bbb;border-top:1px solid #eee;padding-top:5px;">Halaman 1 — Formulir Peminjaman</div>';

// PAGE 2
var p2=KOP();
p2+='<p style="text-align:center;margin:14px 0;font-size:12pt;font-weight:bold;text-decoration:underline;">FORMULIR PENGEMBALIAN PERALATAN DAN BAHAN PELATIHAN</p>';
p2+=INFO(nm,np,tg,wk,pl,ins);
p2+='<table style="width:100%;border-collapse:collapse;margin-bottom:12px;"><tr><td style="padding:2px 6px;width:160px;font-weight:bold;font-size:10.5pt;border:none;">Tanggal Pengembalian</td><td style="padding:2px 6px;font-size:10.5pt;border:none;">: ........................................</td></tr><tr><td style="padding:2px 6px;font-weight:bold;font-size:10.5pt;border:none;">Waktu Pengembalian</td><td style="padding:2px 6px;font-size:10.5pt;border:none;">: ........................................</td></tr></table>';

if(aI.length>0){p2+='<p style="font-weight:bold;margin:8px 0 4px;font-size:10pt;">I. PENGEMBALIAN PERALATAN</p>';p2+='<table style="width:100%;border-collapse:collapse;margin-bottom:10px;"><thead><tr>'+TH('No','25px')+TH('Nama Peralatan','')+TH('Jml Pinjam','45px')+TH('Jml Kembali','45px')+TH('Kondisi','70px')+TH('Ket.','80px')+'</tr></thead><tbody>';for(var i=0;i<aI.length;i++)p2+='<tr>'+TD(i+1,'center')+TD(aI[i].name)+TD(aI[i].qty,'center')+TD('','center')+TD('')+TD('')+'</tr>';p2+='</tbody></table>';}
if(bI.length>0){var rr=aI.length>0?'II':'I';p2+='<p style="font-weight:bold;margin:8px 0 4px;font-size:10pt;">'+rr+'. PENGEMBALIAN / SISA BAHAN</p>';p2+='<table style="width:100%;border-collapse:collapse;margin-bottom:10px;"><thead><tr>'+TH('No','25px')+TH('Nama Bahan','')+TH('Jml Pakai','42px')+TH('Jml Sisa','42px')+TH('Jml Kembali','45px')+TH('Ket.','80px')+'</tr></thead><tbody>';for(var i=0;i<bI.length;i++)p2+='<tr>'+TD(i+1,'center')+TD(bI[i].name)+TD(bI[i].qty,'center')+TD('','center')+TD('','center')+TD('')+'</tr>';p2+='</tbody></table>';}

p2+='<p style="font-weight:bold;margin:8px 0 4px;font-size:10pt;">Catatan Pengembalian:</p>';
p2+='<table style="width:100%;border-collapse:collapse;margin-bottom:6px;"><tr>'+TD('1','center')+'<td style="border:1px solid #000;padding:3px 5px;font-size:9pt;">Semua peralatan dikembalikan dalam kondisi baik</td>'+TD('Ya / Tidak *)','center')+'</tr><tr>'+TD('2','center')+'<td style="border:1px solid #000;padding:3px 5px;font-size:9pt;">Ada peralatan rusak / hilang</td>'+TD('Ya / Tidak *)','center')+'</tr><tr>'+TD('3','center')+'<td style="border:1px solid #000;padding:3px 5px;font-size:9pt;">Sisa bahan telah dikembalikan</td>'+TD('Ya / Tidak *)','center')+'</tr></table>';
p2+='<p style="font-size:7pt;color:#666;font-style:italic;">*) Coret yang tidak perlu</p>';
p2+='<p style="font-size:9pt;margin:6px 0;">Keterangan: .............................................................................................................................................................................................................................................................</p>';
p2+=TTD(nm,ins,'Yang Mengembalikan','Yang Menerima / Instruktur');
p2+='<div style="margin-top:20px;text-align:center;font-size:7pt;color:#bbb;border-top:1px solid #eee;padding-top:5px;">Halaman 2 — Formulir Pengembalian</div>';

var full='<div class="page1">'+p1+'</div><div style="page-break-before:always;"></div><div class="page2">'+p2+'</div>';
var pv=document.getElementById('previewDocument');if(pv)pv.innerHTML=full;}

// ================================================================
// CETAK
// ================================================================
function cetakDokumen(){var pv=document.getElementById('previewDocument');if(!pv)return;var c=pv.innerHTML;var pw=window.open('','_blank');if(!pw){showToast('Pop-up diblokir!','error');return;}pw.document.open();pw.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Formulir BPVP Sorong</title><style>@page{margin:12mm 15mm;size:A4;}*{margin:0;padding:0;box-sizing:border-box;}body{font-family:"Times New Roman",serif;font-size:12pt;line-height:1.4;color:#000;background:#fff;padding:5px;}h2,h3,p,td,th,span,strong,em{color:#000!important;}table{border-collapse:collapse;page-break-inside:auto;}tr{page-break-inside:avoid;}.page2{page-break-before:always;}</style></head><body>'+c+'<script>window.onload=function(){setTimeout(function(){window.print();},500);};<\/script></body></html>');pw.document.close();}

// ================================================================
// RESET
// ================================================================
function resetFormFull(){if(!confirm('Buat peminjaman baru?'))return;var f=document.getElementById('formPeminjaman');if(f)f.reset();currentStep=1;selectedItems=[];customItems=[];var fs=document.querySelectorAll('.form-step');for(var i=0;i<fs.length;i++)fs[i].classList.remove('active');document.getElementById('step1').classList.add('active');var st=document.querySelectorAll('.step-indicator .step');for(var i=0;i<st.length;i++){st[i].classList.remove('active','completed');if(i===0)st[i].classList.add('active');}var ln=document.querySelectorAll('.step-line');for(var i=0;i<ln.length;i++)ln[i].classList.remove('active');document.getElementById('unitSelular').className='unit-container hidden-section';document.getElementById('unitFiber').className='unit-container hidden-section';var cl=document.getElementById('customItemsList');if(cl)cl.innerHTML='';var ag=document.getElementById('alatGrid');if(ag)ag.innerHTML='';var bg=document.getElementById('bahanGrid');if(bg)bg.innerHTML='';setDateTime();window.scrollTo({top:160,behavior:'smooth'});showToast('Form direset!','success');}

// ================================================================
// TOAST
// ================================================================
function showToast(m,t){var c=document.getElementById('toastContainer');if(!c)return;var d=document.createElement('div');d.className='toast '+(t||'info');var ic={success:'fa-check-circle',error:'fa-exclamation-circle',warning:'fa-exclamation-triangle',info:'fa-info-circle'};d.innerHTML='<i class="fas '+(ic[t]||ic.info)+'"></i> '+m;c.appendChild(d);setTimeout(function(){d.classList.add('removing');setTimeout(function(){if(d.parentNode)d.parentNode.removeChild(d);},300);},3500);}

// ================================================================
// UTILITY
// ================================================================
function formatDate(s){if(!s)return'-';var m=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];var d=new Date(s);return d.getDate()+' '+m[d.getMonth()]+' '+d.getFullYear();}
function animateStats(){setTimeout(function(){animN('totalAlat',DATA.alatSelular.length+DATA.alatFiber.length);animN('totalBahan',DATA.bahanSelular.length+DATA.bahanFiber.length);},2000);}
function animN(id,tg){var e=document.getElementById(id);if(!e)return;var c=0,s=Math.ceil(tg/25);var t=setInterval(function(){c+=s;if(c>=tg){c=tg;clearInterval(t);}e.textContent=c;},40);}