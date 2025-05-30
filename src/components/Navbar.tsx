"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faZ } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Navbar() {
  const menus = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "Product",
      href: "#product",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="bg-white">
      <div
        className={`mx-auto fixed z-20 w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md text-black" : "bg-white/25"
        }`}
      >
        <div className="flex h-16 items-center justify-between">
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
                      className="text-black transition hover:text-black/75"
                      href={menu.href}
                    >
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <a
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                  href="#"
                >
                  Login
                </a>

                <div className="hidden sm:flex">
                  <a
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                    href="#"
                  >
                    Register
                  </a>
                </div>
              </div>

              <div className="block md:hidden">
                <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
