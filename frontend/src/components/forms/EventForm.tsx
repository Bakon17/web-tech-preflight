interface EventFormProps {
  onSubmit: () => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p className="bilgi">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label htmlFor="title">Etkinlik Adı</label>
        <input id="title" type="text" maxLength={80} />

        <label htmlFor="category">Kategori</label>
        <select id="category">
          <option value="">Seçiniz</option>
          <option value="Akademik">Akademik</option>
          <option value="Kültürel">Kültürel</option>
          <option value="Spor">Spor</option>
        </select>

        <label htmlFor="date">Tarih</label>
        <input id="date" type="date" />

        <label htmlFor="time">Saat</label>
        <input id="time" type="time" />

        <label htmlFor="capacity">Kontenjan</label>
        <input id="capacity" type="number" />

        <label htmlFor="description">Açıklama</label>
        <textarea id="description" rows={5} />

        <button type="submit">Kaydet</button>
      </form>
    </>
  );
}