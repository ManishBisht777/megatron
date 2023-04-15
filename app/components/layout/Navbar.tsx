"use client";

import { MainNavItem } from "@/app/types";
import Link from "next/link";
import { ReactNode } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/app/lib/utils";

type Props = {
  items?: MainNavItem[];
  children?: ReactNode;
};

const Navbar = ({ items, children }: Props) => {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <nav className="hidden gap-6 md:flex">
        {items?.map((item) => {
          return (
            <Link
              key={item.title}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-semibold text-slate-600 sm:text-sm",
                item.href.startsWith(`/${segment}`) && "text-slate-900",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Navbar;
