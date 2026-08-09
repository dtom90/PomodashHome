import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Header from "./components/Header";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Pomodash Home",
  description: "Your website description",
  icons: {
    icon: "/clock-solid.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-inter bg-white min-h-screen">
        <Header />
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}
