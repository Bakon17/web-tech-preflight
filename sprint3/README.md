  https://web-tech-preflight-sprint2-five.vercel.app/

# Kampüs Etkinlikleri – Sprint 3

Sprint 2'nin sayfaları JavaScript ve DOM ile canlandırıldı. Etkinlikler
`js/data.js` içindeki tek bir diziden üretiliyor; kartlar, detay sayfası ve
formlar bu veriyle çalışıyor. `localStorage`, framework ve jQuery kullanılmadı.

## Kişiselleştirme (css/2311012911.css)

```css
--no: 2311012911;              /* Ad Soyad: Bakdaulet Bekman */
--ton: mod(var(--no), 360);    /* = 111 → yeşil ton */
--font: Verdana, sans-serif;   /* son hane = 1 → Verdana */
```

## Dosya yapısı

```
sprint3/
├── css/2311012911.css
├── js/
│   ├── data.js          6 etkinlik (dizi)
│   ├── event-list.js    kart üretimi, ana sayfada yaklaşan 2, arama + kategori filtresi
│   ├── event-detail.js  ?id= ile detay, geçersiz id'de hata kutusu
│   └── event-form.js    doğrulama, JSON çıktısı, güncelleme modunda dolu form
├── index.html
├── etkinlikler.html
├── etkinlik-detay.html
├── etkinlik-ekle.html
└── etkinlik-guncelle.html
```

## Sayfalar ve modüller

| Sayfa | Modül |
|---|---|
| `index.html` | `event-list.js` (`data-limit="2"` ile yaklaşan 2 etkinlik) |
| `etkinlikler.html` | `event-list.js` (6 etkinlik, arama + kategori filtresi) |
| `etkinlik-detay.html` | `event-detail.js` (`?id=event-3` gibi) |
| `etkinlik-ekle.html` | `event-form.js` (doğrulama, başarıda JSON) |
| `etkinlik-guncelle.html` | `event-form.js` (`data-mode="guncelle"`, `?id=` ile dolu form) |

Menü: **Ana Sayfa · Etkinlikler · Ekle**. Güncelle sayfasına sadece detaydaki
"Bu etkinliği güncelle" butonuyla gidilir.

## Çalıştırma

Modüller (`type="module"`) `file://` ile çalışmaz. VS Code'da Live Server ile aç:
`http://127.0.0.1:5500/sprint3/`

## Git

```bash
git add .
git commit -m "Sprint3 yapıldı"
git tag sprint-03
git push
git push --tags
```
