'use client';

import Link from 'next/link';
import { Container } from 'react-bootstrap';
import styles from './Breadcrumb.module.scss'; 

export default function Breadcrumb({ items = [] }) {
  
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={styles.breadcrumbWrapper}>
      <Container>
        <nav aria-label="Fil d'Ariane" className={styles.breadcrumb}>
          <ol className={styles.breadcrumbList}>
            
            <li className={styles.breadcrumbItem}>
              <Link href="/" className={styles.breadcrumbLink}>
                <span className={styles.icon}>🏠</span>
                <span className={styles.label}>Accueil</span>
              </Link>
            </li>

            
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <li key={index} className={styles.breadcrumbItem}>
                  
                  <span className={styles.separator} aria-hidden="true">
                    /
                  </span>

                
                  {isLast ? (
                    <span className={styles.current} aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.href} className={styles.breadcrumbLink}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </div>
  );
}