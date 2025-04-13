import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainProvider from "@/providers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FormiVerse",
  description: `About
A single place to create, edit &amp; manage your forms with easy integration into your websites. View the form's response in real-time and download it in different formats.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainProvider>{children}</MainProvider>
        <Analytics />
      </body>
    </html>
  );
}
