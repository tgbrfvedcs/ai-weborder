import { FoodItem } from './types';

export const MENU_ITEMS: FoodItem[] = [
  {
    id: 1,
    name: "Matcha Earl Grey",
    price: 59000,
    image: "https://images.unsplash.com/photo-1557888108-345e25283f3e?q=80&w=800",
    category: "Món mới (New)",
  },
  {
    id: 2,
    name: "Matcha Pumpkin (Bí đỏ)",
    price: 69000,
    image: "https://images.unsplash.com/photo-1629573822221-7894a45a7662?q=80&w=800",
    category: "Món mới (New)",
    options: [
      {
        id: 'size',
        name: 'Up Size',
        type: 'radio',
        options: [
          { id: 'size-m', name: 'Up Size M', price: 20000 },
        ]
      },
      {
        id: 'sweetness',
        name: 'Độ Ngọt (Ít Ngọt - Mặc định)',
        type: 'radio',
        options: [
          { id: 'sweet-more', name: 'Thêm Ngọt', price: 0 },
          { id: 'sweet-strong', name: 'Đậm Ngọt', price: 0 },
        ]
      },
      {
        id: 'extra',
        name: 'Extra',
        type: 'checkbox',
        options: [
          { id: 'extra-shiratama', name: 'Viên Nếp Shiratama', price: 12500 },
          { id: 'extra-shot', name: 'Extra Matcha Shot', price: 12500 },
          { id: 'extra-milk', name: 'Sữa Đặc /+ Condensed Milk', price: 7500 },
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Mango Hojicha (Xoài)",
    price: 53000,
    image: "https://images.unsplash.com/photo-1610972379203-d2f09f29a0a0?q=80&w=800",
    category: "Món mới (New)",
  },
  {
    id: 4,
    name: "Strawberry Hojicha (Dâu)",
    price: 53000,
    image: "https://images.unsplash.com/photo-1579580332863-916891a037b5?q=80&w=800",
    category: "Món mới (New)",
  },
  {
    id: 5,
    name: "Classic Udon",
    price: 85000,
    image: "https://images.unsplash.com/photo-1612929633738-7c8a916446e2?q=80&w=800",
    category: "Mì Nước",
  },
  {
    id: 6,
    name: "Spicy Miso Ramen",
    price: 95000,
    image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=800",
    category: "Mì Nước",
  },
  {
    id: 7,
    name: "Cold Soba Noodles",
    price: 75000,
    image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=800",
    category: "Mì Chấm",
  },
  {
    id: 8,
    name: "Plain Rice",
    price: 15000,
    image: "https://images.unsplash.com/photo-1586201375822-52c676f3e2f7?q=80&w=800",
    category: "Cơm",
  },
];

export const CATEGORIES = [
    "Món mới (New)",
    "Mì Nước",
    "Mì Chấm",
    "Mì Trộn",
    "Cơm",
    "Sides / Extra Toppings",
    "Matcha",
    "Drinks",
];