import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Shield, Users, UserPlus } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-16">
        <h1 className="text-5xl font-bold text-gray-900">
          Find Skilled <span className="text-primary-500">Tukang</span> Near You
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with trusted handymen for all your repair and maintenance needs. Browse profiles, 
          check ratings, and hire with confidence.
        </p>
        <Link
          to="/tukangs"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-lg"
        >
          <Search className="w-5 h-5" />
          <span>Find a Tukang</span>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="text-center space-y-4 p-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <Star className="w-8 h-8 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold">Verified Professionals</h3>
          <p className="text-gray-600">
            All tukangs are verified and rated by our community
          </p>
        </div>

        <div className="text-center space-y-4 p-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold">Secure Platform</h3>
          <p className="text-gray-600">
            Your safety and security is our top priority
          </p>
        </div>

        <div className="text-center space-y-4 p-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold">Growing Community</h3>
          <p className="text-gray-600">
            Join thousands of satisfied customers
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-primary-50 rounded-2xl p-12 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Are You a Skilled Tukang?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join our platform to connect with customers and grow your business
        </p>
        <Link
          to="/register"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-lg"
        >
          <UserPlus className="w-5 h-5" />
          <span>Register as Tukang</span>
        </Link>
      </section>
    </div>
  );
};

export default Home;