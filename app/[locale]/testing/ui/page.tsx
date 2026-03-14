'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  CheckCircle2,
  X,
  Terminal,
  MousePointerClick,
  Bell,
  MessageSquare,
} from 'lucide-react';

export default function UIComponentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: 'success' | 'error' }[]
  >([]);

  const addToast = (type: 'success' | 'error') => {
    const newToast = {
      id: Date.now(),
      message:
        type === 'success'
          ? 'Operación completada con éxito.'
          : 'Hubo un error al procesar la solicitud.',
      type,
    };
    setToasts(prev => [...prev, newToast]);

    // Auto remove after 3s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      {/* Header Pattern */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="size-4 text-muted-foreground/70" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Testing UI Module
          </span>
        </div>
        <h1 className="text-2xl font-bold font-mono">
          <span className="text-primary">&gt;</span> Componentes UI Flotantes
        </h1>
        <p className="text-muted-foreground mt-1 font-mono text-sm">{/* Elementos que se superponen al flujo normal: modals, tooltips, toasts */}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Modales */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">mostrar_modal()</CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">{/* Diálogo que bloquea la interacción con el resto de la página */}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setIsModalOpen(true)}
              data-testid="open-modal-btn"
              className="h-10 font-mono text-xs gap-2"
            >
              <Terminal className="size-3.5" />
              ejecutar_modal()
            </Button>
          </CardContent>
        </Card>

        {/* Notificaciones (Toast) */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Bell className="size-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">notificar_usuario()</CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">{/* Alertas flotantes temporales */}</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => addToast('success')}
              className="text-green-600 h-10 font-mono text-xs gap-2"
              data-testid="toast-success-btn"
            >
              <CheckCircle2 className="size-3.5" />
              notificar_exito()
            </Button>
            <Button
              variant="outline"
              onClick={() => addToast('error')}
              className="text-destructive h-10 font-mono text-xs gap-2"
              data-testid="toast-error-btn"
            >
              <AlertCircle className="size-3.5" />
              notificar_error()
            </Button>
          </CardContent>
        </Card>

        {/* Tooltips (Hover) */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Terminal className="size-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">
                mostrar_informacion_emergente()
              </CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">{/* Elementos que revelan información al pasar el ratón */}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium font-mono">informacion_extra:</span>
              <div className="relative group inline-block">
                <AlertCircle
                  className="h-5 w-5 text-muted-foreground cursor-help"
                  data-testid="tooltip-trigger"
                />
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-foreground text-background text-xs rounded font-mono opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50"
                  data-testid="tooltip-content"
                >{/* tooltip: texto oculto revelado */}</div>
              </div>
            </div>

            <div className="relative group inline-block">
              <Button
                variant="secondary"
                className="h-10 font-mono text-xs gap-2"
                data-testid="hover-btn"
              >
                <MousePointerClick className="size-3.5" />
                activar_hover()
              </Button>
              <div
                className="absolute top-full mt-2 left-0 p-4 bg-card border border-dashed rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 w-64"
                data-testid="hover-menu-content"
              >
                <h4 className="font-semibold font-mono mb-1 text-sm">
                  <span className="text-primary">&gt;</span> menu_desplegable()
                </h4>
                <p className="text-xs text-muted-foreground font-mono">{/* Contenido visible solo durante hover sobre el botón o este menú */}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Context Menu (Click Derecho) Simulado */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <MousePointerClick className="size-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">
                capturar_click_derecho()
              </CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">{/* Área diseñada para capturar el evento onContextMenu */}</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="h-32 border-2 border-dashed border-border/40 rounded-lg flex items-center justify-center bg-muted/30"
              onContextMenu={e => {
                e.preventDefault();
                alert('Menú contextual simulado disparado (Right Click).');
              }}
              data-testid="context-menu-zone"
            >
              <span className="text-xs font-mono text-muted-foreground select-none pointer-events-none">{/* haz_click_derecho_aqui */}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- Elementos Flotantes --- */}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          data-testid="modal-overlay"
        >
          <div
            className="bg-background w-full max-w-md p-6 rounded-lg shadow-xl border border-dashed animate-in fade-in zoom-in duration-200"
            data-testid="modal-dialog"
          >
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-border/40">
              <h2 className="text-lg font-bold font-mono" data-testid="modal-title">
                <span className="text-primary">&gt;</span> terminos_servicio()
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
                data-testid="modal-close-icon"
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground mb-6 font-mono text-sm" data-testid="modal-content">{/* Por favor acepta los términos de servicio antes de continuar */}</p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="h-10 font-mono text-xs"
                data-testid="modal-cancel-btn"
              >
                cancelar()
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                className="h-10 font-mono text-xs"
                data-testid="modal-accept-btn"
              >
                aceptar()
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-md border font-mono text-xs animate-in slide-in-from-right-5 fade-in ${
              toast.type === 'success'
                ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'
                : 'bg-destructive/10 border-destructive/20 text-destructive'
            }`}
            data-testid={`toast-message-${toast.type}`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>
              {toast.type === 'success' ? 'operacion_completada_exito' : 'error_procesar_solicitud'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
