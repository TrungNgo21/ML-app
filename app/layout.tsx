import "../styles/globals.css";
import React from "react";
import { Inter as FontSans } from "next/font/google";
import { Metadata } from "next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
            ${fontSans.variable}
            overflow-x-hidden font-mono antialiased
          `}
      >
        {children}
      </body>
    </html>
  );
}
