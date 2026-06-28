import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = ({ logoText, links }) => {
  const location = useLocation(); // Monitora a página atual para destacar o link ativo

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm py-3">
      <Container>
        {/* Logo clicável que volta para a Home */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary">
          {logoText || "👥 CRM Clientes"}
        </Navbar.Brand>

        {/* Botão para abrir o menu no celular */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links de navegação do menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {links && links.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={link.path}
                  className={`mx-2 px-3 rounded-pill ${
                    isActive ? 'bg-primary text-white fw-bold active' : 'text-light'
                  }`}
                >
                  {link.label}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;