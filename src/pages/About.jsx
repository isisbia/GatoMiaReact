import React from "react";
import { Link } from "react-router-dom";

const images = import.meta.glob("../assets/*.{jpg,jpeg,png,webp}", {
  query: "?url",
  import: "default",
  eager: true,
});

const getImage = (fileName) => {
  const path = `../assets/${fileName}`;
  return images[path] ?? "https://via.placeholder.com/300x300?text=Foto";
};

// --- DADOS DA EQUIPE ---
// EDITE AQUI: Adicione os dados reais dos integrantes
const teamMembers = [
  {
    id: 1,
    name: "Isis Beatriz",
    role: "Desenvolvedora Frontend",
    photo: "Isis.png", 
    linkedin: "https://www.linkedin.com/in/isisbeatrizbonfim/",
    github: "https://github.com",
  },
  {
    id: 2,
    name: "Ana Medeiros",
    role: "Designer e Documentação",
    photo: "Ana.jpeg",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: 3,
    name: "Victor Portolani",
    role: "Desenvolvedor Backend",
    photo: "Victor.jpg",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
];

// Imagem principal da página (Escritório/Equipe Geral)
const officeImg = getImage("GatoMiaOffice.jpg");

export default function About() {
  return (
    <div className="about-page bg-light min-vh-100">
      
      {/* 1. SEÇÃO INTRODUTÓRIA */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          {/* Texto */}
          <div className="col-lg-6">
            <h2 className="mb-4 font-adlam display-5">Sobre Nós</h2>
            <p className="lead text-muted mb-4">
              O <strong>Gato Mia</strong> é uma iniciativa dedicada a apoiar
              famílias e pessoas próximas na prevenção e combate ao abuso infantil.
            </p>
            <p className="text-secondary fs-5">
              Acreditamos no poder da informação e da união para construir
              um ambiente mais seguro e acolhedor para nossas crianças.
              Nossa abordagem combina tecnologia, acolhimento e conteúdo 
              educativo de qualidade.
            </p>
          </div>

          {/* Imagem Principal */}
          <div className="col-lg-6 text-center">
            <img
              src={officeImg}
              alt="Escritório Gato Mia"
              className="img-fluid rounded-4 shadow-lg"
              style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO DA EQUIPE (CARDS) */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="font-adlam text-dark">Quem Faz Acontecer</h2>
            <p className="text-muted">Conheça as pessoas por trás do projeto</p>
          </div>

          <div className="row g-4 justify-content-center">
            {teamMembers.map((member) => (
              <div key={member.id} className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm hover-card transition-all">
                  
                  {/* Foto do Integrante */}
                  <div className="card-img-top overflow-hidden" style={{ height: "280px" }}>
                    <img
                      src={getImage(member.photo)}
                      alt={member.name}
                      className="w-100 h-100 object-fit-cover"
                      style={{ objectPosition: "center top" }}
                    />
                  </div>

                  {/* Informações */}
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title fw-bold font-adlam mb-1">{member.name}</h5>
                    <p className="card-text text-primary small fw-semibold mb-3">
                      {member.role}
                    </p>
                    
                    {/* Botões de Redes Sociais */}
                    <div className="mt-auto d-flex justify-content-center gap-2">
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "36px", height: "36px" }}
                        title="LinkedIn"
                      >
                        <i className="bi bi-linkedin">in</i>
                      </a>
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-dark btn-sm rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "36px", height: "36px" }}
                        title="GitHub"
                      >
                        <i className="bi bi-github">Git</i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estilo para efeito hover nos cards */}
      <style>{`
        .hover-card:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
}