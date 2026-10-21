import { useState, useEffect } from "react";
import "./App.css";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import type { PageName } from "./types/page";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

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
  return (
    <><Header 
    title="Kampüs Etkinlikleri" 
    text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." 
  />
      <Navigation current={page} onNavigate={go} /> 
      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
          </section>
        )}
        {/* ETKİNLİKLER SAYFASI */}
        {page === "events" && (
          <section>
            <h2>Tüm Etkinlikler</h2>
            <EventFilter
  searchText={searchText}
  category={category}
  categories={categories}
  onSearchChange={setSearchText}
  onCategoryChange={setCategory}
/>
            <EventList 
  events={filteredEvents} 
  onShowDetail={(id) => go("detail", id)} 
  emptyText="Etkinlik bulunamadı." 
/>
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
             <EventDetail
  event={selected}
  onBack={() => go("events")}
  onEdit={(id) => go("update", id)}
/>
           ) }
          </section>
        )}
        {/* FORM (EKLE / GÜNCELLE) */}
        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <EventForm onSubmit={() => window.scrollTo(0, 0)} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
export default App;