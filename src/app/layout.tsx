import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider";

const fonts = Lexend({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wayne Enterprises",
  description: "Wayne Enterprises Business Report",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
