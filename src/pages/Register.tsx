import React, { useState, useEffect } from 'react';
import { Upload, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import PlacesAutocomplete from '../components/PlacesAutocomplete';

const Register = () => {
  const { user } = useAuth();
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
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleLocationSelect = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      // Upload avatar if selected
      let avatarUrl = null;
      if (avatar) {
        const fileExt = avatar.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatar);

        if (uploadError) throw uploadError;
        avatarUrl = data.path;
      }

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;

      // Create tukang profile
      const { error: tukangError } = await supabase
        .from('tukangs')
        .insert({
          profile_id: user.id,
          skills: formData.skills.split(',').map(skill => skill.trim()),
          location: formData.location,
          min_price: parseInt(formData.minPrice),
          max_price: parseInt(formData.maxPrice),
          whatsapp: formData.whatsapp,
          about: formData.about
        });

      if (tukangError) throw tukangError;

      navigate('/tukangs');
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6">Daftar sebagai Tukang</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Foto Profil
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="relative w-32 h-32 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-full cursor-pointer hover:bg-gray-50">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <p className="mt-2 text-xs text-gray-500">
                      Klik untuk upload
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nomor WhatsApp
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  +62
                </span>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setFormData(prev => ({ ...prev, whatsapp: value }));
                  }}
                  className="block w-full rounded-lg border border-gray-300 pl-12 pr-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="8123456789"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lokasi
              </label>
              <PlacesAutocomplete
                value={formData.location}
                onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                onSelect={handleLocationSelect}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Keahlian & Deskripsi
              </label>
              <textarea
                value={formData.skills}
                onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                rows={4}
                placeholder="Contoh: Tukang listrik berpengalaman 5 tahun, ahli dalam instalasi listrik rumah, perbaikan MCB, pemasangan lampu, dll."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kisaran Harga (Rp)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={formData.minPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, minPrice: e.target.value }))}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="Minimum"
                  required
                />
                <input
                  type="number"
                  value={formData.maxPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxPrice: e.target.value }))}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="Maximum"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Mendaftar...' : 'Daftar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;