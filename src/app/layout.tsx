import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SoliiBridge | Digital Communication & Office Solutions",
  description:
    "SoliiBridge helps organizations communicate, operate, and grow through ArcLocal cloud messaging and OfficeTrail HUB documentation, printing, and branding services.",
  openGraph: {
    title: "SoliiBridge | Digital Communication & Office Solutions",
    description:
      "From Bulk SMS to Professional Documentation and Branding, SoliiBridge helps organizations communicate, operate, and grow.",
    siteName: "SoliiBridge",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-white text-slate-gray-dark">
        {children}
      </body>
    </html>
  );
}
