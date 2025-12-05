import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [captchaValido, setCaptchaValido] = useState(false);

  // ✅ ite Key do Google reCAPTCHA
  const RECAPTCHA_KEY = "6LcKXAQsAAAAAMm6QKz3YNENiAO4sIx-0on7MJyO";

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!captchaValido) {
      setError("Por favor, confirme que você não é um robô.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/");
    } catch (err) {
      setError("Erro ao entrar: " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError("Erro com o Google: " + err.message);
    }
  };

  const onCaptchaChange = (token) => {
    if (token) {
      setCaptchaValido(true);
      setError("");
    } else {
      setCaptchaValido(false);
    }
  };

  return (
    <div className="container py-2">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-1">Entrar</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleEmailLogin}>
              <div className="mb-1">
                <label className="form-label">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              {/* 🔒 reCAPTCHA Checkbox */}
              <div className="d-flex justify-content-center mb-3">
                <ReCAPTCHA
                  sitekey={RECAPTCHA_KEY}
                  onChange={onCaptchaChange}
                />
              </div>

              <div className="d-grid mb-1">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!captchaValido}
                >
                  Entrar
                </button>
              </div>

              <div className="text-center mb-1">ou</div>

              <div className="d-grid mb-1">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleGoogleLogin}
                >
                  <i className="bi bi-google me-1"></i> Entrar com Google
                </button>
              </div>

              <p className="text-center mt-3">
                Não tem uma conta? <Link to="/Signup">Cadastre-se</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
