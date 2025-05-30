import { create } from "zustand";

export interface CartItem {
  product_id: string;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
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
}));
