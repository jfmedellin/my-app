import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, MousePointerClick, CheckSquare, Timer, TableProperties, Layers, LogIn } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: PageProps) {
  const { locale } = await params;

  const modules = [
    {
      title: "Sistema de Login (QA)",
      description: "Pruebas de autenticación con validación estricta y credenciales de prueba.",
      icon: LogIn,
      href: `/${locale}/testing/login`,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
    {
      title: "Formularios Clásicos",
      description: "Prueba interacciones con inputs estándar, radio buttons, checkboxes y selects básicos.",
      icon: CheckSquare,
      href: `/${locale}/testing/forms/basic`,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Formularios Dinámicos",
      description: "Retos de automatización con datepickers, autocompletado, subida de archivos y sliders.",
      icon: MousePointerClick,
      href: `/${locale}/testing/forms/dynamic`,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      title: "Interacciones Asíncronas",
      description: "Simulación de demoras en red, elementos que aparecen y desaparecen dinámicamente.",
      icon: Timer,
      href: `/${locale}/testing/async`,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Tablas y Extraer Datos",
      description: "Búsquedas dinámicas, paginación, filtros y ordenamiento de columnas de tablas.",
      icon: TableProperties,
      href: `/${locale}/testing/tables`,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Componentes UI Flotantes",
      description: "Prueba tooltips, menús contextuales, notificaciones tipo toast y modales complejos.",
      icon: Layers,
      href: `/${locale}/testing/ui`,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Bienvenido al QA Sandbox</h1>
        <p className="text-lg text-muted-foreground">
          Una plataforma interactiva diseñada para practicar automatización (Playwright, Selenium, Cypress)
          y probar estrategias de QA manual.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, i) => (
          <Link href={module.href} key={i} className="group transition-all hover:-translate-y-1">
            <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-md transition-all">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${module.bg}`}>
                  <module.icon className={`w-6 h-6 ${module.color}`} />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}

        <Card className="h-full border-dashed bg-muted/30 flex flex-col items-center justify-center p-6 text-center">
          <FlaskConical className="w-10 h-10 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-1">Más módulos en camino...</h3>
          <p className="text-sm text-muted-foreground">Estamos construyendo más escenarios de prueba.</p>
        </Card>
      </div>
    </div>
  );
}
