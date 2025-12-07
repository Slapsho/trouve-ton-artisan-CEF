import Link from 'next/link';
import { Container, Button } from 'react-bootstrap';
import styles from './not-found.module.scss';

export const metadata = {
  title: '404 - Page non trouvée',
  description: 'La page que vous recherchez n\'existe pas',
};

export default function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <Container>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img 
              src="/images/404-image.png" 
              alt="Page non trouvée"
              className={styles.image}
            />
          </div>
          
          <h1 className={styles.title}>404</h1>
          
          <h2 className={styles.subtitle}>Page non trouvée</h2>
          
          <p className={styles.text}>
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
          <div className={styles.actions}>
            <Button 
              as={Link} 
              href="/" 
              variant="primary" 
              size="lg"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}