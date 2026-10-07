// Adım 8 · Adresteki ?id= ile doğru etkinliği aç
import { events } from "./data.js";

const container = document.querySelector("#detay");

function parseDate(str) {
  const [g, a, y] = str.split("-").map(Number);
  return new Date(y, a - 1, g);
}

if (container) {
  const id = new URLSearchParams(location.search).get("id");
  const event = events.find((e) => e.id === id);
  const baslik = document.querySelector("header h1");

  // Önce kontrol, sonra yaz
  if (!event) {
    document.title = "Etkinlik bulunamadı";
    if (baslik) baslik.textContent = "Etkinlik bulunamadı";

    const mesaj = id
      ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
      : "Etkinlik bulunamadı. Listeden bir etkinlik seçin.";

    container.innerHTML = `
      <div class="hata-kutusu" role="alert"
           style="border:1px solid #c0392b;background:#fff5f5;color:#c0392b;padding:12px;border-radius:6px;">
        <strong>Etkinlik bulunamadı</strong>
        <p></p>
      </div>
      <p><a href="etkinlikler.html">← Listeye dön</a></p>`;
    container.querySelector(".hata-kutusu p").textContent = mesaj;
  } else {
    document.title = event.title;
    if (baslik) baslik.textContent = event.title;

    const tarih = parseDate(event.date).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Sprint 2'deki yapı: .detay-duzen > figure + dl
    container.innerHTML = `
      <div class="detay-duzen">
        <figure>
          <div role="img" aria-label="${event.title} afişi"
               style="background:#14213d;color:#fff;text-align:center;padding:40px 16px;border-radius:6px;">
            <h2>${event.title}</h2>
            <p>${tarih} · ${event.location}</p>
          </div>
          <figcaption>${event.title} afişi</figcaption>
        </figure>

        <dl>
          <dt>Tarih</dt>
          <dd>${tarih}, ${event.time}</dd>
          <dt>Yer</dt>
          <dd>${event.location}</dd>
          <dt>Kategori</dt>
          <dd>${event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>${event.capacity} kişi</dd>
        </dl>
      </div>

      <h2>Açıklama</h2>
      <p>${event.description}</p>

      <p>
        <a href="etkinlikler.html">← Listeye dön</a>
        <a href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
      </p>`;
  }
}
