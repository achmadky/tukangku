import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter, Star } from 'lucide-react';
import { mockTukangs } from '../mocks/tukangData';
import type { Tukang } from '../types/tukang';

const SKILL_OPTIONS = [
  'Listrik',
  'Pipa Air',
  'Kayu',
  'Cat',
  'Bangunan',
  'AC',
  'Elektronik',
  'Taman',
];

const TukangList = () => {
  const [location, setLocation] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({});

  const filteredTukangs = useMemo(() => {
    return mockTukangs.filter((tukang: Tukang) => {
      const matchesLocation = !location || 
        tukang.location.toLowerCase().includes(location.toLowerCase());
      const matchesSkills = selectedSkills.length === 0 || 
        selectedSkills.some(skill => tukang.skills.includes(skill));
      const matchesPrice = (!priceRange.min || tukang.min_price >= priceRange.min) && 
        (!priceRange.max || tukang.max_price <= priceRange.max);
      
      return matchesLocation && matchesSkills && matchesPrice;
    });
  }, [location, selectedSkills, priceRange]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari berdasarkan lokasi..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        {showFilters && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-4">
            <div>
              <h3 className="font-medium mb-2">Keahlian</h3>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedSkills.includes(skill)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Kisaran Harga (Rp)</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Minimum"
                  value={priceRange.min || ''}
                  onChange={(e) => setPriceRange(prev => ({
                    ...prev,
                    min: e.target.value ? parseInt(e.target.value) : undefined
                  }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="number"
                  placeholder="Maksimum"
                  value={priceRange.max || ''}
                  onChange={(e) => setPriceRange(prev => ({
                    ...prev,
                    max: e.target.value ? parseInt(e.target.value) : undefined
                  }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tukang List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTukangs.map((tukang) => (
          <div key={tukang.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={tukang.profile.avatar_url || `https://source.unsplash.com/random/400x300?worker&sig=${tukang.id}`}
              alt={tukang.profile.full_name || 'Tukang'}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{tukang.profile.full_name}</h3>
                  <p className="text-gray-600 text-sm">{tukang.skills.join(', ')}</p>
                </div>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <span>{tukang.rating.toFixed(1)}</span>
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{tukang.location}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{tukang.jobs_completed}+ pekerjaan selesai</span>
                <span className="font-semibold">
                  Rp {tukang.min_price.toLocaleString()} - {tukang.max_price.toLocaleString()}
                </span>
              </div>
              <Link
                to={`/tukang/${tukang.id}`}
                className="block w-full py-2 text-center bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Lihat Profil
              </Link>
            </div>
          </div>
        ))}

        {filteredTukangs.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-600">
            <p>Tidak ada tukang yang sesuai dengan kriteria pencarian.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TukangList;