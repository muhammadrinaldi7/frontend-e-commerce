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
  if (!imageUrl || !isValidUrl(imageUrl)) {
    return "/img/noimage.webp";
  }
  return `/api/image-proxy?url=${encodeURIComponent(
    imageUrl || "/noImage.png"
  )}`;
};
