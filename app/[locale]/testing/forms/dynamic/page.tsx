'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  UploadCloud,
  FileType,
  Terminal,
  Database,
  Calendar,
  List,
  BarChart3,
  AlertTriangle,
  HardDrive,
} from 'lucide-react';
import { useState } from 'react';

export default function DynamicFormsPage() {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState(50);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
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
      {/* Header Pattern */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="size-4 text-muted-foreground/70" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Dynamic Forms Module
          </span>
        </div>
        <h1 className="text-2xl font-bold font-mono">
          <span className="text-primary">&gt;</span> Elementos Complejos
        </h1>
        <p className="text-muted-foreground mt-1 font-mono text-sm">{/* Datepickers, autocompletado, file uploads, sliders */}</p>
      </div>

      {/* Demo Data Banner */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50">
        <AlertTriangle className="size-4 text-amber-600 dark:text-amber-500" />
        <p className="text-xs font-mono text-amber-800 dark:text-amber-400">{/* Entorno de pruebas - Demo Only */}</p>
      </div>

      <div className="grid gap-6">
        {/* Datepickers y Calendarios */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">selector_fecha_hora()</CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">{/* Selectores nativos para testing de calendarios */}</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="date-picker"
                  className="text-xs font-medium font-mono text-muted-foreground"
                >{/* fecha (nativo) */}</Label>
                <div className="relative">
                  <Database className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none" />
                  <Input
                    id="date-picker"
                    type="date"
                    data-testid="date-picker"
                    className="h-10 font-mono text-sm pl-9"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="time-picker"
                  className="text-xs font-medium font-mono text-muted-foreground"
                >{/* hora (nativo) */}</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none" />
                  <Input
                    id="time-picker"
                    type="time"
                    data-testid="time-picker"
                    className="h-10 font-mono text-sm pl-9"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="datetime-picker"
                  className="text-xs font-medium font-mono text-muted-foreground"
                >{/* fecha y hora locales */}</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none" />
                  <Input
                    id="datetime-picker"
                    type="datetime-local"
                    data-testid="datetime-picker"
                    className="h-10 font-mono text-sm pl-9"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="month-picker"
                  className="text-xs font-medium font-mono text-muted-foreground"
                >{/* mes (nativo) */}</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none" />
                  <Input
                    id="month-picker"
                    type="month"
                    data-testid="month-picker"
                    className="h-10 font-mono text-sm pl-9"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Autocomplete y Datalist */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <List className="size-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">autocompletado()</CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">{/* Input que sugiere opciones mientras escribes */}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label
                htmlFor="browser-choice"
                className="text-xs font-medium font-mono text-muted-foreground"
              >{/* navegador favorito */}</Label>
              <div className="relative">
                <List className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none" />
                <Input
                  id="browser-choice"
                  list="browsers"
                  name="browser"
                  placeholder="escribe o selecciona..."
                  data-testid="autocomplete-input"
                  className="h-10 font-mono text-sm pl-9"
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
              <p className="text-[10px] text-muted-foreground font-mono mt-1">
                <span className="text-primary">&gt;</span> opciones: chrome, firefox, safari...
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Subida de Archivos */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <UploadCloud className="size-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">archivo_upload()</CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">{/* Pruebas de file upload clásico y drag & drop */}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label
                htmlFor="file-classic"
                className="text-xs font-medium font-mono text-muted-foreground"
              >{/* subida clásica (input file) */}</Label>
              <div className="relative">
                <HardDrive className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 pointer-events-none" />
                <Input
                  id="file-classic"
                  type="file"
                  data-testid="file-upload-classic"
                  className="h-10 font-mono text-sm pl-9"
                />
              </div>
            </div>

            <Separator className="my-2" />

            <div className="grid gap-3">
              <Label className="text-xs font-medium font-mono text-muted-foreground">{/* zona drag & drop */}</Label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'
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
                    <span className="font-medium text-sm font-mono">archivo_seleccionado:</span>
                    <span className="text-xs text-muted-foreground font-mono bg-muted/30 px-2 py-1 rounded">
                      {fileName}
                    </span>
                    <p className="text-[10px] text-muted-foreground font-mono mt-1">
                      <span className="text-primary">&gt;</span> listo_para_upload
                    </p>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium font-mono">arrastra_archivo_aqui</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{/* cualquier extensión mock */}</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sliders y Rangos */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="size-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">selector_rango()</CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">{/* Input de tipo rango para selección continua */}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Label
                htmlFor="volume-slider"
                className="text-xs font-medium font-mono text-muted-foreground"
              >{/* volumen (0 - 100) */}</Label>
              <div className="flex items-center gap-4 py-2">
                <input
                  id="volume-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={e => setSliderValue(Number(e.target.value))}
                  onInput={e => setSliderValue(Number((e.target as HTMLInputElement).value))}
                  className="w-full h-2 bg-muted/50 rounded-lg appearance-none cursor-pointer accent-primary"
                  data-testid="range-slider"
                />
                <div className="flex items-center justify-center w-12 h-8 bg-muted/30 border border-border/40 rounded font-mono text-xs text-primary">
                  {sliderValue}
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                <span>min: 0</span>
                <span>max: 100</span>
                <span className="text-primary">actual: {sliderValue}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notas para Testing */}
      <Card className="border-dashed">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="size-4 text-muted-foreground/70" />
            <CardTitle className="text-sm font-medium font-mono">notas_testing()</CardTitle>
          </div>
          <CardDescription className="font-mono text-xs">{/* Consideraciones para automatización de pruebas */}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1.5 text-xs font-mono text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>
                Inputs nativos pueden requerir <code className="bg-muted px-1 rounded">type</code>{' '}
                específico
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>Datalist soporte varía por navegador</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>Drag & drop zone usa input hidden - verificar triggers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>Slider requiere cambio de valor significativo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>
                Elementos con <code className="bg-muted px-1 rounded">data-testid</code> para
                Playwright/Cypress
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
