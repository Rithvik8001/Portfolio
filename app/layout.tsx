import type { Metadata } from "next";
import {
  IBM_Plex_Mono as FontMono,
  IBM_Plex_Sans as FontSans,
  Source_Serif_4 as FontSerif,
} from "next/font/google";
import "./globals.css";
import ConsentManagerWrapper from "@/components/wrappers/consent-manager-wrapper";
import { ThemeProvider } from "next-themes";
import { AppProgressProvider } from "@bprogress/next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ToasterWrapper from "@/components/wrappers/toaster-wrapper";
import AppProgressWrapper from "@/components/wrappers/app-progress-wrapper";
import { SiteHeader } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { personSchema, websiteSchema } from "@/lib/structured-data";

const fontSans = FontSans({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = FontMono({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Rithvik Pallamreddy — Full Stack Engineer",
    template: "%s | Rithvik Pallamreddy",
  },
  description:
    "Rithvik Pallamreddy is a full stack engineer in Louisville, KY, building web apps with Next.js, React, and TypeScript. See his projects, experience and stack.",
  keywords: [
    "Rithvik Pallamreddy",
    "Portfolio",
    "Full Stack Engineer",
    "Web Developer",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [
    {
      name: "Rithvik Pallamreddy",
      url: "https://rithvikpallamreddy.com",
    },
  ],
  metadataBase: new URL("https://rithvikpallamreddy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rithvik Pallamreddy — Full Stack Engineer",
    description:
      "Full stack engineer in Louisville, KY. Building web apps with Next.js, React and TypeScript.",
    url: "https://rithvikpallamreddy.com",
    siteName: "Rithvik's Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rithvik Pallamreddy — Full Stack Engineer",
    description:
      "Full stack engineer in Louisville, KY. Building web apps with Next.js, React and TypeScript.",
    creator: "@rithvik1907",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} ${fontSans.className} antialiased overflow-x-hidden`}
      >
        <div hidden>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([personSchema(), websiteSchema()]),
            }}
          />
        </div>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          enableColorScheme
          storageKey="theme"
          defaultTheme="system"
          attribute="class"
        >
          <AppProgressWrapper>
            <ConsentManagerWrapper>
              <SiteHeader />
              <main className="max-w-screen overflow-x-hidden px-2">
                {children}
              </main>
              <Footer />
              <ScrollToTop />
            </ConsentManagerWrapper>
          </AppProgressWrapper>
          <ToasterWrapper />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
