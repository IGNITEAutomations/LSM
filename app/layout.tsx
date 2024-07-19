import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMS IGNITE Serious Play ",
  description: "LSM IGNITE Serious Play",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " max-w-screen overflow-x-hidden overscroll-y-auto"}>{children}</body>
    </html>
  );
}
