// src/components/layouts/DashboardPageLayout.tsx
"use client";
import { BreadcrumbsSeparator } from "@/components/BreadCrumbSp";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardPageLayoutProps {
  title: string;
  breadcrumbItems: BreadcrumbItem[];
  actions?: linkProps;
  children: ReactNode;
}
interface linkProps {
  href: string;
  label: string;
}

export default function DashboardPageLayout({
  title,
  breadcrumbItems,
  actions,
  children,
}: DashboardPageLayoutProps) {
  return (
    <div className="mx-auto container flex flex-col gap-4 px-8 py-20">
      <BreadcrumbsSeparator items={breadcrumbItems} />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {actions && (
          <Link href={actions?.href}>
            <Button className="bg-indigo-600 text-white hover:bg-white hover:text-indigo-600 hover:border-indigo-600 hover:border">
              {actions?.label}
            </Button>
          </Link>
        )}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
