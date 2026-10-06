import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Artcon Manager",
  description: "Personal artcon merch production planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8f7f4] text-stone-800">
        <Navbar />

        <main className="mx-auto max-w-6xl px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}