"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe, User as UserIcon, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "@/app/[locale]/components/ThemeProvider";
import { MobileSidebar } from "./MobileSidebar";

export function Header({ locale }: { locale: string }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleLocale = locale === "es" ? "en" : "es";
    const pathname = usePathname();
    const newPathname = pathname.replace(`/${locale}`, `/${toggleLocale}`);
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <>
            <MobileSidebar locale={locale} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
            <header className="h-16 bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-5 fixed top-0 right-0 left-0 md:left-64 z-30 w-full md:w-[calc(100%-16rem)] border-b border-border/50">
                <div className="flex items-center gap-3 flex-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 md:hidden cursor-pointer"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Abrir menu de navegacion"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={newPathname}>
                        <Button variant="ghost" size="icon" className="h-9 w-9 cursor-pointer" title="Cambiar idioma">
                            <Globe className="h-4 w-4" />
                            <span className="sr-only">Toggle locale</span>
                        </Button>
                    </Link>

                    <Button variant="ghost" size="icon" className="h-9 w-9 cursor-pointer" onClick={toggleTheme} title={resolvedTheme === "dark" ? "Modo claro" : "Modo oscuro"}>
                        {resolvedTheme === "dark" ? (
                            <Sun className="h-4 w-4" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    <div className="hidden sm:flex items-center gap-2 ml-2">
                        <div className="flex items-center gap-2 text-sm text-foreground bg-secondary px-3 py-1.5 rounded-md" data-testid="global-qa-user">
                            <UserIcon className="h-3.5 w-3.5 text-primary" />
                            <span className="text-muted-foreground">Tester</span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
