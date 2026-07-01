import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrolling } from "@/components/SmoothScrolling";

export const metadata: Metadata = {
  title: "DT BAT - Rénovation Énergétique & ITE en Bretagne",
  description: "DT BAT réinvente l'habitat breton. Rénovation thermique globale, ITE et ravalement de façades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@500;600&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
