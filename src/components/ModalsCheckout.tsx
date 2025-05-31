"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/profileStore";
import { useActionOrder } from "@/app/api/Orders/useAction";
import { CartItem, useCartStore } from "@/store/useCartStore";
import { OrdersPayload } from "@/lib/types";
import toast from "react-hot-toast";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
}: CheckoutModalProps) {
  const router = useRouter();
  const { profile } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const { resetCart } = useCartStore();
  const [payloadOrder, setPayloadOrder] = useState<OrdersPayload>({
    user_id: profile?.id || "",
    shipping_address: "",
    items: items,
  });

  const { CreateOrder } = useActionOrder();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayloadOrder({
      ...payloadOrder,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await CreateOrder(payloadOrder, {
        onSuccess: () => {
          toast.success("Order created successfully");
          router.push("/orders");
          onClose();
          resetCart();
        },
      });
    } catch (err) {
      console.error("Gagal membuat order:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center">
                <ShoppingCart size={42} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800 text-center mt-2">
                  Konfirmasi Checkout
                </h2>
                <p className="text-sm text-gray-500 text-center">
                  Masukkan alamat pengiriman Anda sebelum checkout.
                </p>
              </div>

              <input
                value={payloadOrder.shipping_address}
                onChange={handleChange}
                name="shipping_address"
                placeholder="Masukkan alamat pengiriman"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!payloadOrder.shipping_address.trim() || isLoading}
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    !payloadOrder.shipping_address.trim() || isLoading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isLoading ? "Memproses..." : "Checkout Sekarang"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
