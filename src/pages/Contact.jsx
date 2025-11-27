// src/pages/Contact.jsx
import React from "react";
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Container, Row, Col, Card } from "react-bootstrap";

// Importa imagens
import ConselhoTutelar from "../assets/ConselhoTutelar.png";
import Disque100 from "../assets/Disque100.png";
import PM from "../assets/PM.png";
import SaferNet from "../assets/SaferNet.png";

export default function Contact() {
  const contatos = [
    {
      titulo: "Conselho Tutelar",
      img: ConselhoTutelar,
      link: "https://www.gov.br/mdh/pt-br/assuntos/criancas-e-adolescentes/conselhos-tutelares",
    },
    {
      titulo: "Disque 100",
      img: Disque100,
      link: "https://www.gov.br/mdh/pt-br/disque-100",
    },
    {
      titulo: "Polícia Militar",
      img: PM,
      link: "https://www.policiamilitar.sp.gov.br/",
    },
    {
      titulo: "SaferNet",
      img: SaferNet,
      link: "https://www.safernet.org.br/",
    },
  ];

  return (
    <div className="contact-page bg-light py-5">
      <div className="container">
        {/* Título */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Entre em Contato</h2>
          <p className="text-muted">
            Estamos aqui para ouvir você. Fale conosco através do formulário ou
            dos canais abaixo.
          </p>
        </div>

        {/* Seção de contatos importantes */}
        <div className="mb-5">
          <h3 className="text-center mb-4">Contatos Importantes</h3>
          <Row className="g-4">
            {contatos.map((item, index) => (
              <Col key={index} xs={12} sm={6} md={3}>
                <Card className="h-100 shadow-sm text-center">
                  <Card.Img
                    variant="top"
                    src={item.img}
                    alt={item.titulo}
                    style={{ height: "150px", objectFit: "contain", padding: "10px" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.titulo}</Card.Title>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Acessar
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Informações + Formulário */}
        <div className="row g-4">
          {/* Informações de contato */}
          <div className="col-md-5">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-4">Informações</h5>
                <p>
                  <FaEnvelope className="me-2 text-primary" />
                  contato@gatomia.org
                </p>
                <p>
                  <FaPhoneAlt className="me-2 text-primary" />
                  (11) 1234-5678
                </p>
                <p>
                  <FaWhatsapp className="me-2 text-success" />
                  (11) 98765-4321
                </p>
                <p>
                  <FaInstagram className="me-2 text-danger" />
                  @gatomia
                </p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="col-md-7">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-4">Envie sua mensagem</h5>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Digite seu nome"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Digite seu email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mensagem</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Escreva sua mensagem"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
