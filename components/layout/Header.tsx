"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe, LogOut, User as UserIcon, Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/[locale]/components/ThemeProvider";

export function Header({ locale }: { locale: string }) {
    const { data: session, status } = useSession();
    const toggleLocale = locale === "es" ? "en" : "es";
    const pathname = usePathname();
    const newPathname = pathname.replace(`/${locale}`, `/${toggleLocale}`);
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <header className="h-16 border-b bg-background flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-10 w-[calc(100%-16rem)] shadow-sm">
            <div className="flex items-center gap-4 flex-1">
                {/* Search or breadcrumbs here if needed */}
            </div>
            <div className="flex items-center gap-4">
<Link href={newPathname}>
                    <Button variant="ghost" size="icon" title="Cambiar idioma">
                        <Globe className="h-4 w-4" />
                        <span className="sr-only">Toggle locale</span>
                    </Button>
                </Link>

                <Button variant="ghost" size="icon" onClick={toggleTheme} title={resolvedTheme === "dark" ? "Modo claro" : "Modo oscuro"}>
                    {resolvedTheme === "dark" ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Moon className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>

                {status === "loading" ? (
                    <Button variant="outline" size="sm" disabled>Cargando...</Button>
                ) : session ? (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-foreground bg-secondary/50 px-3 py-1.5 rounded-full">
                            <UserIcon className="h-4 w-4 text-primary" />
                            <span>{session.user?.name || "Tester"}</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => signOut()}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Salir
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => signIn("credentials")} size="sm">
                        Login
                    </Button>
                )}
            </div>
        </header>
    );
}
