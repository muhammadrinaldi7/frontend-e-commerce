"use client";

import { useFetchDetailOrder } from "@/app/api/Orders/useFetch";
import { BreadcrumbsSeparator } from "@/components/BreadCrumbSp";
import { FormatDate } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function DetailOrder() {
  const { id } = useParams();
  const { data: detailOrder } = useFetchDetailOrder(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}orders/${id}`
  );
  const date = new Date(Date.now());
  return (
    <div className="mx-auto container w-full flex justify-center flex-col gap-4 px-4 py-20">
      <BreadcrumbsSeparator
        items={[
          { label: "Orders", href: "/orders" },
          { label: `Detail #${id}` },
        ]}
      />
      <h1 className="text-3xl font-bold text-gray-900">Detail Order</h1>

      <div className="max-w-sm md:max-w-full overflow-auto p-6 bg-white rounded-2xl shadow-md border">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Invoice Order #{detailOrder?.data.id}
          </h2>
          <p className="text-gray-600">
            Tanggal: {detailOrder?.data.order_date}
          </p>
          {/* <p className="text-gray-600">Customer:</p> */}
          <p className="text-gray-600">
            Status Pembayaran:{" "}
            <span
              className={`font-semibold ${
                detailOrder?.data.payment &&
                detailOrder?.data.payment.payment_status === "PAID"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {detailOrder?.data.payment &&
              detailOrder?.data.payment.payment_status === "PAID"
                ? "PAID"
                : "UNPAID"}
            </span>
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto ">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 border">Produk</th>
                <th className="px-4 py-3 border">Harga</th>
                <th className="px-4 py-3 border">Jumlah</th>
                <th className="px-4 py-3 border">Subtotal</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {detailOrder?.data.details.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3 border">
                    {item.product.product_name}
                  </td>
                  <td className="px-4 py-3 border">
                    Rp{item.product.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3 border">{item.quantity}</td>
                  <td className="px-4 py-3 border">
                    Rp
                    {(item.product.price * item.quantity).toLocaleString(
                      "id-ID"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 border-t">
                <td
                  colSpan={3}
                  className="text-right px-4 py-3 font-bold border"
                >
                  Total
                </td>
                <td className="px-4 py-3 font-bold border">
                  Rp{detailOrder?.data.total_price.toLocaleString("id-ID")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <ol className="relative justify-between mt-4 flex gap-8 before:absolute before:-mt-px before:h-0.5 before:w-full before:rounded-full before:bg-gray-200">
        <li className="relative -mt-1.5">
          <span className="block size-3 rounded-full bg-indigo-600"></span>

          <div className="mt-4">
            <time className="text-xs/none font-medium text-gray-700">
              {FormatDate(detailOrder?.data.order_date || "")}
            </time>

            <h3 className="text-lg font-bold text-gray-900">Order</h3>
          </div>
        </li>

        {detailOrder?.data.payment &&
        detailOrder?.data.payment.payment_status === "PAID" ? (
          <li className="relative -mt-1.5">
            <span className="block size-3 rounded-full bg-indigo-600"></span>

            <div className="mt-4">
              <time className="text-xs/none font-medium text-gray-700">
                {FormatDate(detailOrder?.data.payment.payment_date || "")}
              </time>

              <h3 className="text-lg font-bold text-gray-900">Dibayar</h3>
            </div>
          </li>
        ) : (
          <li className="relative -mt-1.5">
            <span className="block size-3 rounded-full bg-red-600"></span>

            <div className="mt-4">
              <time className="text-xs/none font-medium text-gray-700/70">
                {FormatDate(date.toString())}
              </time>

              <h3 className="text-lg font-bold text-gray-900">Belum Dibayar</h3>
            </div>
          </li>
        )}
        {detailOrder?.data.status.toLocaleUpperCase() === "DELIVERED" ? (
          <li className="relative -mt-1.5">
            <span className="block size-3 rounded-full bg-indigo-600"></span>

            <div className="mt-4">
              <time className="text-xs/none font-medium text-gray-700">
                {FormatDate(detailOrder?.data.payment.payment_date || "")}
              </time>

              <h3 className="text-lg font-bold text-gray-900">DIKIRIM</h3>
            </div>
          </li>
        ) : (
          <li className="relative -mt-1.5">
            <span className="block size-3 rounded-full bg-red-600"></span>

            <div className="mt-4">
              <time className="text-xs/none font-medium text-gray-700/70">
                {FormatDate(date.toString())}
              </time>

              <h3 className="text-lg font-bold text-gray-900">Belum DIkirim</h3>
            </div>
          </li>
        )}
      </ol>
    </div>
  );
}
