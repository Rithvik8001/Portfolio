import type { Metadata } from "next";
import {
  IBM_Plex_Mono as FontMono,
  IBM_Plex_Sans as FontSans,
} from "next/font/google";
import "./globals.css";
import ConstentManagerWrapper from "@/components/wrappers/constent-manager-wrapper";
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
  description: "My Personal Portfolio",
  keywords: [
    "Rithvik's Portfolio",
    "Portfolio",
    "Full Stack Developer",
    "Web Developer",
  ],
  authors: [
    {
      name: "Rithvik Pallamreddy",
      url: "https://rithvikpallamreddy.com",
    },
  ],
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
              <ConstentManagerWrapper>
                <SiteHeader />
                <main className="max-w-screen overflow-x-hidden px-2">
                  {children}
                </main>
                <Footer />
                <ScrollToTop />
              </ConstentManagerWrapper>
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
