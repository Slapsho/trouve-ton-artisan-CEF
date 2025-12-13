'use client';

import { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.scss';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const toggleVisibility = () => {

      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    
    window.addEventListener('scroll', toggleVisibility);

  
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  
  if (!isVisible) {
    return null;
  }

  return (
    <button
      className={styles.scrollTop}
      onClick={scrollToTop}
      aria-label="Retour en haut de la page"
      title="Retour en haut"
    >
      <span className={styles.arrow}>↑</span>
    </button>
  );
}