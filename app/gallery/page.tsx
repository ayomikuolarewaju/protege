import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import type { GalleryItem } from '@/lib/types';
import PageHero from '@/components/page-hero';
import GalleryGrid from '@/components/gallery-grid';
export const metadata: Metadata = { title: 'Our Gallery' };
const samples: GalleryItem[] = [
  {id:'sample-1',title:'Curious minds at work',description:'Learning through discovery and play.',image_url:'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=85',category:'Learning'},
  {id:'sample-2',title:'Learning together',description:'Sharing ideas, building friendships.',image_url:'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85',category:'Classroom'},
  {id:'sample-3',title:'Little big imaginations',description:'Room to make, create, and explore.',image_url:'https://images.unsplash.com/photo-1502086108466-6d7a3b9a3c5a?auto=format&fit=crop&w=1000&q=85',category:'Activities'},
  {id:'sample-4',title:'Growing every day',description:'Every milestone matters.',image_url:'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1000&q=85',category:'Community'},
  {id:'sample-5',title:'A world of wonder',description:'Discovering something new every day.',image_url:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=85',category:'Learning'},
  {id:'sample-6',title:'Making memories',description:'The moments that make school special.',image_url:'https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&w=1000&q=85',category:'Activities'},
];
export default async function GalleryPage() {
  let items = samples;
  try { const supabase = await createClient(); const {data} = await supabase.from('gallery_items').select('id,title,description,image_url,category,created_at').order('created_at',{ascending:false}); if (data?.length) items = data as GalleryItem[]; } catch { /* Sample gallery keeps the page usable before setup. */ }
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
