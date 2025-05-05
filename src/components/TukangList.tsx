import React from 'react';
import tukangList, { Tukang } from '../data/tukangData';

const TukangList: React.FC = () => {
  return (
    <div className="tukang-list-container">
      <h2>Daftar Tukang</h2>
      <div className="tukang-grid">
        {tukangList.map((tukang: Tukang) => (
          <div key={tukang.id} className="tukang-card">
            <div className="tukang-photo">
              <img src={`/images/${tukang.photo}`} alt={tukang.name} />
            </div>
            <div className="tukang-info">
              <h3>{tukang.name}</h3>
              <p className="specialty">{tukang.specialty}</p>
              <p className="location">{tukang.location}</p>
              <p className="experience">Pengalaman: {tukang.experience} tahun</p>
              <p className="rate">Rp {tukang.hourlyRate}/jam</p>
              <p className={`availability ${tukang.available ? 'available' : 'unavailable'}`}>
                {tukang.available ? 'Tersedia' : 'Tidak Tersedia'}
              </p>
              <button className="contact-button">Hubungi</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TukangList;