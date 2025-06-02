"use client";
import { useActionAdmin } from "@/app/api/Admin/useAction";
import { useFetchAllCategories } from "@/app/api/Category/useFetch";
import { useFetchDetailProduct } from "@/app/api/Products/useFetch";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DashboardPageLayout from "@/layouts/DashboardPageLayout";
import { updateProductPayload } from "@/lib/types";
import { proxiedUrl } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UpdateProduct() {
  const { id } = useParams();
  const { data: detailProduct, isLoading } = useFetchDetailProduct(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}products/${id}`
  );
  const { data: categoryData, isLoading: isLoadingCategory } =
    useFetchAllCategories();
  const { updateProduct } = useActionAdmin(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}products/${id}`
  );
  const [UpdateProduct, setUpdateProduct] = useState<updateProductPayload>({
    _method: "PUT",
    product_name: "",
    qty: 0,
    price: 0,
    category_id: "",
    description: "",
  });
  useEffect(() => {
    if (detailProduct) {
      setUpdateProduct({
        product_name: detailProduct.data.product_name,
        qty: detailProduct.data.qty,
        price: detailProduct.data.price,
        category_id: detailProduct.data.category_id,
        description: detailProduct.data.description,
      });
    }
  }, [detailProduct]);
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdateProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const router = useRouter();
  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(UpdateProduct, {
      onSuccess: (data) => {
        toast.success(`${data.data.product_name} ${data.message}`);
        router.push("/admin/product");
      },
    });
  };
  console.log(UpdateProduct);
  return (
    <>
      <Toaster position="top-right" />
      <DashboardPageLayout
        title="Update Product"
        breadcrumbItems={[
          { label: "Product", href: "/admin/product" },
          { label: "Update" },
        ]}
      >
        {isLoading ? (
          <div className="w-full flex h-fit justify-center items-center p-2">
            <Spinner />
          </div>
        ) : (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Update Data Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitUpdate}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="product_name">Nama Produk</Label>
                    <Input
                      id="product_name"
                      type="text"
                      value={UpdateProduct.product_name}
                      onChange={handleChange}
                      name="product_name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="qty">Kuantitas</Label>
                    <Input
                      id="qty"
                      type="number"
                      value={UpdateProduct.qty}
                      onChange={handleChange}
                      name="qty"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Harga</Label>
                    <Input
                      id="price"
                      value={UpdateProduct.price}
                      onChange={handleChange}
                      type="number"
                      name="price"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Input
                      id="description"
                      value={UpdateProduct.description}
                      onChange={handleChange}
                      type="text"
                      name="description"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category_id">Kategori</Label>
                    <select
                      id="category_id"
                      className="border border-gray-300 p-2 rounded-md"
                      name="category_id"
                      value={UpdateProduct.category_id}
                      onChange={handleChange}
                      required
                    >
                      {isLoadingCategory ? (
                        <Spinner />
                      ) : (
                        categoryData?.data.map((category) => (
                          <option
                            defaultValue={UpdateProduct.category_id}
                            key={category.id}
                            value={category.id}
                          >
                            {category.category_name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Image
                      src={proxiedUrl(detailProduct?.data.image_product)}
                      width={1000}
                      height={1000}
                      alt="Gambar Produk"
                      className="w-[120px] h-[120px] bg-cover object-cover"
                    />
                    <Label htmlFor="image_product">Gambar Produk</Label>
                    <Input
                      id="image_product"
                      type="file"
                      onChange={handleChange}
                      name="image_product"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Update
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </DashboardPageLayout>
    </>
  );
}
