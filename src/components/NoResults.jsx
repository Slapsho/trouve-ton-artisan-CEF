import Link from 'next/link';
import { Button } from 'react-bootstrap';
import styles from './NoResults.module.scss';

export default function NoResults({ 
  title = "Aucun résultat trouvé",
  message = "Aucun artisan ne correspond à votre recherche.",
  showSuggestions = true,
  showCategories = true
}) {
  return (
    <div className={styles.noResults}>
      <div className={styles.icon}>🔍</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      
      {showSuggestions && (
        <div className={styles.suggestions}>
          <p className={styles.suggestionsTitle}>Suggestions :</p>
          <ul className={styles.suggestionsList}>
            <li>Vérifiez l'orthographe de votre recherche</li>
            <li>Essayez des mots-clés plus généraux</li>
            <li>Parcourez nos catégories ci-dessous</li>
          </ul>
        </div>
      )}
      
      {showCategories && (
        <div className={styles.categories}>
          <p className={styles.categoriesTitle}>Parcourir par catégorie :</p>
          <div className={styles.categoryButtons}>
            <Button as={Link} href="/batiment" variant="outline-primary" className="me-2 mb-2">
              🏗️ Bâtiment
            </Button>
            <Button as={Link} href="/services" variant="outline-primary" className="me-2 mb-2">
              🔧 Services
            </Button>
            <Button as={Link} href="/fabrication" variant="outline-primary" className="me-2 mb-2">
              ⚒️ Fabrication
            </Button>
            <Button as={Link} href="/alimentation" variant="outline-primary" className="mb-2">
              🍞 Alimentation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}