import React, { useEffect, useState } from 'react';
import { Star, MapPin, Phone, Calendar, Shield } from 'lucide-react';
import { useParams } from 'react-router-dom';
import tukangData from '../data/tukangData';

const TukangProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [tukang, setTukang] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a small delay
    setLoading(true);
    setTimeout(() => {
      // Find the tukang with the matching ID from our mock data
      const foundTukang = tukangData.find(t => t.id === parseInt(id || '0'));
      
      if (foundTukang) {
        // Convert to the format we need
        setTukang({
          id: String(foundTukang.id),
          profile: {
            full_name: foundTukang.name,
            avatar_url: foundTukang.photo
          },
          skills: [foundTukang.specialty],
          location: foundTukang.location,
          min_price: foundTukang.hourlyRate * 0.8,
          max_price: foundTukang.hourlyRate * 1.2,
          rating: foundTukang.rating,
          jobs_completed: foundTukang.experience * 10,
          about: "Professional handyman with over " + foundTukang.experience + 
                " years of experience in " + foundTukang.specialty.toLowerCase() + ". " +
                "Specialized in residential repairs and maintenance. Known for reliable service and " +
                "attention to detail. Available for emergency repairs and scheduled maintenance work."
        });
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!tukang) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">Tukang not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={tukang.profile.avatar_url || "https://source.unsplash.com/random/400x400?worker"}
              alt={`${tukang.profile.full_name} Profile`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{tukang.profile.full_name}</h1>
                <p className="text-gray-600">{tukang.skills.join(', ')}</p>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-lg font-semibold">{tukang.rating.toFixed(1)}</span>
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <span className="text-gray-600">({tukang.jobs_completed} reviews)</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{tukang.location}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {tukang.skills.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <button className="w-full md:w-auto px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                Contact Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Sections */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Phone className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold">Price Range</h2>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            Rp {tukang.min_price.toLocaleString()} - {tukang.max_price.toLocaleString()}
          </p>
          <p className="text-gray-600 text-sm mt-1">Per service</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold">Experience</h2>
          </div>
          <p className="text-2xl font-bold text-gray-900">{Math.round(tukang.jobs_completed / 10)}+ Years</p>
          <p className="text-gray-600 text-sm mt-1">Professional experience</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold">Completed Jobs</h2>
          </div>
          <p className="text-2xl font-bold text-gray-900">{tukang.jobs_completed}+</p>
          <p className="text-gray-600 text-sm mt-1">Satisfied customers</p>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">About</h2>
        <p className="text-gray-600">
          {tukang.about}
        </p>
      </div>
    </div>
  );
};

export default TukangProfile;