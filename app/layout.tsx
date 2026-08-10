import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { GoogleAuthWrapper } from "@/components/GoogleAuthWrapper";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "cydo - Automatiza tu restaurante",
  description:
    "Aplicación especializada en automatizar negocios de restaurantes en Perú. Conecta Telegram, WhatsApp y Widget para gestionar contactos, chat y seguimiento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="h-screen">
        <GoogleAuthWrapper>
          {children}
        </GoogleAuthWrapper>
        <Toaster richColors />
      </body>
    </html>
  );
}
