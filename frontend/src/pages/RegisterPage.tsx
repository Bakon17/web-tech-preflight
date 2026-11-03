import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
}

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: RegisterErrors = {};
    if (name.trim().length < 2) found.name = "Ad en az 2 karakter olmalı.";
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="alan">
          <label htmlFor="name">Ad Soyad</label>
          <input
            id="name" type="text" value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
          />
          <span className="hata-metni">{errors.name}</span>
        </div>
        <div className="alan">
          <label htmlFor="email">E-posta</label>
          <input
            id="email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
          />
          <span className="hata-metni">{errors.email}</span>
        </div>
        <div className="alan">
          <label htmlFor="password">Şifre</label>
          <input
            id="password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
          />
          <span className="hata-metni">{errors.password}</span>
        </div>
        <button type="submit">Kayıt ol</button>
      </form>

      {sent && <p className="mesaj mesaj-basari">Gerçek kayıt Sprint 10'da</p>}

      <p className="auth-linkler">
        <Link to="/login">← Girişe dön</Link>
      </p>
    </section>
  );
}
export default RegisterPage;
