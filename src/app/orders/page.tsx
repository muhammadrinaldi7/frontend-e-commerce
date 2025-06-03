"use client";

import { FormatRupiah, proxiedUrl } from "@/lib/utils";
import { useProfileStore } from "@/store/profileStore";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useFetchAllOrders } from "../api/Orders/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faTrash,
  faTruckDroplet,
} from "@fortawesome/free-solid-svg-icons";
// import { usePaymentAction } from "../api/Payments/useAction";
import { ErrorResponse } from "@/lib/types";
import { AxiosError } from "axios";
import DeleteModal from "@/components/ModalsDelete";
import { useState } from "react";
import { useActionOrder } from "../api/Orders/useAction";
import { BreadcrumbsSeparator } from "@/components/BreadCrumbSp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { data: orders } = useFetchAllOrders();
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useProfileStore();
  // const { Payment } = usePaymentAction(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}payments`
  // );
  const router = useRouter();
  const { deleteOrder } = useActionOrder();
  const [id, setId] = useState("");

  const handlePayment = (id: string, status: string) => {
    if (status === "PAID") {
      toast.error("Pesanan sudah dibayar.");
    } else {
      router.push(`/payment/${id}`);
    }
    // const newTab = window.open("about:blank", "_blank");

    // if (!newTab) {
    //   toast.error("Popup diblokir oleh browser. Silakan izinkan popup.");
    //   return;
    // }

    // // Jalankan permintaan async
    // Payment(
    //   { order_id: id },
    //   {
    //     onSuccess: (data) => {
    //       const url = data.data.invoice_url;
    //       if (url) {
    //         newTab.location.href = url;
    //       } else {
    //         newTab.close();
    //         toast.error("URL invoice tidak tersedia.");
    //       }
    //     },
    //     onError: (error) => {
    //       const err = error as AxiosError<ErrorResponse>;
    //       newTab.close();
    //       toast.error(
    //         err.response?.data.message || "Terjadi kesalahan saat pembayaran."
    //       );
    //     },
    //   }
    // );
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
  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full flex flex-col justify-center  px-8 py-24">
        <BreadcrumbsSeparator
          items={[{ label: "Carts", href: "/carts" }, { label: "Orders" }]}
        />
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
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <div>
                      <strong className="font-medium text-indigo-600">
                        {`#${order.order_date.split("T")[0]}`}
                      </strong>
                      <p className="mt-1 text-sm font-medium text-gray-300">
                        {order.details
                          .map(
                            (detail) =>
                              detail.product.product_name +
                              " x " +
                              detail.quantity
                          )
                          .join(", ")}
                      </p>
                      <div className="mt-1 text-sm items-center flex gap-2 font-medium text-gray-300">
                        {FormatRupiah(order.total_price)}{" "}
                      </div>
                      {/* <p className="mt-1 text-xs items-center flex gap-2 font-medium text-gray-300">
                        {FormatRupiah(order.total_price)}{" "}
                        <span
                          className={`rounded-full  px-2.5 items-center py-0.5 text-sm whitespace-nowrap ${
                            order.status === "pending"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </p> */}
                    </div>
                    <div className="flex gap-2 items-end w-full justify-end">
                      <Link href={`/orders/${order.id}`}>
                        <Button className="text-xs hover:drop-shadow-md outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-600 hover:text-white rounded-lg border border-indigo-600 text-indigo-600 bg-white">
                          Cek Status{" "}
                          <FontAwesomeIcon icon={faTruckDroplet} size="lg" />
                        </Button>
                      </Link>
                      <button
                        onClick={() =>
                          handlePayment(
                            order.id,
                            order.payment?.payment_status || ""
                          )
                        }
                        className={` drop-shadow-lg text-xs py-2 px-1 hover:drop-shadow-2xl rounded-lg border ${
                          order.payment?.payment_status === "PAID"
                            ? "text-green-500 border-green-600"
                            : "border-red-600 text-red-500"
                        }`}
                      >
                        {order.payment?.payment_status === "PAID"
                          ? "PAID"
                          : "UNPAID"}{" "}
                        <FontAwesomeIcon icon={faMoneyBill1Wave} size="lg" />
                      </button>
                      <button
                        onClick={() => handleOpen(order.id)}
                        className={`p-2 drop-shadow-lg text-xs hover:drop-shadow-2xl rounded-lg border border-red-500 text-red-500`}
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
