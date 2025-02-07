import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Tukang } from '../types';

interface UseTukangsOptions {
  location?: string;
  skills?: string[];
  minPrice?: number;
  maxPrice?: number;
}

export function useTukangs(options: UseTukangsOptions = {}) {
  const [tukangs, setTukangs] = useState<Tukang[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTukangs = async () => {
      try {
        let query = supabase
          .from('tukangs')
          .select(`
            *,
            profile:profiles(*)
          `)
          .order('rating', { ascending: false });

        if (options.location) {
          query = query.ilike('location', `%${options.location}%`);
        }

        if (options.skills && options.skills.length > 0) {
          query = query.contains('skills', options.skills);
        }

        if (options.minPrice) {
          query = query.gte('min_price', options.minPrice);
        }

        if (options.maxPrice) {
          query = query.lte('max_price', options.maxPrice);
        }

        const { data, error } = await query;

        if (error) throw error;
        setTukangs(data as Tukang[]);
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