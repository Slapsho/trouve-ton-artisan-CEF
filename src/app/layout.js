import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Trouve ton artisan - Auvergne-Rhône-Alpes',
  description: 'Trouvez facilement un artisan qualifié dans votre région',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}