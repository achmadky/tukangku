import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Shield, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-16">
        <h1 className="text-5xl font-bold text-gray-900">
          Temukan <span className="text-primary-500">Tukang Ahli</span> di Sekitar Anda
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Hubungkan dengan tukang terpercaya untuk semua kebutuhan perbaikan dan perawatan rumah Anda. 
          Lihat profil, cek rating, dan pilih tukang dengan percaya diri.
        </p>
        <Link
          to="/tukangs"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-lg"
        >
          <Search className="w-5 h-5" />
          <span>Cari Tukang</span>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="text-center space-y-4 p-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <Star className="w-8 h-8 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold">Tukang Terverifikasi</h3>
          <p className="text-gray-600">
            Semua tukang telah diverifikasi dan dinilai oleh komunitas kami
          </p>
        </div>

        <div className="text-center space-y-4 p-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold">Platform Aman</h3>
          <p className="text-gray-600">
            Keamanan dan kenyamanan Anda adalah prioritas utama kami
          </p>
        </div>

        <div className="text-center space-y-4 p-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold">Komunitas Berkembang</h3>
          <p className="text-gray-600">
            Bergabung dengan ribuan pelanggan yang puas
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-primary-50 rounded-2xl p-12 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Anda Seorang Tukang Ahli?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Bergabung dengan platform kami untuk terhubung dengan pelanggan dan kembangkan bisnis Anda
        </p>
        <Link
          to="/register"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-lg"
        >
          <span>Daftar sebagai Tukang</span>
        </Link>
      </section>
    </div>
  );
};

export default Home;