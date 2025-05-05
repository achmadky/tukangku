import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter, Star } from 'lucide-react';
import { getAllTukangs, searchTukangs, TukangData } from '../services/tukangService';

const TukangList = () => {
  const [tukangs, setTukangs] = useState<TukangData[]>([]);
  const [filteredTukangs, setFilteredTukangs] = useState<TukangData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    skills: [] as string[]
  });

  // Fetch all tukangs on component mount
  useEffect(() => {
    const fetchTukangs = async () => {
      try {
        setLoading(true);
        const data = await getAllTukangs();
        setTukangs(data);
        setFilteredTukangs(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tukangs:', err);
        setError('Failed to load tukangs. Please try again later.');
        setLoading(false);
      }
    };

    fetchTukangs();
  }, []);

  // Handle search and filtering
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query.trim()) {
      // If search is empty, apply only filters
      applyFilters(tukangs, filters);
    } else {
      // Apply search and filters
      const searchResults = tukangs.filter(tukang => 
        tukang.fullName.toLowerCase().includes(query.toLowerCase()) ||
        tukang.skills.toLowerCase().includes(query.toLowerCase()) ||
        tukang.location.toLowerCase().includes(query.toLowerCase())
      );
      applyFilters(searchResults, filters);
    }
  };

  // Apply filters to the tukangs list
  const applyFilters = (tukangList: TukangData[], currentFilters = filters) => {
    let results = [...tukangList];
    
    // Location filter
    if (currentFilters.location) {
      results = results.filter(tukang => 
        tukang.location.toLowerCase().includes(currentFilters.location.toLowerCase())
      );
    }
    
    // Price range filter
    if (currentFilters.minPrice) {
      results = results.filter(tukang => 
        tukang.minPrice >= Number(currentFilters.minPrice)
      );
    }
    
    if (currentFilters.maxPrice) {
      results = results.filter(tukang => 
        tukang.maxPrice <= Number(currentFilters.maxPrice)
      );
    }
    
    // Skills filter
    if (currentFilters.skills.length > 0) {
      results = results.filter(tukang => 
        currentFilters.skills.some(skill => 
          tukang.skills.toLowerCase().includes(skill.toLowerCase())
        )
      );
    }
    
    setFilteredTukangs(results);
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    
    // Apply updated filters
    if (searchQuery) {
      const searchResults = tukangs.filter(tukang => 
        tukang.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tukang.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tukang.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      applyFilters(searchResults, updatedFilters);
    } else {
      applyFilters(tukangs, updatedFilters);
    }
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      skills: []
    });
    setSearchQuery('');
    setFilteredTukangs(tukangs);
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading tukangs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search and Filter Bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, skills, or location"
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={toggleFilters}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Filter by location"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Minimum price"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Maximum price"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        {filteredTukangs.length} {filteredTukangs.length === 1 ? 'tukang' : 'tukangs'} found
      </div>

      {/* Tukang List */}
      {filteredTukangs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No tukangs found</p>
          <Link to="/register" className="mt-4 inline-block px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            Register as Tukang
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTukangs.map((tukang) => (
            <Link 
              key={tukang.id} 
              to={`/tukang/${tukang.id}`}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex gap-4"
            >
              <div className="w-20 h-20 flex-shrink-0">
                <img 
                  src={tukang.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                  alt={tukang.fullName} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{tukang.fullName}</h2>
                <p className="text-gray-600">{tukang.skills}</p>
                <div className="flex items-center mt-1">
                  <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-gray-500 text-sm">{tukang.location}</span>
                </div>
                <p className="text-primary-600 font-medium mt-2">
                  Rp {tukang.minPrice.toLocaleString()} - {tukang.maxPrice.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TukangList;