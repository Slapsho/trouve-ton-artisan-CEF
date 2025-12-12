'use client';

import Link from 'next/link';
import { Card } from 'react-bootstrap';
import StarRating from './StarRating';
import styles from './ArtisanCard.module.scss';

export default function ArtisanCard({ artisan }) {
  return (
    <Card className={styles.card} as={Link} href={`/artisan/${artisan.id}`}>
      <Card.Body>
        <Card.Title className={styles.name}>{artisan.name}</Card.Title>
        <StarRating rating={artisan.rating} />
        <Card.Text className={styles.specialty}>
          <strong>Spécialité :</strong> {artisan.specialty}
        </Card.Text>
        <Card.Text className={styles.location}>
          📍 {artisan.location}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}