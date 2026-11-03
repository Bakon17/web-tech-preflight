import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="detay">
      {event.image && (
        <figure className="afis-container">
          <img src={event.image} alt={event.title} />
          <figcaption className="afis-caption">{event.title} afişi</figcaption>
        </figure>
      )}

      <div className="kunye">
        <h3>Etkinlik Künyesi</h3>
        <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      </div>

      <div className="aciklama-block">
        <h3>Açıklama</h3>
        <p>{event.description}</p>
      </div>

      <div className="button-group">
        <Link className="buton" to="/events">Listeye dön</Link>
        <Link className="buton" to={`/admin/${event.id}/edit`}>Güncelle</Link>
      </div>
    </article>
  );
}
