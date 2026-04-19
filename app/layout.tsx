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
  openGraph: {
    title: "Spring Blooms Decor | Indian Wedding & Event Decorators",
    description:
      "Breathtaking Indian wedding and event decorations across the USA. Mandap setups, florals, and more.",
    type: "website",
    locale: "en_US",
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
