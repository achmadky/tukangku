import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter, Star } from 'lucide-react';
import { getAllTukangs, TukangData } from '../services/tukangService';

const TukangList = () => {
  const [tukangs, setTukangs] = useState<TukangData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTukangs = async () => {
      try {
        setLoading(true);
        const data = await getAllTukangs();
        setTukangs(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tukangs:', err);
        setError('Failed to load tukangs. Please try again later.');
        setLoading(false);
      }
    };

    fetchTukangs();
  }, []);

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

  if (tukangs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">No tukangs found</p>
        <Link to="/register" className="mt-4 inline-block px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          Register as Tukang
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Available Tukangs</h1>
      
      <div className="grid gap-4">
        {tukangs.map((tukang) => (
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
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">{tukang.fullName}</h2>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                  <span>{tukang.rating?.toFixed(1) || "4.0"}</span>
                </div>
              </div>
              <p className="text-gray-600">{tukang.skills}</p>
              <div className="flex items-center text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{tukang.location}</span>
              </div>
              <div className="mt-2 text-primary-600 font-medium">
                Rp {tukang.minPrice.toLocaleString()} - {tukang.maxPrice.toLocaleString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TukangList;