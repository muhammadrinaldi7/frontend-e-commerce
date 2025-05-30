"use client";

import { FormatRupiah, proxiedUrl } from "@/lib/utils";
import { useProfileStore } from "@/store/profileStore";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useFetchAllOrders } from "../api/Orders/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill1Wave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { usePaymentAction } from "../api/Payments/useAction";
import { ErrorResponse } from "@/lib/types";
import { AxiosError } from "axios";
import DeleteModal from "@/components/ModalsDelete";
import { useState } from "react";
import { useActionOrder } from "../api/Orders/useAction";

export default function OrdersPage() {
  const { data: orders } = useFetchAllOrders();
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useProfileStore();
  const { Payment } = usePaymentAction(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}payments`
  );
  const { deleteOrder } = useActionOrder();
  const [id, setId] = useState("");
  const handlePayment = async (id: string) => {
    await Payment(
      { order_id: id },
      {
        onSuccess: (data) => {
          window.open(data.data.invoice_url, "_blank", "noopener,noreferrer");
        },
        onError: (error) => {
          const err = error as AxiosError<ErrorResponse>;
          toast.error(err.response?.data.message || "error");
        },
      }
    );
  };

  const handleConfirm = async (id: string) => {
    if (!id) return;
    await deleteOrder(id, {
      onSuccess: () => {
        toast.success("Pesanan berhasil dihapus");
        setIsOpen(false);
      },
      onError: (error) => {
        const err = error as AxiosError<ErrorResponse>;
        toast.error(err.response?.data.message || "error");
      },
    });
  };
  const handleOpen = (id: string) => {
    setId(id);
    setIsOpen(true);
  };
  console.log(orders?.data);
  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full flex justify-center items-center px-8 py-24">
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
                        {`#${order.order_date.split("T")[0]}`}
                      </strong>

                      <p className="mt-1 text-xs font-medium text-gray-300">
                        {order.details
                          .map(
                            (detail) =>
                              detail.product.product_name +
                              " x " +
                              detail.quantity
                          )
                          .join(", ")}
                      </p>
                      <p className="mt-1 text-xs font-medium text-gray-300">
                        {FormatRupiah(order.total_price)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePayment(order.id)}
                        className={`p-2 drop-shadow-lg hover:drop-shadow-2xl rounded-lg border ${
                          order.payment?.payment_status === "PAID"
                            ? "text-green-500 border-green-600"
                            : "border-red-600 text-red-500"
                        }`}
                      >
                        <FontAwesomeIcon icon={faMoneyBill1Wave} size="lg" />
                      </button>
                      <button
                        onClick={() => handleOpen(order.id)}
                        className={`p-2 drop-shadow-lg hover:drop-shadow-2xl rounded-lg border border-red-500 text-red-500`}
                      >
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            <DeleteModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onConfirm={() => handleConfirm(id)}
            />
          </ul>
        </article>
      </div>
    </>
  );
}
