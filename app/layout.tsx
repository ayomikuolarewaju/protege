import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: { default: 'Protege Schools | Learn. Grow. Thrive.', template: '%s | Protege Schools' },
  description: 'Discover a nurturing learning community where every child is encouraged to explore, grow, and thrive.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader/><main>{children}</main><SiteFooter/></body></html>;
}
