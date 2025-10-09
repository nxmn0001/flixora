// File: abcdefghijklmnopqrstuvwxyz.js

/**
 * ======================================================
 * PUSAT KONTROL IKLAN - V14.1 (Stable)
 * ======================================================
 */
const PENGATURAN_IKLAN = [
    {
        id: 'iklan-topbar-promo',
        aktif: false,
        jenisPenempatan: 'top-bar',
        gambar: 'flixora.png',
        judul: 'Flixora',
        deskripsi: 'Join Telegram Channel',
        link: '#',
    },
    {
        id: 'iklan-gambar-utama',
        aktif: true,
        jenisPenempatan: 'interstitial-gambar',
        tombolUtama: {
            teks: 'Pasang Iklan!',
            link: '#'
        },
        banners: [
            { gambarUrl: 'https://flixora.my.id/icon.png', link: 'LINK' },            
            { gambarUrl: 'https://flixora.my.id/icon.png', link: 'LINK' }
        ],
        tunda: 0
    }
];

/**
 * ======================================================
 * MESIN IKLAN (Tidak perlu diubah)
 * ======================================================
 */
(function() {
    if (typeof PENGATURAN_IKLAN === 'undefined') return;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .iklan-interstitial-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 99999; display: flex; flex-direction: column; animation: fadeIn 0.4s ease-in-out; overflow: hidden; }
        .iklan-bg-blur { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; filter: blur(20px) brightness(0.5); transform: scale(1.1); z-index: -1; }
        .iklan-interstitial-konten { overflow-y: auto; flex-grow: 1; padding: 80px 16px 16px 16px; box-sizing: border-box; }
        .iklan-interstitial-konten::-webkit-scrollbar { display: none; }
        .iklan-interstitial-konten { scrollbar-width: none; }
        .iklan-vertical-item { display: block; text-decoration: none; margin-bottom: 16px; }
        .iklan-vertical-item:last-child { margin-bottom: 0; }
        .iklan-vertical-item img { width: 100%; display: block; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.3); }
        .iklan-interstitial-topbar { position: absolute; top: 0; left: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 15px; box-sizing: border-box; background: rgba(20, 20, 20, 0.5); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); z-index: 10; }
        #iklan-interstitial-close { background: rgba(0,0,0,0.5); border: 1px solid white; color: white; width: 30px; height: 30px; border-radius: 50%; font-size: 20px; cursor: pointer; line-height: 28px; }
        .iklan-interstitial-learnmore { background: #3B82F6; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-family: sans-serif; font-weight: bold; }
        .iklan-top-bar { display: flex; align-items: center; gap: 12px; padding: 10px 15px; background-color: var(--surface-color, #1F2937); border-bottom: 1px solid var(--border-color, #374151); color: var(--primary-text-color, #F9FAFB); text-decoration: none; font-family: 'Manrope', sans-serif; font-size: 13px; } .iklan-top-bar-img { width: 32px; height: 32px; border-radius: 6px; flex-shrink: 0; } .iklan-top-bar-konten { flex-grow: 1; min-width: 0; } .iklan-top-bar-header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; } .iklan-top-bar-label { color: #3B82F6; font-weight: 700; font-size: 14px; } .iklan-top-bar-judul { font-weight: 600; white-space: nowrap; } .iklan-top-bar-deskripsi { color: var(--secondary-text-color, #9CA3AF); line-height: 1.4; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } @media (max-width: 600px) { .iklan-top-bar-deskripsi { white-space: normal; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; } }
    `;
    document.head.appendChild(styleSheet);

    const runAds = () => {
        PENGATURAN_IKLAN.forEach(iklan => {
            if (!iklan.aktif) return;
            try {
                if (iklan.jenisPenempatan === 'top-bar') pasangIklanTopBar(iklan);
                else if (iklan.jenisPenempatan === 'interstitial-gambar') setTimeout(() => pasangIklanInterstitial(iklan), iklan.tunda * 1000);
            } catch(e) { console.error("Gagal memuat iklan:", e); }
        });
    };

    const pasangIklanInterstitial = (iklan) => {
        if (document.querySelector('.iklan-interstitial-overlay')) return;
        const overlay = document.createElement('div');
        overlay.className = 'iklan-interstitial-overlay';
        const bgImageUrl = iklan.banners[0]?.gambarUrl || '';
        const bannersHtml = iklan.banners.map(banner => `<a href="${banner.link}" target="_blank" class="iklan-vertical-item"><img src="${banner.gambarUrl}" alt="Iklan Banner"></a>`).join('');
        overlay.innerHTML = `<div class="iklan-bg-blur" style="background-image: url('${bgImageUrl}');"></div><div class="iklan-interstitial-topbar"><button id="iklan-interstitial-close">&times;</button><a href="${iklan.tombolUtama.link}" target="_blank" class="iklan-interstitial-learnmore">${iklan.tombolUtama.teks}</a></div><div class="iklan-interstitial-konten">${bannersHtml}</div>`;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        document.getElementById('iklan-interstitial-close').addEventListener('click', (e) => {
            e.stopPropagation();
            overlay.remove();
            document.body.style.overflow = 'auto';
        });
    };

    const pasangIklanTopBar = (iklan) => {
        const adLink = document.createElement('a'); adLink.href = iklan.link; adLink.target = '_blank'; adLink.classList.add('iklan-top-bar'); adLink.innerHTML = `<img src="${iklan.gambar}" class="iklan-top-bar-img" alt="Iklan"><div class="iklan-top-bar-konten"><div class="iklan-top-bar-header"><span class="iklan-top-bar-label">Iklan</span><span class="iklan-top-bar-judul">${iklan.judul}</span></div><p class="iklan-top-bar-deskripsi">${iklan.deskripsi}</p></div>`; document.body.prepend(adLink);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAds);
    } else {
        runAds();
    }
})();