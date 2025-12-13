'use client';

import Link from 'next/link';
import { Container, Button } from 'react-bootstrap';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <Container>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <div className={styles.errorIcon}>🔍</div>
          </div>
          
          <h1 className={styles.title}>404</h1>
          
          <h2 className={styles.subtitle}>Page non trouvée</h2>
          
          <p className={styles.text}>
            Oups ! La page que vous recherchez semble introuvable.
            Elle a peut-être été déplacée ou n'existe plus.
          </p>
          
          <div className={styles.actions}>
            <Button 
              as={Link} 
              href="/" 
              variant="primary" 
              size="lg"
              className="me-2"
            >
              🏠 Retour à l'accueil
            </Button>
            <Button 
              as={Link} 
              href="/batiment" 
              variant="outline-primary" 
              size="lg"
            >
              🔧 Voir les artisans
            </Button>
          </div>

          <div className={styles.categories}>
            <p>Ou parcourez nos catégories :</p>
            <div className={styles.categoryLinks}>
              <Link href="/batiment">Bâtiment</Link>
              <Link href="/services">Services</Link>
              <Link href="/fabrication">Fabrication</Link>
              <Link href="/alimentation">Alimentation</Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}