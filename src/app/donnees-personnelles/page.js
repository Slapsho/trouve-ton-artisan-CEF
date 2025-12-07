import { Container } from 'react-bootstrap';
import styles from '../mentions-legales/legal.module.scss';

export const metadata = {
  title: 'Données personnelles - Trouve ton artisan',
  description: 'Politique de protection des données personnelles',
};

export default function DonneesPersonnellesPage() {
  return (
    <div className={styles.legalPage}>
      <Container>
        <h1>Données personnelles</h1>
        <p className={styles.empty}>
          Cette page sera complétée ultérieurement par un cabinet spécialisé.
        </p>
      </Container>
    </div>
  );
}