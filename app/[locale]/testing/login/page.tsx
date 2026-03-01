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

    // Las credenciales se leen del lado del servidor y se pasan como props
    // O usar un enfoque alternativo para testing
    const VALID_USER = process.env.NEXT_PUBLIC_AUTH_TEST_USERNAME || "qa_tester";
    const VALID_PASS = process.env.NEXT_PUBLIC_AUTH_TEST_PASSWORD || "password123";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

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
        <div className="max-w-md mx-auto space-y-8 h-full flex flex-col justify-center min-h-[80vh] px-4">
            <header className="text-center space-y-2">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4 ring-1 ring-primary/20">
                    <Lock className="h-7 w-7 text-primary" aria-hidden="true" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Acceso QA</h1>
                <p className="text-muted-foreground text-sm">
                    Simulación de inicio de sesión para pruebas automatizadas.
                </p>
            </header>

            <Card className="border-border/50 shadow-lg relative overflow-hidden ring-1 ring-border/50">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-primary" aria-hidden="true" />

                <form onSubmit={handleLogin} data-testid="login-form" noValidate>
                    <CardHeader className="pt-8 text-center pb-4">
                        <CardTitle className="text-xl">Iniciar Sesión</CardTitle>
                        <CardDescription>
                            Ingresa tus credenciales para acceder
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div
                            role="alert"
                            aria-live="polite"
                            className={`p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm flex items-start gap-2 transition-all duration-200 ${
                                error 
                                    ? "opacity-100 translate-y-0" 
                                    : "opacity-0 -translate-y-2 hidden"
                            }`}
                            data-testid="login-error-message"
                        >
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                            <span>{error || "Error placeholder"}</span>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-sm font-medium">
                                Usuario
                            </Label>
                            <div className="relative">
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="ej. admin"
                                    className="pl-9 h-11 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    required
                                    data-testid="login-username-input"
                                    disabled={isLoading}
                                    aria-describedby="username-hint"
                                    autoComplete="username"
                                />
                                <UserIcon 
                                    className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
                                    aria-hidden="true" 
                                />
                            </div>
                            <p 
                                id="username-hint" 
                                className="text-[11px] text-muted-foreground" 
                                data-testid="qa-hint-user"
                            >
                                Tip de QA: Usa el usuario{" "}
                                <code className="font-mono font-semibold text-foreground bg-muted/50 px-1.5 py-0.5 rounded text-xs">
                                    {VALID_USER}
                                </code>
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Contraseña
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-9 h-11 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    required
                                    data-testid="login-password-input"
                                    disabled={isLoading}
                                    aria-describedby="password-hint"
                                    autoComplete="current-password"
                                />
                                <Lock 
                                    className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
                                    aria-hidden="true" 
                                />
                            </div>
                            <p 
                                id="password-hint" 
                                className="text-[11px] text-muted-foreground" 
                                data-testid="qa-hint-pass"
                            >
                                Tip de QA: La contraseña asignada es{" "}
                                <code className="font-mono font-semibold text-foreground bg-muted/50 px-1.5 py-0.5 rounded text-xs">
                                    {VALID_PASS}
                                </code>
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="pb-8 pt-2">
                        <Button
                            type="submit"
                            className="w-full rounded-xl h-11 text-base font-medium shadow-md transition-all duration-200 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed motion-reduce:transition-none"
                            disabled={isLoading}
                            data-testid="login-submit-btn"
                            aria-label={isLoading ? "Verificando credenciales" : "Iniciar sesión"}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                                    Verificando...
                                </>
                            ) : (
                                "Entrar al sistema"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {showSuccessModal && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" 
                    data-testid="login-success-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="success-title"
                >
                    <div
                        className="bg-background w-full max-w-sm p-8 rounded-2xl shadow-2xl border ring-1 ring-border/50 motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:fade-in duration-200"
                        data-testid="login-success-modal"
                    >
                        <div className="flex flex-col items-center text-center space-y-5">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-2 motion-safe:animate-bounce">
                                <CheckCircle2 className="h-10 w-10 text-green-500" aria-hidden="true" />
                            </div>
                            <div className="space-y-2">
                                <h2 id="success-title" className="text-2xl font-bold tracking-tight">
                                    ¡Acceso Concedido!
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    El login ha sido exitoso. Has pasado el escenario de automatización correctamente.
                                </p>
                            </div>
                            <Button
                                variant="secondary"
                                className="w-full mt-6 rounded-xl h-11 transition-all duration-200 hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer motion-reduce:transition-none"
                                size="lg"
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    setUsername("");
                                    setPassword("");
                                }}
                                data-testid="login-success-close-btn"
                                aria-label="Cerrar modal de éxito"
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
