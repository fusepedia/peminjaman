/* ============================================================
   VARIABLES & RESET
   ============================================================ */
:root {
    --primary: #4f46e5;
    --primary-light: #818cf8;
    --primary-dark: #3730a3;
    --secondary: #0ea5e9;
    --secondary-light: #38bdf8;
    --success: #10b981;
    --success-light: #34d399;
    --warning: #f59e0b;
    --danger: #ef4444;
    --rose: #f43f5e;
    --dark: #0f172a;
    --dark-2: #1e293b;
    --dark-3: #334155;
    --gray: #64748b;
    --gray-light: #94a3b8;
    --gray-lighter: #cbd5e1;
    --light: #e2e8f0;
    --light-2: #f1f5f9;
    --white: #ffffff;
    --gradient-1: linear-gradient(135deg, #4f46e5, #0ea5e9);
    --gradient-2: linear-gradient(135deg, #6366f1, #8b5cf6);
    --gradient-3: linear-gradient(135deg, #0ea5e9, #06b6d4);
    --gradient-green: linear-gradient(135deg, #10b981, #059669);
    --gradient-amber: linear-gradient(135deg, #f59e0b, #d97706);
    --gradient-rose: linear-gradient(135deg, #f43f5e, #e11d48);
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
    --shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    --shadow-md: 0 10px 15px -3px rgba(0,0,0,0.1);
    --shadow-lg: 0 20px 25px -5px rgba(0,0,0,0.1);
    --shadow-glow: 0 0 30px rgba(79,70,229,0.3);
    --radius-sm: 8px;
    --radius: 12px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --transition: all 0.3s ease;
}

*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:var(--dark);color:var(--light);overflow-x:hidden;min-height:100vh;}

/* ============================================================
   PRELOADER
   ============================================================ */
#preloader{position:fixed;inset:0;background:var(--dark);display:flex;align-items:center;justify-content:center;z-index:99999;transition:opacity .5s,visibility .5s;}
#preloader.hidden{opacity:0;visibility:hidden;pointer-events:none;}
.loader-container{text-align:center;position:relative;}
.loader-ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:50%;border:3px solid transparent;animation:spin 1.5s linear infinite;}
.loader-ring:nth-child(1){width:100px;height:100px;border-top-color:var(--primary);}
.loader-ring:nth-child(2){width:80px;height:80px;border-right-color:var(--secondary);animation-duration:1.2s;animation-direction:reverse;}
.loader-ring:nth-child(3){width:60px;height:60px;border-bottom-color:var(--success);animation-duration:.9s;}
.loader-icon{position:relative;font-size:24px;color:var(--primary-light);animation:pulse 1s ease infinite;margin-bottom:70px;}
.loader-text{margin-top:20px;color:var(--gray-light);font-size:14px;letter-spacing:2px;text-transform:uppercase;}
@keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg);}}
@keyframes pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.2);opacity:.7;}}

/* ============================================================
   PARTICLES
   ============================================================ */
#particles-container{position:fixed;inset:0;z-index:0;pointer-events:none;}
.particle{position:absolute;width:4px;height:4px;background:var(--primary-light);border-radius:50%;opacity:.3;animation:particleFloat linear infinite;}
@keyframes particleFloat{0%{transform:translateY(100vh) rotate(0);opacity:0;}10%{opacity:.3;}90%{opacity:.3;}100%{transform:translateY(-100px) rotate(720deg);opacity:0;}}

/* ============================================================
   NAVBAR
   ============================================================ */
.navbar{position:fixed;top:0;left:0;width:100%;padding:15px 0;z-index:1000;transition:var(--transition);background:rgba(15,23,42,.8);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.05);}
.navbar.scrolled{padding:10px 0;background:rgba(15,23,42,.95);box-shadow:var(--shadow-lg);}
.nav-container{max-width:1300px;margin:0 auto;padding:0 30px;display:flex;align-items:center;justify-content:space-between;}
.nav-brand{display:flex;align-items:center;gap:12px;cursor:pointer;}
.brand-icon{width:45px;height:45px;background:var(--gradient-1);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--white);box-shadow:var(--shadow-glow);}
.brand-text{display:flex;flex-direction:column;}
.brand-title{font-family:'Poppins',sans-serif;font-weight:800;font-size:18px;color:var(--white);letter-spacing:1px;}
.brand-subtitle{font-size:11px;color:var(--gray-light);letter-spacing:.5px;}
.nav-menu{display:flex;gap:5px;}
.nav-link{display:flex;align-items:center;gap:8px;padding:10px 18px;color:var(--gray-light);text-decoration:none;border-radius:var(--radius-sm);font-size:14px;font-weight:500;transition:var(--transition);}
.nav-link:hover{color:var(--white);background:rgba(255,255,255,.05);}
.nav-link.active{color:var(--white);background:var(--gradient-1);box-shadow:var(--shadow-glow);}
.nav-link i{font-size:16px;}
.nav-toggle{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:5px;}
.nav-toggle span{width:25px;height:2px;background:var(--white);transition:var(--transition);border-radius:2px;}
.nav-toggle.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px);}
.nav-toggle.active span:nth-child(2){opacity:0;}
.nav-toggle.active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px);}

/* ============================================================
   SECTIONS
   ============================================================ */
.section{display:none;min-height:100vh;padding-top:80px;position:relative;z-index:1;}
.section.active{display:block;animation:sectionIn .5s ease;}
@keyframes sectionIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
.section-container{max-width:1100px;margin:0 auto;padding:40px 30px 60px;}
.section-header{text-align:center;margin-bottom:40px;}
.section-title{font-family:'Poppins',sans-serif;font-size:30px;font-weight:700;color:var(--white);margin-bottom:10px;}
.section-title i{color:var(--primary-light);margin-right:10px;}
.section-desc{color:var(--gray-light);font-size:16px;max-width:700px;margin:0 auto;}

/* ============================================================
   HERO
   ============================================================ */
.hero-container{max-width:1300px;margin:0 auto;padding:40px 30px 60px;display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center;min-height:calc(100vh - 80px);}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 20px;background:rgba(79,70,229,.15);border:1px solid rgba(79,70,229,.3);border-radius:50px;color:var(--primary-light);font-size:13px;font-weight:600;margin-bottom:25px;}
.hero-title{font-family:'Poppins',sans-serif;font-size:46px;font-weight:800;color:var(--white);line-height:1.2;margin-bottom:20px;}
.gradient-text{background:var(--gradient-1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.hero-description{font-size:17px;color:var(--gray-light);line-height:1.7;margin-bottom:35px;max-width:550px;}
.hero-buttons{display:flex;gap:15px;flex-wrap:wrap;margin-bottom:50px;}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;border:none;border-radius:var(--radius-sm);font-size:15px;font-weight:600;cursor:pointer;transition:var(--transition);font-family:'Inter',sans-serif;text-decoration:none;white-space:nowrap;}
.btn-primary{background:var(--gradient-1);color:var(--white);box-shadow:0 4px 15px rgba(79,70,229,.4);}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(79,70,229,.5);}
.btn-secondary{background:rgba(255,255,255,.05);color:var(--white);border:1px solid rgba(255,255,255,.15);}
.btn-secondary:hover{background:rgba(255,255,255,.1);transform:translateY(-2px);}
.btn-success{background:var(--gradient-green);color:var(--white);box-shadow:0 4px 15px rgba(16,185,129,.4);}
.btn-success:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(16,185,129,.5);}
.btn-danger{background:linear-gradient(135deg,#ef4444,#dc2626);color:var(--white);}
.btn-danger:hover{transform:translateY(-2px);}
.btn-outline{background:transparent;color:var(--gray-light);border:1px solid var(--dark-3);}
.btn-outline:hover{border-color:var(--primary);color:var(--primary-light);background:rgba(79,70,229,.1);}
.btn-sm{padding:8px 16px;font-size:13px;}
.btn-lg{padding:15px 36px;font-size:16px;}
.btn-glow{animation:btnGlow 2s ease infinite;}
@keyframes btnGlow{0%,100%{box-shadow:0 4px 15px rgba(79,70,229,.4);}50%{box-shadow:0 4px 30px rgba(79,70,229,.7);}}

/* HERO STATS */
.hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;}
.stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:var(--radius);padding:20px 15px;display:flex;align-items:center;gap:12px;transition:var(--transition);}
.stat-card:hover{background:rgba(255,255,255,.06);border-color:rgba(79,70,229,.3);transform:translateY(-3px);}
.stat-icon{width:45px;height:45px;background:var(--gradient-1);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--white);flex-shrink:0;}
.stat-icon.bg-cyan{background:var(--gradient-3);}
.stat-icon.bg-green{background:var(--gradient-green);}
.stat-icon.bg-amber{background:var(--gradient-amber);}
.stat-number{font-family:'Poppins',sans-serif;font-size:24px;font-weight:700;color:var(--white);display:block;}
.stat-label{font-size:12px;color:var(--gray-light);}

/* HERO VISUAL */
.hero-visual{display:flex;justify-content:center;align-items:center;}
.hero-illustration{width:380px;height:380px;position:relative;}
.circuit-board{width:100%;height:100%;position:relative;}
.chip{position:absolute;background:var(--dark-2);border:2px solid var(--primary);border-radius:var(--radius-sm);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;color:var(--primary-light);font-size:12px;font-weight:600;box-shadow:0 0 20px rgba(79,70,229,.3);transition:var(--transition);}
.chip:hover{box-shadow:0 0 30px rgba(79,70,229,.5);transform:scale(1.1);}
.main-chip{width:110px;height:110px;top:50%;left:50%;transform:translate(-50%,-50%);font-size:26px;border-radius:var(--radius);z-index:2;}
.main-chip span{font-size:13px;}
.chip-1{width:65px;height:65px;top:15px;left:25px;font-size:22px;border-color:var(--secondary);color:var(--secondary-light);animation:chipPulse 3s ease infinite;}
.chip-2{width:65px;height:65px;top:15px;right:25px;font-size:22px;border-color:var(--success);color:var(--success-light);animation:chipPulse 3s ease infinite .5s;}
.chip-3{width:65px;height:65px;bottom:15px;left:25px;font-size:22px;border-color:var(--warning);color:var(--warning);animation:chipPulse 3s ease infinite 1s;}
.chip-4{width:65px;height:65px;bottom:15px;right:25px;font-size:22px;border-color:var(--rose);color:var(--rose);animation:chipPulse 3s ease infinite 1.5s;}
@keyframes chipPulse{0%,100%{box-shadow:0 0 15px rgba(79,70,229,.2);}50%{box-shadow:0 0 30px rgba(79,70,229,.5);}}
.circuit-line{position:absolute;background:var(--primary);opacity:.25;}
.line-1{width:2px;height:70px;top:80px;left:55px;}
.line-2{width:2px;height:70px;top:80px;right:55px;}
.line-3{width:2px;height:70px;bottom:80px;left:55px;}
.line-4{width:2px;height:70px;bottom:80px;right:55px;}
.circuit-dot{position:absolute;width:8px;height:8px;background:var(--primary);border-radius:50%;opacity:.6;animation:dotPulse 2s ease infinite;}
.dot-1{top:78px;left:51px;animation-delay:0s;}
.dot-2{top:78px;right:51px;animation-delay:.5s;}
.dot-3{bottom:78px;left:51px;animation-delay:1s;}
.dot-4{bottom:78px;right:51px;animation-delay:1.5s;}
@keyframes dotPulse{0%,100%{opacity:.4;transform:scale(1);}50%{opacity:1;transform:scale(1.5);}}

/* ANIMATIONS */
.animate-fade-in{animation:fadeIn .8s ease both;}
.animate-slide-up{animation:slideUp .8s ease both;}
.animate-float{animation:float 6s ease-in-out infinite;}
.delay-1{animation-delay:.2s;}
.delay-2{animation-delay:.4s;}
.delay-3{animation-delay:.6s;}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes slideUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-15px);}}

/* ============================================================
   STEP INDICATOR
   ============================================================ */
.step-indicator{display:flex;align-items:center;justify-content:center;margin-bottom:40px;flex-wrap:wrap;}
.step{display:flex;flex-direction:column;align-items:center;gap:8px;}
.step-circle{width:42px;height:42px;border-radius:50%;background:var(--dark-3);color:var(--gray);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;transition:var(--transition);border:2px solid var(--dark-3);}
.step.active .step-circle{background:var(--gradient-1);color:var(--white);border-color:var(--primary);box-shadow:0 0 20px rgba(79,70,229,.4);}
.step.completed .step-circle{background:var(--success);color:var(--white);border-color:var(--success);}
.step-label{font-size:12px;color:var(--gray);font-weight:500;transition:var(--transition);}
.step.active .step-label{color:var(--primary-light);}
.step.completed .step-label{color:var(--success-light);}
.step-line{width:60px;height:2px;background:var(--dark-3);margin:0 12px;margin-bottom:25px;transition:var(--transition);}
.step-line.active{background:var(--success);}

/* ============================================================
   FORM STYLES
   ============================================================ */
.form-container{max-width:900px;margin:0 auto;}
.form-step{display:none;}
.form-step.active{display:block;animation:fadeIn .5s ease;}
.form-card{background:rgba(30,41,59,.8);border:1px solid rgba(255,255,255,.08);border-radius:var(--radius-lg);overflow:hidden;backdrop-filter:blur(10px);}
.card-header{padding:25px 30px;background:rgba(255,255,255,.02);border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:12px;}
.card-header i{font-size:24px;color:var(--primary-light);}
.card-header h3{font-family:'Poppins',sans-serif;font-size:20px;font-weight:600;color:var(--white);}
.card-body{padding:30px;}
.card-footer{padding:20px 30px;background:rgba(255,255,255,.02);border-top:1px solid rgba(255,255,255,.05);display:flex;gap:10px;}
.card-footer.right{justify-content:flex-end;}
.card-footer.between{justify-content:space-between;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
.form-group{margin-bottom:20px;}
.form-group label{display:block;margin-bottom:8px;font-size:14px;font-weight:600;color:var(--gray-lighter);}
.form-group label i{color:var(--primary-light);margin-right:6px;width:16px;}
.required{color:var(--danger);}
.form-group input[type="text"],.form-group input[type="date"],.form-group input[type="time"],.form-group input[type="number"],.form-group select,.form-group textarea{width:100%;padding:12px 16px;background:rgba(15,23,42,.6);border:1px solid rgba(255,255,255,.1);border-radius:var(--radius-sm);color:var(--white);font-size:14px;font-family:'Inter',sans-serif;transition:var(--transition);outline:none;}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(79,70,229,.2);}
.form-group input::placeholder,.form-group textarea::placeholder{color:var(--gray);}
.form-group select option{background:var(--dark-2);color:var(--white);}

/* INSTRUCTOR CARDS */
.instructor-cards{display:grid;grid-template-columns:1fr 1fr;gap:15px;}
.instructor-card{cursor:pointer;}
.instructor-card input[type="radio"]{display:none;}
.instructor-info{padding:20px;background:rgba(15,23,42,.6);border:2px solid rgba(255,255,255,.08);border-radius:var(--radius);display:flex;align-items:center;gap:15px;transition:var(--transition);position:relative;}
.instructor-card input:checked+.instructor-info{border-color:var(--primary);background:rgba(79,70,229,.1);box-shadow:0 0 20px rgba(79,70,229,.2);}
.instructor-card:hover .instructor-info{border-color:rgba(79,70,229,.3);}
.instructor-avatar{width:50px;height:50px;background:var(--gradient-1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--white);flex-shrink:0;}
.instructor-detail{display:flex;flex-direction:column;gap:4px;}
.instructor-detail strong{font-size:14px;color:var(--white);}
.instructor-detail span{font-size:12px;color:var(--gray-light);}
.check-mark{position:absolute;top:10px;right:10px;color:var(--primary);font-size:20px;opacity:0;transition:var(--transition);}
.instructor-card input:checked+.instructor-info .check-mark{opacity:1;}

/* TRAINING CARDS */
.training-cards{display:grid;grid-template-columns:1fr 1fr;gap:15px;}
.training-card{cursor:pointer;}
.training-card input[type="radio"]{display:none;}
.training-info{padding:25px;background:rgba(15,23,42,.6);border:2px solid rgba(255,255,255,.08);border-radius:var(--radius);display:flex;align-items:center;gap:18px;transition:var(--transition);}
.training-card input:checked+.training-info{border-color:var(--primary);background:rgba(79,70,229,.1);box-shadow:0 0 20px rgba(79,70,229,.2);}
.training-card:hover .training-info{border-color:rgba(79,70,229,.3);}
.training-icon{width:60px;height:60px;background:var(--gradient-1);border-radius:var(--radius);display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--white);flex-shrink:0;}
.training-icon.fiber{background:var(--gradient-3);}
.training-detail{display:flex;flex-direction:column;gap:6px;}
.training-detail strong{font-size:15px;color:var(--white);}
.training-detail span{font-size:12px;color:var(--gray-light);}

/* UNIT KOMPETENSI */
.hidden-section{display:none!important;}
.hidden-section.show{display:block!important;}
.unit-container>label{display:block;margin-bottom:12px;font-size:15px;font-weight:600;color:var(--gray-lighter);}
.unit-select-all{margin-bottom:12px;}
.select-all-label{display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--primary-light);font-weight:600;padding:6px 14px;background:rgba(79,70,229,.1);border:1px solid rgba(79,70,229,.2);border-radius:6px;transition:var(--transition);}
.select-all-label:hover{background:rgba(79,70,229,.2);}
.select-all-label input[type="checkbox"]{accent-color:var(--primary);width:16px;height:16px;cursor:pointer;}
.unit-list{display:flex;flex-direction:column;gap:8px;max-height:420px;overflow-y:auto;padding-right:10px;}
.unit-list::-webkit-scrollbar{width:6px;}
.unit-list::-webkit-scrollbar-track{background:var(--dark-3);border-radius:3px;}
.unit-list::-webkit-scrollbar-thumb{background:var(--primary);border-radius:3px;}
.unit-item{cursor:pointer;}
.unit-item input[type="checkbox"]{display:none;}
.unit-info{padding:14px 16px;background:rgba(15,23,42,.4);border:1px solid rgba(255,255,255,.06);border-radius:var(--radius-sm);display:flex;align-items:center;gap:12px;transition:var(--transition);}
.unit-item input:checked+.unit-info{border-color:var(--success);background:rgba(16,185,129,.08);}
.unit-item:hover .unit-info{border-color:rgba(255,255,255,.15);background:rgba(255,255,255,.03);}
.unit-check{width:22px;height:22px;border:2px solid var(--gray);border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:var(--transition);font-size:11px;color:transparent;}
.unit-item input:checked+.unit-info .unit-check{background:var(--success);border-color:var(--success);color:var(--white);}
.unit-detail{flex:1;min-width:0;}
.unit-code{font-size:11px;color:var(--primary-light);font-weight:600;font-family:monospace;}
.unit-name{font-size:13px;color:var(--light);margin-top:3px;line-height:1.4;}
.unit-jp{font-size:12px;color:var(--warning);font-weight:600;background:rgba(245,158,11,.1);padding:3px 10px;border-radius:12px;white-space:nowrap;flex-shrink:0;}

/* ============================================================
   TABS
   ============================================================ */
.tab-nav{display:flex;gap:5px;margin-bottom:25px;background:rgba(15,23,42,.5);padding:5px;border-radius:var(--radius-sm);}
.tab-btn{flex:1;padding:12px 20px;background:transparent;border:none;color:var(--gray-light);font-size:14px;font-weight:600;cursor:pointer;border-radius:6px;transition:var(--transition);display:flex;align-items:center;justify-content:center;gap:8px;font-family:'Inter',sans-serif;}
.tab-btn:hover{color:var(--white);background:rgba(255,255,255,.05);}
.tab-btn.active{background:var(--gradient-1);color:var(--white);box-shadow:var(--shadow);}
.tab-content{display:none;}
.tab-content.active{display:block;animation:fadeIn .3s ease;}

/* SEARCH & SELECT ALL */
.search-box{position:relative;margin-bottom:15px;}
.search-box i{position:absolute;left:15px;top:50%;transform:translateY(-50%);color:var(--gray);font-size:16px;}
.search-box input{width:100%;padding:12px 16px 12px 45px;background:rgba(15,23,42,.6);border:1px solid rgba(255,255,255,.1);border-radius:var(--radius-sm);color:var(--white);font-size:14px;font-family:'Inter',sans-serif;transition:var(--transition);outline:none;}
.search-box input:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(79,70,229,.2);}
.select-all-bar{margin-bottom:12px;}

/* ITEMS GRID */
.items-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;max-height:350px;overflow-y:auto;padding-right:5px;}
.items-grid::-webkit-scrollbar{width:6px;}
.items-grid::-webkit-scrollbar-track{background:var(--dark-3);border-radius:3px;}
.items-grid::-webkit-scrollbar-thumb{background:var(--primary);border-radius:3px;}
.item-card{cursor:pointer;}
.item-card input[type="checkbox"]{display:none;}
.item-content{padding:12px 14px;background:rgba(15,23,42,.4);border:1px solid rgba(255,255,255,.06);border-radius:var(--radius-sm);display:flex;align-items:center;gap:10px;transition:var(--transition);font-size:13px;color:var(--light);}
.item-card input:checked+.item-content{border-color:var(--success);background:rgba(16,185,129,.08);color:var(--white);}
.item-card:hover .item-content{border-color:rgba(255,255,255,.15);}
.item-icon{width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
.item-icon.alat{background:rgba(79,70,229,.15);color:var(--primary-light);}
.item-icon.bahan{background:rgba(14,165,233,.15);color:var(--secondary-light);}
.item-icon.custom-icon{background:rgba(245,158,11,.15);color:var(--warning);}
.item-name-text{flex:1;min-width:0;line-height:1.3;}
.item-qty{margin-left:auto;flex-shrink:0;}
.item-qty input{width:52px;padding:5px 6px;background:rgba(15,23,42,.8);border:1px solid rgba(255,255,255,.1);border-radius:4px;color:var(--white);font-size:12px;text-align:center;outline:none;}
.item-qty input:focus{border-color:var(--primary);}

/* CUSTOM INPUT */
.custom-input-section{background:rgba(15,23,42,.4);border:1px solid rgba(255,255,255,.06);border-radius:var(--radius);padding:25px;}
.custom-input-section h4{color:var(--white);margin-bottom:20px;font-size:16px;}
.custom-input-section h4 i{color:var(--primary-light);margin-right:8px;}
.custom-items-list{margin-top:20px;display:flex;flex-direction:column;gap:8px;}
.custom-item-tag{display:flex;align-items:center;justify-content:space-between;padding:10px 15px;background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);border-radius:var(--radius-sm);font-size:13px;color:var(--light);}
.custom-item-tag .remove-custom{cursor:pointer;color:var(--danger);font-size:16px;padding:2px 5px;transition:var(--transition);}
.custom-item-tag .remove-custom:hover{color:var(--white);}

/* SELECTED SUMMARY */
.selected-summary{margin-top:25px;padding:20px;background:rgba(16,185,129,.04);border:1px solid rgba(16,185,129,.15);border-radius:var(--radius);}
.selected-summary h4{color:var(--success-light);margin-bottom:15px;font-size:15px;}
.selected-list{display:flex;flex-wrap:wrap;gap:8px;}
.selected-tag{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.25);border-radius:20px;font-size:12px;color:var(--success-light);}
.empty-selected{color:var(--gray);font-size:13px;font-style:italic;}

/* ============================================================
   PREVIEW & PRINT
   ============================================================ */
.print-action-bar{display:flex;gap:12px;justify-content:center;margin-bottom:25px;flex-wrap:wrap;}
.print-action-bar.bottom{margin-top:25px;margin-bottom:0;}
.preview-wrapper{border:1px solid rgba(255,255,255,.1);border-radius:var(--radius);overflow:hidden;background:var(--white);}
.preview-document{padding:40px;color:#000;font-family:'Times New Roman',serif;font-size:12pt;line-height:1.6;}
.preview-document h2,.preview-document h3,.preview-document h4,.preview-document p,.preview-document td,.preview-document th,.preview-document span{color:#000!important;}

/* ============================================================
   ABOUT
   ============================================================ */
.about-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.about-card{background:rgba(30,41,59,.8);border:1px solid rgba(255,255,255,.08);border-radius:var(--radius);padding:30px;transition:var(--transition);}
.about-card:hover{border-color:rgba(79,70,229,.3);transform:translateY(-3px);}
.about-card.main-about{grid-column:span 3;}
.about-icon{width:55px;height:55px;background:var(--gradient-1);border-radius:var(--radius);display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--white);margin-bottom:18px;}
.about-icon.bg-cyan{background:var(--gradient-3);}
.about-icon.bg-green{background:var(--gradient-green);}
.about-icon.bg-amber{background:var(--gradient-amber);}
.about-icon.bg-rose{background:var(--gradient-rose);}
.about-card h3{font-family:'Poppins',sans-serif;font-size:18px;color:var(--white);margin-bottom:10px;}
.about-card p{color:var(--gray-light);font-size:14px;line-height:1.6;}
.about-details{margin-top:20px;display:flex;flex-wrap:wrap;gap:15px;}
.detail-item{display:flex;align-items:center;gap:8px;font-size:14px;color:var(--gray-light);}
.detail-item i{color:var(--primary-light);}
.about-list{list-style:none;margin-top:10px;}
.about-list li{padding:6px 0;color:var(--light);font-size:14px;display:flex;align-items:center;gap:8px;}
.about-list li i{color:var(--primary-light);width:18px;}
.about-list.features li i{color:var(--success);}

/* ============================================================
   TOAST
   ============================================================ */
#toastContainer{position:fixed;bottom:30px;right:30px;z-index:99999;display:flex;flex-direction:column;gap:10px;}
.toast{padding:14px 22px;border-radius:var(--radius-sm);color:var(--white);font-size:14px;font-weight:500;display:flex;align-items:center;gap:10px;box-shadow:var(--shadow-lg);animation:toastIn .3s ease;min-width:300px;max-width:450px;}
.toast.success{background:linear-gradient(135deg,#10b981,#059669);}
.toast.error{background:linear-gradient(135deg,#ef4444,#dc2626);}
.toast.warning{background:linear-gradient(135deg,#f59e0b,#d97706);}
.toast.info{background:linear-gradient(135deg,#4f46e5,#3730a3);}
.toast.removing{animation:toastOut .3s ease forwards;}
@keyframes toastIn{from{transform:translateX(100%);opacity:0;}to{transform:translateX(0);opacity:1;}}
@keyframes toastOut{from{transform:translateX(0);opacity:1;}to{transform:translateX(100%);opacity:0;}}

/* ============================================================
   BACK TO TOP & FOOTER
   ============================================================ */
.back-to-top{position:fixed;bottom:30px;left:30px;width:45px;height:45px;background:var(--gradient-1);color:var(--white);border:none;border-radius:50%;font-size:18px;cursor:pointer;display:none;align-items:center;justify-content:center;box-shadow:var(--shadow-glow);transition:var(--transition);z-index:100;}
.back-to-top.visible{display:flex;}
.back-to-top:hover{transform:translateY(-3px);}
.footer{background:rgba(15,23,42,.9);border-top:1px solid rgba(255,255,255,.05);padding:25px 30px;text-align:center;position:relative;z-index:1;}
.footer p{color:var(--gray);font-size:13px;margin:3px 0;}
.footer strong{color:var(--primary-light);}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media(max-width:1024px){
    .hero-container{grid-template-columns:1fr;text-align:center;gap:30px;padding:40px 20px;}
    .hero-title{font-size:36px;}
    .hero-description{margin:0 auto 35px;}
    .hero-buttons{justify-content:center;}
    .hero-stats{grid-template-columns:repeat(2,1fr);}
    .hero-visual{order:-1;}
    .hero-illustration{width:260px;height:260px;}
    .about-grid{grid-template-columns:1fr 1fr;}
    .about-card.main-about{grid-column:span 2;}
}
@media(max-width:768px){
    .nav-menu{position:fixed;top:75px;left:0;width:100%;background:rgba(15,23,42,.98);backdrop-filter:blur(20px);flex-direction:column;padding:20px;gap:5px;transform:translateY(-120%);transition:var(--transition);border-bottom:1px solid rgba(255,255,255,.05);}
    .nav-menu.active{transform:translateY(0);}
    .nav-toggle{display:flex;}
    .hero-title{font-size:28px;}
    .hero-stats{grid-template-columns:repeat(2,1fr);gap:10px;}
    .form-row{grid-template-columns:1fr;}
    .instructor-cards,.training-cards{grid-template-columns:1fr;}
    .items-grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));}
    .about-grid{grid-template-columns:1fr;}
    .about-card.main-about{grid-column:span 1;}
    .step-line{width:30px;margin:0 8px;margin-bottom:25px;}
    .step-label{display:none;}
    .section-container{padding:25px 15px 50px;}
    .card-body{padding:20px 15px;}
    .preview-document{padding:20px 15px;font-size:10pt;}
    .tab-btn{padding:10px 10px;font-size:12px;gap:5px;}
}
@media(max-width:480px){
    .hero-title{font-size:24px;}
    .hero-illustration{width:200px;height:200px;}
    .main-chip{width:75px;height:75px;font-size:18px;}
    .main-chip span{font-size:10px;}
    .chip-1,.chip-2,.chip-3,.chip-4{width:45px;height:45px;font-size:14px;}
    .btn{padding:10px 18px;font-size:13px;}
    .stat-card{padding:12px 10px;}
    .stat-number{font-size:20px;}
    .items-grid{grid-template-columns:1fr;}
}

/* ============================================================
   PRINT MEDIA
   ============================================================ */
@media print{
    body *{visibility:hidden;}
    #printFrame,#printFrame *{visibility:visible;}
    #printFrame{position:absolute;left:0;top:0;width:100%;}
    @page{margin:15mm;size:A4;}
}