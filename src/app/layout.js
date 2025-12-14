import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  title: {
    default: 'Trouve ton artisan - Région Auvergne-Rhône-Alpes',
    template: '%s | Trouve ton artisan'
  },
  description: 'Trouvez facilement un artisan qualifié en Auvergne-Rhône-Alpes. Bâtiment, services, fabrication, alimentation.',
  keywords: ['artisan', 'Auvergne-Rhône-Alpes', 'bâtiment', 'services', 'Lyon', 'Grenoble'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}