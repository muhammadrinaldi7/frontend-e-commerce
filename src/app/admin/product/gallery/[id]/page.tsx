"use client";

import { useActionAdmin } from "@/app/api/Admin/useAction";
import { BreadcrumbsSeparator } from "@/components/BreadCrumbSp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UploadGallery() {
  const { id } = useParams();
  console.log(id);
  const [payload, setPayload] = useState<{ gallery_product: File[] | null }>({
    gallery_product: null,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const fileArray = Array.from(files);

      setPayload((prev) => ({
        ...prev,
        gallery_product: fileArray,
      }));
    }
  };
  const { uploadGallery } = useActionAdmin(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}add-gallery/${id}`
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await uploadGallery(
      { payload: { gallery_product: payload.gallery_product } },
      {
        onSuccess: () => {
          toast.success("Product added successfully");
          router.push("/admin/product");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };
  console.log(payload);
  return (
    <>
      <Toaster position="top-right" />
      <div className="flex mx-auto flex-col px-8 py-20 w-full container">
        <BreadcrumbsSeparator
          items={[
            { label: "Product", href: "/admin/product" },
            { label: "Upload Gallery" },
          ]}
        />
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-medium">
              Upload Gallery
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col gap-2 space-y-1.5">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Gallery Product
                  </label>
                  <Input
                    type="file"
                    onChange={handleChange}
                    multiple
                    accept="image/*"
                    className="file:text-sm file:font-medium file:bg-black file:text-white file:p-2 text-center file:rounded-md flex items-center"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-black hover:bg-black/90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Upload
                </button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </>
  );
}
