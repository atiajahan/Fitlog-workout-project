import type { Metadata } from "next";
import "./globals.css";
import { FitLogProvider } from "@/context/FitLogContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0c0e12] text-white antialiased min-h-screen flex flex-col justify-between">
        <FitLogProvider>
          <div className="w-full flex flex-col items-center">
            <Navbar />
            {/* Removed max-w-7xl and applied full fluid width with responsive padding */}
            <main className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6">
              {children}
            </main>
          </div>
          <Footer />
          <Toaster position="top-right" />
        </FitLogProvider>
      </body>
    </html>
  );
}