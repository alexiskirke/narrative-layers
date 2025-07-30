import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CursorEffects from "@/components/ui/CursorEffects";

export const metadata: Metadata = {
  title: "narrative layers | story will change the world",
  description: "experience the intersection of art, technology, and narrative. where stories come alive through motion.",
  keywords: ["narrative", "digital art", "interactive design", "motion graphics", "3D", "experience"],
  authors: [{ name: "narrative layers" }],
  openGraph: {
    title: "narrative layers | story will change the world",
    description: "experience the intersection of art, technology, and narrative.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <SmoothScroll>
          {children}
          <CursorEffects />
        </SmoothScroll>
      </body>
    </html>
  );
}
