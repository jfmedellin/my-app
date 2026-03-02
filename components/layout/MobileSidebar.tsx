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
    X,
} from "lucide-react";

interface MobileSidebarProps {
    locale: string;
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSidebar({ locale, isOpen, onClose }: MobileSidebarProps) {
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
    ];

    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
                aria-hidden="true"
            />
            <aside
                className={cn(
                    "fixed left-0 top-0 h-full w-72 bg-sidebar z-50 transition-transform duration-300 ease-out md:hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
                aria-label="Menu de navegacion"
            >
                <div className="h-16 flex items-center justify-between px-5 border-b border-sidebar-border">
                    <Link href={`/${locale}`} className="flex items-center gap-2.5 font-semibold text-lg text-foreground" onClick={onClose}>
                        <div className="p-1.5 rounded-lg bg-primary/10">
                            <FlaskConical className="h-5 w-5 text-primary" />
                        </div>
                        QA Sandbox
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                        aria-label="Cerrar menu"
                    >
                        <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                </div>
                <nav className="p-3 space-y-1" role="navigation">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground/70")} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="absolute bottom-4 left-4 text-xs text-muted-foreground/60">
                    v1.0.0
                </div>
            </aside>
        </>
    );
}
