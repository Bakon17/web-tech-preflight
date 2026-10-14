import { useState, useEffect } from "react";
import "./App.css";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<Category | "">("");

  
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  
  useEffect(() => {
    if (page === "detail" && selected) {
      document.title = `Kampüs Etkinlikleri - ${selected.title}`;
    } else {
      document.title = "Kampüs Etkinlikleri";
    }
  }, [page, selected]);

  
  function go(nextPage: PageName, id: string | null = null) {
    setPage(nextPage);
    setSelectedId(id);
  }

  
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  
  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    category
  );

  
  const categories: Category[] = [...new Set(events.map((e: CampusEvent) => e.category))];

  
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        {event.image && <img src={event.image} alt={event.title} />}
        <h2>{event.title}</h2>
        <p className="kategori">{event.category}</p>
        <p><strong>Tarih:</strong> {event.date}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        <p>{event.description}</p>
        <button onClick={() => go("detail", event.id)}>Detayları gör</button>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
        <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      </header>

      <nav className="menu">
        <a
          href="#"
          aria-current={page === "home" ? "page" : undefined}
          onClick={(e) => { e.preventDefault(); go("home"); }}
        >
          Ana Sayfa
        </a>
        <span className="nokta">•</span>
        <a
          href="#"
          aria-current={page === "events" ? "page" : undefined}
          onClick={(e) => { e.preventDefault(); go("events"); }}
        >
          Etkinlikler
        </a>
        <span className="nokta">•</span>
        <a
          href="#"
          aria-current={page === "add" ? "page" : undefined}
          onClick={(e) => { e.preventDefault(); go("add"); }}
        >
          Ekle
        </a>
      </nav>

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </div>
          </section>
        )}

        {/* ETKİNLİKLER SAYFASI */}
        {page === "events" && (
          <section>
            <h2>Tüm Etkinlikler</h2>
            <div className="arama-filtre">
              <input
                type="search"
                placeholder="Etkinlik ara..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                {categories.map((cat: Category) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <p className="sonuc-sayisi">
              {filteredEvents.length === 0
                ? "bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>

            <div className="etkinlik-listesi">
              {filteredEvents.map(renderCard)}
            </div>
          </section>
        )}

        {/* DETAY SAYFASI */}
        {page === "detail" && (
          <section>
            {!selected ? (
              <div>
                <p>Etkinlik bulunamadı.</p>
                <button onClick={() => go("events")}>Listeye dön</button>
              </div>
            ) : (
              <article className="detay">
                <h2>{selected.title}</h2>
                {selected.image && (
                  <figure>
                    <img src={selected.image} alt={selected.title} />
                  </figure>
                )}
                <div className="kunye">
                  <p><strong>Tarih:</strong> {selected.date}, {selected.time}</p>
                  <p><strong>Yer:</strong> {selected.location}</p>
                  <p><strong>Kategori:</strong> {selected.category}</p>
                  <p><strong>Kontenjan:</strong> {selected.capacity} kişi</p>
                </div>
                <h3>Açıklama</h3>
                <p>{selected.description}</p>
                <button onClick={() => go("events")}>Listeye dön</button>
                <button onClick={() => go("update", selected.id)}>
                  Bu etkinliği güncelle
                </button>
              </article>
            )}
          </section>
        )}

        {/* FORM (EKLE / GÜNCELLE) */}
        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p className="bilgi">
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="title">Etkinlik Adı</label>
              <input id="title" type="text" maxLength={80} />

              <label htmlFor="category">Kategori</label>
              <select id="category">
                <option value="">Seçiniz</option>
                {categories.map((cat: Category) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <label htmlFor="date">Tarih</label>
              <input id="date" type="date" />

              <label htmlFor="time">Saat</label>
              <input id="time" type="time" />

              <label htmlFor="location">Yer</label>
              <input id="location" type="text" />

              <label htmlFor="capacity">Kontenjan</label>
              <input id="capacity" type="number" />

              <label htmlFor="description">Açıklama</label>
              <textarea id="description" rows={5} />

              <button type="submit">Kaydet</button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>&copy; 2026 Kampüs Etkinlikleri</p>
      </footer>
    </>
  );
}

export default App;