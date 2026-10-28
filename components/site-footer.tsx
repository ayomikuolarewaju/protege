import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Logo from './logo';

export default function SiteFooter() {
  const phone = process.env.NEXT_PUBLIC_SCHOOL_PHONE || '+234 000 000 0000';
  const email = process.env.NEXT_PUBLIC_SCHOOL_EMAIL || 'hello@protegeschools.example';
  const wa = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2340000000000').replace(/\D/g, '');
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="adire h-3" aria-hidden="true" />
      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Link href="/" aria-label="Protege Schools home"><Logo light /></Link>
          <p className="mt-6 max-w-sm leading-7 text-white/65">Growing curious minds, building confident learners, and preparing every child for a bright future.</p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold">Explore</h3>
          <div className="mt-4 space-y-3 text-white/70">
            <Link className="block transition hover:text-white" href="/">Home</Link>
            <Link className="block transition hover:text-white" href="/gallery">School gallery</Link>
            <Link className="block transition hover:text-white" href="/contact">Admissions and enquiries</Link>
          </div>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold">Get in touch</h3>
          <div className="mt-4 space-y-4 text-white/70">
            <a className="flex items-center gap-3 transition hover:text-white" href={`tel:${phone.replace(/\s/g, '')}`}><Phone size={17} className="text-hibiscus" />{phone}</a>
            <a className="flex items-center gap-3 break-all transition hover:text-white" href={`mailto:${email}`}><Mail size={17} className="shrink-0 text-hibiscus" />{email}</a>
            <a className="flex items-center gap-3 transition hover:text-white" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer"><MessageCircle size={17} className="text-hibiscus" />Chat with us on WhatsApp</a>
            <p className="flex items-start gap-3"><MapPin size={17} className="mt-1 shrink-0 text-hibiscus" />Add your school address here</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col justify-between gap-2 py-6 text-sm text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Protege Schools. All rights reserved.</span>
          <span>Learn. Grow. Thrive.</span>
        </div>
      </div>
    </footer>
  );
}
