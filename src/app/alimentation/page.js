import { Container, Row, Col } from 'react-bootstrap';
import ArtisanCard from '@/components/ArtisanCard';
import { getArtisansByCategory } from '@/services/artisanService';
import styles from '../batiment/category.module.scss';

export const metadata = {
  title: 'Artisans de l\'alimentation - Trouve ton artisan',
  description: 'Trouvez des artisans de l\'alimentation en région Auvergne-Rhône-Alpes',
};

export default async function AlimentationPage() {
  const artisans = await getArtisansByCategory('alimentation');

  return (
    <div className={styles.categoryPage}>
      <Container>
        <div className={styles.header}>
          <h1>Artisans de l'alimentation</h1>
          <p className={styles.description}>
            Découvrez nos artisans du goût : boulangers, pâtissiers, 
            fromagers, bouchers et bien plus encore.
          </p>
          <p className={styles.count}>
            {artisans.length} artisan{artisans.length > 1 ? 's' : ''} disponible{artisans.length > 1 ? 's' : ''}
          </p>
        </div>

        {artisans.length > 0 ? (
          <Row className="g-4">
            {artisans.map(artisan => (
              <Col key={artisan.id} md={6} lg={4}>
                <ArtisanCard artisan={artisan} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className={styles.noResults}>
            <p>Aucun artisan trouvé dans cette catégorie pour le moment.</p>
          </div>
        )}
      </Container>
    </div>
  );
}