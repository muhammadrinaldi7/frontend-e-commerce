"use client";

import { useFetchDetailProduct } from "@/app/api/Products/useFetch";
import { BreadcrumbsSeparator } from "@/components/BreadCrumbSp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { FormatRupiah, proxiedUrl } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function DetailProduct() {
  const { id } = useParams();
  const { data: detailProduct } = useFetchDetailProduct(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}products/${id}`
  );
  const gallery: string[] = JSON.parse(
    detailProduct?.data.gallery_product || "[]"
  );
  console.log(detailProduct);
  return (
    <>
      <div className="mx-auto container flex flex-col gap-4 w-full  py-24 px-6">
        <BreadcrumbsSeparator
          items={[{ label: "Product", href: "/products" }, { label: "Detail" }]}
        />
        <h2 className="text-3xl text-center font-bold text-gray-900">
          Detail Product
        </h2>
        <div className="flex flex-col w-full justify-center items-center md:flex-row p-4 gap-8">
          <Carousel className="max-w-md rounded-xl overflow-hidden drop-shadow-lg">
            <CarouselContent className="flex gap-4">
              {gallery.map((item, index) => (
                <CarouselItem key={index} className="bg-black rounded-xl gap-2">
                  <Image
                    alt=""
                    width={1000}
                    height={1000}
                    src={proxiedUrl(item)}
                    className="w-full h-full bg-cover object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="flow-root w-full items-start">
            <dl className="-my-3 divide-y divide-gray-200 rounded border border-gray-200 text-sm *:even:bg-gray-50">
              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Kategori</dt>

                <dd className="text-gray-700 sm:col-span-2">
                  {detailProduct?.data.category.category_name}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Produk</dt>

                <dd className="text-gray-700 sm:col-span-2">
                  {detailProduct?.data.product_name}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Stok</dt>

                <dd className="text-gray-700 sm:col-span-2">
                  {detailProduct?.data.qty}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Harga</dt>

                <dd className="text-gray-700 sm:col-span-2">
                  {FormatRupiah(detailProduct?.data.price || 0)}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Deskripsi</dt>

                <dd className="text-gray-700 sm:col-span-2">
                  {detailProduct?.data.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
