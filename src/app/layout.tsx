import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import { ProductProvider } from './context/ProductContext';

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
        <Navbar />
        <ProductProvider>{children}</ProductProvider>
        <Footer />
      </body>
    </html>
  );
}
