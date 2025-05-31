"use client";
import Link from "next/link";

import {
  BreadcrumbItem,
  BreadcrumbSeparator,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
} from "./ui/breadcrumb";

type Crumb = {
  label: string;
  href?: string; // Jika tidak ada, dianggap halaman aktif
};

interface BreadcrumbsSeparatorProps {
  items: Crumb[];
}

export const BreadcrumbsSeparator = ({ items }: BreadcrumbsSeparatorProps) => {
  const getFirstItem = () => {
    return (
      <>
        <BreadcrumbItem>
          <Link href="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
      </>
    );
  };

  return (
    <Breadcrumb className="my-4">
      <BreadcrumbList>
        {getFirstItem()}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={index} className="flex items-center">
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className="ml-2">/</BreadcrumbSeparator>
              )}
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
