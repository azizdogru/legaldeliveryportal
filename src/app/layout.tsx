import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://legaldeliveryportal.com"),
  title: {
    default: "LegalDeliveryPortal.com: Court-Admissible Legal Documents in 3 Minutes",
    template: "%s | LegalDeliveryPortal.com",
  },
  description:
    "State-specific, lawyer-researched legal notices, demands, and agreements compliant with all 50 states. Instant court-ready PDF download for just $9.90.",
  keywords: [
    "legal delivery portal",
    "court admissible legal documents",
    "pre-suit demand letter",
    "cease and desist notice",
    "notice of rent increase",
    "notice to cure or quit",
    "mechanics lien notice of intent",
    "release of liability form",
  ],
  authors: [{ name: "Legal Delivery Portal Editorial Staff" }],
  creator: "LegalDeliveryPortal.com",
  publisher: "LegalDeliveryPortal.com",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://legaldeliveryportal.com",
    title: "LegalDeliveryPortal.com: Court-Admissible Legal Documents in 3 Minutes",
    description:
      "State-specific, lawyer-researched legal notices, demands, and agreements compliant with all 50 states. Instant court-ready PDF download for just $9.90.",
    siteName: "LegalDeliveryPortal.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "LegalDeliveryPortal.com: Court-Admissible Legal Documents in 3 Minutes",
    description:
      "State-specific, lawyer-researched legal notices, demands, and agreements compliant with all 50 states. Instant court-ready PDF download for just $9.90.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-slate-950 text-slate-100 font-sans min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
