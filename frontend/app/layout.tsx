import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JSForge Runtime — A JavaScript Runtime Built in C++",
  description:
    "An educational JavaScript runtime built from scratch in C++. Explore the lexer, parser, AST, and interpreter — and run JS code live in your browser.",
  keywords: [
    "JSForge Runtime",
    "JavaScript runtime",
    "C++ interpreter",
    "lexer",
    "parser",
    "AST",
    "hackathon",
  ],
  openGraph: {
    title: "JSForge Runtime",
    description: "A JavaScript Runtime built from scratch in C++.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased bg-background text-text-primary`}
      >
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
