# Kampüs Etkinlikleri – Sprint 2

Sprint 1'in HTML iskeleti üzerine `css/numaran.css` eklendi ve sayfalar
öğrenci numarasına göre kişiselleştirildi. Sprint 1'deki gecici
`<table border="1">` listesi kalktı; etkinlikler artik `section > article`
kart yapısı ile grid üzerinde gösteriliyor.

## Kişiselleştirme (css/numaran.css)

```css
--no: 2311012911;              /* Ad Soyad: Bakdaulet Bekman */
--ton: mod(var(--no), 360);    /* = 111 → yeşil ton */
--font: Verdana, sans-serif;   /* son hane = 1 → Verdana */
```

## Sayfalar

| Dosya | İçerik |
|---|---|
| `index.html` | Ana sayfa, tanıtım + yaklaşan 2 etkinlik kartı |
| `etkinlikler.html` | Tüm etkinlikler (3 kart: Kariyer Günleri, Robotik Atölyesi, Siber Güvenlik) |
| `etkinlik-detay.html` | Afiş solda, künye (`dl`) sağda; ayrıntılı açıklama |
| `etkinlik-ekle.html` | Yeni etkinlik ekleme formu (label üstte, `required` çalışıyor) |
| `etkinlik-guncelle.html` | Aynı form, alanlar dolu gelir |

Menü tüm sayfalarda aynı: **Ana Sayfa · Etkinlikler · Ekle · Güncelle**.

## Canlı Adres

https://KULLANICI-ADIN-buraya.vercel.app

*(Vercel'de yayına aldıktan sonra bu satırı gerçek adresle güncelleyin.)*

## Git

```bash
git add .
git commit -m "Sprint2 yapıldı"
git tag sprint-02
git push
git push --tags
```
