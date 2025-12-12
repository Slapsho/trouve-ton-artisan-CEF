'use client';

import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          {/* Liens légaux */}
          <Col md={6} className="mb-3 mb-md-0">
            <h5>Pages légales</h5>
            <ul className={styles.legalLinks}>
              <li><Link href="/mentions-legales">Mentions légales</Link></li>
              <li><Link href="/donnees-personnelles">Données personnelles</Link></li>
              <li><Link href="/accessibilite">Accessibilité</Link></li>
              <li><Link href="/cookies">Cookies</Link></li>
            </ul>
          </Col>

          {/* Coordonnées */}
          <Col md={6}>
            <h5>Nous contacter</h5>
            <address className={styles.contact}>
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
            </address>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Région Auvergne-Rhône-Alpes - Tous droits réservés
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}