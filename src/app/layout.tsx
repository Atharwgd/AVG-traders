import type { Metadata } from "next";
import { Poppins, Fraunces } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AVG Traders — Trusted Onion Traders & Exporters from Nashik, India",
  description:
    "AVG Traders is a trading and export house rooted in the Nashik onion belt. We supply fresh red, pink, and white onions alongside dehydrated onion flakes, powder, and fried onion (birista) to buyers worldwide.",
  keywords: [
    "onion exporter India",
    "fresh onion export",
    "dehydrated onion flakes",
    "dehydrated onion powder",
    "fried onion birista",
    "birista exporter India",
    "Nashik onion",
    "onion trader Nashik",
    "AVG Traders",
  ],
  openGraph: {
    title: "AVG Traders — Trusted Onion Traders & Exporters from Nashik, India",
    description:
      "Fresh red, pink & white onions, dehydrated onion flakes, powder, and fried onion (birista) — sourced from Nashik's onion belt and exported worldwide.",
    type: "website",
    locale: "en_IN",
    siteName: "AVG Traders",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVG Traders — Onion Traders & Exporters, Nashik",
    description:
      "Fresh & dehydrated onions exported from the heart of India's onion trade.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full bg-cream text-soil antialiased">
        <LenisProvider>
          <CustomCursor />
          <PageTransition>
            {children}
          </PageTransition>
        </LenisProvider>
      </body>
    </html>
  );
}
