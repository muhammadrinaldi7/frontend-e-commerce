"use client";
import { useActionAdmin } from "@/app/api/Admin/useAction";
import { useFetchAllCategories } from "@/app/api/Category/useFetch";
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
import { ProductPayload } from "@/lib/types";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddProduct() {
  const { data: category } = useFetchAllCategories();
  const router = useRouter();
  const [payload, setPayload] = useState<ProductPayload>({
    category_id: "",
    product_name: "",
    price: 0,
    qty: 0,
    image_product: null,
    gallery_product: null,
    description: "",
  });
  const { addProduct } = useActionAdmin(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}products`
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      setPayload((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setPayload((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    addProduct(payload, {
      onSuccess: () => {
        setPayload({
          category_id: "",
          product_name: "",
          price: 0,
          qty: 0,
          image_product: null,
          gallery_product: null,
          description: "",
        });
        toast.success("Product added successfully");
        router.push("/admin/product");
      },
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="mx-auto container flex flex-col gap-4 px-8 py-20">
        <BreadcrumbsSeparator
          items={[
            { label: "Product", href: "/admin/product" },
            { label: "Add New Product" },
          ]}
        />
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>
              Masukkan data produk yang ingin anda tambahkan
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="product_name">Nama Produk</Label>
                  <Input
                    id="product_name"
                    type="text"
                    onChange={handleChange}
                    value={payload.product_name}
                    name="product_name"
                    placeholder="Masukkan Nama Produk"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="price">Harga</Label>
                  </div>
                  <Input
                    id="price"
                    name="price"
                    onChange={handleChange}
                    value={payload.price}
                    type="number"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="qty">Kuantitas</Label>
                  </div>
                  <Input
                    id="qty"
                    name="qty"
                    onChange={handleChange}
                    value={payload.qty}
                    type="number"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="description">Deskripsi</Label>
                  </div>
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    onChange={handleChange}
                    value={payload.description}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="description">Kategori</Label>
                  </div>
                  <select
                    className="w-full border p-2 rounded-lg border-indigo-500"
                    name="category_id"
                    onChange={handleChange}
                    value={payload.category_id}
                    id="category_id"
                  >
                    <option value="">Pilih Kategori</option>
                    {category?.data.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="image_product">Upload Image</Label>
                  </div>
                  <Input
                    id="image_product"
                    name="image_product"
                    type="file"
                    onChange={handleChange}
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
