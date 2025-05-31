"use client";
import { useFetchAllProducts } from "@/app/api/Products/useFetch";
import { BreadcrumbsSeparator } from "@/components/BreadCrumbSp";
import { Button } from "@/components/ui/button";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ProductList() {
  const { data: productData } = useFetchAllProducts(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}products`
  );
  return (
    <>
      <div className="mx-auto container flex flex-col gap-4 px-8 py-20">
        <BreadcrumbsSeparator items={[{ label: "List Product" }]} />
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Product List</h1>
          <Link href="/admin/product/new">
            <Button className="bg-indigo-600 text-white hover:bg-white hover:text-indigo-600 hover:border-indigo-600 hover:border">
              Add New Product
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="*:font-medium *:text-gray-900">
                <th className="px-3 py-2 whitespace-nowrap">Name</th>
                <th className="px-3 py-2 whitespace-nowrap">Qty</th>
                <th className="px-3 py-2 whitespace-nowrap">Price</th>
                <th className="px-3 py-2 whitespace-nowrap">Category</th>
                <th className="px-3 py-2 whitespace-nowrap">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
              {productData?.data.map((item, index) => (
                <tr key={index} className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.product_name}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.qty}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.price}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.category.category_name}
                  </td>
                  <td className="px-3 py-2 flex justify-end gap-2 whitespace-nowrap">
                    {item.gallery_product === null && (
                      <Link href={`/admin/product/gallery/${item.id}`}>
                        <Button
                          className={`bg-green-600 hover:text-green-600 hover:border-green-600 text-white hover:bg-white hover:border`}
                        >
                          <FontAwesomeIcon icon={faImages} />
                        </Button>
                      </Link>
                    )}
                    <Link href={`/admin/product/${item.id}`}>
                      <Button className="bg-indigo-600 text-white hover:bg-white hover:text-indigo-600 hover:border-indigo-600 hover:border">
                        Edit
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
