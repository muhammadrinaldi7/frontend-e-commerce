"use client";
import { useActionAdmin } from "@/app/api/Admin/useAction";
import { useFetchAllUsers } from "@/app/api/Admin/useFetch";
import PromotModals from "@/components/ModalsPromot";
import TableDashboard from "@/components/TableDashboard";
import { Button } from "@/components/ui/button";
import DashboardPageLayout from "@/layouts/DashboardPageLayout";
import { UserResponse } from "@/lib/types";
import { proxiedUrl } from "@/lib/utils";
import { faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UsersPage() {
  const [openPromote, setOpenPromote] = useState(false);
  const [idUser, setIdUser] = useState("");
  const kolom = [
    {
      key: "avatar",
      label: "Avatar",
    },
    {
      key: "name",
      label: "Name",
    },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "action", label: "Action" },
  ];
  const { data } = useFetchAllUsers();
  const { PromoteAdmin } = useActionAdmin(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}promote-to-admin/`
  );
  const handleConfirm = async (id: string) => {
    await PromoteAdmin(id, {
      onSuccess: () => {
        toast.success("User promoted successfully");
      },
    });
  };
  const handleOpenPromote = (id: string) => {
    setOpenPromote(true);
    setIdUser(id);
  };
  return (
    <DashboardPageLayout
      title="Lists Users"
      breadcrumbItems={[{ label: "Users" }]}
    >
      <TableDashboard
        columns={kolom}
        data={data?.data || []}
        renderRow={(item: UserResponse) => (
          <>
            <td className="px-3 py-2 whitespace-nowrap">
              <Image
                src={proxiedUrl(item.avatar)}
                alt=""
                width={50}
                className="rounded-full"
                height={50}
              />
            </td>
            <td className="px-3 py-2 whitespace-nowrap">{item.name}</td>
            <td className="px-3 py-2 whitespace-nowrap">{item.email}</td>
            <td className="px-3 py-2 whitespace-nowrap">
              {item.is_admin == 1 ? "Admin" : "User"}
            </td>
            <td className="px-3 py-2 flex justify-end gap-2 whitespace-nowrap">
              {item.is_admin == 0 && (
                <Button
                  onClick={() => handleOpenPromote(item.id)}
                  className="bg-indigo-600 text-white hover:bg-white hover:text-indigo-600 hover:border-indigo-600 hover:border"
                >
                  <FontAwesomeIcon className="text-xl" icon={faSquareCaretUp} />
                </Button>
              )}
            </td>
          </>
        )}
      />
      <PromotModals
        isOpen={openPromote}
        onClose={() => setOpenPromote(false)}
        onConfirm={() => handleConfirm(idUser)}
      />
    </DashboardPageLayout>
  );
}
