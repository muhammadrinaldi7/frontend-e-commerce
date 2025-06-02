"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // pastikan ini terinstall
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Contacts() {
  const [isOpenFrame, setIsOpenFrame] = useState(true);

  return (
    <div className="flex items-center flex-col gap-4 min-h-screen bg-gray-100 py-20 px-4">
      <h1 className="text-3xl font-bold text-gray-900">Profile Pengembang</h1>
      <div className="flex w-full justify-end">
        <button
          onClick={() => setIsOpenFrame(!isOpenFrame)}
          className={`bg-${
            isOpenFrame ? "red" : "indigo"
          }-600 text-white hover:bg-white hover:text-${
            isOpenFrame ? "red" : "indigo"
          }-600 hover:border-${
            isOpenFrame ? "red" : "indigo"
          }-600 hover:border rounded-md px-4 py-2 transition-all duration-200`}
        >
          {isOpenFrame ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpenFrame && (
          <motion.div
            key="iframe-wrapper"
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full max-w-5xl aspect-video h-[800px] rounded-2xl overflow-hidden shadow-xl border border-gray-300"
          >
            <iframe
              src="https://rndev.my.id"
              title="Web Profile"
              width="100%"
              height="100%"
              className="w-full h-full"
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
