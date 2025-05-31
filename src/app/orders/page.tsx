"use client";

import { FormatDate, proxiedUrl } from "@/lib/utils";
import { useProfileStore } from "@/store/profileStore";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { useFetchAllOrders } from "../api/Orders/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";

export default function OrdersPage() {
  const { data: orders } = useFetchAllOrders();
  const { profile } = useProfileStore();
  console.log(orders);
  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full flex justify-center items-center px-2 py-24">
        <article className="rounded-xl w-full border border-indigo-600 bg-white p-4">
          <div className="flex items-center gap-4">
            <Image
              alt=""
              width={1000}
              height={1000}
              src={proxiedUrl(profile?.avatar)}
              className="size-16 rounded-full object-cover"
            />

            <div>
              <h3 className="text-lg font-medium text-indigo-600">
                {profile?.name}
              </h3>

              <div className="flow-root">
                <p className="mt-1 text-xs font-semibold text-indigo-300">
                  Pesanan Saya
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {orders?.data.map((order, index) => (
              <li key={index}>
                <div className="block h-full rounded-lg border border-indigo-600 p-4 hover:border-pink-600">
                  <div className="flex gap-2 items-center justify-between">
                    <div>
                      <strong className="font-medium text-indigo-600">
                        {FormatDate(order.order_date)}
                      </strong>

                      <p className="mt-1 text-xs font-medium text-gray-300">
                        {order.shipping_address}
                      </p>
                    </div>
                    <div
                      className={`p-2 rounded-lg border ${
                        order.status === "pending"
                          ? "border-red-600 text-red-500"
                          : "text-green-500 border-green-600"
                      }`}
                    >
                      <FontAwesomeIcon icon={faMoneyBill1Wave} size="lg" />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </>
  );
}
