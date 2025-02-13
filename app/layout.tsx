import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import ScrollRestoration from '@/components/scroll-restoration'

const monument = localFont({
  src: [
    {
      path: "../public/font/ABCMonumentGrotesk-Medium-Trial.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/font/ABCMonumentGrotesk-Regular-Trial.otf",
      weight: "400",
      style: "regular",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    template: "Rithvik's Portfolio",
    default: "Rithvik's Portfolio",
  },
  description: "Rithvik's Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(monument.className)}>
        <ScrollRestoration />
        {children}
      </body>
    </html>
  );
}
