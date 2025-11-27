// src/pages/Home.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import abuso from "../assets/abuso.jpg";
import conversa from "../assets/conversa.jpg";
import escola from "../assets/escola.jpg";

export default function Home() {
  const { user } = useAuth();
  const noticias = [
    {
      id: 1,
      image: abuso,
      title: "Sinais de Abuso Infantil",
      description:
        "Identifique comportamentos e atitudes que podem indicar que uma criança está em risco.",
    },
    {
      id: 2,
      image: conversa,
      title: "Como Conversar com seu Filho",
      description:
        "Dicas para abrir um diálogo seguro e acolhedor sobre temas delicados.",
    },
    {
      id: 3,
      image: escola,
      title: "Prevenção em Casa e na Escola",
      description:
        "Medidas práticas para tornar os ambientes mais seguros e acolhedores.",
    },
  ];

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="bg-light text-dark py-3 text-center shadow-sm rounded mb-5">
        <div className="container">
          <h1 className="fw-bold display-5">Bem-vindo ao Gato Mia</h1>
          <p className="lead mb-3">
            Juntos pela proteção e bem-estar das crianças.<br></br> 
            Sua rede de apoio contra o abuso sexual.
          </p>
          {!user && (
            <a href="/signup" className="btn btn-primary btn-lg">
              Cadastre-se
            </a>
          )}
        </div>
      </section>

      {/* SOBRE NÓS */}
      <section className="container my-5">
        <div className="row align-items-center g-5">
          {/* Imagem */}
          <div className="col-12 col-lg-6">
            <img
              src={abuso}
              alt="Família unida"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Texto */}
          <div className="col-12 col-lg-6">
            <h2 className="fw-bold mb-4">Sobre Nós</h2>
            <p className="text-muted fs-5">
              O <strong>Gato Mia</strong> nasceu com a missão de proteger, 
              informar e apoiar famílias, educadores e a sociedade na luta contra 
              o abuso infantil. Nosso objetivo é oferecer informação acessível, 
              promover a conscientização e criar um espaço seguro para todos.
            </p>
            <p className="text-muted fs-5">
              Acreditamos que a <strong>prevenção</strong> começa com o 
              <strong> conhecimento</strong>, e que juntos podemos construir um 
              futuro mais acolhedor e seguro para nossas crianças.
            </p>
            <a href="/about" className="btn btn-outline-primary btn-lg mt-3">
              Saiba mais
            </a>
          </div>
        </div>
      </section>

      {/* NOTÍCIAS */}
      <section className="container my-5">
        <h2 className="text-center mb-5 fw-bold">Últimas Notícias</h2>

        <div className="row g-4">
          {noticias.map((n) => (
            <div key={n.id} className="col-12 col-md-6 col-lg-4 d-flex">
              <div className="card shadow-sm w-100 h-100">
                <img
                  src={n.image}
                  alt={n.title}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{n.title}</h5>
                  <p className="card-text text-muted">{n.description}</p>
                  <div className="mt-auto">
                    <a href="#" className="btn btn-primary btn-sm">
                      Leia mais
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
