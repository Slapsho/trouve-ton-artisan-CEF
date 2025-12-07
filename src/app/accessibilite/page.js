import { Container } from 'react-bootstrap';
import styles from '../mentions-legales/legal.module.scss';

export const metadata = {
  title: 'Accessibilité - Trouve ton artisan',
  description: 'Déclaration d\'accessibilité du site',
};

export default function AccessibilitePage() {
  return (
    <div className={styles.legalPage}>
      <Container>
        <h1>Accessibilité</h1>
        <p className={styles.empty}>
          Cette page sera complétée ultérieurement par un cabinet spécialisé.
        </p>
      </Container>
    </div>
  );
}