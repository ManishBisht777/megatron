import Link from "next/link";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { buttonVariants } from "../components/ui/button";
import { navbarConfig } from "../config/navbar";
import { cn } from "../lib/utils";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto sticky top-0 z-40 bg-white">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
          <Navbar items={navbarConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "sm" }), "px-4")}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
