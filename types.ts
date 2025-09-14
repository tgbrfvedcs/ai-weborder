export interface Option {
  id: string;
  name: string;
  price: number;
}

export interface OptionGroup {
  id: string;
  name:string;
  type: 'radio' | 'checkbox';
  options: Option[];
  maxSelections?: number;
}

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  options?: OptionGroup[];
}

export interface CartItem {
  uniqueCartId: string;
  foodItem: FoodItem;
  quantity: number;
  selectedOptions: Option[];
  specialInstructions: string;
  totalPrice: number;
}


export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}