import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: { default: 'Protege Schools | Dream. Believe. Achieve.', template: '%s | Protege Schools' },
  description: 'Discover a nurturing learning community where every child is encouraged to explore, grow, and thrive.',
  openGraph: {
    title: 'Protege Schools | Dream. Believe. Achieve.',
    description: 'A nurturing learning community where every child is encouraged to explore, grow, and thrive.',
    images: [{ url: '/images/gallery/mural-pupils.jpg', width: 607, height: 1080, alt: 'Protege pupils in front of a vibrant painted mural' }],
    type: 'website',
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader/><main>{children}</main><SiteFooter/></body></html>;
}
