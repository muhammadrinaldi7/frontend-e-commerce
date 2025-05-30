import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layouts/mainLayout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZedCommerce",
  description: "Technical Test Muhammad Rinaldi",
  icons: {
    icon: "/favIcon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} scroll-smooth ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <MainLayout>{children}</MainLayout>
        <Footer />
      </body>
    </html>
  );
}
