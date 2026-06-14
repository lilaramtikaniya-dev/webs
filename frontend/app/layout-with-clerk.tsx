import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "JSForge Runtime — JavaScript Interpreter in C++",
  description:
    "An educational JavaScript runtime built from scratch in C++. Explore the lexer, parser, AST, and interpreter — and test live code in the playground.",
  keywords: ["JavaScript", "Runtime", "C++", "Compiler", "Interpreter", "AST", "Hackathon"],
  openGraph: {
    title: "JSForge Runtime",
    description: "Build JavaScript From Scratch — an educational JS runtime in C++",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark scroll-smooth">
        <body
          className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body bg-background text-white antialiased`}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
