import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { VisitorTracker } from "@/app/components/VisitorTracker";
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

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session?: any;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black transition-colors duration-300">
        <Providers session={session}>
          <VisitorTracker />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

