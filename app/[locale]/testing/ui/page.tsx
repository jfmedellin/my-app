"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

export default function UIComponentsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" }[]>([]);

    const addToast = (type: "success" | "error") => {
        const newToast = {
            id: Date.now(),
            message: type === "success" ? "Operación completada con éxito." : "Hubo un error al procesar la solicitud.",
            type,
        };
        setToasts((prev) => [...prev, newToast]);

        // Auto remove after 3s
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
        }, 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 relative">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Componentes UI Flotantes</h1>
                <p className="text-muted-foreground mt-2">
                    Elementos que se superponen al flujo normal del documento: Modales, Tooltips flotantes y Notificaciones Toast.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                {/* Modales */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ventanas Modales</CardTitle>
                        <CardDescription>Diálogos que bloquean la interacción con el resto de la página.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => setIsModalOpen(true)} data-testid="open-modal-btn">
                            Abrir Modal Simple
                        </Button>
                    </CardContent>
                </Card>

                {/* Notificaciones (Toast) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notificaciones (Toasts)</CardTitle>
                        <CardDescription>Alertas flotantes temporales que aparecen en la pantalla.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        <Button variant="outline" onClick={() => addToast("success")} className="text-green-600" data-testid="toast-success-btn">
                            Success Toast
                        </Button>
                        <Button variant="outline" onClick={() => addToast("error")} className="text-destructive" data-testid="toast-error-btn">
                            Error Toast
                        </Button>
                    </CardContent>
                </Card>

                {/* Tooltips (Hover) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tooltips e interacciones Hover</CardTitle>
                        <CardDescription>Elementos que revelan información al pasar el ratón (Hover).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Información extra:</span>
                            <div className="relative group inline-block">
                                <AlertCircle className="h-5 w-5 text-muted-foreground cursor-help" data-testid="tooltip-trigger" />
                                <div
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-foreground text-background text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50"
                                    data-testid="tooltip-content"
                                >
                                    Este es el texto oculto del tooltip.
                                </div>
                            </div>
                        </div>

                        <div className="relative group inline-block">
                            <Button variant="secondary" data-testid="hover-btn">
                                Pasa el ratón sobre mí
                            </Button>
                            <div
                                className="absolute top-full mt-2 left-0 p-4 bg-card border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 w-64"
                                data-testid="hover-menu-content"
                            >
                                <h4 className="font-semibold mb-1">Menú Desplegable (Hover)</h4>
                                <p className="text-sm text-muted-foreground">Este contenido solo es visible mientras mantienes el cursor sobre el botón o este menú.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Context Menu (Click Derecho) Simulado */}
                <Card>
                    <CardHeader>
                        <CardTitle>Menú Contextual (Click Derecho)</CardTitle>
                        <CardDescription>Área diseñada para capturar el click derecho (onContextMenu).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/30"
                            onContextMenu={(e) => {
                                e.preventDefault();
                                alert("Menú contextual simulado disparado (Right Click).");
                            }}
                            data-testid="context-menu-zone"
                        >
                            <span className="text-sm text-muted-foreground select-none pointer-events-none">
                                Haz Click Derecho aquí
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* --- Elementos Flotantes --- */}

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" data-testid="modal-overlay">
                    <div
                        className="bg-background w-full max-w-md p-6 rounded-lg shadow-xl animate-in fade-in zoom-in duration-200"
                        data-testid="modal-dialog"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold" data-testid="modal-title">Términos de Servicio</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} data-testid="modal-close-icon">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-muted-foreground mb-6" data-testid="modal-content">
                            Por favor acepta los términos de servicio antes de continuar. Este es un modal que bloquea el fondo.
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)} data-testid="modal-cancel-btn">Cancelar</Button>
                            <Button onClick={() => setIsModalOpen(false)} data-testid="modal-accept-btn">Aceptar</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toasts Container */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-md shadow-lg border text-sm font-medium animate-in slide-in-from-right-5 fade-in ${toast.type === "success"
                                ? "bg-green-50 border-green-200 text-green-800"
                                : "bg-red-50 border-red-200 text-red-800"
                            }`}
                        data-testid={`toast-message-${toast.type}`}
                    >
                        {toast.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                        {toast.message}
                    </div>
                ))}
            </div>
        </div>
    );
}
