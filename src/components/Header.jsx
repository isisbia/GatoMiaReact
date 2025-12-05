import React, { useState, useEffect } from "react"; // Adicionado useEffect
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Adicionado useLocation
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.png";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation(); // Hook para saber em qual página estamos

  // 1. Estado para controlar se o menu está aberto ou fechado
  const [expanded, setExpanded] = useState(false);

  // NOVO: Efeito para rolar para o topo sempre que a rota mudar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Executa toda vez que 'pathname' mudar

  const handleLogout = async () => {
    // Fecha o menu antes de sair
    setExpanded(false);
    if (logout) {
      await logout();
    }
    navigate("/login");
  };

  // 2. Função auxiliar para fechar o menu ao clicar em qualquer link
  const closeMenu = () => setExpanded(false);

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className="navbar-gradient shadow-sm"
      // 3. Vinculamos o estado à Navbar para controle manual
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        {/* --- LOGO --- */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" onClick={closeMenu}>
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
            {/* 4. Adicionei onClick={closeMenu} em TODOS os links para fechar o menu mobile */}
            <Nav.Link as={Link} to="/" className="nav-link-white font-opensans" onClick={closeMenu}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-white font-opensans" onClick={closeMenu}>Sobre</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-white font-opensans" onClick={closeMenu}>Contatos</Nav.Link>
            <Nav.Link as={Link} to="/report" className="nav-link-white font-opensans" onClick={closeMenu}>Denuncie</Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" className="nav-link-white font-opensans" onClick={closeMenu}>
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
                  onClick={closeMenu}
                >
                  Entrar
                </Button>

                {/* Botão CADASTRE-SE (Azul) */}
                <Button 
                  as={Link} 
                  to="/Signup" 
                  size="sm" 
                  className="btn-auth btn-cadastrar font-opensans shadow-sm"
                  onClick={closeMenu}
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