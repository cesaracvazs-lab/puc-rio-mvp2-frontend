import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = ({ links }) => {
  const location = useLocation();

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm py-3">
        <Container>
          <Link to="/" className="fw-bold fs-4 text-primary text-decoration-none">
            {"👥 CRM Clientes"}
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

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
    </header>
  );
};

export default Header;