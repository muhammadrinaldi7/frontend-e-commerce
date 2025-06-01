"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";

interface PromotProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PromotModals({
  isOpen,
  onClose,
  onConfirm,
}: PromotProps) {
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
            className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-4 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center gap-4">
              <User size={40} className="text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                Apakah anda yakin ingin promote user ini?
              </h2>
              {/* <p className="text-sm text-gray-500 text-center">
                Anda akan diarahkan ke halaman login.
              </p> */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Batal
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Promote
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
