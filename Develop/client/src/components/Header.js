import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Google Books Search</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/search">Search</Nav.Link>
        <Nav.Link as={Link} to="/saved">Saved</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;