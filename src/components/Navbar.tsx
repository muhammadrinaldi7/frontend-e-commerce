"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faZ } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
export default function Navbar() {
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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handleOpen = () => setOpen(!open);
  const router = useRouter();
  const { cartItems, isShaking, stopShake } = useCartStore();
  return (
    <header className="bg-white">
      <div
        className={`mx-auto fixed z-20 w-full sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md text-black" : "bg-white/25"
        }`}
      >
        <div className="flex h-16 px-4 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-[#FFD700]" href="#">
              <span className="sr-only">Home</span>
              <FontAwesomeIcon icon={faZ} className="h-8" />
            </a>
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
                className="p-1 flex items-center cursor-pointer gap-2 border rounded-md border-black"
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <span>{cartItems.length}</span>
              </motion.div>
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md hover:bg-indigo-600 border border-indigo-600 text-indigo-600 px-5 py-2.5 text-sm font-medium hover:text-white shadow-sm"
                  href="/login"
                >
                  Login
                </Link>

                <div className="hidden sm:flex">
                  <a
                    className="rounded-md bg-[#FFD700] hover:bg-white hover:border hover:border-[#FFD700] hover:text-[#FFD700] px-5 py-2.5 text-sm font-medium text-white"
                    href="#"
                  >
                    Register
                  </a>
                </div>
              </div>

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
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
