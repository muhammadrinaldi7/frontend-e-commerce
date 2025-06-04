"use client";

import { usePaymentAction } from "@/app/api/Payments/useAction";
import { BreadcrumbsSeparator } from "@/components/BreadCrumbSp";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { ErrorResponse } from "@/lib/types";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PaymentPage() {
  const { id } = useParams();
  const [formBayar, setFormBayar] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState("");
  const { Payment, loadingPayment } = usePaymentAction(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}payments`
  );
  const router = useRouter();
  const handlePayment = (id: string) => {
    setFormBayar(true);
    Payment(
      { order_id: id },
      {
        onSuccess: (data) => {
          const url = data.data.invoice_url;
          if (url) {
            setInvoiceUrl(url);
          }
        },
        onError: (err) => {
          const error = err as AxiosError<ErrorResponse>;
          toast.error(error.response?.data.message || "error");
        },
      }
    );
  };
  return (
    <>
      <div className="flex flex-col mx-auto container py-20 gap-4 min-h-screen bg-gray-100  px-4 max-w-6xl">
        <BreadcrumbsSeparator
          items={[{ label: "Pesanan", href: "/orders" }, { label: "Payment" }]}
        />
        <h1 className="text-2xl font-semibold text-left text-gray-800">
          Payment Invoice #{id}
        </h1>

        <div className="flex justify-between">
          <Button
            onClick={() => {
              setFormBayar(false);
              router.back();
            }}
            className="bg-indigo-600 text-white hover:bg-white hover:text-indigo-600 hover:border-indigo-600 hover:border rounded-md px-6 py-2 transition-all duration-200"
          >
            Kembali
          </Button>
          <Button
            onClick={() => handlePayment(id as string)}
            className="bg-indigo-600 text-white hover:bg-white hover:text-indigo-600 hover:border-indigo-600 hover:border rounded-md px-6 py-2 transition-all duration-200"
          >
            Bayar
          </Button>
        </div>

        {formBayar && invoiceUrl ? (
          <div className="w-full h-[80vh] rounded-md overflow-hidden shadow-lg border">
            <iframe
              src={invoiceUrl}
              title="Payment Invoice"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        ) : loadingPayment ? (
          <div className="w-full justify-center flex py-6 items-center">
            <Spinner />
          </div>
        ) : null}
        <p className="text-xs text-left text-gray-500">
          *Jika invoice expired, hapus pesanan dan buat pesanan baru.
        </p>
      </div>
    </>
  );
}
