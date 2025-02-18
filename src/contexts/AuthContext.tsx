import React, { createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';

interface RegisterTukangData {
  full_name: string;
  avatar_url?: string;
  skills: string;
  location: string;
  min_price: string;
  max_price: string;
  whatsapp: string;
  about?: string;
}

interface AuthContextType {
  registerTukang: (data: RegisterTukangData) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const registerTukang = async (data: RegisterTukangData) => {
    try {
      const { error } = await supabase
        .from('tukangs')
        .insert({
          profile_id: crypto.randomUUID(),
          full_name: data.full_name,
          avatar_url: data.avatar_url,
          skills: [data.skills],
          location: data.location,
          min_price: parseInt(data.min_price),
          max_price: parseInt(data.max_price),
          whatsapp: data.whatsapp,
          about: data.about || null,
          rating: 0,
          jobs_completed: 0
        });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error registering tukang:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to register' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ registerTukang }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}