import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SQuality Muslimah Fashion - Look Stylish and Elegant",
  description:
    "Explore our wide range of modest Muslimah clothing, including hijabs, abayas, and stylish sets. Comfortable, fashionable, and perfect for any occasion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
