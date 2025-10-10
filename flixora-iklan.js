/**
 * ======================================================
 * Flixora Engine v2.1 - Iklan & Statistik (Final)
 * ======================================================
 */

// BAGIAN 1: PENGATURAN IKLAN
const PENGATURAN_IKLAN = [
    { id: 'iklan-topbar-promo', aktif: false, jenisPenempatan: 'top-bar', gambar: 'flixora.png', judul: 'Flixora', deskripsi: 'Join Telegram Channel', link: '#', },
    { id: 'iklan-gambar-utama', aktif: false, jenisPenempatan: 'interstitial-gambar', tombolUtama: { teks: 'Pasang Iklan!', link: '#' }, banners: [{ gambarUrl: '1.gif', link: 'LINK' }, { gambarUrl: '1.gif', link: 'LINK' }], tunda: 3 }
];

// BAGIAN 2: MESIN IKLAN
(function() {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `@keyframes fadeIn{from{opacity:0}to{opacity:1}}.iklan-interstitial-overlay{position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;display:flex;flex-direction:column;animation:fadeIn .4s ease-in-out;overflow:hidden}.iklan-bg-blur{position:absolute;top:0;left:0;width:100%;height:100%;background-size:cover;background-position:center;filter:blur(20px) brightness(.5);transform:scale(1.1);z-index:-1}.iklan-interstitial-konten{overflow-y:auto;flex-grow:1;padding:80px 16px 16px;box-sizing:border-box}.iklan-interstitial-konten::-webkit-scrollbar{display:none}.iklan-interstitial-konten{scrollbar-width:none}.iklan-vertical-item{display:block;text-decoration:none;margin-bottom:16px}.iklan-vertical-item:last-child{margin-bottom:0}.iklan-vertical-item img{width:100%;display:block;border-radius:12px;box-shadow:0 8px 20px rgba(0,0,0,.3)}.iklan-interstitial-topbar{position:absolute;top:0;left:0;width:100%;display:flex;justify-content:space-between;align-items:center;padding:15px;box-sizing:border-box;background:rgba(20,20,20,.5);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);z-index:10}#iklan-interstitial-close{background:rgba(0,0,0,.5);border:1px solid #fff;color:#fff;width:30px;height:30px;border-radius:50%;font-size:20px;cursor:pointer;line-height:28px}.iklan-interstitial-learnmore{background:#3b82f6;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-family:sans-serif;font-weight:700}.iklan-top-bar{display:flex;align-items:center;gap:12px;padding:10px 15px;background-color:var(--surface-color,#1f2937);border-bottom:1px solid var(--border-color,#374151);color:var(--primary-text-color,#f9fafb);text-decoration:none;font-family:'Manrope',sans-serif;font-size:13px}.iklan-top-bar-img{width:32px;height:32px;border-radius:6px;flex-shrink:0}.iklan-top-bar-konten{flex-grow:1;min-width:0}.iklan-top-bar-header{display:flex;align-items:center;gap:8px;margin-bottom:4px}.iklan-top-bar-label{color:#3b82f6;font-weight:700;font-size:14px}.iklan-top-bar-judul{font-weight:600;white-space:nowrap}.iklan-top-bar-deskripsi{color:var(--secondary-text-color,#9ca3af);line-height:1.4;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}@media (max-width:600px){.iklan-top-bar-deskripsi{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}}`;
    document.head.appendChild(styleSheet);
    document.addEventListener('DOMContentLoaded',()=>{PENGATURAN_IKLAN.forEach(e=>{if(!e.aktif)return;try{e.jenisPenempatan==="top-bar"?pasangIklanTopBar(e):e.jenisPenempatan==="interstitial-gambar"&&setTimeout(()=>pasangIklanInterstitial(e),1e3*e.tunda)}catch(e){console.error("Ad Engine Error:",e)}})});function pasangIklanInterstitial(e){if(document.querySelector(".iklan-interstitial-overlay"))return;const t=document.createElement("div");t.className="iklan-interstitial-overlay";const a=e.banners[0]?.gambarUrl||"",n=e.banners.map(e=>`<a href="${e.link}" target="_blank" class="iklan-vertical-item"><img src="${e.gambarUrl}" alt="Iklan Banner"></a>`).join("");t.innerHTML=`<div class="iklan-bg-blur" style="background-image: url('${a}');"></div><div class="iklan-interstitial-topbar"><button id="iklan-interstitial-close">&times;</button><a href="${e.tombolUtama.link}" target="_blank" class="iklan-interstitial-learnmore">${e.tombolUtama.teks}</a></div><div class="iklan-interstitial-konten">${n}</div>`,document.body.appendChild(t),document.body.style.overflow="hidden";const o=document.getElementById("iklan-interstitial-close");o.addEventListener("click",e=>{e.stopPropagation(),t.remove(),document.body.style.overflow="auto"})}function pasangIklanTopBar(e){const t=document.createElement("a");t.href=e.link,t.target="_blank",t.classList.add("iklan-top-bar"),t.innerHTML=`<img src="${e.gambar}" class="iklan-top-bar-img" alt="Iklan"><div class="iklan-top-bar-konten"><div class="iklan-top-bar-header"><span class="iklan-top-bar-label">Iklan</span><span class="iklan-top-bar-judul">${e.judul}</span></div><p class="iklan-top-bar-deskripsi">${e.deskripsi}</p></div>`,document.body.prepend(t)}
})();

// BAGIAN 3: MESIN STATISTIK
(function() {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'module';
    scriptElement.textContent = `
        import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
        import { getDatabase, ref, set, onDisconnect } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

        const firebaseConfig = {
            apiKey: "AIzaSyDTsYtgrRfP-d94NejtsJBBsZkM93IAAYQ",
            authDomain: "flixora-d9bc6.firebaseapp.com",
            databaseURL: "https://flixora-d9bc6-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "flixora-d9bc6",
            storageBucket: "flixora-d9bc6.firebasestorage.app",
            messagingSenderId: "323228673071",
            appId: "1:323228673071:web:a1fa2fb622c95d2cbfd2da",
            measurementId: "G-DKJM6TY62L"
        };

        try {
            const app = initializeApp(firebaseConfig);
            const db = getDatabase(app);
            const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const userSessionRef = ref(db, 'online_users/' + sessionId);
            onDisconnect(userSessionRef).remove();
            set(userSessionRef, true);
        } catch (e) {
            console.error("Stats Engine Error:", e);
        }
    `;
    document.head.appendChild(scriptElement);
})();