"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import { proxiedUrl } from "@/lib/utils";
import LogoutModal from "./ModalsLogout";
import { useProfileStore } from "@/store/profileStore";
export default function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const [auth, setAuth] = useState(false);
  const menus = [
    {
      name: "Home",
      href: "/#home",
    },
    {
      name: "Product",
      href: "/#product",
    },
    {
      name: "Contact",
      href: "/#contact",
    },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { profile } = useProfileStore();
  useEffect(() => {
    if (Cookies.get("token") && profile) {
      try {
        setAuth(true);
      } catch (e) {
        console.error("Failed to parse user from sessionStorage", e);
        setAuth(false);
      }
    }
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [profile]);
  const handleOpen = () => setOpen(!open);
  const router = useRouter();
  const { cartItems, isShaking, stopShake } = useCartStore();
  const handleLogout = () => {
    Cookies.remove("token");
    sessionStorage.removeItem("user");
    setAuth(false);
    router.push("/");
    setShowLogout(false);
  };
  return (
    <header className="bg-white">
      <div
        className={`mx-auto fixed z-20 w-full sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md text-black" : "bg-white/25"
        }`}
      >
        <div className="flex h-16 px-4 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <div className="block text-[#FFD700]">
              <span className="sr-only">Home</span>
              {auth ? (
                <Image
                  src={proxiedUrl(profile?.avatar)}
                  width={1000}
                  height={1000}
                  className="h-8 rounded-full overflow-hidden w-auto"
                  alt="Icon"
                />
              ) : (
                <Image
                  src="/favIcon.png"
                  width={1000}
                  height={1000}
                  className="h-8 rounded-full overflow-hidden w-auto"
                  alt="Icon"
                />
              )}
            </div>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {menus.map((menu, index) => (
                  <li key={index}>
                    <Link
                      className="text-black font-semibold transition hover:text-black/75"
                      href={menu.href}
                    >
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <motion.div
                animate={
                  isShaking ? { rotate: [0, -15, 15, -10, 10, -5, 5, 0] } : {}
                }
                transition={{ duration: 0.6 }}
                onAnimationComplete={stopShake}
                onClick={() => router.push("/carts")}
                className="p-1 flex items-center cursor-pointer gap-2 border rounded-md border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <span>{cartItems.length}</span>
              </motion.div>
              {!auth ? (
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="rounded-md hover:bg-indigo-600 border border-indigo-600 text-indigo-600 px-5 py-2.5 text-sm font-medium hover:text-white shadow-sm"
                    href="/login"
                  >
                    Login
                  </Link>

                  <div className="hidden sm:flex">
                    <Link
                      className="rounded-md bg-[#FFD700] hover:bg-white hover:border hover:border-[#FFD700] hover:text-[#FFD700] px-5 py-2.5 text-sm font-medium text-white"
                      href="/register"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="sm:flex sm:gap-4">
                  <button
                    className="rounded-md bg-red-600 hover:bg-white hover:border hover:border-red-600 hover:text-red-600 px-5 py-2.5 text-sm font-medium text-white"
                    onClick={() => setShowLogout(!showLogout)}
                  >
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                  </button>
                </div>
              )}

              <div className="block md:hidden">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleOpen}
                  className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: open ? 0 : "100%" }}
              transition={{ duration: 0.5 }}
              exit={{ x: "100%" }}
              className={`bg-black z-30 w-full ${
                scrolled ? "bg-white shadow-md text-black" : "bg-white/25"
              }`}
            >
              <nav aria-label="Global">
                <ul className="flex flex-col py-4 items-center gap-6 text-sm">
                  {menus.map((menu, index) => (
                    <li key={index}>
                      <Link
                        className="text-black font-semibold transition hover:text-black/75"
                        href={menu.href}
                      >
                        {menu.name}
                      </Link>
                    </li>
                  ))}
                  {!auth && (
                    <li>
                      <Link
                        className="text-black font-semibold transition hover:text-black/75"
                        href="/register"
                      >
                        Register
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <LogoutModal
        isOpen={showLogout}
        onConfirm={handleLogout}
        onClose={() => setShowLogout(false)}
      />
    </header>
  );
}
