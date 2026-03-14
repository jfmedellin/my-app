"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, Layers } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: t.features },
    { href: "#pricing", label: t.pricing },
    { href: "#testimonials", label: t.testimonials },
    { href: "#contact", label: t.contact },
  ];

  const toggleLocale = locale === "es" ? "en" : "es";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Layers className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              WorkFlow
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href={`/${toggleLocale}`}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="h-4 w-4" />
              {locale.toUpperCase()}
            </Link>
            {status === "loading" ? (
              <Button size="sm" disabled>
                Loading...
              </Button>
            ) : session ? (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </Button>
            ) : (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
                onClick={() => signIn("credentials")}
              >
                Login
              </Button>
            )}
          </div>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen ? (
          <div className="md:hidden py-4 border-t border-border mt-4 animate-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link
                href={`/${toggleLocale}`}
                className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                {locale.toUpperCase()}
              </Link>
              {status === "loading" ? (
                <Button className="w-full mt-2" disabled>
                  Loading...
                </Button>
              ) : session ? (
                <Button
                  className="w-full mt-2"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  className="w-full mt-2"
                  onClick={() => signIn("credentials")}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
