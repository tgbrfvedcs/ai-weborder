import React from 'react';
import { LocationIcon, ClockIcon, PhoneIcon, ViLogo } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="w-full">
        <div className="bg-gray-200 h-64 relative">
             <img 
                src="https://images.unsplash.com/photo-1555126634-785288e63414?q=80&w=1600" 
                alt="Noodles banner"
                className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-7xl lg:px-8">
                 <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full inline-flex">
                     <button className="bg-brand-primary text-white font-semibold px-4 py-1 rounded-full text-sm">ENG</button>
                </div>
            </div>

            <div className="absolute -bottom-16 left-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-7xl lg:px-8">
                <div className="w-24 h-24 bg-white rounded-full shadow-lg p-2">
                    <div className="bg-brand-primary w-full h-full rounded-full flex items-center justify-center">
                        <ViLogo className="w-12 h-12 text-white" />
                    </div>
                </div>
            </div>
        </div>

      <div className="bg-white shadow-sm pt-20 pb-6">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-brand-text">Vị Noodles & Matcha Latte - Quận 7</h1>
                    <div className="flex items-center gap-2 mt-2 text-green-600 font-semibold">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Open now
                    </div>
                    <div className="mt-4 space-y-2 text-gray-600">
                        <p className="flex items-center gap-2">
                            <LocationIcon className="w-5 h-5"/>
                            <span>21, Số 16, Tan Phu Ward, District 7, Ho Chi Minh City, 72915, Vietnam</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <ClockIcon className="w-5 h-5"/>
                            <span>Opening hours: 10:30 - 20:00</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <PhoneIcon className="w-5 h-5"/>
                            <span>Store Hotline 0967003753</span>
                        </p>
                    </div>
                </div>
                <div>
                     <button className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                        <span>My order</span>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};