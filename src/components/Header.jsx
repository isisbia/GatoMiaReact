// src/components/Header.jsx
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.png";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" fixed="top" className="navbar-gradient">
      <Container>
        {/* Logo + Nome */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <div className="brand-icon me-2">
            <img src={logo} alt="Logo Gato Mia" className="brand-img" />
          </div>
          <span className="brand-text">Gato Mia</span>
        </Navbar.Brand>

        {/* Hamburguer corrigido */}
        <Navbar.Toggle
          aria-controls="main-navbar"
          className="custom-toggler"
        />

        {/* Menu */}
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white">
              Sobre
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-white">
              Contatos
            </Nav.Link>
            <Nav.Link as={Link} to="/report" className="text-white">
              Denúncie
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" className="text-white">
                  Perfil
                </Nav.Link>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="ms-2 btn-auth btn-logout"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </>
            ) : (
              <div className="d-flex gap-2 mt-2 mt-lg-0">
                <Button
                  as={Link}
                  to="/login"
                  size="sm"
                  className="btn-auth btn-entrar"
                >
                  Entrar
                </Button>
                <Button
                  as={Link}
                  to="/signup"
                  size="sm"
                  className="btn-auth btn-cadastrar"
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
