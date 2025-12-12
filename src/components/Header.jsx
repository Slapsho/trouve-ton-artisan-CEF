'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap';
import styles from './Header.module.scss';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className={styles.header}>
      <Navbar expand="lg" className={styles.navbar}>
        <Container>
          <Navbar.Brand as={Link} href="/">
            <img 
              src="/images/logo.svg" 
              alt="Trouve ton artisan" 
              className={styles.logo}
              height="50"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/batiment">Bâtiment</Nav.Link>
              <Nav.Link as={Link} href="/services">Services</Nav.Link>
              <Nav.Link as={Link} href="/fabrication">Fabrication</Nav.Link>
              <Nav.Link as={Link} href="/alimentation">Alimentation</Nav.Link>
            </Nav>

            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Rechercher un artisan..."
                className="me-2"
                aria-label="Rechercher"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                variant="primary" 
                type="submit"
                disabled={!searchQuery.trim()}
              >
                Rechercher
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}