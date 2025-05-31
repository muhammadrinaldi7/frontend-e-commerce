import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FormatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
export const proxiedUrl = (imageUrl: string | null | undefined) => {
  const urlImage = "https://backend-ecommerce.rndev.my.id/public/" + imageUrl;
  if (!imageUrl || !isValidUrl(urlImage)) {
    return "/noImage.png";
  }
  return `/api/image-proxy?url=${encodeURIComponent(
    urlImage || "/noImage.png"
  )}`;
};

export const FormatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
