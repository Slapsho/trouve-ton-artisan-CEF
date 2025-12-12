'use client';

import { Container, Row, Col } from 'react-bootstrap';
import ArtisanCard from '@/components/ArtisanCard';
import { getArtisansByCategory } from '@/services/artisanService';
import styles from '../batiment/category.module.scss';

export default async function FabricationPage() {
  const artisans = await getArtisansByCategory('fabrication');

  return (
    <div className={styles.categoryPage}>
      <Container>
        <div className={styles.header}>
          <h1>Artisans de fabrication</h1>
          <p className={styles.description}>
            Découvrez nos artisans créateurs : ébénistes, potiers, 
            forgerons, couturiers et artisans d'art.
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