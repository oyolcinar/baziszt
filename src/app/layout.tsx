import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Generated by create next app',
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
        <HamburgerMenu />
        {children}
      </body>
    </html>
  );
}
