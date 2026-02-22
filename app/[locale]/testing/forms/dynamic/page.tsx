"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UploadCloud, FileType } from "lucide-react";
import { useState } from "react";

export default function DynamicFormsPage() {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFileName(e.dataTransfer.files[0].name);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Formularios Dinámicos</h1>
                <p className="text-muted-foreground mt-2">
                    Elementos complejos como datepickers, autocompletado, subida de archivos y sliders (rangos).
                </p>
            </div>

            <div className="grid gap-6">
                {/* Datepickers y Calendarios */}
                <Card>
                    <CardHeader>
                        <CardTitle>Fecha y Hora</CardTitle>
                        <CardDescription>Selectores nativos y dinámicos para testing de calendarios.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="date-picker">Selector de Fecha (Nativo)</Label>
                                <Input id="date-picker" type="date" data-testid="date-picker" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="time-picker">Selector de Hora</Label>
                                <Input id="time-picker" type="time" data-testid="time-picker" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="datetime-picker">Fecha y Hora Locales</Label>
                                <Input id="datetime-picker" type="datetime-local" data-testid="datetime-picker" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="month-picker">Selector de Mes</Label>
                                <Input id="month-picker" type="month" data-testid="month-picker" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Autocomplete y Datalist */}
                <Card>
                    <CardHeader>
                        <CardTitle>Autocompletado (Datalist)</CardTitle>
                        <CardDescription>Input que sugiere opciones mientras escribes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                            <Label htmlFor="browser-choice">Navegador Favorito</Label>
                            <Input
                                id="browser-choice"
                                list="browsers"
                                name="browser"
                                placeholder="Escribe o selecciona un navegador..."
                                data-testid="autocomplete-input"
                            />
                            <datalist id="browsers">
                                <option value="Chrome" />
                                <option value="Firefox" />
                                <option value="Safari" />
                                <option value="Edge" />
                                <option value="Opera" />
                                <option value="Brave" />
                            </datalist>
                        </div>
                    </CardContent>
                </Card>

                {/* Subida de Archivos */}
                <Card>
                    <CardHeader>
                        <CardTitle>Comportamiento de Archivos (Uploads)</CardTitle>
                        <CardDescription>Pruebas de File Upload clásico y Drag & Drop.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid gap-2">
                            <Label htmlFor="file-classic">Subida Clásica (Input file)</Label>
                            <Input id="file-classic" type="file" data-testid="file-upload-classic" />
                        </div>

                        <Separator />

                        <div className="grid gap-2">
                            <Label>Zona Drag & Drop (Mock)</Label>
                            <div
                                className={`relative border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-border bg-muted/30"
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                data-testid="drag-drop-zone"
                            >
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleChange}
                                    data-testid="file-upload-hidden"
                                />

                                {fileName ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <FileType className="w-10 h-10 text-primary" />
                                        <span className="font-medium text-sm">Archivo seleccionado:</span>
                                        <span className="text-sm text-muted-foreground truncate max-w-[200px]" data-testid="uploaded-file-name">{fileName}</span>
                                    </div>
                                ) : (
                                    <>
                                        <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
                                        <p className="text-sm font-medium">Arrastra un archivo aquí o haz clic para subir</p>
                                        <p className="text-xs text-muted-foreground mt-1">Soporta cualquier extensión mock</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Sliders y Rangos */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sliders (Rangos)</CardTitle>
                        <CardDescription>Input de tipo rango para selección continua.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                            <Label htmlFor="volume-slider">Volumen (0 - 100)</Label>
                            <div className="flex items-center gap-4">
                                <input
                                    id="volume-slider"
                                    type="range"
                                    min="0"
                                    max="100"
                                    defaultValue="50"
                                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                                    data-testid="range-slider"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
