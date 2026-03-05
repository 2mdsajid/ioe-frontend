import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "./_components/Header";
import { getUserSession } from "@/lib/auth/auth";
import { getUserlanguage } from "@/lib/actions/language.actions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IOE Locus",
  description: "IOE Locus - An online platform for Engineering Preparation Nepal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { data: user } = await getUserSession();
  const userLanguage = await getUserlanguage()


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header user={user} locale={userLanguage || 'en'} />
        <main className="pt-20">
          {children}
        </main>
        <Toaster
          richColors
          // position="top-right" 
          toastOptions={{
            classNames: {
              toast: 'bg-gray-800 border-gray-700 text-gray-50', // Main toast container
              title: 'text-white font-semibold', // Title text
              description: 'text-gray-400', // Description text
              actionButton: 'bg-orange-500 text-white', // Action button
              cancelButton: 'bg-gray-700 text-gray-300', // Cancel button
              error: '!bg-red-900/50 !border-red-500/30 !text-red-200', // Custom error colors
              success: '!bg-green-900/50 !border-green-500/30 !text-green-200', // Custom success colors
            },
          }}
        />
      </body>
    </html>
  );
}
