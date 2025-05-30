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
import { Label } from "@radix-ui/react-label";
import { useActionAuth } from "../api/Authentication/useAction";
import { useState } from "react";
import { LoginPayload } from "@/lib/types";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/profileStore";
export default function LoginPage() {
  const router = useRouter();
  const { Login } = useActionAuth(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}login`
  );
  const [payloadLogin, setPayloadLogin] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const { setProfile } = useProfileStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayloadLogin({
      ...payloadLogin,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Login(payloadLogin, {
      onError: (error) => {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          toast.error("Email or password is incorrect");
        }
      },
      onSuccess: (data) => {
        sessionStorage.setItem("user", JSON.stringify(data.user));
        Cookies.set("token", data.token);
        toast.success("Successfully logged in");
        setProfile(data.user);
        router.push("/");
      },
    });
  };
  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full container justify-center mx-auto py-12 flex items-center px-4 min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={payloadLogin.email}
                    onChange={handleChange}
                    placeholder="m@example.com"
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
                    value={payloadLogin.password}
                    onChange={handleChange}
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="flex-col flex mt-4 gap-2">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Register
                </Button> */}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
