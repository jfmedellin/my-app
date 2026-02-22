import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { FlaskConical, MousePointerClick, CheckSquare, Timer, TableProperties, Layers, LogIn, CalendarDays, ArrowRight, Sparkles, Activity, Zap } from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{ locale: string }>;
}

function getGreeting(): { greeting: string; emoji: string } {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { greeting: "Buenos dias", emoji: "morning" };
    if (hour >= 12 && hour < 19) return { greeting: "Buenas tardes", emoji: "afternoon" };
    return { greeting: "Buenas noches", emoji: "evening" };
}

export default async function DashboardPage({ params }: PageProps) {
    const { locale } = await params;
    const { greeting } = getGreeting();

    const modules = [
        {
            title: "Sistema de Login",
            description: "Pruebas de autenticacion con validacion estricta y credenciales de prueba.",
            icon: LogIn,
            href: `/${locale}/testing/login`,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            hoverBg: "group-hover:bg-blue-500/15",
        },
        {
            title: "Formularios Clasicos",
            description: "Inputs estandar, radio buttons, checkboxes y selects basicos.",
            icon: CheckSquare,
            href: `/${locale}/testing/forms/basic`,
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10",
            hoverBg: "group-hover:bg-emerald-500/15",
        },
        {
            title: "Formularios Dinamicos",
            description: "Datepickers, autocompletado, subida de archivos y sliders.",
            icon: MousePointerClick,
            href: `/${locale}/testing/forms/dynamic`,
            color: "text-violet-500",
            bgColor: "bg-violet-500/10",
            hoverBg: "group-hover:bg-violet-500/15",
        },
        {
            title: "Interacciones Asincronas",
            description: "Simulacion de demoras en red, elementos dinamicos.",
            icon: Timer,
            href: `/${locale}/testing/async`,
            color: "text-amber-500",
            bgColor: "bg-amber-500/10",
            hoverBg: "group-hover:bg-amber-500/15",
        },
        {
            title: "Tablas y Datos",
            description: "Busquedas dinamicas, paginacion, filtros y ordenamiento.",
            icon: TableProperties,
            href: `/${locale}/testing/tables`,
            color: "text-cyan-500",
            bgColor: "bg-cyan-500/10",
            hoverBg: "group-hover:bg-cyan-500/15",
        },
        {
            title: "Componentes UI",
            description: "Tooltips, menus contextuales, toasts y modales.",
            icon: Layers,
            href: `/${locale}/testing/ui`,
            color: "text-rose-500",
            bgColor: "bg-rose-500/10",
            hoverBg: "group-hover:bg-rose-500/15",
        },
        {
            title: "Calendarios",
            description: "Selectores de fecha, rangos y eventos programados.",
            icon: CalendarDays,
            href: `/${locale}/testing/calendar`,
            color: "text-teal-500",
            bgColor: "bg-teal-500/10",
            hoverBg: "group-hover:bg-teal-500/15",
        },
    ];

    const stats = [
        { label: "Modulos activos", value: "7", icon: Layers, color: "text-primary" },
        { label: "Tests disponibles", value: "24+", icon: Activity, color: "text-emerald-500" },
        { label: "Estado", value: "Operativo", icon: Zap, color: "text-amber-500" },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{greeting}, Tester</p>
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        <span>QA Sandbox v1.0</span>
                    </div>
                </div>

                <p className="text-muted-foreground text-base max-w-2xl">
                    Plataforma interactiva para practicar automatizacion y estrategias de QA. Selecciona un modulo para comenzar.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stats.map((stat, i) => (
                    <Card key={i} className="px-4 py-3 border-border/50 bg-card/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-muted/50">
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                                <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">Modulos de Testing</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {modules.map((module, i) => (
                        <Link href={module.href} key={i} className="group cursor-pointer">
                            <Card className="h-full p-4 hover:shadow-md hover:border-border transition-all duration-200 border-border/50 bg-card/50 hover:bg-card cursor-pointer relative overflow-hidden">
                                <div className="flex items-start gap-3.5">
                                    <div className={`p-2.5 rounded-lg ${module.bgColor} ${module.hoverBg} transition-colors duration-200 shrink-0`}>
                                        <module.icon className={`w-5 h-5 ${module.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <CardTitle className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                                            {module.title}
                                        </CardTitle>
                                        <CardDescription className="text-xs leading-relaxed line-clamp-2">
                                            {module.description}
                                        </CardDescription>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-all duration-200 shrink-0 mt-1" />
                                </div>
                            </Card>
                        </Link>
                    ))}

                    <div className="h-full min-h-[100px]">
                        <Card className="h-full p-4 bg-muted/30 border-dashed border-border/50 flex flex-col items-center justify-center text-center border-2">
                            <FlaskConical className="w-5 h-5 text-muted-foreground/40 mb-2" />
                            <p className="text-xs text-muted-foreground">Mas modulos proximamente</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
