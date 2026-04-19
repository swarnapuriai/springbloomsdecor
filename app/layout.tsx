import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Spring Blooms Decor | Indian Wedding & Event Decorators in USA",
  description:
    "Spring Blooms Decor specializes in breathtaking Indian wedding and event decorations across the United States. From mandap setups to floral arrangements, we bring your vision to life.",
  keywords: [
    "Indian wedding decor",
    "mandap decoration",
    "Indian wedding florist",
    "Hindu wedding decor USA",
    "wedding decorator Texas",
    "Spring Blooms Decor",
  ],
  metadataBase: new URL("https://www.springbloomsdecor.com"),
  alternates: {
    canonical: "https://www.springbloomsdecor.com",
  },
  openGraph: {
    title: "Spring Blooms Decor | Indian Wedding & Event Decorators",
    description:
      "Breathtaking Indian wedding and event decorations across the USA. Mandap setups, florals, and more.",
    type: "website",
    locale: "en_US",
    url: "https://www.springbloomsdecor.com",
    siteName: "Spring Blooms Decor",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Spring Blooms Decor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spring Blooms Decor | Indian Wedding & Event Decorators",
    description:
      "Breathtaking Indian wedding and event decorations across the USA.",
    images: ["/images/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
