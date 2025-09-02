import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Patrick_Hand, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { Pointer } from "@/components/magicui/pointer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontPatrick = Patrick_Hand({
  subsets: ["latin"],
  variable: "--font-patrick",
  weight: "400",
});

const fontShareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  icons: {
    icon: [
      { url: "/favicon-16.png",  sizes: "16x16",  type: "image/png" },
      { url: "/favicon-32.png",  sizes: "32x32",  type: "image/png" },
      { url: "/favicon-48.png",  sizes: "48x48",  type: "image/png" },
      { url: "/favicon-64.png",  sizes: "64x64",  type: "image/png" },
      { url: "/favicon-128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-256.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon-180.png",
  },
  // manifest: "/manifest.webmanifest",
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
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
        className={cn(
          "min-h-screen bg-background font-sans antialiased mx-auto py-12 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl",
          fontSans.variable,
          fontPatrick.variable,
          fontShareTechMono.variable
        )}
      >
        <ThemeProvider>
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
        <Pointer>
          <div className="text-2xl max-sm:hidden">👆</div>
        </Pointer>
      </body>
    </html>
  );
}