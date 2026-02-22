"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  t: {
    features: string;
    pricing: string;
    testimonials: string;
    contact: string;
  };
  locale: string;
}

export default function Navbar({ t, locale }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: t.features, path: `/${locale}/#features` },
    { name: t.pricing, path: `/${locale}/#pricing` },
    { name: t.testimonials, path: `/${locale}/#testimonials` },
    { name: t.contact, path: `/${locale}/#contact` },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-sm py-2" : "py-4"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="text-xl font-bold text-foreground flex items-center"
          >
            WorkFlow
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.path ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/${locale}/auth`}>Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/${locale}/auth`}>Sign Up</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-foreground"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/${locale}/auth`}>Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/${locale}/auth`}>Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}