"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    FlaskConical,
    LayoutDashboard,
    MousePointerClick,
    Timer,
    TableProperties,
    Layers,
    CheckSquare,
    LogIn,
    CalendarDays,
    Users,
} from "lucide-react";

export function Sidebar({ locale }: { locale: string }) {
    const pathname = usePathname();

    const navigation = [
        { name: "Dashboard", href: `/${locale}`, icon: LayoutDashboard },
        { name: "Sistema de Login", href: `/${locale}/testing/login`, icon: LogIn },
        { name: "Formularios Clasicos", href: `/${locale}/testing/forms/basic`, icon: CheckSquare },
        { name: "Formularios Dinamicos", href: `/${locale}/testing/forms/dynamic`, icon: MousePointerClick },
        { name: "Interacciones Asincronas", href: `/${locale}/testing/async`, icon: Timer },
        { name: "Tablas y Datos", href: `/${locale}/testing/tables`, icon: TableProperties },
{ name: "Componentes UI", href: `/${locale}/testing/ui`, icon: Layers },
        { name: "Calendarios", href: `/${locale}/testing/calendar`, icon: CalendarDays },
        { name: "Usuarios", href: `/${locale}/testing/users`, icon: Users },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 bg-sidebar h-screen fixed left-0 top-0 border-r border-sidebar-border" aria-label="Navegacion principal">
            <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
                <Link href={`/${locale}`} className="flex items-center gap-2.5 font-semibold text-lg text-foreground cursor-pointer">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                        <FlaskConical className="h-5 w-5 text-primary" />
                    </div>
                    QA Sandbox
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-3 px-3">
                <nav className="space-y-1" role="navigation">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground/70")} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="p-4 text-xs text-muted-foreground/60 border-t border-sidebar-border">
                v1.0.0
            </div>
        </aside>
    );
}
