export type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  created_at?: string;
  /** Optional extras used by media that ships with the site (not stored in Supabase). */
  video_url?: string;
  width?: number;
  height?: number;
};

export const GALLERY_CATEGORIES = [
  'Classroom',
  'Competitions',
  'Events',
  'Activities',
  'Community',
  'Our school',
] as const;

export type ContactInquiry = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  created_at: string;
};

export type ContactFormInput = {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
};

export type BlogComment = {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved';
  created_at: string;
  updated_at: string;
};

export type HomePageContent = {
  id: number;
  heading: string;
  tagline: string;
};

export const DEFAULT_HOME_PAGE_CONTENT: HomePageContent = {
  id: 1,
  heading: 'Big dreams begin with little steps.',
  tagline: 'At Protege Schools, we nurture curious minds, kind hearts, and confident learners, one discovery at a time.',
};
