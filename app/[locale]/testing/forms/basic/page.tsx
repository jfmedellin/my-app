"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Circle, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function BasicFormsPage() {
    const [formStatus, setFormStatus] = useState<FormStatus>("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus("loading");
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        if (!email || !email.includes("@")) {
            setErrors({ email: "Ingresa un correo valido" });
            setFormStatus("error");
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1500));
        setFormStatus("success");
    };

    const handleReset = () => {
        setFormStatus("idle");
        setErrors({});
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Testing</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-sm font-medium text-foreground">Formularios Clasicos</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Formularios Clasicos</h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Elementos de entrada estandar de HTML para pruebas de automatizacion basicas y validaciones.
                </p>
            </div>

            <div className="grid gap-6">
                <Card className="border-border/50">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Entradas de Texto</CardTitle>
                        <CardDescription>Diferentes tipos de cajas de texto (inputs).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="basic-text">Texto Simple</Label>
                            <Input 
                                id="basic-text" 
                                type="text" 
                                placeholder="Escribe algo..." 
                                data-testid="input-text"
                                className="transition-all duration-200 focus:ring-2 focus:ring-ring/30" 
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="basic-password">Contrasena (Minimo 8 caracteres)</Label>
                            <Input 
                                id="basic-password" 
                                type="password" 
                                placeholder="********" 
                                data-testid="input-password" 
                                minLength={8}
                                className="transition-all duration-200 focus:ring-2 focus:ring-ring/30" 
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="basic-number">Numero (Rango 1 - 100)</Label>
                            <Input 
                                id="basic-number" 
                                type="number" 
                                min={1} 
                                max={100} 
                                placeholder="Ej: 42" 
                                data-testid="input-number"
                                className="transition-all duration-200 focus:ring-2 focus:ring-ring/30" 
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="basic-disabled">Entrada Deshabilitada</Label>
                            <Input 
                                id="basic-disabled" 
                                type="text" 
                                disabled 
                                placeholder="No puedes escribir aqui" 
                                data-testid="input-disabled"
                                className="bg-muted/50 cursor-not-allowed opacity-70" 
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="basic-readonly">Entrada Solo Lectura</Label>
                            <Input 
                                id="basic-readonly" 
                                type="text" 
                                readOnly 
                                defaultValue="Contenido fijo" 
                                data-testid="input-readonly"
                                className="bg-muted/30 cursor-not-allowed" 
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Areas de Texto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                            <Label htmlFor="basic-textarea">Comentarios</Label>
                            <Textarea 
                                id="basic-textarea" 
                                placeholder="Escribe un mensaje largo aqui..." 
                                data-testid="textarea-comments" 
                                className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-ring/30 resize-none" 
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Seleccion Simple y Multiple (Nativa)</CardTitle>
                        <CardDescription>Elementos tradicionales de seleccion HTML.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <Label className="text-base">Checkboxes</Label>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer group">
                                    <input type="checkbox" id="check-op1" className="w-4 h-4 cursor-pointer accent-primary" data-testid="checkbox-1" />
                                    <span className="text-sm group-hover:text-foreground transition-colors">Opcion 1</span>
                                </label>
                                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer group">
                                    <input type="checkbox" id="check-op2" defaultChecked className="w-4 h-4 cursor-pointer accent-primary" data-testid="checkbox-2" />
                                    <span className="text-sm group-hover:text-foreground transition-colors">Opcion 2 (Marcada)</span>
                                </label>
                                <label className="flex items-center gap-3 p-2 rounded-lg cursor-not-allowed opacity-50">
                                    <input type="checkbox" id="check-disabled" disabled className="w-4 h-4" data-testid="checkbox-disabled" />
                                    <span className="text-sm text-muted-foreground">Opcion Deshabilitada</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-base">Radio Buttons</Label>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer group">
                                    <input type="radio" id="radio-op1" name="classic-radio" value="1" className="w-4 h-4 cursor-pointer accent-primary" data-testid="radio-1" />
                                    <span className="text-sm group-hover:text-foreground transition-colors">Opcion 1</span>
                                </label>
                                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer group">
                                    <input type="radio" id="radio-op2" name="classic-radio" value="2" className="w-4 h-4 cursor-pointer accent-primary" data-testid="radio-2" />
                                    <span className="text-sm group-hover:text-foreground transition-colors">Opcion 2</span>
                                </label>
                                <label className="flex items-center gap-3 p-2 rounded-lg cursor-not-allowed opacity-50">
                                    <input type="radio" id="radio-disabled" name="classic-radio-disabled" disabled className="w-4 h-4" data-testid="radio-disabled" />
                                    <span className="text-sm text-muted-foreground">Opcion Deshabilitada</span>
                                </label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Formulario de Prueba (Submit)</CardTitle>
                        <CardDescription>Prueba de validacion nativa (required, email, etc) y envio.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4" data-testid="classic-form">
                            <div className="grid gap-2">
                                <Label htmlFor="form-email">Correo Electronico *</Label>
                                <Input 
                                    id="form-email" 
                                    name="email"
                                    type="email" 
                                    required 
                                    placeholder="correo@ejemplo.com" 
                                    data-testid="form-email"
                                    className={cn(
                                        "transition-all duration-200 focus:ring-2 focus:ring-ring/30",
                                        errors.email && "border-destructive focus:ring-destructive/30"
                                    )}
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                                {errors.email && (
                                    <p id="email-error" className="text-sm text-destructive flex items-center gap-1.5" role="alert">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="form-select">Selector (shadcn/ui) *</Label>
                                <Select required name="select">
                                    <SelectTrigger 
                                        id="form-select" 
                                        className={cn(
                                            "transition-all duration-200",
                                            formStatus === "error" && "border-destructive focus:ring-destructive/30"
                                        )}
                                        data-testid="form-select"
                                    >
                                        <SelectValue placeholder="Selecciona una opcion..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="opt1">Opcion A</SelectItem>
                                        <SelectItem value="opt2">Opcion B</SelectItem>
                                        <SelectItem value="opt3">Opcion C</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-start gap-2.5 pt-2">
                                <input 
                                    type="checkbox" 
                                    id="form-terms" 
                                    required 
                                    className="w-4 h-4 mt-0.5 cursor-pointer accent-primary" 
                                    data-testid="form-terms" 
                                />
                                <Label htmlFor="form-terms" className="text-sm font-normal leading-relaxed cursor-pointer">
                                    Acepto los terminos y condiciones *
                                </Label>
                            </div>

                            <Separator className="my-4" />

                            {formStatus === "success" && (
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4 animate-in fade-in slide-in-from-top-2" role="status">
                                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                                    <span className="text-sm font-medium">Formulario enviado correctamente</span>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button 
                                    type="submit" 
                                    data-testid="submit-btn" 
                                    className="w-full sm:w-auto min-w-[140px]"
                                    disabled={formStatus === "loading"}
                                >
                                    {formStatus === "loading" ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        "Enviar Formulario"
                                    )}
                                </Button>
                                <Button 
                                    type="reset" 
                                    variant="outline" 
                                    data-testid="reset-btn" 
                                    className="w-full sm:w-auto cursor-pointer"
                                    onClick={handleReset}
                                    disabled={formStatus === "loading"}
                                >
                                    Limpiar
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
