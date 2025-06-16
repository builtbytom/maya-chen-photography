import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
  title: "Maya Chen Photography | Fine Art & Portrait Photographer",
  description: "Connecticut-based fine art and portrait photographer specializing in moody, cinematic visual storytelling. Editorial portraits, family sessions, and creative projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CustomCursor />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
