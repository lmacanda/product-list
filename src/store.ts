import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 1. Import the middleware
import type { CartItem, Product } from './types';

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productName: string) => void;
  updateQuantity: (productName: string, delta: number) => void;
  clearCart: () => void;
}

// 2. Wrap the store definition in persist()
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) => set((state) => ({
        cart: [...state.cart, { ...product, quantity: 1 }]
      })),

      removeFromCart: (productName) => set((state) => ({
        cart: state.cart.filter(item => item.name !== productName)
      })),

      updateQuantity: (productName, delta) => set((state) => ({
        cart: state.cart
          .map(item => item.name === productName
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
          )
          .filter(item => item.quantity > 0)
      })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'product-list-storage', // 3. The key used in LocalStorage
    }
  )
);