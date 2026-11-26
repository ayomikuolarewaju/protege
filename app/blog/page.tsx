import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import type { BlogPost } from '@/lib/types';
import PageHero from '@/components/page-hero';

export const metadata: Metadata = { title: 'School Blog' };

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let loadError = '';

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id,title,slug,excerpt,content,cover_image_url,status,created_at,updated_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    if (error) throw error;
    posts = (data || []) as BlogPost[];
  } catch (error) {
    loadError = error instanceof Error ? error.message : 'Unable to load blog posts.';
  }

  return <>
    <PageHero title="Stories from Protege." text="News, ideas, and moments from our school community." />
    <section className="pb-24 pt-8">
      <div className="container-shell">
        {loadError && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">The blog is temporarily unavailable. Please try again later.</p>}
        {!loadError && posts.length === 0 && <p className="rounded-2xl bg-white p-8 text-ink/65">There are no blog posts yet. Please check back soon.</p>}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => <article key={post.id} className="overflow-hidden rounded-3xl bg-white shadow-soft">
            {post.cover_image_url && <img src={post.cover_image_url} alt="" className="h-56 w-full object-cover" />}
            <div className="p-6">
              <p className="text-sm text-ink/50">{new Date(post.created_at).toLocaleDateString()}</p>
              <h2 className="mt-3 font-display text-2xl font-bold">{post.title}</h2>
              <p className="mt-3 leading-7 text-ink/65">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex font-bold text-indigo hover:text-hibiscus">Read article <span aria-hidden="true" className="ml-2">→</span></Link>
            </div>
          </article>)}
        </div>
      </div>
    </section>
  </>;
}
