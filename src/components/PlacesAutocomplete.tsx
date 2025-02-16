import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSelect: (location: string) => void;
}

const PlacesAutocomplete: React.FC<Props> = ({ value, onChange, onSelect }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Mock data for Indonesia locations
  const mockLocations = [
    'Jakarta Selatan, DKI Jakarta',
    'Jakarta Pusat, DKI Jakarta',
    'Jakarta Barat, DKI Jakarta',
    'Jakarta Timur, DKI Jakarta',
    'Jakarta Utara, DKI Jakarta',
    'Bandung, Jawa Barat',
    'Surabaya, Jawa Timur',
    'Medan, Sumatera Utara',
    'Semarang, Jawa Tengah',
    'Yogyakarta, DI Yogyakarta',
    'Tangerang, Banten',
    'Depok, Jawa Barat',
    'Bekasi, Jawa Barat',
    'Bogor, Jawa Barat',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value.length > 2) {
      const filtered = mockLocations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [value]);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative mt-1">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder="Masukkan lokasi Anda"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(suggestion);
                onChange(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlacesAutocomplete;