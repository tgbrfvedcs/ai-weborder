import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { ChatAssistant } from './components/ChatAssistant';
import { MENU_ITEMS, CATEGORIES } from './constants';
import { CartItem, FoodItem } from './types';
import { ChatIcon } from './components/Icons';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CheckoutView } from './components/CheckoutView';

// --- Utility Function ---
export const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};


function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [currentItem, setCurrentItem] = useState<FoodItem | null>(null);
  const [view, setView] = useState<'menu' | 'checkout'>('menu');

  const handleAddToCart = useCallback((item: CartItem) => {
    setCartItems(prev => {
      // Check if an identical item (same id, same options) already exists
      const existingItemIndex = prev.findIndex(
        cartItem => cartItem.foodItem.id === item.foodItem.id &&
        JSON.stringify(cartItem.selectedOptions.map(o => o.id).sort()) === JSON.stringify(item.selectedOptions.map(o => o.id).sort()) &&
        cartItem.specialInstructions === item.specialInstructions
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        // Fix: Corrected typo from existingItemindex to existingItemIndex.
        newCart[existingItemIndex].quantity += item.quantity;
        // Fix: Corrected typo from existingItemindex to existingItemIndex.
        newCart[existingItemIndex].totalPrice += item.totalPrice;
        return newCart;
      } else {
        return [...prev, item];
      }
    });
    setCurrentItem(null); // Close modal on add
  }, []);
  
  const updateCartQuantity = useCallback((uniqueCartId: string, newQuantity: number) => {
    setCartItems(prev => {
        if(newQuantity <= 0) {
            return prev.filter(item => item.uniqueCartId !== uniqueCartId);
        }
        return prev.map(item => {
            if (item.uniqueCartId === uniqueCartId) {
                const pricePerItem = item.totalPrice / item.quantity;
                return { ...item, quantity: newQuantity, totalPrice: pricePerItem * newQuantity };
            }
            return item;
        });
    });
  }, []);

  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [view]);

  // Render checkout as a full page
  if (view === 'checkout') {
      return <CheckoutView cartItems={cartItems} onBack={() => setView('menu')} />;
  }

  // Render main menu view
  return (
    <div className="min-h-screen font-sans bg-white">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 mt-8">
         <div className="flex flex-col lg:flex-row gap-8">
            {/* Categories */}
            <aside className="lg:w-1/5">
                <h2 className="text-lg font-bold mb-4 hidden lg:block">Menu</h2>
                <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                    {CATEGORIES.map(category => (
                         <li key={category}>
                            <button
                                onClick={() => setSelectedCategory(category)}
                                className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                                    selectedCategory === category ? 'bg-brand-secondary text-brand-primary font-bold' : 'hover:bg-gray-100'
                                }`}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Menu */}
            <div className="flex-grow">
                <div className="mb-4">
                    <input type="text" placeholder="What are you craving?" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-primary outline-none" />
                </div>
                <Menu
                    categoryTitle={selectedCategory}
                    menuItems={filteredMenuItems}
                    onSelectItem={setCurrentItem}
                />
            </div>

            {/* Cart */}
            <aside className="lg:w-1/4">
                <Cart
                    cartItems={cartItems}
                    onUpdateQuantity={updateCartQuantity}
                    onCheckout={() => setView('checkout')}
                />
            </aside>
        </div>
      </main>

      {currentItem && (
        <ItemDetailModal 
            item={currentItem}
            onClose={() => setCurrentItem(null)}
            onAddToCart={handleAddToCart}
        />
      )}
      
      {/* Chat Assistant */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-200"
          aria-label="Open Chat Assistant"
        >
          <ChatIcon className="w-8 h-8"/>
        </button>
      </div>

      <ChatAssistant 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onRecommendations={() => {}} // Placeholder
      />
    </div>
  );
}

export default App;
