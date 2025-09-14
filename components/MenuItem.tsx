import React from 'react';
import { FoodItem } from '../types';
import { PlusIcon } from './Icons';
import { formatCurrency } from '../App';

interface MenuItemProps {
  item: FoodItem;
  onSelectItem: (item: FoodItem) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onSelectItem }) => {
  return (
    <div 
      id={`menu-item-${item.id}`}
      className="bg-white rounded-lg overflow-hidden flex flex-col group transition-all duration-300 border hover:shadow-md"
    >
      <div className="flex-grow p-4 flex gap-4">
        <div className="flex-grow">
          <h3 className="text-md font-bold text-brand-text">{item.name}</h3>
          <p className="text-gray-600 mt-2 font-semibold">{formatCurrency(item.price)}</p>
        </div>
        <div className="flex-shrink-0">
            <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-md"
            />
        </div>
      </div>
      <div className="p-4 pt-0">
         <button
            onClick={() => onSelectItem(item)}
            className="w-full flex items-center justify-center text-brand-primary border-2 border-brand-light font-bold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300"
          >
            <PlusIcon className="w-5 h-5"/>
          </button>
      </div>
    </div>
  );
};