import React from 'react';
import { FoodItem } from '../types';
import { MenuItem } from './MenuItem';

interface MenuProps {
  categoryTitle: string;
  menuItems: FoodItem[];
  onSelectItem: (item: FoodItem) => void;
}

export const Menu: React.FC<MenuProps> = ({ categoryTitle, menuItems, onSelectItem }) => {
  return (
    <div>
        <h2 className="text-xl font-bold mb-4">{categoryTitle}</h2>
        {menuItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {menuItems.map((item) => (
                <MenuItem 
                    key={item.id} 
                    item={item} 
                    onSelectItem={onSelectItem}
                />
            ))}
            </div>
        ): (
            <p className="text-gray-500">No items in this category.</p>
        )}
    </div>
  );
};