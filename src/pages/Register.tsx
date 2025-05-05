import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PlacesAutocomplete from '../components/PlacesAutocomplete';

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
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleLocationSelect = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      let avatarUrl = null;
      if (avatar) {
        // Instead of uploading to Supabase, we'll create a local URL
        avatarUrl = URL.createObjectURL(avatar);
        // Note: In a real app without Supabase, you'd need to implement file upload differently
      }
  
      // Use the AuthContext to register the tukang
      const { success, error: registerError } = await registerTukang({
        ...formData,
        avatar_url: avatarUrl
      });
  
      if (!success) throw new Error(registerError);
      navigate('/tukangs');
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Foto Profil</label>
            <div className="flex items-center justify-center w-full">
              <label className="relative w-32 h-32 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-full cursor-pointer hover:bg-gray-50">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <p className="mt-2 text-xs text-gray-500">Klik untuk upload</p>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </div>

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
function registerTukang(arg0: { avatar_url: string | null; fullName: string; whatsapp: string; location: string; skills: string; minPrice: string; maxPrice: string; about: string; }): { success: any; error: any; } | PromiseLike<{ success: any; error: any; }> {
  throw new Error('Function not implemented.');
}

