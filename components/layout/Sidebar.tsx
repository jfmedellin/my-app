'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
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
  Beaker,
} from 'lucide-react';

export function Sidebar({ locale }: { locale: string }) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: `/${locale}`, icon: LayoutDashboard },
    { name: 'Sistema de Login', href: `/${locale}/testing/login`, icon: LogIn, badge: 'Demo' },
    {
      name: 'Formularios Clasicos',
      href: `/${locale}/testing/forms/basic`,
      icon: CheckSquare,
      badge: 'Demo',
    },
    {
      name: 'Formularios Dinamicos',
      href: `/${locale}/testing/forms/dynamic`,
      icon: MousePointerClick,
      badge: 'Demo',
    },
    {
      name: 'Interacciones Asincronas',
      href: `/${locale}/testing/async`,
      icon: Timer,
      badge: 'Demo',
    },
    {
      name: 'Tablas y Datos',
      href: `/${locale}/testing/tables`,
      icon: TableProperties,
      badge: 'Demo',
    },
    { name: 'Componentes UI', href: `/${locale}/testing/ui`, icon: Layers, badge: 'Demo' },
    { name: 'Calendarios', href: `/${locale}/testing/calendar`, icon: CalendarDays, badge: 'Demo' },
    { name: 'Usuarios', href: `/${locale}/testing/users`, icon: Users, badge: 'Demo' },
  ];

  return (
    <aside
      className="hidden md:flex flex-col w-64 bg-sidebar h-screen fixed left-0 top-0 border-r border-sidebar-border"
      aria-label="Navegacion principal"
    >
      <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 font-semibold text-lg text-foreground cursor-pointer"
        >
          <div className="p-1.5 rounded-lg bg-primary/10">
            <FlaskConical className="h-5 w-5 text-primary" />
          </div>
          QA Sandbox
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-3 px-3">
        <div className="mb-3 px-3">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <Beaker className="size-3.5" />
            <span>Laboratorio</span>
          </div>
        </div>
        <nav className="space-y-1" role="navigation">
          {navigation.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer group',
                  isActive
                    ? 'bg-primary/10 text-primary shadow-[inset_0_-2px_0_0_var(--primary)]'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon
                  className={cn(
                    'h-4 w-4 shrink-0',
                    isActive ? 'text-primary' : 'text-muted-foreground/70'
                  )}
                />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span
                    className={cn(
                      'text-[10px] font-medium px-1.5 py-0.5 rounded-md border',
                      isActive
                        ? 'bg-primary/15 border-primary/30 text-primary'
                        : 'bg-muted/60 border-border text-muted-foreground group-hover:bg-muted group-hover:text-foreground'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 text-xs text-muted-foreground/60 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Laboratorio activo</span>
        </div>
      </div>
    </aside>
  );
}
