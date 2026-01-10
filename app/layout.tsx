import type React from "react";
import type { Metadata } from "next";
import {
  Roboto,
  Oswald,
  Alex_Brush,
  Libre_Baskerville,
} from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { MouseCursor } from "@/components/mouse-cursor";
// Google Fonts - Lorenzo Design System
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guilherme Rossi Kirsten | Desenvolvedor Fullstack & SecDevOps",
  description:
    "Portfólio de Guilherme Rossi Kirsten - Desenvolvedor Fullstack especializado em C++, Golang, React e Next.js com foco em segurança e DevOps.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`
          ${roboto.variable} 
          ${oswald.variable} 
          ${alexBrush.variable} 
          ${libreBaskerville.variable}
          ${GeistMono.variable}
          font-sans antialiased
        `}
      >
        {/* Custom Cursor */}
        <MouseCursor />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
