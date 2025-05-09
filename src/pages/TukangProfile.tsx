import React, { useEffect, useState } from 'react';
import { Star, MapPin, Phone, Calendar, Shield } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getTukangById, TukangData } from '../services/tukangService';

const TukangProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [tukang, setTukang] = useState<TukangData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTukang = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getTukangById(id);
        setTukang(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tukang:', err);
        setError('Gagal memuat detail tukang. Silakan coba lagi nanti.');
        setLoading(false);
      }
    };

    fetchTukang();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Memuat profil...</p>
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

  if (!tukang) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">Tukang tidak ditemukan</p>
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
              src={tukang.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt={`Profil ${tukang.fullName}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{tukang.fullName}</h1>
                <p className="text-gray-600">{tukang.skills}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{tukang.location}</span>
            </div>
            <div className="mt-6">
              <a 
                href={`https://wa.me/${tukang.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors inline-block text-center"
              >
                Hubungi Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Details Sections */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Phone className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold">Kisaran Harga</h2>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            Rp {tukang.minPrice.toLocaleString()} - {tukang.maxPrice.toLocaleString()}
          </p>
          <p className="text-gray-600 text-sm mt-1">Per layanan</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold">Waktu Tersedia</h2>
          </div>
          <p className="text-2xl font-bold text-gray-900">Senin - Sabtu</p>
          <p className="text-gray-600 text-sm mt-1">08:00 - 17:00</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold">Area Layanan</h2>
          </div>
          <p className="text-2xl font-bold text-gray-900">5-10 km</p>
          <p className="text-gray-600 text-sm mt-1">Dari {tukang.location.split(',')[0]}</p>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Tentang</h2>
        <p className="text-gray-600">
          {tukang.about}
        </p>
      </div>
    </div>
  );
};

export default TukangProfile;