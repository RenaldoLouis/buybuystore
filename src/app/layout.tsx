import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import commonStyles from "@/styles/common.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuyBuyStore",
  description: "The Greatest Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          className={commonStyles.homeContainer}>
          {children}
        </main>
      </body>
    </html>
  );
}
