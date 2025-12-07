import { Container, Row, Col } from 'react-bootstrap';
import ArtisanCard from '@/components/ArtisanCard';
import { getArtisansByCategory } from '@/services/artisanService';
import styles from './category.module.scss';

export const metadata = {
  title: 'Artisans du bâtiment - Trouve ton artisan',
  description: 'Trouvez des artisans spécialisés dans le bâtiment en région Auvergne-Rhône-Alpes',
};

export default async function BatimentPage() {
  const artisans = await getArtisansByCategory('batiment');

  return (
    <div className={styles.categoryPage}>
      <Container>
       
        <div className={styles.header}>
          <h1>Artisans du bâtiment</h1>
          <p className={styles.description}>
            Découvrez nos artisans spécialisés dans le bâtiment : menuisiers, 
            plombiers, électriciens, maçons et bien plus encore.
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