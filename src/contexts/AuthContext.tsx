import React, { createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  registerTukang: (data: any) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const registerTukang = async (data: any) => {
    try {
      const { error } = await supabase
        .from('tukangs')
        .insert({
          profile_id: crypto.randomUUID(), // Generate a random UUID for profile_id
          ...data
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