// Adım 4–7 · Kartları üret, ana sayfada yaklaşan 2'yi göster, arama + kategori filtresi
import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

// "GG-AA-YYYY" -> Date
function parseDate(str) {
  const [g, a, y] = str.split("-").map(Number);
  return new Date(y, a - 1, g);
}

function createCard(event) {
  const tarih = parseDate(event.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `<article class="kart">
    <h2>${event.title}</h2>
    <span class="etiket">${event.category}</span>
    <p>Tarih: ${tarih}, ${event.time}</p>
    <p>Yer: ${event.location}</p>
    <p>Kontenjan: ${event.capacity} kişi</p>
    <p>${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

if (list) {
  if (list.dataset.limit) {
    // Ana sayfa: kopya al, tarihe göre sırala, ilk N tanesini göster
    const yaklasan = [...events]
      .sort((a, b) => parseDate(a.date) - parseDate(b.date))
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    // Liste sayfası: hepsi
    render(events);
  }
}

// ---- Filtre (sadece etkinlikler.html'de var) ----
const form = document.querySelector("#filtre-formu");
const arama = document.querySelector("#arama");
const kategoriSecim = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

if (form && arama && kategoriSecim && sonucSatiri && list && !list.dataset.limit) {
  // Kategorileri veriden üret, her biri bir kez
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((k) => {
    const opt = document.createElement("option");
    opt.value = k;
    opt.textContent = k;
    kategoriSecim.appendChild(opt);
  });

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const secilen = kategoriSecim.value;

    const sonuc = events.filter((e) => {
      const metinUyuyor =
        e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
        e.description.toLocaleLowerCase("tr-TR").includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);
    sonucSatiri.textContent =
      sonuc.length === 0
        ? "Aramanıza uygun etkinlik bulunamadı."
        : `${sonuc.length} etkinlik listeleniyor.`;
  }

  arama.addEventListener("input", filtrele);
  kategoriSecim.addEventListener("change", filtrele);
  form.addEventListener("submit", (e) => e.preventDefault()); // Enter'da yenilenmesin

  filtrele(); // ilk açılışta "6 etkinlik listeleniyor."
}
