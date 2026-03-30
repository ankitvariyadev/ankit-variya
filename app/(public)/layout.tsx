
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { VisitorTracker } from "@/app/components/VisitorTracker";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black transition-colors duration-300">
      <VisitorTracker />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
