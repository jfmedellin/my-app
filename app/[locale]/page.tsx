import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { FlaskConical, MousePointerClick, CheckSquare, Timer, TableProperties, Layers, LogIn } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: PageProps) {
  const { locale } = await params;

  const modules = [
    {
      title: "Sistema de Login",
      description: "Pruebas de autenticación con validación estricta y credenciales de prueba.",
      icon: LogIn,
      href: `/${locale}/testing/login`,
    },
    {
      title: "Formularios Clásicos",
      description: "Inputs estándar, radio buttons, checkboxes y selects básicos.",
      icon: CheckSquare,
      href: `/${locale}/testing/forms/basic`,
    },
    {
      title: "Formularios Dinámicos",
      description: "Datepickers, autocompletado, subida de archivos y sliders.",
      icon: MousePointerClick,
      href: `/${locale}/testing/forms/dynamic`,
    },
    {
      title: "Interacciones Asíncronas",
      description: "Simulación de demoras en red, elementos dinámicos.",
      icon: Timer,
      href: `/${locale}/testing/async`,
    },
    {
      title: "Tablas y Datos",
      description: "Búsquedas dinámicas, paginación, filtros y ordenamiento.",
      icon: TableProperties,
      href: `/${locale}/testing/tables`,
    },
    {
      title: "Componentes UI",
      description: "Tooltips, menús contextuales, toasts y modales.",
      icon: Layers,
      href: `/${locale}/testing/ui`,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-base max-w-2xl">
          Plataforma interactiva para practicar automatización y estrategias de QA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module, i) => (
          <Link href={module.href} key={i} className="group">
            <Card className="h-full py-5 px-5 hover:bg-muted/50 transition-colors cursor-pointer border-transparent hover:border-border">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/8 group-hover:bg-primary/12 transition-colors">
                  <module.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {module.description}
                  </CardDescription>
                </div>
              </div>
            </Card>
          </Link>
        ))}

        <div className="h-full min-h-[120px]">
          <Card className="h-full py-5 px-5 bg-muted/20 border-dashed border-border/50 flex flex-col items-center justify-center text-center">
            <FlaskConical className="w-6 h-6 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">Más módulos pronto</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
