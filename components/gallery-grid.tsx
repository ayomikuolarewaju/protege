'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { GalleryItem } from '@/lib/types';

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const categories = ['All', ...Array.from(new Set(items.map(i => i.category).filter(Boolean)))] as string[];
  const [active, setActive] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = active === 'All' ? items : items.filter(i => i.category === active);
  const current = openIndex !== null ? shown[openIndex] : null;

  useEffect(() => {
    const d = dialog.current; if (!d) return;
    if (openIndex !== null && !d.open) d.showModal();
    if (openIndex === null && d.open) d.close();
  }, [openIndex]);

  const step = (dir: number) => setOpenIndex(i => (i === null ? null : (i + dir + shown.length) % shown.length));

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
        {categories.map(c => (
          <button key={c} onClick={() => setActive(c)} aria-pressed={active === c}
            className={`rounded-full border px-5 py-2.5 text-[.95rem] font-medium transition ${active === c ? 'border-indigo bg-indigo text-white' : 'border-ink/20 hover:border-indigo hover:text-indigo'}`}>{c}</button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {shown.map((item, i) => (
          <button key={item.id} onClick={() => setOpenIndex(i)} className="group mb-6 block w-full break-inside-avoid text-left" aria-label={`Open ${item.title}`}>
            <div className={`overflow-hidden bg-indigo/10 ${i % 5 === 0 ? 'arch' : 'rounded-2xl'}`}>
              <img src={item.image_url} alt={item.title} loading="lazy" className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i % 3 === 0 ? 'h-[420px]' : i % 3 === 1 ? 'h-[300px]' : 'h-[360px]'}`} />
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              {item.category && <span className="shrink-0 text-sm text-hibiscus">{item.category}</span>}
            </div>
          </button>
        ))}
      </div>

      <dialog ref={dialog} onClose={() => setOpenIndex(null)} onClick={e => { if (e.target === dialog.current) setOpenIndex(null); }}
        className="m-auto w-[min(960px,94vw)] rounded-3xl bg-ink p-0 text-white backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
        onKeyDown={e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); }}>
        {current && (
          <figure>
            <img src={current.image_url} alt={current.title} className="max-h-[70vh] w-full object-cover" />
            <figcaption className="flex items-start justify-between gap-6 p-6">
              <div>
                <h3 className="font-display text-2xl font-bold">{current.title}</h3>
                <p className="mt-1 text-white/70">{current.description || 'A special moment at Protege Schools.'}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => step(-1)} aria-label="Previous photo" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-ink"><ArrowLeft size={18} /></button>
                <button onClick={() => step(1)} aria-label="Next photo" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-ink"><ArrowRight size={18} /></button>
                <button onClick={() => setOpenIndex(null)} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full bg-hibiscus"><X size={18} /></button>
              </div>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
