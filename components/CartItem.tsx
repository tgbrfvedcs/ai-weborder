import React from 'react';
import { CartItem as CartItemType } from '../types';
import { EditIcon } from './Icons';
import { formatCurrency } from '../App';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (uniqueCartId: string, newQuantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity }) => {
  return (
    <div className="flex flex-col">
        <div className="flex justify-between items-start">
            <p className="font-semibold">{item.quantity} x {item.foodItem.name}</p>
            <div className="flex items-center gap-4">
                <p className="font-semibold text-gray-800">{formatCurrency(item.totalPrice)}</p>
                <button className="text-gray-500 hover:text-brand-primary">
                    <EditIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
        {item.selectedOptions.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
                + {item.selectedOptions.map(opt => opt.name).join(', ')}
            </p>
        )}
        {item.specialInstructions && (
             <p className="text-sm text-gray-500 mt-1 italic">
                Note: {item.specialInstructions}
            </p>
        )}
    </div>
  );
};