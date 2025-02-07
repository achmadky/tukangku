export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Tukang {
  id: string;
  profile_id: string;
  skills: string[];
  location: string;
  min_price: number;
  max_price: number;
  whatsapp: string;
  about: string | null;
  rating: number;
  jobs_completed: number;
  created_at: string;
  updated_at: string;
  profile: Profile;
}

export interface Rating {
  id: string;
  tukang_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}