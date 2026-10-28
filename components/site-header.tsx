'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './logo';

const links = [{ href: '/', label: 'Home' }, { href: '/gallery', label: 'Our gallery' }, { href: '/contact', label: 'Contact us' }];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cotton/90 backdrop-blur-xl">
      <div className="container-shell flex h-[76px] items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Protege Schools home"><Logo /></Link>
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
          {links.map(link => (
            <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}
              className={`relative py-1 text-[.95rem] font-medium transition-colors hover:text-hibiscus ${isActive(link.href) ? 'text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-hibiscus' : 'text-ink/70'}`}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-ink">Enquire now</Link>
        </nav>
        <button className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-ink/10 bg-cotton px-5 pb-6 pt-3 md:hidden" aria-label="Mobile navigation">
          {links.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-ink/10 py-4 font-display text-2xl font-semibold">{link.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary mt-5 w-full">Enquire now</Link>
        </nav>
      )}
    </header>
  );
}
