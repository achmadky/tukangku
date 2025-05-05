import React, { createContext, useContext } from 'react';

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
      // Mock successful registration
      // In a real app, you would save this to localStorage or another storage mechanism
      console.log('Registering tukang with data:', data);
      
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