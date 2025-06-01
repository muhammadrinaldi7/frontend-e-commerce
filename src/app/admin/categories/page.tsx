"use client";
import { useActionAdmin } from "@/app/api/Admin/useAction";
import { useFetchAllCategories } from "@/app/api/Category/useFetch";
import DeleteModal from "@/components/ModalsDelete";
import TableDashboard from "@/components/TableDashboard";
import { Button } from "@/components/ui/button";
import DashboardPageLayout from "@/layouts/DashboardPageLayout";
import { CategoryResponse } from "@/lib/types";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CategoriesPage() {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const kolom = [
    {
      key: "name",
      label: "Name",
    },
    { key: "action", label: "Action" },
  ];
  const { data: categories } = useFetchAllCategories();
  const { deleteCategory } = useActionAdmin(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}categories/`
  );
  const handleConfirm = async (id: string) => {
    await deleteCategory(id, {
      onSuccess: () => {
        toast.success("Category deleted successfully");
        setOpen(false);
      },
    });
  };
  const handleOpenModal = (id: string) => {
    setOpen(true);
    setCategoryId(id);
  };
  return (
    <DashboardPageLayout
      title="Lists Category"
      breadcrumbItems={[{ label: "Categories" }]}
      actions={{ href: "/admin/categories/new", label: "New Category" }}
    >
      <Toaster position="top-right" />
      <TableDashboard
        columns={kolom}
        data={categories?.data || []}
        renderRow={(item: CategoryResponse) => (
          <>
            <td className="px-3 py-2 whitespace-nowrap">
              {item.category_name}
            </td>
            <td className="px-3 py-2 flex justify-end gap-2 whitespace-nowrap">
              <Button
                onClick={() => handleOpenModal(item.id)}
                className="bg-red-600 text-white"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </td>
          </>
        )}
      />
      <DeleteModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => handleConfirm(categoryId)}
      />
    </DashboardPageLayout>
  );
}
