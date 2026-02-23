import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sabeel | Public Water Scarcity Tracker",
  description: "Identify and share critical areas in need of water access projects worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
