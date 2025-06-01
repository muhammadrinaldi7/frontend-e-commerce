"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RegisterPayload } from "@/lib/types";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useState } from "react";
import { useActionAuth } from "../api/Authentication/useAction";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const { Register } = useActionAuth(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}register`
  );
  const [payloadRegister, setPayloadRegister] = useState<RegisterPayload>({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      setPayloadRegister((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setPayloadRegister((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await Register(payloadRegister, {
      onSuccess: () => {
        toast.success("Successfully logged in");
        router.push("/login");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };
  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full container justify-center mx-auto py-12 flex items-center px-4 min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Register your account</CardTitle>
            <CardDescription>
              Create your account and start shopping
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="name"
                    name="name"
                    value={payloadRegister.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama anda"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={payloadRegister.email}
                    onChange={handleChange}
                    placeholder="Masukkan email anda"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    value={payloadRegister.password}
                    onChange={handleChange}
                    type="password"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="avatar">Avatar</Label>
                  </div>
                  {payloadRegister.avatar && (
                    <Image
                      width={100}
                      height={100}
                      src={URL.createObjectURL(payloadRegister.avatar)}
                      alt="avatar"
                    />
                  )}
                  <Input
                    id="avatar"
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    name="avatar"
                    onChange={handleChange}
                    type="file"
                    required
                  />
                </div>
              </div>
              <div className="flex-col flex mt-4 gap-2">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
