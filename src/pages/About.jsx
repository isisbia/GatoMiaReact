// src/pages/About.jsx
import React from "react";

// Novo formato do Vite (substitui "as: 'url'")
const images = import.meta.glob("../assets/*.{jpg,jpeg,png,webp}", {
  query: "?url",
  import: "default",
  eager: true,
});

// chave esperada: "../assets/equipe.jpg"
const equipeUrl =
  images["../assets/equipe.jpg"] ??
  images["../assets/equipe.png"] ??
  "https://via.placeholder.com/600x400?text=Equipe";

export default function About() {
  return (
    <div className="about-page bg-light py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Texto */}
          <div className="col-md-6">
            <h2 className="mb-3">Sobre Nós</h2>
            <p>
              O <strong>Gato Mia</strong> é uma iniciativa dedicada a apoiar
              famílias e escolas na prevenção e combate ao abuso infantil.
              Acreditamos no poder da informação e da união para construir
              um ambiente mais seguro e acolhedor para nossas crianças.
            </p>
            <p>
              Nossa equipe é formada por educadores, psicólogos e voluntários
              engajados na causa da proteção infantil.
            </p>
          </div>

          {/* Imagem */}
          <div className="col-md-6 text-center">
            <img
              src={equipeUrl}
              alt="Equipe Gato Mia"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
