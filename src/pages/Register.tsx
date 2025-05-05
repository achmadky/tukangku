import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import { addTukang } from '../services/tukangService';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    location: '',
    skills: '',
    minPrice: '',
    maxPrice: '',
    about: ''
  });
  const [error, setError] = useState<string>('');

  const handleLocationSelect = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      // Validate form data
      if (!formData.fullName || !formData.whatsapp || !formData.location || !formData.skills) {
        throw new Error('Please fill all required fields');
      }
      
      if (!formData.minPrice || !formData.maxPrice) {
        throw new Error('Please provide price range');
      }
      
      // Add tukang to database - no need to handle image upload
      const newTukang = await addTukang({
        fullName: formData.fullName,
        whatsapp: formData.whatsapp,
        location: formData.location,
        skills: formData.skills,
        minPrice: Number(formData.minPrice),
        maxPrice: Number(formData.maxPrice),
        about: formData.about || `Professional handyman specializing in ${formData.skills}.`
      });
      
      // Navigate to the tukang list or profile
      navigate(`/tukang/${newTukang.id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6">Daftar sebagai Tukang</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Removed image upload section */}
          
          <div className="grid grid-cols-1 gap-6">
            <input type="text" placeholder="Nama Lengkap" value={formData.fullName} onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))} required className="border p-2 rounded w-full" />
            <input type="tel" placeholder="Nomor WhatsApp" value={formData.whatsapp} onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value.replace(/\D/g, '') }))} required className="border p-2 rounded w-full" />
            <PlacesAutocomplete value={formData.location} onChange={(value) => setFormData(prev => ({ ...prev, location: value }))} onSelect={handleLocationSelect} />
            <textarea placeholder="Keahlian & Deskripsi" value={formData.skills} onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))} required className="border p-2 rounded w-full" rows={4} />
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Minimum" value={formData.minPrice} onChange={(e) => setFormData(prev => ({ ...prev, minPrice: e.target.value }))} required className="border p-2 rounded w-full" />
              <input type="number" placeholder="Maximum" value={formData.maxPrice} onChange={(e) => setFormData(prev => ({ ...prev, maxPrice: e.target.value }))} required className="border p-2 rounded w-full" />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400">{loading ? 'Mendaftar...' : 'Daftar'}</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

