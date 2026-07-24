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
  metadataBase: new URL("https://avgtraders.com"),
  title: "AVG Traders — Trusted Onion & Ginger Exporters from Nashik, India",
  description:
    "AVG Traders is a trading and export house rooted in the Nashik onion belt. We supply fresh red, pink, and white onions, fresh ginger, and dehydrated onion flakes, powder, and fried onion (birista) to buyers worldwide.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icon-180.png", sizes: "180x180" }],
  },
  keywords: [
    "onion exporter India",
    "fresh onion export",
    "ginger exporter India",
    "fresh ginger export",
    "dehydrated onion flakes",
    "dehydrated onion powder",
    "fried onion birista",
    "birista exporter India",
    "Nashik onion",
    "onion trader Nashik",
    "AVG Traders",
  ],
  openGraph: {
    title: "AVG Traders — Trusted Onion & Ginger Exporters from Nashik, India",
    description:
      "Fresh red, pink & white onions, fresh ginger, dehydrated onion flakes, powder, and fried onion (birista) — sourced from Nashik and exported worldwide.",
    type: "website",
    locale: "en_IN",
    url: "https://avgtraders.com/",
    siteName: "AVG Traders",
    images: [{ url: "/og-image-1200x630-light.png", width: 1200, height: 630, alt: "AVG Traders" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVG Traders — Onion Traders & Exporters, Nashik",
    description:
      "Fresh & dehydrated onions exported from the heart of India's onion trade.",
    images: ["/twitter-card-1200x600-light.png"],
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
