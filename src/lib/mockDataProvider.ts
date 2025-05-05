import { Tukang, Profile, Rating } from '../types';
import tukangData from '../data/tukangData';

// Convert mock data to match our interfaces
export const getTukangs = (): Tukang[] => {
  return tukangData.map(tukang => ({
    id: String(tukang.id),
    profile_id: String(tukang.id),
    skills: [tukang.specialty],
    location: tukang.location,
    min_price: tukang.hourlyRate * 0.8,
    max_price: tukang.hourlyRate * 1.2,
    whatsapp: tukang.phone,
    about: null,
    rating: tukang.rating,
    jobs_completed: tukang.experience * 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile: {
      id: String(tukang.id),
      email: `${tukang.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      full_name: tukang.name,
      avatar_url: tukang.photo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }));
};

export const getTukangById = (id: string): Tukang | undefined => {
  const tukang = tukangData.find(t => t.id === parseInt(id));
  if (!tukang) return undefined;
  
  return {
    id: String(tukang.id),
    profile_id: String(tukang.id),
    skills: [tukang.specialty],
    location: tukang.location,
    min_price: tukang.hourlyRate * 0.8,
    max_price: tukang.hourlyRate * 1.2,
    whatsapp: tukang.phone,
    about: "Professional handyman with over " + tukang.experience + 
          " years of experience in " + tukang.specialty.toLowerCase() + ". " +
          "Specialized in residential repairs and maintenance. Known for reliable service and " +
          "attention to detail. Available for emergency repairs and scheduled maintenance work.",
    rating: tukang.rating,
    jobs_completed: tukang.experience * 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile: {
      id: String(tukang.id),
      email: `${tukang.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      full_name: tukang.name,
      avatar_url: tukang.photo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  };
};