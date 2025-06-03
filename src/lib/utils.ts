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

export function FormatDate(dateString: string) {
  if (!dateString) return "-";

  const isoFixed = dateString.replace(" ", "T");

  const date = new Date(isoFixed);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
