'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArtisanCard from '@/components/ArtisanCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getArtisansByCategory } from '@/services/artisanService';
import styles from '../batiment/category.module.scss';

export default function ServicesPage() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArtisans() {
      const data = await getArtisansByCategory('services');
      setArtisans(data);
      setLoading(false);
    }
    loadArtisans();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Recherche des artisans de services..." />;
  }

  return (
    <div className={styles.categoryPage}>
      <Container>
        <div className={styles.header}>
          <h1>Artisans de services</h1>
          <p className={styles.description}>
            Découvrez nos artisans spécialisés dans les services : 
            plombiers, électriciens, coiffeurs, paysagistes, dépannage 
            et bien plus encore.
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