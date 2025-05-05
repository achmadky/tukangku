// Define the Tukang interface
interface Tukang {
  id: number;
  name: string;
  specialty: string;
  location: string;
  address: string;
  experience: number;
  rating: number;
  phone: string;
  photo: string;
  hourlyRate: number;
  available: boolean;
}

// Mock data for tukang from Sidoarjo and Surabaya
const tukangList: Tukang[] = [
  {
    id: 1,
    name: "Budi Santoso",
    specialty: "Tukang Kayu",
    location: "Sidoarjo",
    address: "Jl. Pahlawan No. 123, Sidoarjo",
    experience: 8,
    rating: 4.7,
    phone: "081234567890",
    photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    hourlyRate: 75000,
    available: true
  },
  {
    id: 2,
    name: "Agus Wijaya",
    specialty: "Tukang Bangunan",
    location: "Surabaya",
    address: "Jl. Diponegoro No. 45, Surabaya",
    experience: 12,
    rating: 4.9,
    phone: "085678901234",
    photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    hourlyRate: 85000,
    available: true
  },
  {
    id: 3,
    name: "Dewi Kusuma",
    specialty: "Tukang Cat",
    location: "Sidoarjo",
    address: "Jl. Gajah Mada No. 78, Sidoarjo",
    experience: 5,
    rating: 4.5,
    phone: "087890123456",
    photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    hourlyRate: 70000,
    available: false
  },
  {
    id: 4,
    name: "Hendra Gunawan",
    specialty: "Tukang Listrik",
    location: "Surabaya",
    address: "Jl. Pemuda No. 210, Surabaya",
    experience: 10,
    rating: 4.8,
    phone: "089012345678",
    photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    hourlyRate: 90000,
    available: true
  },
  {
    id: 5,
    name: "Siti Rahayu",
    specialty: "Tukang Pipa",
    location: "Sidoarjo",
    address: "Jl. Ahmad Yani No. 56, Sidoarjo",
    experience: 7,
    rating: 4.6,
    phone: "082345678901",
    photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    hourlyRate: 80000,
    available: true
  },
  {
    id: 6,
    name: "Rudi Hartono",
    specialty: "Tukang Las",
    location: "Surabaya",
    address: "Jl. Darmo No. 89, Surabaya",
    experience: 15,
    rating: 4.9,
    phone: "083456789012",
    photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    hourlyRate: 95000,
    available: true
  },
  {
    id: 7,
    name: "Eko Prasetyo",
    specialty: "Tukang Kebun",
    location: "Sidoarjo",
    address: "Jl. Sudirman No. 112, Sidoarjo",
    experience: 6,
    rating: 4.4,
    phone: "084567890123",
    photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    hourlyRate: 65000,
    available: true
  },
  {
    id: 8,
    name: "Joko Susilo",
    specialty: "Tukang AC",
    location: "Surabaya",
    address: "Jl. Tunjungan No. 77, Surabaya",
    experience: 9,
    rating: 4.7,
    phone: "086789012345",
    photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    hourlyRate: 85000,
    available: false
  }
];

export default tukangList;
export type { Tukang };