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
} from "lucide-react";

export function Sidebar({ locale }: { locale: string }) {
    const pathname = usePathname();

    const navigation = [
        {
            name: "Dashboard",
            href: `/${locale}`,
            icon: LayoutDashboard,
        },
        {
            name: "Formularios Clásicos",
            href: `/${locale}/testing/forms/basic`,
            icon: CheckSquare,
        },
        {
            name: "Formularios Dinámicos",
            href: `/${locale}/testing/forms/dynamic`,
            icon: MousePointerClick,
        },
        {
            name: "Interacciones Asíncronas",
            href: `/${locale}/testing/async`,
            icon: Timer,
        },
        {
            name: "Tablas y Datos",
            href: `/${locale}/testing/tables`,
            icon: TableProperties,
        },
        {
            name: "Componentes UI",
            href: `/${locale}/testing/ui`,
            icon: Layers,
        },
    ];

    return (
        <div className="flex flex-col w-64 border-r bg-card h-screen fixed left-0 top-0">
            <div className="h-16 flex items-center px-6 border-b">
                <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl text-primary">
                    <FlaskConical className="h-6 w-6" />
                    QA Sandbox
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="space-y-1 px-3">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="p-4 border-t text-xs text-muted-foreground">
                Version 1.0.0
            </div>
        </div>
    );
}
