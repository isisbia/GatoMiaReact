/*import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(userCred.user, { displayName: nome });
      navigate("/");
    } catch (err) {
      setError("Erro ao cadastrar: " + err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError("Erro com Google: " + err.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Cadastre-se</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
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

              <div className="d-grid mb-3">
                <button className="btn btn-primary" type="submit">
                  Cadastrar
                </button>
              </div>

              <div className="text-center mb-3">ou</div>

              <div className="d-grid">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleGoogle}
                >
                  <i className="bi bi-google me-2"></i> Entrar com Google
                </button>
              </div>

              <p className="text-center mt-3">
                Já tem uma conta? <Link to="/login">Entrar</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
*/

import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [captchaValido, setCaptchaValido] = useState(false);
  const navigate = useNavigate();

  const RECAPTCHA_KEY = "6LcKXAQsAAAAAMm6QKz3YNENiAO4sIx-0on7MJyO";

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!captchaValido) {
      setError("Por favor, confirme que você não é um robô.");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(userCred.user, { displayName: nome });
      navigate("/");
    } catch (err) {
      setError("Erro ao cadastrar: " + err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError("Erro com Google: " + err.message);
    }
  };

  const onCaptchaChange = (token) => {
    setCaptchaValido(!!token);
    if (token) setError("");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Cadastre-se</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
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

              {/* 🔒 reCAPTCHA */}
              <div className="d-flex justify-content-center mb-3">
                <ReCAPTCHA
                  sitekey={RECAPTCHA_KEY}
                  onChange={onCaptchaChange}
                />
              </div>

              <div className="d-grid mb-3">
                <button className="btn btn-primary" type="submit" disabled={!captchaValido}>
                  Cadastrar
                </button>
              </div>

              <div className="text-center mb-3">ou</div>

              <div className="d-grid">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleGoogle}
                >
                  <i className="bi bi-google me-2"></i> Entrar com Google
                </button>
              </div>

              <p className="text-center mt-3">
                Já tem uma conta? <Link to="/login">Entrar</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
