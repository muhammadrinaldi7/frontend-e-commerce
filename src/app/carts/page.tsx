"use client";

import { useCartStore } from "@/store/useCartStore";
import { useFetchAllProducts } from "../api/Products/useFetch";
import Image from "next/image";
import { FormatRupiah, proxiedUrl } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CartPage() {
  const { data: products, isLoading } = useFetchAllProducts(
    `https://backend-ecommerce.rndev.my.id/api/products`
  );
  const { cartItems, incQty, decQty } = useCartStore();
  const productsData = products?.data || [];

  // Gabungkan cartItem dengan data produk lengkap
  const cartWithProductDetails = cartItems.map((cartItem) => {
    const product = productsData.find((p) => p.id === cartItem.product_id);
    return {
      ...product,
      quantity: cartItem.quantity,
    };
  });
  const totalPrice = cartWithProductDetails.reduce(
    (total, product) => total + (product.price || 0) * product.quantity,
    0
  );
  console.log(totalPrice);
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Keranjang Kamu
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {isLoading ? (
                  <li className="flex w-full justify-center items-center gap-4">
                    <Spinner />
                  </li>
                ) : cartWithProductDetails.length === 0 ? (
                  <li className="flex w-full justify-center  items-center gap-4">
                    <p className="text-sm text-gray-500">
                      Keranjang kamu masih kosong, ayo lihat{" "}
                      <Link
                        href="/#product"
                        className="underline text-indigo-500"
                      >
                        produk terbaru
                      </Link>
                    </p>
                  </li>
                ) : (
                  cartWithProductDetails.map((product, index) => (
                    <li
                      key={index}
                      className="flex border-b border-black items-center gap-4"
                    >
                      <Image
                        src={proxiedUrl(
                          `https://backend-ecommerce.rndev.my.id/public/${product.image_product}`
                        )}
                        alt={product?.product_name || "cart"}
                        width={1000}
                        height={1000}
                        className="size-16 rounded-sm object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">
                          {product?.product_name}
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Qty : </dt>
                            <dd className="inline">{product?.qty}</dd>
                          </div>

                          <div>
                            <dt className="inline">Harga : </dt>
                            <dd className="inline">
                              {FormatRupiah(product?.price || 0)}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decQty(product?.id || "")}
                            className="text-gray-600 text-xs transition hover:text-red-600"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <div className="h-8 w-12 flex items-center justify-center rounded-sm border-gray-200 bg-gray-50 text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none">
                            {product?.quantity}
                          </div>
                          <button
                            onClick={() => incQty(product?.id || "")}
                            className="text-gray-600 text-xs transition hover:text-red-600"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>

                        <button className="text-gray-600 transition hover:text-red-600">
                          <span className="sr-only">Remove item</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>{FormatRupiah(totalPrice || 0)}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
