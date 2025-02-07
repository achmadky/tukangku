import React from 'react';
import { Star, MapPin, Phone, Calendar, Shield } from 'lucide-react';

const TukangProfile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src="https://source.unsplash.com/random/400x400?worker"
              alt="Tukang Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-gray-600">Plumber, Electrician</p>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-lg font-semibold">4.8</span>
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <span className="text-gray-600">(120 reviews)</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Jakarta Selatan, DKI Jakarta</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                Plumbing
              </span>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                Electrical
              </span>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                Home Repair
              </span>
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
          <p className="text-2xl font-bold text-gray-900">Rp 100k - 500k</p>
          <p className="text-gray-600 text-sm mt-1">Per service</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold">Experience</h2>
          </div>
          <p className="text-2xl font-bold text-gray-900">5+ Years</p>
          <p className="text-gray-600 text-sm mt-1">Professional experience</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold">Completed Jobs</h2>
          </div>
          <p className="text-2xl font-bold text-gray-900">50+</p>
          <p className="text-gray-600 text-sm mt-1">Satisfied customers</p>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">About</h2>
        <p className="text-gray-600">
          Professional handyman with over 5 years of experience in plumbing and electrical work. 
          Specialized in residential repairs and maintenance. Known for reliable service and 
          attention to detail. Available for emergency repairs and scheduled maintenance work.
        </p>
      </div>
    </div>
  );
};

export default TukangProfile;