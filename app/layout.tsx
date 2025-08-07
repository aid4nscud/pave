import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pave — Turn a self-driving car into income.",
  description:
    "Own or finance a self-driving taxi. We deploy and operate it for you. Get clear monthly payouts and a utilization guarantee in eligible cities.",
  openGraph: {
    title: "Pave",
    description:
      "Own a self-driving taxi. We run it. You earn. Simple path to passive income with managed operations.",
    siteName: "Pave",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pave",
    description:
      "Own a self-driving taxi. We run it. You earn. Simple path to passive income with managed operations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
