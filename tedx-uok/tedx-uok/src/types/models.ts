export interface Speaker {
  speaker_id: string;
  full_name: string;
  title: string;
  organization?: string;
  bio_short: string;
  bio_long: string;
  photo_url: string;
  talk_title: string;
  talk_description: string;
  social_links: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  expertise?: string[];
}

export interface BlogPost {
  blog_id: string; // UUID
  title: string;
  slug: string; // unique
  content: string; // text
  cover_image_url?: string; // optional
  author_name: string;
  published_at?: string; // timestamp (ISO string for frontend)
  is_published: boolean;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export interface VolunteerApplication {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  role_interest: string[];
  experience?: string;
  motivation?: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export interface AgendaItem {
  id: string;
  start_time: string; // ISO string or time string e.g. "09:00"
  end_time: string;
  title: string;
  description?: string;
  speaker_id?: string; // Relation to speaker
  type: 'talk' | 'break' | 'workshop' | 'networking' | 'performance';
  location?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'community';
  order_index?: number;
}

export interface TeamMember {
  id: string;
  full_name: string;
  role: string;
  photo_url?: string;
  bio?: string;
  linkedin_url?: string;
  category: 'organizers' | 'curators' | 'marketing' | 'tech' | 'volunteers';
  order_index?: number;
}
