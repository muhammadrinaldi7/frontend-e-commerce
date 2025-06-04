"use client";
import { useFetchAllProducts } from "@/app/api/Products/useFetch";
import Spinner from "@/components/Spinner";
import { FormatRupiah, proxiedUrl } from "@/lib/utils";
import { CartItem, useCartStore } from "@/store/useCartStore";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
export default function ProductSection() {
  const { data: products, isLoading } = useFetchAllProducts(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}products`
  );
  const productsData = products?.data.slice(0, 4);
  const { addToCart, triggerShake } = useCartStore();
  const handleAddToCart = (product: CartItem) => {
    addToCart(product);
    triggerShake();
  };
  const router = useRouter();
  return (
    <section id="product">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Koleksi Produk Kami
          </h2>

          <p className="mx-auto mt-4 max-w-md text-gray-500">
            Barang terbaru kami dengan harga terbaik, cocok untuk semua kalangan
            dan semua gaya.
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading && (
            <li className="flex items-center w-full col-span-4 justify-center">
              <Spinner />
            </li>
          )}
          {productsData?.map((product, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.5 }} // animasi awal
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: false }}
            >
              <div
                className={`group block overflow-hidden ${
                  product.qty === 0 ? "opacity-50 grayscale-75" : ""
                }`}
              >
                <Image
                  width={1000}
                  height={1000}
                  onClick={() => router.push(`/products/${product.id}`)}
                  src={proxiedUrl(product.image_product)}
                  alt={product.product_name}
                  className="h-[150px] cursor-pointer w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />
                <div className="relative bg-white pt-3">
                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {product.product_name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="mt-2">
                      <span className="tracking-wider text-gray-900">
                        {FormatRupiah(product.price)}
                      </span>
                    </p>
                    <button
                      disabled={product.qty === 0}
                      onClick={() =>
                        handleAddToCart({
                          product_id: product.id,
                          quantity: 1,
                        })
                      }
                      className="p-2 text-sm cursor-pointer rounded-lg border-indigo-600 hover:bg-blue-600 hover:text-white border text-indigo-600 drop-shadow-xl"
                    >
                      Add to Cart <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
        <div className="w-full flex justify-center items-center">
          <Link
            href="/products"
            className="mt-8 inline-block rounded-full border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden"
          >
            Lihat Selengkapnya
          </Link>
        </div>
      </div>
    </section>
  );
}
