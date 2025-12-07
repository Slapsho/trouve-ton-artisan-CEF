'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import ArtisanCard from '@/components/ArtisanCard';
import { searchArtisans } from '@/services/artisanService';
import styles from './recherche.module.scss';

export default function RecherchePage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (query) {
        const results = await searchArtisans(query);
        setArtisans(results);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <div className={styles.recherchePage}>
      <Container>
        <div className={styles.header}>
          <h1>Résultats de recherche</h1>
          {query && (
            <p className={styles.query}>
              Recherche pour : <strong>"{query}"</strong>
            </p>
          )}
        </div>

        {loading ? (
          <div className={styles.loading}>
            <Spinner animation="border" variant="primary" />
            <p>Recherche en cours...</p>
          </div>
        ) : (
          <>
            {artisans.length > 0 ? (
              <>
                <p className={styles.count}>
                  {artisans.length} résultat{artisans.length > 1 ? 's' : ''} trouvé{artisans.length > 1 ? 's' : ''}
                </p>
                <Row className="g-4">
                  {artisans.map(artisan => (
                    <Col key={artisan.id} md={6} lg={4}>
                      <ArtisanCard artisan={artisan} />
                    </Col>
                  ))}
                </Row>
              </>
            ) : (
              <div className={styles.noResults}>
                <p>Aucun artisan trouvé pour votre recherche.</p>
                <p className={styles.suggestion}>
                  Essayez avec d'autres mots-clés ou parcourez nos catégories.
                </p>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}