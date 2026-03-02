"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

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
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Interacciones Asíncronas</h1>
                <p className="text-muted-foreground mt-2">
                    Elementos con retrasos y cambios de estado para probar tiempos de espera (Explicit Waits) en automatización.
                </p>
            </div>

            <div className="grid gap-6">
                {/* Latencia Simulada */}
                <Card>
                    <CardHeader>
                        <CardTitle>Carga Simulada (Retraso de Red)</CardTitle>
                        <CardDescription>El botón cambiará a estado de carga por 3 segundos antes de mostrar un mensaje de éxito.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            onClick={triggerLoad}
                            disabled={isLoading}
                            data-testid="async-loader-btn"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? "Procesando..." : "Iniciar Petición Asíncrona"}
                        </Button>

                        {loadComplete && (
                            <div
                                className="mt-4 p-4 border border-green-200 bg-green-50 text-green-700 rounded-md flex items-center gap-2"
                                data-testid="async-success-msg"
                            >
                                <CheckCircle2 className="h-5 w-5" />
                                Petición completada exitosamente.
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid sm:grid-cols-2 gap-6">
                    {/* Elemento que Aparece */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Aparición Mágica</CardTitle>
                            <CardDescription>Un elemento se añadirá al DOM después de 5 segundos.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                onClick={() => setStartShowing(true)}
                                disabled={startShowing}
                                variant="outline"
                                data-testid="trigger-appear-btn"
                            >
                                Iniciar Temporizador (5s)
                            </Button>

                            {showDelayedElement && (
                                <div
                                    className="p-4 border border-blue-200 bg-blue-50 text-blue-700 rounded-md flex items-center gap-2 animate-in fade-in"
                                    data-testid="delayed-element"
                                >
                                    <AlertCircle className="h-5 w-5" />
                                    Elemento revelado.
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Elemento que Desaparece */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Desaparición Mágica</CardTitle>
                            <CardDescription>Un elemento será eliminado del DOM después de 5 segundos.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                onClick={() => setStartHiding(true)}
                                disabled={startHiding || hideDelayedElement}
                                variant="outline"
                                data-testid="trigger-disappear-btn"
                            >
                                Eliminar Elemento (5s)
                            </Button>

                            {!hideDelayedElement && (
                                <div
                                    className="p-4 border border-orange-200 bg-orange-50 text-orange-700 rounded-md flex items-center gap-2"
                                    data-testid="element-to-hide"
                                >
                                    <AlertCircle className="h-5 w-5" />
                                    Este elemento desaparecerá pronto.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
