import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import type { GalleryItem } from '@/lib/types';
import PageHero from '@/components/page-hero';
import GalleryGrid from '@/components/gallery-grid';
import { schoolMoments } from '@/lib/media';
export const metadata: Metadata = { title: 'Our Gallery' };
export default async function GalleryPage() {
  let items: GalleryItem[] = schoolMoments;
  try { const supabase = await createClient(); const {data} = await supabase.from('gallery_items').select('id,title,description,image_url,category,created_at').order('created_at',{ascending:false}); if (data?.length) items = [...(data as GalleryItem[]), ...schoolMoments]; } catch { /* The school's own photos keep the page full before Supabase is set up. */ }
  return <>
    <PageHero title="Little moments. Big memories." text="A glimpse into the learning, friendships, and discoveries that make every school day special." />
    <section className="pb-24 pt-8"><div className="container-shell">
      <GalleryGrid items={items} />
      <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl bg-indigo p-8 text-white sm:flex-row sm:items-center sm:p-10">
        <div><h3 className="font-display text-2xl font-bold">Want to see more of Protege?</h3><p className="mt-2 text-white/75">Get in touch and arrange a conversation with our team.</p></div>
        <Link href="/contact" className="btn btn-primary">Contact us</Link>
      </div>
    </div></section>
  </>;
}
