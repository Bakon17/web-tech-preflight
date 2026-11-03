import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories: Category[] = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <section>
      <EventFilter
        searchText={searchText}
        category={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      <p id="sonuc">{filtered.length} etkinlik listeleniyor.</p>
      <EventList events={filtered} emptyText="Etkinlik bulunamadı." />
    </section>
  );
}
export default EventsPage;
