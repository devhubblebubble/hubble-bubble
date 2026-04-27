import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '../style/globals.scss';
import ParallaxStars from '@/components/Background/ParallaxStars';
import ShootingStars from '@/components/Background/ShootingStars';
import GlowEllipse from '@/components/Effects/GlowEllipse';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Hubble Works',
  description: 'Fuel your passion with the perfect counsel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable}`}>
        <ParallaxStars />
          {/* <GlowEllipse
        variant="hero"
        position={{ 
          top: '-761px', 
          left: '797px' 
        }}
        size="large"
        zIndex={5}
      /> */}
        <ShootingStars />
        {children}
      </body>
    </html>
  );
}
