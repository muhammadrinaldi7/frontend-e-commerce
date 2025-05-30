import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return serveFallback();
  }

  try {
    const response = await fetch(url);

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok || !contentType.startsWith("image")) {
      return serveFallback();
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return serveFallback();
  }
}

async function serveFallback(): Promise<NextResponse> {
  const fallbackPath = join(process.cwd(), "public/img/noimage.webp");
  const fallbackBuffer = await readFile(fallbackPath);
  return new NextResponse(fallbackBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
