import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import type { ContactInquiry, GalleryItem } from '@/lib/types';
import AdminDashboard from '@/components/admin-dashboard';
export const metadata = { title: 'Admin Dashboard' };
export default async function AdminPage() {
  let supabase;
  try { supabase = await createClient(); } catch { redirect('/admin/login'); }
  const {data:{user}} = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const {data:admin} = await supabase.from('admins').select('user_id').eq('user_id',user.id).maybeSingle();
  if (!admin) redirect('/admin/login?error=not-authorised');
  const [{data:gallery},{data:inquiries}] = await Promise.all([
    supabase.from('gallery_items').select('id,title,description,image_url,category,created_at').order('created_at',{ascending:false}),
    supabase.from('contact_inquiries').select('id,full_name,email,phone,subject,message,status,created_at').order('created_at',{ascending:false}).limit(100)
  ]);
  return <AdminDashboard initialGallery={(gallery||[]) as GalleryItem[]} initialInquiries={(inquiries||[]) as ContactInquiry[]} email={user.email||'Administrator'}/>;
}
