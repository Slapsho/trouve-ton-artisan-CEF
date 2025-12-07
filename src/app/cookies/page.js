import { Container } from 'react-bootstrap';
import styles from '../mentions-legales/legal.module.scss';

export const metadata = {
  title: 'Cookies - Trouve ton artisan',
  description: 'Politique de gestion des cookies',
};

export default function CookiesPage() {
  return (
    <div className={styles.legalPage}>
      <Container>
        <h1>Cookies</h1>
        <p className={styles.empty}>
          Cette page sera complétée ultérieurement par un cabinet spécialisé.
        </p>
      </Container>
    </div>
  );
}