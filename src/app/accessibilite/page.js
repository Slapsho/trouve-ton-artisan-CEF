import { Container } from 'react-bootstrap';
import styles from '../mentions-legales/legal.module.scss';


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