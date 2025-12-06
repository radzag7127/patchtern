import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#f5f3ef] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {/* Logo */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold">Patchtern</span>
            </div>
            <p className="text-sm text-subtle-light max-w-xs">
              Mengolah limbah kain menjadi karya Patchtern yang bermakna
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Menu</h3>
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-subtle-light hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <div className="flex flex-col gap-3 text-sm text-subtle-light">
              <a
                href="https://wa.me/6285641641930"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                WhatsApp: +62 856-4164-1930
              </a>
              <a
                href="https://wa.me/6285641641930"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Email & Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-light text-center text-sm text-subtle-light">
          <p>
            &copy; {new Date().getFullYear()} Patchtern. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
