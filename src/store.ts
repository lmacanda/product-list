import { create } from 'zustand';
import type { CartItem, Product } from './types';

interface CartState {
  cart:           CartItem[];
  addToCart:      (product: Product) => void;
  removeFromCart: (productName: string) => void;
  updateQuantity: (productName: string, delta: number) => void;
  clearCart:      () => void;
}

export const useCartStore = create<CartState>((set) => ({
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
      .filter(item => item.quantity > 0) // auto-remove at 0
  })),

  clearCart: () => set({ cart: [] }),
}));