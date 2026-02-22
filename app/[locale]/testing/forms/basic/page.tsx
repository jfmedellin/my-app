"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function BasicFormsPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Formulario enviado correctamente");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Formularios Clásicos</h1>
                <p className="text-muted-foreground mt-2">
                    Elementos de entrada estándar de HTML para pruebas de automatización básicas y validaciones.
                </p>
            </div>

            <div className="grid gap-6">
                {/* Entradas de Texto Básicas */}
                <Card>
                    <CardHeader>
                        <CardTitle>Entradas de Texto</CardTitle>
                        <CardDescription>Diferentes tipos de cajas de texto (inputs).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="basic-text">Texto Simple</Label>
                            <Input id="basic-text" type="text" placeholder="Escribe algo..." data-testid="input-text" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="basic-password">Contraseña (Mínimo 8 caracteres)</Label>
                            <Input id="basic-password" type="password" placeholder="••••••••" data-testid="input-password" minLength={8} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="basic-number">Número (Rango 1 - 100)</Label>
                            <Input id="basic-number" type="number" min={1} max={100} placeholder="Ej: 42" data-testid="input-number" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="basic-disabled">Entrada Deshabilitada</Label>
                            <Input id="basic-disabled" type="text" disabled placeholder="No puedes escribir aquí" data-testid="input-disabled" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="basic-readonly">Entrada Solo Lectura</Label>
                            <Input id="basic-readonly" type="text" readOnly defaultValue="Contenido fijo" data-testid="input-readonly" />
                        </div>
                    </CardContent>
                </Card>

                {/* Textarea */}
                <Card>
                    <CardHeader>
                        <CardTitle>Áreas de Texto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                            <Label htmlFor="basic-textarea">Comentarios</Label>
                            <Textarea id="basic-textarea" placeholder="Escribe un mensaje largo aquí..." data-testid="textarea-comments" className="min-h-[100px]" />
                        </div>
                    </CardContent>
                </Card>

                {/* Radios y Checkboxes Nativos */}
                <Card>
                    <CardHeader>
                        <CardTitle>Selección Simple y Múltiple (Nativa)</CardTitle>
                        <CardDescription>Elementos tradicionales de selección HTML.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 gap-8">
                        {/* Checkboxes */}
                        <div className="space-y-4">
                            <Label className="text-base">Checkboxes</Label>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="check-op1" className="w-4 h-4 cursor-pointer" data-testid="checkbox-1" />
                                    <Label htmlFor="check-op1" className="cursor-pointer font-normal">Opción 1</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="check-op2" defaultChecked className="w-4 h-4 cursor-pointer" data-testid="checkbox-2" />
                                    <Label htmlFor="check-op2" className="cursor-pointer font-normal">Opción 2 (Marcada)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="check-disabled" disabled className="w-4 h-4" data-testid="checkbox-disabled" />
                                    <Label htmlFor="check-disabled" className="font-normal text-muted-foreground">Opción Deshabilitada</Label>
                                </div>
                            </div>
                        </div>

                        {/* Radio Buttons */}
                        <div className="space-y-4">
                            <Label className="text-base">Radio Buttons</Label>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <input type="radio" id="radio-op1" name="classic-radio" value="1" className="w-4 h-4 cursor-pointer" data-testid="radio-1" />
                                    <Label htmlFor="radio-op1" className="cursor-pointer font-normal">Opción 1</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="radio" id="radio-op2" name="classic-radio" value="2" className="w-4 h-4 cursor-pointer" data-testid="radio-2" />
                                    <Label htmlFor="radio-op2" className="cursor-pointer font-normal">Opción 2</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="radio" id="radio-disabled" name="classic-radio-disabled" disabled className="w-4 h-4" data-testid="radio-disabled" />
                                    <Label htmlFor="radio-disabled" className="font-normal text-muted-foreground">Opción Deshabilitada</Label>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Formulario Completo Simulado */}
                <Card>
                    <CardHeader>
                        <CardTitle>Formulario de Prueba (Submit)</CardTitle>
                        <CardDescription>Prueba de validación nativa (required, email, etc) y envío.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4" data-testid="classic-form">
                            <div className="grid gap-2">
                                <Label htmlFor="form-email">Correo Electrónico *</Label>
                                <Input id="form-email" type="email" required placeholder="correo@ejemplo.com" data-testid="form-email" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="form-select">Selector Clásico *</Label>
                                <select
                                    id="form-select"
                                    required
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    data-testid="form-select"
                                >
                                    <option value="">Selecciona una opción...</option>
                                    <option value="opt1">Opción A</option>
                                    <option value="opt2">Opción B</option>
                                    <option value="opt3">Opción C</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input type="checkbox" id="form-terms" required className="w-4 h-4" data-testid="form-terms" />
                                <Label htmlFor="form-terms" className="text-sm font-normal">Acepto los términos y condiciones *</Label>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex gap-4">
                                <Button type="submit" data-testid="submit-btn" className="w-full sm:w-auto">Enviar Formulario</Button>
                                <Button type="reset" variant="outline" data-testid="reset-btn" className="w-full sm:w-auto">Limpiar</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
