import { matchPath, useLocation } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../utils/filter-events";
import type { CampusEvent } from "../../types/campus-event";

interface HeaderInfo {
  title: string;
  text: string;
}

const DEFAULT_INFO: HeaderInfo = {
  title: "Kampüs Etkinlikleri",
  text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
};

// Adrese göre başlık: Header props almaz, adresi kendisi okur
function getHeaderInfo(pathname: string, events: CampusEvent[]): HeaderInfo {
  if (pathname === "/events")
    return { title: "Tüm Etkinlikler", text: "Kampüste düzenlenen etkinlikler." };

  const detail = matchPath("/events/:id", pathname);
  if (detail) {
    const event = findEventById(events, detail.params.id ?? "");
    if (event) return { title: event.title, text: `${event.category} · ${event.location}` };
    return DEFAULT_INFO;
  }

  if (pathname === "/admin") return { title: "Etkinlik Yönetimi", text: "" };
  if (pathname === "/admin/new") return { title: "Etkinlik Ekle", text: "" };
  if (matchPath("/admin/:id/edit", pathname))
    return { title: "Etkinlik Güncelle", text: "" };
  if (pathname === "/login") return { title: "Giriş Yap", text: "" };
  if (pathname === "/register") return { title: "Kayıt Ol", text: "" };
  if (pathname === "/forgot-password") return { title: "Şifremi Unuttum", text: "" };

  return DEFAULT_INFO;
}

export default function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();
  const { title, text } = getHeaderInfo(pathname, events);

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}
