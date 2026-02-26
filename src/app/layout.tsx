import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Sabeel | Public Water Scarcity Tracker",
  description: "Sabeel is a free public web platform that visualizes water scarcity regions on an interactive map to help identify and share critical areas in need of water access projects.",
  keywords: "water scarcity, humanitarian, water access, water crisis, open data, map",
  openGraph: {
    title: "Sabeel | Public Water Scarcity Tracker",
    description: "Visualize and share critical water scarcity data worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
