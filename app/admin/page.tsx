import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { DEFAULT_HOME_PAGE_CONTENT, type BlogComment, type BlogPost, type ContactInquiry, type GalleryItem, type HomePageContent } from '@/lib/types';
import AdminDashboard from '@/components/admin-dashboard';
export const metadata = { title: 'Admin Dashboard' };
export default async function AdminPage() {
  let supabase;
  try { supabase = await createClient(); } catch { redirect('/admin/login'); }
  const {data:{user}} = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const {data:admin} = await supabase.from('admins').select('user_id').eq('user_id',user.id).maybeSingle();
  if (!admin) redirect('/admin/login?error=not-authorised');
  const [{data:gallery},{data:inquiries},{data:posts},{data:comments},{data:homePageContent,error:homePageContentError}] = await Promise.all([
    supabase.from('gallery_items').select('id,title,description,image_url,category,video_url,width,height,created_at').order('created_at',{ascending:false}),
    supabase.from('contact_inquiries').select('id,full_name,email,phone,subject,message,status,created_at').order('created_at',{ascending:false}).limit(100),
    supabase.from('blog_posts').select('id,title,slug,excerpt,content,cover_image_url,status,created_at,updated_at').order('created_at',{ascending:false}),
    supabase.from('blog_comments').select('id,post_id,author_name,author_email,content,status,created_at,updated_at').order('created_at',{ascending:false}),
    supabase.from('home_page_content').select('id,heading,tagline').eq('id',1).maybeSingle()
  ]);
  return <AdminDashboard initialGallery={(gallery||[]) as GalleryItem[]} initialInquiries={(inquiries||[]) as ContactInquiry[]} initialPosts={(posts||[]) as BlogPost[]} initialComments={(comments||[]) as BlogComment[]} initialHomePageContent={(homePageContent as HomePageContent|null)||DEFAULT_HOME_PAGE_CONTENT} initialHomePageContentError={homePageContentError?.message||''} email={user.email||'Administrator'}/>;
}
