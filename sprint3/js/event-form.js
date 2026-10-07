// Adım 9–11 · Formu yakala, doğrula, nesneyi göster; güncelleme modunda formu doldur
import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

// Alanlar: form name'leri Türkçe, nesne alanları İngilizce
const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

// "GG-AA-YYYY" -> "YYYY-AA-GG" (input type="date" için)
function toInputDate(str) {
  const [g, a, y] = str.split("-");
  return `${y}-${a}-${g}`;
}

if (form) {
  const guncelleModu = form.dataset.mode === "guncelle";
  let mevcutId = null;

  // ---- Güncelleme sayfası: id ile formu doldur ----
  if (guncelleModu) {
    const id = new URLSearchParams(location.search).get("id");
    const etkinlik = events.find((e) => e.id === id);

    if (!etkinlik) {
      form.outerHTML = `
        <div class="hata-kutusu" role="alert"
             style="border:1px solid #c0392b;background:#fff5f5;color:#c0392b;padding:12px;border-radius:6px;">
          Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin,
          detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
        </div>
        <p><a class="buton" href="etkinlikler.html">Etkinliklere git</a></p>`;
    } else {
      mevcutId = etkinlik.id;
      form.elements.ad.value = etkinlik.title;
      form.elements.kategori.value = etkinlik.category;
      form.elements.tarih.value = toInputDate(etkinlik.date);
      form.elements.saat.value = etkinlik.time;
      form.elements.yer.value = etkinlik.location;
      form.elements.kontenjan.value = etkinlik.capacity ?? "";
      form.elements.aciklama.value = etkinlik.description ?? "";
    }
  }

  // Form hâlâ sayfada ise (ekleme modu veya geçerli id) submit'i yakala
  if (document.body.contains(form)) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const kontenjanHam = (fd.get("kontenjan") ?? "").toString().trim();

      const data = {
        id: guncelleModu ? mevcutId : `event-${events.length + 1}`,
        title: (fd.get("ad") ?? "").toString().trim(),
        category: (fd.get("kategori") ?? "").toString(),
        date: (fd.get("tarih") ?? "").toString(),
        time: (fd.get("saat") ?? "").toString(),
        location: (fd.get("yer") ?? "").toString().trim(),
        capacity: kontenjanHam === "" ? null : Number(kontenjanHam),
        description: (fd.get("aciklama") ?? "").toString().trim(),
      };

      // ---- Doğrulama ----
      const errors = {};
      if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
      if (data.category === "") errors.kategori = "Bir kategori seçin.";
      if (data.date === "") errors.tarih = "Tarih seçin.";
      if (data.time === "") errors.saat = "Saat seçin.";
      if (data.location === "") errors.yer = "Yer bilgisini yazın.";
      if (
        data.capacity !== null &&
        (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)
      ) {
        errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
      }

      // Her alan için hatayı yaz ya da eski hatayı temizle
      alanlar.forEach((ad) => {
        const alan = form.elements[ad];
        const hataYeri = document.querySelector(`#${ad}-hata`);
        if (errors[ad]) {
          if (hataYeri) {
            hataYeri.textContent = errors[ad];
            hataYeri.style.color = "#c0392b";
          }
          alan.setAttribute("aria-invalid", "true");
          alan.style.borderColor = "#c0392b";
        } else {
          if (hataYeri) hataYeri.textContent = "";
          alan.removeAttribute("aria-invalid");
          alan.style.borderColor = "";
        }
      });

      if (Object.keys(errors).length > 0) {
        mesaj.innerHTML = "";
        mesaj.textContent = "Formda hatalı alanlar var.";
        mesaj.style.cssText =
          "border:1px solid #c0392b;background:#fff5f5;color:#c0392b;padding:12px;border-radius:6px;margin-top:12px;";
        return;
      }

      // ---- Başarı ----
      const baslik = guncelleModu
        ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
        : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";
      mesaj.style.cssText =
        "border:1px solid #27a336;background:#f4fbf5;color:#1b6b27;padding:12px;border-radius:6px;margin-top:12px;";
      mesaj.innerHTML = `<p>${baslik}</p><pre></pre>`;
      mesaj.querySelector("pre").textContent = JSON.stringify(data, null, 2);
    });
  }
}
