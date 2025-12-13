'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import StarRating from '@/components/StarRating';
import ContactForm from '@/components/ContactForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import Breadcrumb from '@/components/Breadcrumb';  
import { getArtisanById } from '@/services/artisanService';
import styles from './artisan.module.scss';

export default function ArtisanPage({ params }) {
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArtisan() {
      const data = await getArtisanById(params.id);
      setArtisan(data);
      setLoading(false);
    }
    loadArtisan();
  }, [params.id]);

  if (loading) {
    return <LoadingSpinner message="Chargement du profil..." />;
  }

  if (!artisan) {
    notFound();
  }

  
  const getCategoryLabel = (category) => {
    const labels = {
      'batiment': 'Bâtiment',
      'services': 'Services',
      'fabrication': 'Fabrication',
      'alimentation': 'Alimentation'
    };
    return labels[category] || category;
  };

  const getCategoryHref = (category) => {
    return `/${category}`;
  };

  return (
    <>
     
      <Breadcrumb items={[
        { 
          label: getCategoryLabel(artisan.category), 
          href: getCategoryHref(artisan.category) 
        },
        { label: artisan.name }
      ]} />

      <div className={styles.artisanPage}>
        <Container>
          <Row className="g-4">
            <Col lg={6}>
              <Card className={styles.infoCard}>
                <Card.Body>
                  <h1 className={styles.name}>{artisan.name}</h1>
                  
                  <div className={styles.rating}>
                    <StarRating rating={artisan.rating} />
                    <span className={styles.ratingText}>
                      {artisan.rating}/5
                    </span>
                  </div>

                  <div className={styles.detail}>
                    <strong>Spécialité :</strong>
                    <span>{artisan.specialty}</span>
                  </div>

                  <div className={styles.detail}>
                    <strong>Localisation :</strong>
                    <span>📍 {artisan.location}</span>
                  </div>

                  {artisan.about && (
                    <div className={styles.about}>
                      <h2>À propos</h2>
                      <p>{artisan.about}</p>
                    </div>
                  )}

                  {artisan.website && (
                    <div className={styles.website}>
                      <Button 
                        variant="outline-primary" 
                        href={artisan.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🌐 Visiter le site web
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <ContactForm 
                artisanEmail={artisan.email}
                artisanName={artisan.name}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}