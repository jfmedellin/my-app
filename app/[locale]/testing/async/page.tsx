'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Clock,
  Eye,
  EyeOff,
  AlertTriangle,
} from 'lucide-react';

export default function AsyncInteractionsPage() {
  // Estado 1: Botón de Carga
  const [isLoading, setIsLoading] = useState(false);
  const [loadComplete, setLoadComplete] = useState(false);

  // Estado 2: Elemento que Aparece
  const [showDelayedElement, setShowDelayedElement] = useState(false);
  const [startShowing, setStartShowing] = useState(false);

  // Estado 3: Elemento que Desaparece
  const [hideDelayedElement, setHideDelayedElement] = useState(false);
  const [startHiding, setStartHiding] = useState(false);

  // Acciones
  const triggerLoad = () => {
    setIsLoading(true);
    setLoadComplete(false);
    setTimeout(() => {
      setIsLoading(false);
      setLoadComplete(true);
    }, 3000); // 3 seconds delay
  };

  useEffect(() => {
    if (startShowing) {
      const timer = setTimeout(() => setShowDelayedElement(true), 5000); // Aparece en 5s
      return () => clearTimeout(timer);
    }
  }, [startShowing]);

  useEffect(() => {
    if (startHiding) {
      const timer = setTimeout(() => setHideDelayedElement(true), 5000); // Desaparece en 5s
      return () => clearTimeout(timer);
    }
  }, [startHiding]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Pattern */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="size-4 text-muted-foreground/70" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Async Interactions Module
          </span>
        </div>
        <h1 className="text-2xl font-bold font-mono">
          <span className="text-primary">&gt;</span> Esperas Explícitas
        </h1>
        <p className="text-muted-foreground mt-1 font-mono text-sm">
          Elementos con delays y cambios de estado para testing
        </p>
      </div>

      {/* Demo Data Banner */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50">
        <AlertTriangle className="size-4 text-amber-600 dark:text-amber-500" />
        <p className="text-xs font-mono text-amber-800 dark:text-amber-400">
          Entorno de pruebas - Demo Only
        </p>
      </div>

      <div className="grid gap-6">
        {/* Latencia Simulada */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Terminal className="size-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">carga_simulada()</CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">
              El botón cambiará a estado de carga por 3 segundos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={triggerLoad}
              disabled={isLoading}
              data-testid="async-loader-btn"
              className="h-10 font-mono text-xs gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> procesando...
                </>
              ) : (
                <>
                  <Terminal className="size-3.5" /> iniciar_peticion()
                </>
              )}
            </Button>

            {loadComplete && (
              <div
                className="mt-4 p-4 border border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400 rounded-md flex items-center gap-2 font-mono text-xs"
                data-testid="async-success-msg"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>peticion_completada_exito</span>
              </div>
            )}

            {isLoading && (
              <div className="text-xs text-muted-foreground font-mono">
                <span className="text-primary">&gt;</span> esperando respuesta...
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Elemento que Aparece */}
          <Card className="border-dashed">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Eye className="size-4 text-muted-foreground/70" />
                <CardTitle className="text-sm font-medium font-mono">aparicion_magica()</CardTitle>
              </div>
              <CardDescription className="font-mono text-xs">
                Un elemento se añadirá al DOM después de 5 segundos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => setStartShowing(true)}
                disabled={startShowing}
                variant="outline"
                data-testid="trigger-appear-btn"
                className="h-10 font-mono text-xs gap-2"
              >
                <Clock className="size-3.5" />
                iniciar_timer(5000ms)
              </Button>

              {showDelayedElement && (
                <div
                  className="p-4 border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md flex items-center gap-2 font-mono text-xs animate-in fade-in"
                  data-testid="delayed-element"
                >
                  <AlertCircle className="h-4 w-4" />
                  <span>elemento_revelado</span>
                </div>
              )}

              {startShowing && !showDelayedElement && (
                <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>esperando_aparicion...</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Elemento que Desaparece */}
          <Card className="border-dashed">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <EyeOff className="size-4 text-muted-foreground/70" />
                <CardTitle className="text-sm font-medium font-mono">
                  desaparicion_magica()
                </CardTitle>
              </div>
              <CardDescription className="font-mono text-xs">
                Un elemento será eliminado del DOM después de 5 segundos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => setStartHiding(true)}
                disabled={startHiding || hideDelayedElement}
                variant="outline"
                data-testid="trigger-disappear-btn"
                className="h-10 font-mono text-xs gap-2"
              >
                <Clock className="size-3.5" />
                eliminar_elemento(5000ms)
              </Button>

              {!hideDelayedElement && (
                <div
                  className="p-4 border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md flex items-center gap-2 font-mono text-xs"
                  data-testid="element-to-hide"
                >
                  <AlertCircle className="h-4 w-4" />
                  <span>elemento_visible_temporal</span>
                </div>
              )}

              {startHiding && !hideDelayedElement && (
                <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>esperando_desaparicion...</span>
                </div>
              )}

              {hideDelayedElement && (
                <div className="text-xs text-muted-foreground font-mono">
                  <span className="text-primary">&gt;</span> elemento_eliminado_dom
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Notas para Testing */}
      <Card className="border-dashed">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="size-4 text-muted-foreground/70" />
            <CardTitle className="text-sm font-medium font-mono">notas_testing()</CardTitle>
          </div>
          <CardDescription className="font-mono text-xs">
            Consideraciones para automatización de pruebas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1.5 text-xs font-mono text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>
                Usar <code className="bg-muted px-1 rounded">waitFor</code> para elementos con delay
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>Validar estados de loading antes de assert</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>Timeouts configurables: 3s (carga), 5s (aparición/desaparición)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>
                Elementos con <code className="bg-muted px-1 rounded">data-testid</code> para
                localización estable
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>Verificar ausencia en DOM para elementos que desaparecen</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
