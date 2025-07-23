import type { Metadata } from "next";
import {
  Caveat,
  Geist,
  Geist_Mono,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/nav/nav";
import ThemeToggler from "@/components/theme/theme-toggler";
import LayoutWrapper from "@/components/wrappers/layout-wrapper";
import ThemeWrapper from "@/components/wrappers/theme-wrapper";
import TransitionWrapper from "@/components/wrappers/transition-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-satoshi",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const bluuNextBold = localFont({
  src: "../public/fonts/BluuNext-Bold.otf",
  weight: "700",
  style: "normal",
  display: "swap",
  variable: "--font-bluu-next-bold",
});

export const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rithvik Pallamreddy",
  description: "Front-end web developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${satoshi.variable} ${spaceGrotesk.className} ${geistMono.variable} ${caveat.variable} ${geistSans.variable} ${jetBrainsMono.variable} ${bluuNextBold.variable} ${spaceGrotesk.variable} antialiased bg-secondary`}
      >
        <ThemeWrapper>
          <LayoutWrapper>
            <ThemeToggler />
            <Nav key="navigation" />
            <TransitionWrapper>{children}</TransitionWrapper>
          </LayoutWrapper>
        </ThemeWrapper>
      </body>
    </html>
  );
}
