'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  Terminal,
  Database,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function BasicFormsPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    if (!email || !email.includes('@')) {
      setErrors({ email: 'Correo invalido. Verifica el formato.' });
      setFormStatus('error');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus('success');
  };

  const handleReset = () => {
    setFormStatus('idle');
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="size-4 text-muted-foreground/70" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Formularios
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight font-mono">
          <span className="text-primary">&gt;</span> Formularios Básicos
        </h1>
        <p className="text-muted-foreground mt-1 font-mono text-sm">
          {/* Elementos de entrada HTML para pruebas de automatización */}
        </p>
      </div>

      {/* Demo Data Indicator */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50">
        <AlertTriangle className="size-4 text-amber-600 dark:text-amber-500" />
        <p className="text-xs font-mono text-amber-800 dark:text-amber-400">
          {/* Entorno de pruebas - Demo Only */}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Text Inputs */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Database className="size-4" />
              <CardTitle className="text-sm font-medium font-mono">input_text()</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label
                htmlFor="basic-text"
                className="text-xs font-medium font-mono text-muted-foreground"
              >
                {/* Ingresa texto simple */}
              </label>
              <Input
                id="basic-text"
                type="text"
                placeholder="escribe aqui..."
                data-testid="input-text"
                className="h-10 font-mono text-sm"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="basic-password"
                className="text-xs font-medium font-mono text-muted-foreground"
              >
                {/* Contraseña (minimo 8 caracteres) */}
              </label>
              <Input
                id="basic-password"
                type="password"
                placeholder="••••••••"
                data-testid="input-password"
                minLength={8}
                className="h-10 font-mono text-sm"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="basic-number"
                className="text-xs font-medium font-mono text-muted-foreground"
              >
                {/* Número (rango 1 - 100) */}
              </label>
              <Input
                id="basic-number"
                type="number"
                min={1}
                max={100}
                placeholder="42"
                data-testid="input-number"
                className="h-10 font-mono text-sm"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="basic-disabled"
                className="text-xs font-medium font-mono text-muted-foreground"
              >
                {/* Entrada deshabilitada */}
              </label>
              <Input
                id="basic-disabled"
                type="text"
                disabled
                placeholder="no se puede escribir aqui"
                data-testid="input-disabled"
                className="h-10 font-mono text-sm bg-muted/30 cursor-not-allowed"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="basic-readonly"
                className="text-xs font-medium font-mono text-muted-foreground"
              >
                {/* Entrada solo lectura */}
              </label>
              <Input
                id="basic-readonly"
                type="text"
                readOnly
                defaultValue="contenido fijo"
                data-testid="input-readonly"
                className="h-10 font-mono text-sm bg-muted/30 cursor-not-allowed"
              />
            </div>
          </CardContent>
        </Card>

        {/* Textarea */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Database className="size-4" />
              <CardTitle className="text-sm font-medium font-mono">text_area()</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <label
                htmlFor="basic-textarea"
                className="text-xs font-medium font-mono text-muted-foreground"
              >
                {/* Area de texto multilinea */}
              </label>
              <Textarea
                id="basic-textarea"
                placeholder="escribe un mensaje largo aqui..."
                data-testid="textarea-comments"
                className="min-h-[100px] font-mono text-sm resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Selection Controls */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Database className="size-4" />
              <CardTitle className="text-sm font-medium font-mono">select_options()</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-medium font-mono text-muted-foreground">
                {/* Checkboxes - seleccion multiple */}
              </label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer font-mono text-xs">
                  <input
                    type="checkbox"
                    id="check-op1"
                    className="size-4 cursor-pointer"
                    data-testid="checkbox-1"
                  />
                  <span>opcion_1</span>
                </label>
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer font-mono text-xs">
                  <input
                    type="checkbox"
                    id="check-op2"
                    defaultChecked
                    className="size-4 cursor-pointer"
                    data-testid="checkbox-2"
                  />
                  <span>opcion_2</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">(marcada)</span>
                </label>
                <label className="flex items-center gap-3 p-2 rounded-lg cursor-not-allowed opacity-50 font-mono text-xs">
                  <input
                    type="checkbox"
                    id="check-disabled"
                    disabled
                    className="size-4"
                    data-testid="checkbox-disabled"
                  />
                  <span>opcion_deshabilitada</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-medium font-mono text-muted-foreground">
                {/* Radio buttons - seleccion unica */}
              </label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer font-mono text-xs">
                  <input
                    type="radio"
                    id="radio-op1"
                    name="classic-radio"
                    value="1"
                    className="size-4 cursor-pointer"
                    data-testid="radio-1"
                  />
                  <span>opcion_a</span>
                </label>
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer font-mono text-xs">
                  <input
                    type="radio"
                    id="radio-op2"
                    name="classic-radio"
                    value="2"
                    className="size-4 cursor-pointer"
                    data-testid="radio-2"
                  />
                  <span>opcion_b</span>
                </label>
                <label className="flex items-center gap-3 p-2 rounded-lg cursor-not-allowed opacity-50 font-mono text-xs">
                  <input
                    type="radio"
                    id="radio-disabled"
                    name="classic-radio-disabled"
                    disabled
                    className="size-4"
                    data-testid="radio-disabled"
                  />
                  <span>deshabilitada</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Form */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Database className="size-4" />
              <CardTitle className="text-sm font-medium font-mono">submit_form()</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="classic-form">
              <div className="grid gap-2">
                <label
                  htmlFor="form-email"
                  className="text-xs font-medium font-mono text-muted-foreground"
                >
                  {/* Correo electronico * */}
                </label>
                <Input
                  id="form-email"
                  name="email"
                  type="email"
                  required
                  placeholder="usuario@dominio.com"
                  data-testid="form-email"
                  className={cn(
                    'h-10 font-mono text-sm',
                    errors.email && 'border-destructive focus-visible:ring-destructive'
                  )}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-xs text-destructive font-mono flex items-center gap-1.5"
                    role="alert"
                  >
                    <AlertCircle className="size-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="form-select"
                  className="text-xs font-medium font-mono text-muted-foreground"
                >
                  {/* Selector de opciones * */}
                </label>
                <Select required name="select">
                  <SelectTrigger
                    id="form-select"
                    className="h-10 font-mono text-xs"
                    data-testid="form-select"
                  >
                    <SelectValue placeholder="seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="opt1" className="font-mono">
                      opcion_a
                    </SelectItem>
                    <SelectItem value="opt2" className="font-mono">
                      opcion_b
                    </SelectItem>
                    <SelectItem value="opt3" className="font-mono">
                      opcion_c
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="form-terms"
                  required
                  className="size-4 mt-0.5 cursor-pointer"
                  data-testid="form-terms"
                />
                <label
                  htmlFor="form-terms"
                  className="text-xs font-mono text-muted-foreground leading-relaxed cursor-pointer"
                >
                  acepto terminos y condiciones *
                </label>
              </div>

              <Separator className="my-4" />

              {formStatus === 'success' && (
                <div
                  className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 mb-4 font-mono text-xs"
                  role="status"
                >
                  <CheckCircle2 className="size-4 shrink-0" />
                  <span>formulario_enviado_correctamente</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div
                  className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive mb-4 font-mono text-xs"
                  role="alert"
                >
                  <AlertCircle className="size-4 shrink-0" />
                  <span>error_en_validacion</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  data-testid="submit-btn"
                  className="h-10 font-mono text-xs gap-2"
                  disabled={formStatus === 'loading'}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      procesando...
                    </>
                  ) : (
                    <>
                      <Terminal className="size-3.5" />
                      ejecutar_submit()
                    </>
                  )}
                </Button>
                <Button
                  type="reset"
                  variant="outline"
                  data-testid="reset-btn"
                  className="h-10 font-mono text-xs"
                  onClick={handleReset}
                  disabled={formStatus === 'loading'}
                >
                  limpiar_formulario()
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
