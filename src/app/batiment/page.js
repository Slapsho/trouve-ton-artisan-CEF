'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArtisanCard from '@/components/ArtisanCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getArtisansByCategory } from '@/services/artisanService';
import styles from './category.module.scss';

export default function BatimentPage() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArtisans() {
      const data = await getArtisansByCategory('batiment');
      setArtisans(data);
      setLoading(false);
    }
    loadArtisans();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Recherche des artisans du bâtiment..." />;
  }

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