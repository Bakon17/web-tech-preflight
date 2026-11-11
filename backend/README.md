# Kampüs Etkinlikleri API

Express ile yazılmış REST API. Veri şimdilik bellekte tutulur.

## Çalıştırma

```
cd backend
npm install
cp .env.example .env
npm run dev
```

Windows PowerShell'de `cp` yerine: `copy .env.example .env`

## Ortam değişkenleri

| Değişken | Açıklama | Varsayılan |
|---|---|---|
| PORT | Sunucunun portu | 3000 |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /health | Sunucu kontrolü | 200 | — | Bu sprint |
| GET | /events | Listeyi getir | 200 | — | Bu sprint |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | /events | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

Status code'lar: 200 tamam, 201 oluşturuldu, 204 içerik yok, 400 eksik/yanlış veri, 404 bulunamadı.

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```