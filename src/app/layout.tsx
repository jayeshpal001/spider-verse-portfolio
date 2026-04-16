import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css"; // Updated path
import SmoothScrollProvider from "@/components/shared/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jayesh Pal | The Spider-Verse Portfolio",
  description: "Interactive 3D Portfolio and Developer Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}