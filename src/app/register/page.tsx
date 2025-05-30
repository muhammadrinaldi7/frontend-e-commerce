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
import { LoginPayload } from "@/lib/types";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

export default function Register() {
  const [payloadLogin, setPayloadLogin] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayloadLogin({
      ...payloadLogin,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="w-full container justify-center mx-auto py-12 flex items-center px-4 min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Register your account</CardTitle>
            <CardDescription>
              Create your account and start shopping
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
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
