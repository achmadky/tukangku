import { useEffect, useState } from 'react';
import { Tukang } from '../types';
import tukangData from '../data/tukangData';

interface UseTukangsOptions {
  location?: string;
  skills?: string[];
  minPrice?: number;
  maxPrice?: number;
}

// Helper function to convert mock data to match our Tukang interface
const convertMockData = () => {
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

export function useTukangs(options: UseTukangsOptions = {}) {
  const [tukangs, setTukangs] = useState<Tukang[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTukangs = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get mock data
        let filteredTukangs = convertMockData();
        
        // Apply filters
        if (options.location) {
          filteredTukangs = filteredTukangs.filter(tukang => 
            tukang.location.toLowerCase().includes(options.location!.toLowerCase())
          );
        }
        
        if (options.skills && options.skills.length > 0) {
          filteredTukangs = filteredTukangs.filter(tukang => 
            options.skills!.some(skill => 
              tukang.skills.some(tukangSkill => 
                tukangSkill.toLowerCase().includes(skill.toLowerCase())
              )
            )
          );
        }
        
        if (options.minPrice) {
          filteredTukangs = filteredTukangs.filter(tukang => 
            tukang.min_price >= (options.minPrice ?? 0)
          );
        }
        
        if (options.maxPrice) {
          filteredTukangs = filteredTukangs.filter(tukang => 
            tukang.max_price <= (options.maxPrice ?? Infinity)
          );
        }
        
        setTukangs(filteredTukangs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTukangs();
  }, [options.location, options.skills, options.minPrice, options.maxPrice]);

  return { tukangs, loading, error };
}