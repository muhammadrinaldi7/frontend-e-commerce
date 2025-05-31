"use client";
import { useFetchCounter } from "@/app/api/Admin/useFetch";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function DashboardPage() {
  const { data: counter, isLoading } = useFetchCounter();
  return (
    <>
      <div className="mx-auto container flex flex-col gap-4 px-8 py-20">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-4">
          {isLoading && <Spinner />}
          <article className="flex justify-between items-center gap-4 rounded-lg border border-indigo-400 bg-white p-6">
            <div className="flex gap-4">
              <span className="rounded-full flex items-center bg-blue-100 p-3 text-blue-600">
                <FontAwesomeIcon icon={faArchive} className="size-8 text-xl" />
              </span>

              <div>
                <p className="text-2xl font-medium text-gray-900">
                  {counter?.data?.product}
                </p>

                <p className="text-sm text-gray-500">Product</p>
              </div>
            </div>
            <Link href="/admin/product">
              <Button className="bg-indigo-600 text-white hover:bg-white hover:text-indigo-600 hover:border-indigo-600 hover:border">
                View
              </Button>
            </Link>
          </article>
          <article className="flex items-center gap-4 rounded-lg border border-indigo-400 bg-white p-6 sm:justify-between">
            <span className="rounded-full bg-blue-100 p-3 text-blue-600 sm:order-last">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">
                {counter?.data?.category}
              </p>

              <p className="text-sm text-gray-500">Category</p>
            </div>
          </article>
          <article className="flex items-center gap-4 rounded-lg border border-indigo-400 bg-white p-6 sm:justify-between">
            <span className="rounded-full bg-blue-100 p-3 text-blue-600 sm:order-last">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">
                {counter?.data?.order}
              </p>

              <p className="text-sm text-gray-500">Order</p>
            </div>
          </article>
          <article className="flex items-center gap-4 rounded-lg border border-indigo-400 bg-white p-6 sm:justify-between">
            <span className="rounded-full bg-blue-100 p-3 text-blue-600 sm:order-last">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">
                {counter?.data?.notDelivered}
              </p>

              <p className="text-sm text-gray-500">Belum Dikirim</p>
            </div>
          </article>
          <article className="flex items-center gap-4 rounded-lg border border-indigo-400 bg-white p-6 sm:justify-between">
            <span className="rounded-full bg-blue-100 p-3 text-blue-600 sm:order-last">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <p className="text-2xl font-medium text-gray-900">
                {counter?.data?.user}
              </p>

              <p className="text-sm text-gray-500">Pengguna</p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
