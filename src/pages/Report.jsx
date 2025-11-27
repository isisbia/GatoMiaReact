import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../hooks/useAuth";

export default function Report() {
  const { user } = useAuth();
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [imagens, setImagens] = useState([]);
  const [anonimo, setAnonimo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImagens([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imagensUrls = [];
      for (const file of imagens) {
        const storageRef = ref(storage, `reports/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        imagensUrls.push(url);
      }

      await addDoc(collection(db, "reports"), {
        nome: anonimo ? "Anônimo" : nome || (user && user.displayName) || "Anônimo",
        mensagem,
        imagens: imagensUrls,
        userId: anonimo ? null : user?.uid || null,
        createdAt: serverTimestamp(),
      });

      alert("✅ Denúncia enviada com sucesso!");
      setNome("");
      setMensagem("");
      setImagens([]);
      setAnonimo(false);
    } catch (err) {
      console.error(err);
      alert("❌ Erro ao enviar denúncia!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4 text-center">Fazer Denúncia</h2>
            <form onSubmit={handleSubmit}>
              {!anonimo && (
                <div className="mb-3">
                  <label className="form-label">Seu nome (opcional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
              )}

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={anonimo}
                  onChange={(e) => setAnonimo(e.target.checked)}
                />
                <label className="form-check-label">Enviar anonimamente</label>
              </div>

              <div className="mb-3">
                <label className="form-label">Mensagem</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Imagens (opcional)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar Denúncia"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
