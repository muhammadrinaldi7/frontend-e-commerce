"use client";
import { useActionAdmin } from "@/app/api/Admin/useAction";
import { useFetchOrdersAll } from "@/app/api/Orders/useFetch";
import KirimModals from "@/components/ModalsKirim";
import TableDashboard from "@/components/TableDashboard";
import { Button } from "@/components/ui/button";
import DashboardPageLayout from "@/layouts/DashboardPageLayout";
import { ErrorResponse } from "@/lib/types";
import { faTruckArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { data: orders } = useFetchOrdersAll();
  const { delivery } = useActionAdmin(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}update-status-order/`
  );
  const kolom = [
    { key: "id", label: "ID" },
    { key: "email", label: "Email" },
    { key: "status_order", label: "Status" },
    { key: "status_payment", label: "Payment" },
    { key: "action", label: "Action" },
  ];

  const handleOpenKirim = (id: string) => {
    setOpen(true);
    setOrderId(id);
  };
  const handleConfirm = async (id: string) => {
    if (!id) return;
    await delivery(id, {
      onSuccess: () => {
        toast.success("Pesanan berhasil dikirim");
        setOpen(false);
      },
      onError: (error) => {
        const err = error as AxiosError<ErrorResponse>;
        toast.error(err.response?.data.message || "error");
      },
    });
  };
  return (
    <>
      <DashboardPageLayout
        title="List Order Product"
        breadcrumbItems={[{ label: "Orders" }]}
      >
        <TableDashboard
          columns={kolom}
          data={orders?.data || []}
          renderRow={(item) => (
            <>
              <td className="px-3 py-2 whitespace-nowrap">
                {item.id.split("-")[0]}
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                {item.user?.email}
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.payment?.payment_status === "PAID"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.payment ? item.payment.payment_status : "Pending"}
                </span>
              </td>
              <td className="px-3 py-2 flex justify-end items-center whitespace-nowrap">
                {item.payment?.payment_status === "PAID" &&
                  item.status !== "delivered" && (
                    <Button
                      onClick={() => handleOpenKirim(item.id)}
                      className="bg-green-600 text-white"
                    >
                      <FontAwesomeIcon icon={faTruckArrowRight} />
                    </Button>
                  )}
              </td>
            </>
          )}
        />
      </DashboardPageLayout>
      <KirimModals
        onClose={() => setOpen(false)}
        onConfirm={() => handleConfirm(orderId)}
        isOpen={open}
      />
    </>
  );
}
