import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ankit Variya - Laravel Developer",
  description: "Full-stack Laravel developer specializing in building exceptional digital experiences with Laravel, Vue.js, React.js, and modern web technologies.",
  keywords: ["Laravel Developer", "Vue.js Developer", "Full Stack Developer", "Web Developer", "PHP Developer"],
  authors: [{ name: "Ankit Variya" }],
  openGraph: {
    title: "Ankit Variya - Laravel Developer",
    description: "Portfolio of Ankit Variya, a passionate Laravel developer building modern web applications.",
    type: "website",
    locale: "en_US",
  },
};

// Prevent any static generation - all pages should be dynamic
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session?: any;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <body className="min-h-full">
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}