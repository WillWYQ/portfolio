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
  // Use existing assets to avoid 404s
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Yueqiao Wang",
    "Portfolio",
    "Computer Engineering",
    "RISC-V",
    "Embedded",
    "Robotics",
    "Web Development",
    "Rose-Hulman Institute of Technology",
    "Computer Science",
    "Computer Architecture",
    "Operating System",

  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  // manifest: "/manifest.webmanifest",
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og?title=Yueqiao%20Wang",
        width: 1200,
        height: 630,
        alt: `${DATA.name}`,
      },
    ],
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
    images: ["/og?title=Yueqiao%20Wang"],
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
