import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = 'https://jdnhtdkqmxqkjxtvnohe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZ2xtcGNod3drd3Nnemt3cXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NDY4MDksImV4cCI6MjA1NDUyMjgwOX0.gl9TP7hoEX1r7CZIQyfxORi7GF2doCFKJyL0gl8KlNw';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Initialize storage bucket for avatars
export const initializeStorage = async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.find(bucket => bucket.name === 'avatars')) {
      await supabase.storage.createBucket('avatars', {
        public: true,
        fileSizeLimit: 5242880 // 5MB
      });
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
};

initializeStorage();