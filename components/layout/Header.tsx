"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap border-solid border-transparent px-6 sm:px-10 py-4 transition-colors duration-300 bg-background-light/80 backdrop-blur-sm">
      <div className="flex items-center gap-4 text-text-light">
        <Link href="/" className="flex items-center">
          <div className="relative w-32 h-8">
            <Image
              src="/images/patchtern-logo.png"
              alt="Patchtern"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </Link>
      </div>

      <nav className="flex flex-1 justify-end gap-8">
        <div className="hidden sm:flex items-center gap-9">
          {NAV_ITEMS.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium leading-normal hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="sm:hidden text-text-light"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background-light border-b border-border-light sm:hidden">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium leading-normal hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
