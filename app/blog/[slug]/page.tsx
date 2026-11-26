import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogCommentForm from '@/components/blog-comment-form';
import PageHero from '@/components/page-hero';
import { createClient } from '@/lib/supabase-server';
import type { BlogComment, BlogPost } from '@/lib/types';

type Props = { params: Promise<{ slug: string }> };

async function getPost(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id,title,slug,excerpt,content,cover_image_url,status,created_at,updated_at')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw error;
  return data as BlogPost | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    return post
      ? {
          title: post.title,
          description: post.excerpt,
          openGraph: post.cover_image_url
            ? { title: post.title, description: post.excerpt, images: [post.cover_image_url] }
            : { title: post.title, description: post.excerpt }
        }
      : { title: 'Blog post not found' };
  } catch {
    return { title: 'School Blog' };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  let comments: BlogComment[] = [];
  let commentsLoadError = false;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blog_comments')
      .select('id,post_id,author_name,content,status,created_at,updated_at')
      .eq('post_id', post.id)
      .eq('status', 'approved')
      .order('created_at', { ascending: true });
    if (error) throw error;
    comments = (data || []) as BlogComment[];
  } catch {
    commentsLoadError = true;
  }

  return <>
    <PageHero title={post.title} text={post.excerpt} />
    <article className="container-shell max-w-4xl pb-12 pt-8">
      <Link href="/blog" className="text-sm font-bold text-indigo hover:text-hibiscus">← All stories</Link>
      <p className="mt-6 text-sm text-ink/50">{new Date(post.created_at).toLocaleDateString()}</p>
      {post.cover_image_url && <img src={post.cover_image_url} alt={post.title} className="mt-6 max-h-[28rem] w-full rounded-3xl object-cover" />}
      <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-ink/80">{post.content}</div>
    </article>
    <section className="container-shell max-w-4xl pb-24">
      <div className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
        <h2 className="font-display text-2xl font-bold">Comments</h2>
        {commentsLoadError
          ? <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">Comments are temporarily unavailable.</p>
          : comments.length === 0
          ? <p className="mt-4 text-sm text-ink/60">No comments yet. Be the first to share your thoughts.</p>
          : <div className="mt-5 space-y-5">{comments.map(comment => <article key={comment.id} className="border-b border-ink/10 pb-5 last:border-0">
            <h3 className="font-bold">{comment.author_name}</h3>
            <p className="mt-1 text-xs text-ink/50">{new Date(comment.created_at).toLocaleDateString()}</p>
            <p className="mt-3 whitespace-pre-wrap leading-7 text-ink/75">{comment.content}</p>
          </article>)}</div>}
        <BlogCommentForm postId={post.id} />
      </div>
    </section>
  </>;
}
