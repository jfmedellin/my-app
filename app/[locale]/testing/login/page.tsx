"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2, Lock, User as UserIcon } from "lucide-react";

export default function LoginTestingPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Credenciales falsas para QA
    const VALID_USER = "qa_tester";
    const VALID_PASS = "password123";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simular un retraso de red
        setTimeout(() => {
            setIsLoading(false);

            if (username === VALID_USER && password === VALID_PASS) {
                setShowSuccessModal(true);
            } else {
                setError("Usuario o contraseña incorrectos. Verifica las credenciales.");
            }
        }, 1500);
    };

    return (
        <div className="max-w-md mx-auto space-y-8 h-full flex flex-col justify-center min-h-[80vh]">
            <div className="text-center space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                    <Lock className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Acceso QA</h1>
                <p className="text-muted-foreground text-sm">
                    Simulación de inicio de sesión para pruebas automatizadas.
                </p>
            </div>

            <Card className="border-border/50 shadow-lg relative overflow-hidden">
                {/* Efecto de decoración superior */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>

                <form onSubmit={handleLogin} data-testid="login-form">
                    <CardHeader className="pt-8 text-center pb-4">
                        <CardTitle className="text-xl">Iniciar Sesión</CardTitle>
                        <CardDescription>
                            Ingresa tus credenciales para acceder
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">

                        {error && (
                            <div
                                className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm flex items-start gap-2 animate-in slide-in-from-top-2"
                                data-testid="login-error-message"
                            >
                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-2 relative">
                            <Label htmlFor="username">Usuario</Label>
                            <div className="relative">
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="ej. admin"
                                    className="pl-9"
                                    required
                                    data-testid="login-username-input"
                                    disabled={isLoading}
                                />
                                <UserIcon className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                            </div>
                            <p className="text-[11px] text-muted-foreground" data-testid="qa-hint-user">
                                💡 Tip de QA: Usa el usuario <code className="font-mono font-bold text-foreground bg-muted/50 px-1 rounded">{VALID_USER}</code>
                            </p>
                        </div>

                        <div className="space-y-2 relative">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-9"
                                    required
                                    data-testid="login-password-input"
                                    disabled={isLoading}
                                />
                                <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                            </div>
                            <p className="text-[11px] text-muted-foreground" data-testid="qa-hint-pass">
                                💡 Tip de QA: La contraseña asignada es <code className="font-mono font-bold text-foreground bg-muted/50 px-1 rounded">{VALID_PASS}</code>
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="pb-8">
                        <Button
                            type="submit"
                            className="w-full rounded-xl h-11 text-base font-medium shadow-md transition-transform active:scale-[0.98]"
                            disabled={isLoading}
                            data-testid="login-submit-btn"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Verificando...
                                </>
                            ) : (
                                "Entrar al sistema"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {/* Modal de Éxito (Simula el redireccionamiento) */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" data-testid="login-success-overlay">
                    <div
                        className="bg-background w-full max-w-sm p-8 rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200 border"
                        data-testid="login-success-modal"
                    >
                        <div className="flex flex-col items-center text-center space-y-5">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-2 animate-bounce">
                                <CheckCircle2 className="h-10 w-10 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold tracking-tight">¡Acceso Concedido!</h2>
                                <p className="text-muted-foreground text-sm">
                                    El login ha sido exitoso. Has pasado el escenario de automatización correctamente.
                                </p>
                            </div>
                            <Button
                                variant="secondary"
                                className="w-full mt-6 rounded-xl"
                                size="lg"
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    setUsername("");
                                    setPassword("");
                                }}
                                data-testid="login-success-close-btn"
                            >
                                Cerrar Simulación
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
