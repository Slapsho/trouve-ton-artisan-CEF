import styles from './StarRating.module.scss';

export default function StarRating({ rating }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`full-${i}`} className={styles.star} aria-hidden="true">★</span>
    );
  }


  if (hasHalfStar) {
    stars.push(
      <span key="half" className={styles.halfStar} aria-hidden="true">★</span>
    );
  }


  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className={styles.emptyStar} aria-hidden="true">★</span>
    );
  }

  return (
    <div className={styles.starRating}>
      {stars}
      <span className="visually-hidden">{rating} sur 5 étoiles</span>
    </div>
  );
}