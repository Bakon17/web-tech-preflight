import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <p>Aradığınız sayfa yok ya da silinmiş olabilir.</p>
      <Link className="buton" to="/">Ana Sayfa</Link>
    </section>
  );
}
export default NotFoundPage;
