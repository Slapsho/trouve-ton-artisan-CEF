import { Alert } from 'react-bootstrap';
import styles from './ErrorMessage.module.scss';

export default function ErrorMessage({ 
  message = "Une erreur est survenue",
  type = "danger",
  onRetry = null
}) {
  return (
    <div className={styles.errorContainer}>
      <Alert variant={type} className={styles.alert}>
        <Alert.Heading>
          {type === 'danger' ? '❌' : 'ℹ️'} Erreur
        </Alert.Heading>
        <p>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className={styles.retryButton}>
            🔄 Réessayer
          </button>
        )}
      </Alert>
    </div>
  );
}