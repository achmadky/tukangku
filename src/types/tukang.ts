export interface Tukang {
  id: string;
  profile: {
    full_name: string;
    avatar_url: string | null;
  };
  skills: string[];
  location: string;
  rating: number;
  jobs_completed: number;
  min_price: number;
  max_price: number;
}