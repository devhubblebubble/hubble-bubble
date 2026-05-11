import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../style/globals.scss';
import ParallaxStars from '@/components/Background/ParallaxStars';
import ShootingStars from '@/components/Background/ShootingStars';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import TransitionProvider from '@/providers/TransitionProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
      <body className={`${poppins.className} ${poppins.variable}`}>
         <ParallaxStars />
        {/* <ShootingStars />  */}
        <ScrollReveal />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
