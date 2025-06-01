"use client";
import { useFetchCounter } from "@/app/api/Admin/useFetch";
import { CardDashboard } from "@/components/CardDashboard";
import Spinner from "@/components/Spinner";
import {
  faArchive,
  faCommentDollar,
  faList,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardPage() {
  const { data: counter, isLoading } = useFetchCounter();
  return (
    <>
      <div className="mx-auto container flex flex-col gap-4 px-8 py-20">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        {isLoading ? (
          <div className="w-full justify-center flex py-6 items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
            <CardDashboard
              title="Total Produk"
              value={counter?.data?.product || 0}
              icon={faArchive}
              linkref="/admin/product"
            />
            <CardDashboard
              title="Category"
              value={counter?.data?.category || 0}
              icon={faList}
              linkref="/admin/categories"
            />
            <CardDashboard
              title="Total Order"
              value={counter?.data?.order || 0}
              icon={faCommentDollar}
              linkref="/admin/orders"
            />
            <CardDashboard
              title="Total User"
              value={counter?.data?.user || 0}
              icon={faUserAlt}
              linkref="/admin/users"
            />
          </div>
        )}
      </div>
    </>
  );
}
