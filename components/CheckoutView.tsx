import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatCurrency } from '../App';
import { BackIcon, UserIcon, EditIcon, ClockIcon, DiscountIcon, LocationIcon, TrashIcon } from './Icons';

interface CheckoutViewProps {
    cartItems: CartItem[];
    onBack: () => void;
}

const InfoRow: React.FC<{ icon: React.ReactNode, children: React.ReactNode, action?: React.ReactNode }> = ({ icon, children, action }) => (
    <div className="flex items-start gap-4">
        <div className="text-gray-500 mt-1">{icon}</div>
        <div className="flex-grow">{children}</div>
        {action && <div className="flex-shrink-0">{action}</div>}
    </div>
);

export const CheckoutView: React.FC<CheckoutViewProps> = ({ cartItems, onBack }) => {
    const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
    const totalParts = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* Mobile Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10 lg:hidden p-4 flex items-center justify-between">
                <button onClick={onBack} className="p-2">
                    <BackIcon className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold">Your dish</h1>
                <button className="p-2 text-gray-500">
                    <TrashIcon className="w-6 h-6" />
                </button>
            </header>

            <div className="container mx-auto p-4 lg:p-8">
                {/* Desktop Header */}
                <div className="hidden lg:flex flex-col items-start mb-6">
                     <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-brand-primary font-semibold mb-6">
                        <BackIcon className="w-5 h-5" />
                        <span>Cart information</span>
                    </button>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column */}
                    <div className="flex-grow lg:max-w-[65%] space-y-4">
                        {/* Delivery Toggle */}
                        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200 rounded-lg">
                            <button 
                                onClick={() => setDeliveryType('delivery')}
                                className={`py-3 px-4 rounded-md font-semibold text-center transition-colors ${deliveryType === 'delivery' ? 'bg-white shadow' : 'text-gray-600'}`}>
                                Delivery
                            </button>
                            <button 
                                onClick={() => setDeliveryType('pickup')}
                                className={`py-3 px-4 rounded-md font-semibold text-center transition-colors ${deliveryType === 'pickup' ? 'bg-white shadow' : 'text-gray-600'}`}>
                                Self Pick-up
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                             <InfoRow icon={<LocationIcon className="w-5 h-5 text-red-500" />}>
                                <p className="font-semibold">Vị Noodles & Matcha Latte - Quận 7</p>
                                <p className="text-sm text-gray-500">21, Số 16, Tan Phu Ward, District 7, Ho Chi Minh City, 72915, Vietnam</p>
                            </InfoRow>
                            <InfoRow 
                                icon={<UserIcon className="w-5 h-5 text-green-500"/>}
                                action={<button className="text-brand-primary font-semibold">Edit</button>}
                            >
                               <p className="font-semibold">casey - 0382832798</p>
                               <p className="text-sm text-gray-500">Green Valley Apartment, Nguyễn Đồng Chỉ, Khu đô thị Phú Mỹ Hưng, Tân Phú, District 7, Ho Chi Minh City</p>
                            </InfoRow>
                             <InfoRow 
                                icon={<ClockIcon className="w-5 h-5"/>}
                                action={<button className="text-brand-primary font-semibold">Edit</button>}
                            >
                                <p className="font-semibold">Time to receive</p>
                                <p className="text-sm text-gray-500">As soon as possible</p>
                            </InfoRow>
                        </div>

                        {/* Payment & Discount */}
                        <div className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Payment method</p>
                                <p className="text-sm text-gray-500">Choose payment method</p>
                            </div>
                            <button className="text-brand-primary font-bold">Choose</button>
                        </div>
                         <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
                            <DiscountIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                            <input type="text" placeholder="Discount code" className="flex-grow bg-transparent focus:outline-none"/>
                            <button className="text-brand-primary font-bold">See</button>
                        </div>


                        {/* Order Summary */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="font-bold text-lg mb-4">Order summary</h2>
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                     <div key={item.uniqueCartId} className="flex items-start justify-between">
                                        <div className="flex gap-4">
                                            <img src={item.foodItem.image} alt={item.foodItem.name} className="w-16 h-16 rounded-md object-cover"/>
                                            <div>
                                                <p className="font-semibold">{item.quantity} x {item.foodItem.name}</p>
                                                <p className="text-sm text-gray-500 max-w-xs">
                                                    {item.selectedOptions.map(opt => opt.name).join(', ')}
                                                </p>
                                            </div>
                                        </div>
                                       <div className="flex items-center gap-4">
                                            <p className="font-semibold">{formatCurrency(item.totalPrice)}</p>
                                            <button className="text-gray-400 hover:text-brand-primary"><EditIcon className="w-5 h-5" /></button>
                                       </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-1/3">
                         <div className="bg-white p-6 rounded-lg shadow-sm sticky top-28">
                            <h2 className="text-xl font-bold mb-4 lg:hidden">Money to be paid</h2>
                            <div className="flex justify-between text-gray-600 mb-2">
                                <span>Total {totalParts} parts</span>
                                <span>{formatCurrency(totalPrice)}</span>
                            </div>
                             <div className="flex justify-between text-gray-600 mb-4">
                                <span>Shipping Fee (0.949km)</span>
                                <span>0đ</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl pt-4 border-t">
                                <span>Money to be paid</span>
                                <span>{formatCurrency(totalPrice)}</span>
                            </div>
                            <button className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg mt-6 hover:bg-brand-dark transition-colors">
                                Want to place an order?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};