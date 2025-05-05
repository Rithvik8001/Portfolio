import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/shared/nav";
import { ViewTransitions } from "next-view-transitions";

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Rithvik",
  description: "Rithvik Pallamreddiy | Front-end Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          suppressHydrationWarning
          className={`${serif.variable} ${sans.className} mx-auto max-w-[400px] overflow-x-hidden antialiased selection:bg-primary selection:text-primary-foreground md:max-w-[600px]`}
        >
          <Nav />
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
