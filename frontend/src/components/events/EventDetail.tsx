import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <h2>{event.title}</h2>
      {event.image && (
        <figure>
          <img src={event.image} alt={event.title} />
        </figure>
      )}
      <div className="kunye">
        <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      </div>
      <h3>Açıklama</h3>
      <p>{event.description}</p>
      
      {/* Слайдта көрсетілгендей 2 батырма және 2 callback[cite: 8] */}
      <button onClick={onBack}>Listeye dön</button>
      <button onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
    </article>
  );
}