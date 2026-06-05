import type { Metadata } from "next";
import {
  IBM_Plex_Mono as FontMono,
  IBM_Plex_Sans as FontSans,
} from "next/font/google";
import "./globals.css";
import ConsentManagerWrapper from "@/components/wrappers/consent-manager-wrapper";
import { LoaderWrapper } from "@/components/wrappers/loader-wrapper";
import { ThemeProvider } from "next-themes";
import { AppProgressProvider } from "@bprogress/next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ToasterWrapper from "@/components/wrappers/toaster-wrapper";
import AppProgressWrapper from "@/components/wrappers/app-progress-wrapper";
import { SiteHeader } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const fontSans = FontSans({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Rithvik's Portfolio",
  description: "Full Stack Engineer",
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
  openGraph: {
    title: "Rithvik Pallamreddy — Full Stack Engineer",
    description: "Full Stack Engineer",
    url: "https://rithvikpallamreddy.com",
    siteName: "Rithvik's Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rithvik Pallamreddy — Full Stack Engineer",
    description: "Full Stack Engineer",
    creator: "@Rithvik_1017",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
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
        className={`${fontSans.variable} ${fontMono.variable} ${fontSans.className} antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          enableColorScheme
          storageKey="theme"
          defaultTheme="system"
          attribute="class"
        >
          <AppProgressWrapper>
            <LoaderWrapper>
              <ConsentManagerWrapper>
                <SiteHeader />
                <main className="max-w-screen overflow-x-hidden px-2">
                  {children}
                </main>
                <Footer />
                <ScrollToTop />
              </ConsentManagerWrapper>
            </LoaderWrapper>
          </AppProgressWrapper>
          <ToasterWrapper />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
