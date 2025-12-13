'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ArtisanCard from '@/components/ArtisanCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getTopArtisans } from '@/services/artisanService';
import styles from './page.module.scss';

export default function Home() {
  const [topArtisans, setTopArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArtisans() {
      const artisans = await getTopArtisans();
      setTopArtisans(artisans);
      setLoading(false); // ✅ Important : mettre false après le chargement
    }
    loadArtisans();
  }, []);

  // ✅ Si loading = true, afficher le spinner
  if (loading) {
    return <LoadingSpinner message="Chargement des artisans..." />;
  }

  return (
    <div className={styles.homePage}>
      {/* Section Hero */}
      <section className={styles.hero}>
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <h1 className={styles.title}>Trouvez l'artisan qu'il vous faut</h1>
              <p className={styles.subtitle}>
                Des artisans qualifiés de la région Auvergne-Rhône-Alpes 
                à votre service pour tous vos projets
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section Comment ça marche */}
      <section className={styles.howItWorks}>
        <Container>
          <h2 className="text-center mb-5">Comment trouver mon artisan ?</h2>
          
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className={styles.stepCard}>
                <Card.Body className="text-center">
                  <div className={styles.stepNumber}>1</div>
                  <h3 className={styles.stepTitle}>Choisir la catégorie</h3>
                  <p className={styles.stepText}>
                    Sélectionnez la catégorie d'artisanat qui correspond 
                    à votre besoin dans le menu
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className={styles.stepCard}>
                <Card.Body className="text-center">
                  <div className={styles.stepNumber}>2</div>
                  <h3 className={styles.stepTitle}>Choisir un artisan</h3>
                  <p className={styles.stepText}>
                    Parcourez les profils des artisans et consultez 
                    leurs notes et spécialités
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className={styles.stepCard}>
                <Card.Body className="text-center">
                  <div className={styles.stepNumber}>3</div>
                  <h3 className={styles.stepTitle}>Le contacter</h3>
                  <p className={styles.stepText}>
                    Remplissez le formulaire de contact pour envoyer 
                    votre demande directement à l'artisan
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className={styles.stepCard}>
                <Card.Body className="text-center">
                  <div className={styles.stepNumber}>4</div>
                  <h3 className={styles.stepTitle}>Recevoir une réponse</h3>
                  <p className={styles.stepText}>
                    L'artisan vous répondra sous 48h avec les 
                    informations demandées
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section Artisans du mois */}
      <section className={styles.topArtisans}>
        <Container>
          <h2 className="text-center mb-5">Les artisans du mois</h2>
          
          {topArtisans.length > 0 ? (
            <Row className="g-4">
              {topArtisans.map(artisan => (
                <Col key={artisan.id} md={6} lg={4}>
                  <ArtisanCard artisan={artisan} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center">
              <p>Aucun artisan du mois pour le moment.</p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}