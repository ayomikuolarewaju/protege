export type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  created_at?: string;
};

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
