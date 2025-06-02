"use client";
import { BreadcrumbsSeparator } from "@/components/BreadCrumbSp";
import { useFetchProfile } from "../api/Authentication/useFetch";
import { FormatDate, proxiedUrl } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import Spinner from "@/components/Spinner";
import { UpdateAvatar, useActionAuth } from "../api/Authentication/useAction";
import toast, { Toaster } from "react-hot-toast";
import { useProfileStore } from "@/store/profileStore";
export default function ProfilePage() {
  const { data: profile, isLoading } = useFetchProfile();
  const [openForm, setOpenForm] = useState(false);
  const [id, setId] = useState("");
  const { updateAvatar } = useActionAuth(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}updateAvatar/${id}`
  );
  const [payload, setPayload] = useState<UpdateAvatar>({
    avatar: null,
  });
  const { setProfile } = useProfileStore();
  const handleOpen = (id: string) => {
    setId(id);
    setOpenForm(!openForm);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPayload((prev) => ({
        ...prev,
        avatar: file,
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateAvatar(payload, {
      onSuccess: (data) => {
        setProfile(data.data);
        toast.success("Avatar updated successfully");
        setOpenForm(false);
      },
    });
  };
  return (
    <div className="mx-auto container flex flex-col gap-4 px-8 py-20">
      <Toaster position="top-right" />
      <BreadcrumbsSeparator items={[{ label: "Profile" }]} />
      <div className="flex flex-col gap-4 justify-center items-center border border-gray-300 shadow-sm rounded-lg p-4">
        <Image
          alt=""
          width={1000}
          height={1000}
          src={proxiedUrl(profile?.data?.avatar)}
          className="w-[200px] h-[200px] bg-cover object-cover rounded-full"
        />
        <button
          onClick={() => handleOpen(profile?.data?.id || "")}
          type="button"
          className="text-sm font-semibold text-indigo-600"
        >
          Update Avatar
        </button>
        {openForm && (
          <motion.form
            onSubmit={handleSubmit}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex gap-4"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="input file:text-foreground file:bg-gray-300 border border-gray-300 shadow-md file:rounded-md p-2 rounded-md"
            />
            <button
              type="submit"
              className="rounded-md p-2 hover:bg-indigo-500 hover:text-white border shadow-lg hover:shadow-md text-sm font-semibold border-indigo-600 text-indigo-600"
            >
              Upload
            </button>
          </motion.form>
        )}
        {isLoading ? (
          <div className="w-full justify-center items-center flex p-4">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col items-start justify-start w-full gap-4">
            <h2 className="text-3xl text-center font-bold text-gray-900">
              {profile?.data?.name}
            </h2>
            <p className="text-lg text-center text-gray-500">
              {profile?.data?.email}
            </p>
            <p className="text-lg text-center text-gray-500">
              Bergabung : {FormatDate(profile?.data?.created_at || "")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
