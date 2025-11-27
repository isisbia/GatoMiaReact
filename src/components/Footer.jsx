// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="footer mt-auto">
      <div className="container footer-container py-3">
        {/* Ícones */}
        <div className="social-icons">
          <a href="#" className="text-decoration-none me-3" aria-label="Instagram">
            <i className="bi bi-instagram" style={{ fontSize: "1.25rem", color: "#ddd" }} />
          </a>
          <a href="#" className="text-decoration-none me-3" aria-label="WhatsApp">
            <i className="bi bi-whatsapp" style={{ fontSize: "1.25rem", color: "#ddd" }} />
          </a>
          <a href="#" className="text-decoration-none" aria-label="GitHub">
            <i className="bi bi-github" style={{ fontSize: "1.25rem", color: "#ddd" }} />
          </a>
        </div>

        {/* Texto */}
        <div className="text-light text-center">© 2025 Gato Mia</div>

        {/* Links */}
        <div className="footer-links">
          <a href="/terms" className="text-light text-decoration-none me-3">Termos de Uso</a>
          <a href="/privacy" className="text-light text-decoration-none">Privacidade</a>
        </div>
      </div>
    </footer>
  );
}
