'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArtisanCard from '@/components/ArtisanCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import NoResults from '@/components/NoResults';
import Breadcrumb from '@/components/Breadcrumb';  
import { getArtisansByCategory } from '@/services/artisanService';
import styles from '../batiment/category.module.scss';

export default function FabricationPage() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArtisans() {
      const data = await getArtisansByCategory('fabrication');
      setArtisans(data);
      setLoading(false);
    }
    loadArtisans();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Recherche des artisans de fabrication..." />;
  }

  return (
    <>
      
      <Breadcrumb items={[
        { label: 'Fabrication' }
      ]} />

      
      <div className={styles.categoryPage}>
        <Container>
          <div className={styles.header}>
            <h1>Artisans de fabrication</h1>
            <p className={styles.description}>
              Découvrez nos artisans créateurs et fabricants : ébénistes, 
              potiers, forgerons, couturiers, bijoutiers et artisans d'art.
            </p>
            {artisans.length > 0 && (
              <p className={styles.count}>
                {artisans.length} artisan{artisans.length > 1 ? 's' : ''} disponible{artisans.length > 1 ? 's' : ''}
              </p>
            )}
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
            <NoResults 
              title="Aucun artisan de fabrication"
              message="Aucun artisan de fabrication n'est disponible pour le moment dans notre base de données."
              showSuggestions={false}
              showCategories={true}
            />
          )}
        </Container>
      </div>
    </>
  );
}