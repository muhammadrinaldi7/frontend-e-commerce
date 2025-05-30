import { create } from "zustand";

export interface CartItem {
  product_id: string;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  incQty: (id: string) => void;
  decQty: (id: string) => void;

  // Animation
  isShaking: boolean;
  triggerShake: () => void;
  stopShake: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (item: CartItem) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.product_id === item.product_id
      );

      // Jika item sudah ada di keranjang, tambahkan quantity nya saja
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product_id === item.product_id
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + item.quantity,
                }
              : cartItem
          ),
        };
      }
      // Jika item belum ada di keranjang, tambahkan item baru
      return { cartItems: [...state.cartItems, item] };
    }),
  removeFromCart: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.product_id !== id),
    })),
  incQty: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product_id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decQty: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) => ({
        ...item,
        quantity:
          item.product_id === id && item.quantity > 1
            ? item.quantity - 1
            : item.quantity,
      })),
    })),
  // khusus untuk animasi
  isShaking: false,
  triggerShake: () => set({ isShaking: true }),
  stopShake: () => set({ isShaking: false }),
}));
