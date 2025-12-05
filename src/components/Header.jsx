import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.png";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
    navigate("/login");
  };

  return (
    <Navbar expand="lg" fixed="top" className="navbar-gradient shadow-sm">
      <Container>
        {/* --- LOGO --- */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <div className="brand-icon me-2">
            <img src={logo} alt="Logo Gato Mia" className="brand-img" height="30" style={{ borderRadius: '50%' }} />
          </div>
          {/* Fonte Adlam no Título */}
          <span className="brand-text text-white fs-3 font-adlam">Gato Mia</span>
        </Navbar.Brand>

        {/* Botão Hamburguer Customizado */}
        <Navbar.Toggle aria-controls="main-navbar" className="custom-toggler">
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center gap-3">
            {/* Links com a classe 'nav-link-white' do index.css */}
            <Nav.Link as={Link} to="/" className="nav-link-white font-opensans">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-white font-opensans">Sobre</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-white font-opensans">Contatos</Nav.Link>
            <Nav.Link as={Link} to="/report" className="nav-link-white font-opensans">Denuncie</Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" className="nav-link-white font-opensans">
                  Olá, {user.displayName ? user.displayName.split(" ")[0] : "Perfil"}
                </Nav.Link>

                {/* Botão SAIR (Estilo Translúcido) */}
                <Button
                  size="sm"
                  className="btn-logout px-4 fw-bold font-opensans"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </>
            ) : (
              <div className="d-flex gap-2">
                {/* Botão ENTRAR (Verde) */}
                <Button 
                  as={Link} 
                  to="/login" 
                  size="sm" 
                  className="btn-auth btn-entrar font-opensans shadow-sm"
                >
                  Entrar
                </Button>

                {/* Botão CADASTRE-SE (Azul) */}
                <Button 
                  as={Link} 
                  to="/Signup" 
                  size="sm" 
                  className="btn-auth btn-cadastrar font-opensans shadow-sm"
                >
                  Cadastre-se
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}