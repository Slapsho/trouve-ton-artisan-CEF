import styles from './LoadingSpinner.module.scss';

export default function LoadingSpinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}></div>
      <p>Chargement...</p>
    </div>
  );
}