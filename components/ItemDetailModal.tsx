import React, { useState, useMemo, useCallback } from 'react';
import { FoodItem, Option, CartItem, OptionGroup } from '../types';
import { CloseIcon, PlusIcon, MinusIcon } from './Icons';
import { formatCurrency } from '../App';

interface ItemDetailModalProps {
    item: FoodItem;
    onClose: () => void;
    onAddToCart: (item: CartItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, Option[]>>({});
    const [specialInstructions, setSpecialInstructions] = useState('');

    const handleOptionChange = (group: OptionGroup, option: Option, checked: boolean) => {
        setSelectedOptions(prev => {
            const newSelections = { ...prev };
            const currentGroupSelections = newSelections[group.id] || [];

            if (group.type === 'radio') {
                newSelections[group.id] = [option];
            } else if (group.type === 'checkbox') {
                if (checked) {
                    newSelections[group.id] = [...currentGroupSelections, option];
                } else {
                    newSelections[group.id] = currentGroupSelections.filter(o => o.id !== option.id);
                }
            }
            return newSelections;
        });
    };
    
    const flatSelectedOptions = useMemo(() => Object.values(selectedOptions).flat(), [selectedOptions]);

    const totalPrice = useMemo(() => {
        const optionsPrice = flatSelectedOptions.reduce((sum, opt) => sum + opt.price, 0);
        return (item.price + optionsPrice) * quantity;
    }, [item, quantity, flatSelectedOptions]);

    const handleAddToCartClick = () => {
        const cartItem: CartItem = {
            uniqueCartId: `${item.id}-${new Date().getTime()}`,
            foodItem: item,
            quantity,
            selectedOptions: flatSelectedOptions,
            specialInstructions,
            totalPrice
        };
        onAddToCart(cartItem);
    };

    const renderOptionGroup = (group: OptionGroup) => (
        <div key={group.id} className="py-4">
            <h4 className="font-bold">{group.name}</h4>
            <div className="space-y-2 mt-2">
                {group.options.map(option => {
                    const isChecked = selectedOptions[group.id]?.some(o => o.id === option.id) || false;
                    return (
                        <label key={option.id} className="flex items-center justify-between">
                             <div className="flex items-center">
                                <input
                                    type={group.type}
                                    name={group.id}
                                    checked={isChecked}
                                    onChange={(e) => handleOptionChange(group, option, e.target.checked)}
                                    className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300"
                                />
                                <span className="ml-3 text-gray-700">{option.name}</span>
                             </div>
                            {option.price > 0 && <span>+{formatCurrency(option.price)}</span>}
                        </label>
                    )
                })}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col lg:flex-row" onClick={e => e.stopPropagation()}>
                <div className="w-full lg:w-1/2">
                    <img src={item.image} alt={item.name} className="w-full h-64 lg:h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"/>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col">
                    <div className="p-6 flex-grow overflow-y-auto">
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-bold">{item.name}</h2>
                             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <CloseIcon className="w-6 h-6"/>
                            </button>
                        </div>
                        <p className="text-2xl font-bold text-brand-primary mt-2">{formatCurrency(item.price)}</p>
                        
                        <div className="divide-y">
                            {item.options?.map(renderOptionGroup)}
                        </div>

                        <div className="mt-4">
                             <h4 className="font-bold">Special Instructions</h4>
                             <textarea 
                                value={specialInstructions}
                                onChange={e => setSpecialInstructions(e.target.value)}
                                rows={3}
                                className="w-full mt-2 p-2 border rounded-md focus:ring-brand-primary focus:border-brand-primary"
                                placeholder="e.g. less ice, no sugar, etc."
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-b-lg border-t">
                        <div className="flex items-center justify-between">
                             <div className="flex items-center space-x-4">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                                    <MinusIcon className="w-5 h-5" />
                                </button>
                                <span className="text-xl font-bold">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                                    <PlusIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <button 
                                onClick={handleAddToCartClick}
                                className="bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-dark transition-colors"
                            >
                                Add to cart - {formatCurrency(totalPrice)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
