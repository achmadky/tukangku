import { database } from '../lib/firebase';
import { ref, push, set, get } from 'firebase/database';

// Define the Tukang interface
export interface TukangData {
  id?: string;
  fullName: string;
  whatsapp: string;
  location: string;
  skills: string;
  minPrice: number;
  maxPrice: number;
  about: string;
  photo: string;
  rating?: number;
  jobsCompleted?: number;
  createdAt?: string;
}

// List of mock images to use randomly
const mockImages = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg"
];

// Get a random mock image
const getRandomImage = (): string => {
  const randomIndex = Math.floor(Math.random() * mockImages.length);
  return mockImages[randomIndex];
};

// Add a new tukang
export const addTukang = async (tukangData: Omit<TukangData, 'id' | 'photo' | 'rating' | 'jobsCompleted' | 'createdAt'>): Promise<TukangData> => {
  try {
    // Create a new tukang entry
    const newTukangRef = push(ref(database, 'tukangs'));
    
    // Generate random experience based on skills
    const experience = Math.floor(Math.random() * 10) + 1; // 1-10 years
    
    const newTukang: TukangData = {
      ...tukangData,
      photo: getRandomImage(), // Assign a random mock image
      rating: (Math.random() * 2) + 3, // Random rating between 3-5
      jobsCompleted: experience * 10, // Based on experience
      createdAt: new Date().toISOString(),
      id: newTukangRef.key || undefined
    };

    // Save to database
    await set(newTukangRef, newTukang);
    return newTukang;
  } catch (error) {
    console.error('Error adding tukang:', error);
    throw error;
  }
};

// Get all tukangs
export const getAllTukangs = async (): Promise<TukangData[]> => {
  try {
    const snapshot = await get(ref(database, 'tukangs'));
    if (!snapshot.exists()) return [];

    const tukangs: TukangData[] = [];
    snapshot.forEach((childSnapshot) => {
      tukangs.push({
        id: childSnapshot.key || undefined,
        ...childSnapshot.val()
      });
    });

    return tukangs;
  } catch (error) {
    console.error('Error getting tukangs:', error);
    throw error;
  }
};

// Get a tukang by ID
export const getTukangById = async (id: string): Promise<TukangData | null> => {
  try {
    const snapshot = await get(ref(database, `tukangs/${id}`));
    if (!snapshot.exists()) return null;
    
    return {
      id: snapshot.key || undefined,
      ...snapshot.val()
    };
  } catch (error) {
    console.error('Error getting tukang:', error);
    throw error;
  }
};

// Search tukangs by criteria
export const searchTukangs = async (criteria: {
  location?: string;
  skills?: string[];
  minPrice?: number;
  maxPrice?: number;
}): Promise<TukangData[]> => {
  try {
    // Get all tukangs first
    const allTukangs = await getAllTukangs();
    
    // Filter based on criteria
    return allTukangs.filter(tukang => {
      // Location filter
      if (criteria.location && !tukang.location.toLowerCase().includes(criteria.location.toLowerCase())) {
        return false;
      }
      
      // Skills filter
      if (criteria.skills && criteria.skills.length > 0) {
        const hasMatchingSkill = criteria.skills.some(skill => 
          tukang.skills.toLowerCase().includes(skill.toLowerCase())
        );
        if (!hasMatchingSkill) return false;
      }
      
      // Price range filter
      if (criteria.minPrice !== undefined && tukang.minPrice < criteria.minPrice) {
        return false;
      }
      
      if (criteria.maxPrice !== undefined && tukang.maxPrice > criteria.maxPrice) {
        return false;
      }
      
      return true;
    });
  } catch (error) {
    console.error('Error searching tukangs:', error);
    throw error;
  }
};
