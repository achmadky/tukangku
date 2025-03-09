import type { Tukang } from '../types/tukang';

export const mockTukangs: Tukang[] = [
  {
    id: '1',
    profile: {
      full_name: 'Ahmad Sudrajat',
      avatar_url: 'https://i.pravatar.cc/300?img=1'
    },
    skills: ['Bangunan', 'Cat', 'Renovasi'],
    location: 'Jakarta Selatan',
    rating: 4.8,
    jobs_completed: 124,
    min_price: 200000,
    max_price: 1500000
  },
  {
    id: '2',
    profile: {
      full_name: 'Budi Santoso',
      avatar_url: 'https://i.pravatar.cc/150?img=2'
    },
    skills: ['Tukang Listrik', 'Instalasi', 'Perbaikan Elektronik'],
    location: 'Jakarta Timur',
    rating: 4.9,
    jobs_completed: 89,
    min_price: 150000,
    max_price: 800000
}]