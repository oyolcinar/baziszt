import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import { ThresholdProvider } from './context/ThresholdContext';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { ScrollProvider } from './context/ScrollContext';
import { BannerProvider } from './context/BannerContext';
import { MenuProvider } from './context/MenuContext';
import { LanguageProvider } from './context/LanguageContext';
import { NewsletterProvider } from './context/NewsletterContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'baziszt', template: '%s | baziszt' },
  description: 'baziszt',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='stylesheet' href='https://use.typekit.net/bbr3pbr.css' />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <NewsletterProvider>
            <ThresholdProvider>
              <MenuProvider>
                <BannerProvider>
                  <ScrollProvider>
                    <UserProvider>
                      <CartProvider>
                        <ProductProvider>
                          <Navbar />
                          {children}
                          <Footer />
                        </ProductProvider>
                      </CartProvider>
                    </UserProvider>
                  </ScrollProvider>
                </BannerProvider>
              </MenuProvider>
            </ThresholdProvider>
          </NewsletterProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
