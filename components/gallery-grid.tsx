'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Play, X } from 'lucide-react';
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
        {shown.map((item, i) => {
          const w = item.width ?? 4, h = item.height ?? 3;
          const portrait = h > w * 1.2;
          // The video's 9:16 poster is cropped to 3:4 in the grid so it does not dominate the column.
          const ratio = item.video_url ? 3 / 4 : w / h;
          return (
            <button key={item.id} onClick={() => setOpenIndex(i)} className="group mb-7 block w-full break-inside-avoid text-left" aria-label={`${item.video_url ? 'Play' : 'Open'} ${item.title}`}>
              <div className={`relative overflow-hidden bg-indigo/10 ${portrait ? 'arch' : 'rounded-2xl'}`} style={{ aspectRatio: ratio }}>
                <img src={item.image_url} alt={item.title} loading="lazy" width={w} height={h} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                {item.video_url && (
                  <span className="absolute inset-0 grid place-items-center bg-ink/20 transition group-hover:bg-ink/30">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-hibiscus text-white shadow-soft"><Play size={26} fill="currentColor" className="ml-1" /></span>
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                {item.category && <span className="shrink-0 text-sm text-hibiscus">{item.video_url ? 'Video' : item.category}</span>}
              </div>
            </button>
          );
        })}
      </div>

      <dialog ref={dialog} onClose={() => setOpenIndex(null)} onClick={e => { if (e.target === dialog.current) setOpenIndex(null); }}
        className="m-auto w-[min(960px,94vw)] overflow-hidden rounded-3xl bg-ink p-0 text-white backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
        onKeyDown={e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); }}>
        {current && (
          <figure>
            <div className="grid place-items-center bg-black">
              {current.video_url
                ? <video key={current.id} src={current.video_url} poster={current.image_url} controls autoPlay playsInline preload="metadata" className="max-h-[70vh] w-auto max-w-full" />
                : <img key={current.id} src={current.image_url} alt={current.title} className="max-h-[70vh] w-auto max-w-full object-contain" />}
            </div>
            <figcaption className="flex items-start justify-between gap-6 p-6">
              <div>
                <h3 className="font-display text-2xl font-bold">{current.title}</h3>
                <p className="mt-1 text-white/70">{current.description || 'A special moment at Protege Schools.'}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => step(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-ink"><ArrowLeft size={18} /></button>
                <button onClick={() => step(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-ink"><ArrowRight size={18} /></button>
                <button onClick={() => setOpenIndex(null)} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full bg-hibiscus"><X size={18} /></button>
              </div>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
