"use client";
import { Input } from "@/components/ui/input";
import { proxiedUrl, FormatRupiah } from "@/lib/utils";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useFetchAllProducts,
  useFetchProductsByCategory,
} from "../api/Products/useFetch";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ProductResponse } from "@/lib/types";
import { useFetchAllCategories } from "../api/Category/useFetch";
import { CartItem, useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { BreadcrumbsSeparator } from "@/components/BreadCrumbSp";

export default function ProductsPage() {
  const [searchProduct, setSearchProduct] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { data: allProducts, isLoading: isLoadingAll } = useFetchAllProducts(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}products`
  );
  const { data: category } = useFetchAllCategories();
  const { data: filteredProducts, isLoading: isLoadingFiltered } =
    useFetchProductsByCategory(categoryId);

  const products = categoryId ? filteredProducts?.data : allProducts?.data;

  const displayedProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product: ProductResponse) =>
      product.product_name.toLowerCase().includes(searchProduct.toLowerCase())
    );
  }, [products, searchProduct]);

  const isLoading = categoryId ? isLoadingFiltered : isLoadingAll;
  const isEmpty = !isLoading && displayedProducts.length === 0;
  const { addToCart, triggerShake } = useCartStore();
  const handleAddToCart = (product: CartItem) => {
    addToCart(product);
    triggerShake();
  };
  return (
    <section>
      <div className="mx-auto max-w-screen-xl min-h-screen flex flex-col px-4 py-20">
        <BreadcrumbsSeparator items={[{ label: "Product" }]} />
        <header className="">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>
          <p className="mt-4 max-w-md text-gray-500">
            Koleksi Seluruh Produk Kami
          </p>
        </header>

        <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex rounded-sm border border-gray-100 flex-1 min-w-[200px]">
            <Input
              placeholder="Search by product name"
              className="flex-1"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="Category" className="sr-only">
              Category
            </label>
            <select
              id="Category"
              className="h-10 rounded-sm border-gray-300 text-sm"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">All Categories</option>
              {category?.data.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            <li className="flex items-center w-full col-span-4 justify-center">
              <Spinner />
            </li>
          ) : isEmpty ? (
            <li className="flex items-center w-full col-span-4 justify-center">
              <p className="text-gray-500">No products found</p>
            </li>
          ) : (
            displayedProducts.map((product: ProductResponse, index: string) => (
              <li key={index}>
                <Link
                  href={`/products/${product.id}`}
                  className="group block overflow-hidden"
                >
                  <Image
                    width={1000}
                    height={1000}
                    src={proxiedUrl(product.image_product)}
                    alt={product.product_name}
                    className="h-[150px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
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
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
