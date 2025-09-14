import React from 'react';
import { CartItem as CartItemType } from '../types';
import { CartItem } from './CartItem';
import { CartIcon, TrashIcon } from './Icons';
import { formatCurrency } from '../App';

interface CartProps {
  cartItems: CartItemType[];
  onUpdateQuantity: (uniqueCartId: string, newQuantity: number) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ cartItems, onUpdateQuantity, onCheckout }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
      <div className="bg-white rounded-lg shadow sticky top-28">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Selected item</h2>
            {cartItems.length > 0 && (
                 <button onClick={() => onUpdateQuantity(cartItems[0]?.uniqueCartId, 0)} className="text-gray-400 hover:text-red-500 absolute top-4 right-4">
                    <TrashIcon className="w-5 h-5"/>
                </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-6 h-64">
                <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <CartIcon className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">There are no items in the cart</h3>
            </div>
          ) : (
            <>
            <div className="overflow-y-auto p-4 space-y-4 max-h-96">
              {cartItems.map((item) => (
                <CartItem key={item.uniqueCartId} item={item} onUpdateQuantity={onUpdateQuantity} />
              ))}
            </div>
             <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg text-gray-600">Into money 3 part</span>
                    <span className="text-2xl font-bold text-brand-text">{formatCurrency(subtotal)}</span>
                </div>
                <button 
                    onClick={onCheckout}
                    className="w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 rounded-lg text-lg transition-colors">
                    Continue
                </button>
            </div>
            </>
          )}
      </div>
  );
};