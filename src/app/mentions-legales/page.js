import { Container } from 'react-bootstrap';
import styles from './legal.module.scss';

export const metadata = {
  title: 'Mentions légales - Trouve ton artisan',
};

export default function MentionsLegalesPage() {
  return (
    <div className={styles.legalPage}>
      <Container>
        <h1>Mentions légales</h1>
        <p className={styles.empty}>
          Cette page sera complétée ultérieurement par un cabinet spécialisé.
        </p>
      </Container>
    </div>
  );
}