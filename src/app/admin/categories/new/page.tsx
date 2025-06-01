"use client";
import { useActionAdmin } from "@/app/api/Admin/useAction";
import { BreadcrumbsSeparator } from "@/components/BreadCrumbSp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export interface CategoriesPayload {
  category_name: string;
}
export default function AddProduct() {
  const router = useRouter();
  const [payload, setPayload] = useState<CategoriesPayload>({
    category_name: "",
  });
  const { addCategory } = useActionAdmin(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}categories`
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    addCategory(payload, {
      onSuccess: () => {
        setPayload({
          category_name: "",
        });
        toast.success("Category added successfully");
        router.push("/admin/categories");
      },
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="mx-auto container flex flex-col gap-4 px-8 py-20">
        <BreadcrumbsSeparator
          items={[
            { label: "Categories", href: "/admin/categories" },
            { label: "Add New Categories" },
          ]}
        />
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Add New Categories</CardTitle>
            <CardDescription>
              Masukkan data Kategori yang ingin anda tambahkan
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="category_name">Nama Kategori</Label>
                  <Input
                    id="category_name"
                    type="text"
                    onChange={handleChange}
                    value={payload.category_name}
                    name="category_name"
                    placeholder="Masukkan Category"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col mt-4 gap-2">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
