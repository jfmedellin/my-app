"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, CalendarRange, CalendarClock, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, addMonths, subMonths } from "date-fns";
import { es, enUS } from "date-fns/locale";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function CalendarTestingPage({ params }: PageProps) {
  const resolvedParams = params as unknown as { locale: string };
  const locale = resolvedParams?.locale || "es";
  const dateLocale = locale === "es" ? es : enUS;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [manualDate, setManualDate] = useState("");
  const [multiDates, setMultiDates] = useState<Date[]>([new Date()]);
  const [weekNumber, setWeekNumber] = useState<number>(1);

  const getWeekDates = (weekNum: number, year: number) => {
    const jan1 = new Date(year, 0, 1);
    const days = (weekNum - 1) * 7;
    const firstDay = addDays(jan1, days);
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(addDays(firstDay, i));
    }
    return weekDates;
  };

  const handleManualDateSubmit = () => {
    const parsed = new Date(manualDate);
    if (!Number.isNaN(parsed.getTime())) {
      setSelectedDate(parsed);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Testing de Calendarios</h1>
        <p className="text-muted-foreground">
          Módulos de práctica para pruebas de automatización con diferentes tipos de calendarios.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              Date Picker Básico
            </CardTitle>
            <CardDescription>Selecciona una fecha del calendario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="date-picker-basic"
                >
                  {selectedDate ? format(selectedDate, "PPP", { locale: dateLocale }) : "Selecciona una fecha"}
                  <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={dateLocale}
                />
              </PopoverContent>
            </Popover>
            <div className="text-sm text-muted-foreground">
              Fecha seleccionada: <span className="font-mono text-foreground">{selectedDate?.toISOString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarRange className="w-5 h-5 text-primary" />
              Date Range Picker
            </CardTitle>
            <CardDescription>Selecciona un rango de fechas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="date-range"
                >
                  {dateRange.from ? (
                    dateRange.to ? (
                      `${format(dateRange.from, "PPP", { locale: dateLocale })} - ${format(dateRange.to, "PPP", { locale: dateLocale })}`
                    ) : (
                      format(dateRange.from, "PPP", { locale: dateLocale })
                    )
                  ) : (
                    "Selecciona un rango"
                  )}
                  <CalendarRange className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                  locale={dateLocale}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <div className="text-sm text-muted-foreground">
              Desde: <span className="font-mono text-foreground">{dateRange.from?.toISOString()}</span>
              <br />
              Hasta: <span className="font-mono text-foreground">{dateRange.to?.toISOString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              Month Picker
            </CardTitle>
            <CardDescription>Selecciona un mes específico</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center font-medium" id="month-picker">
                {format(currentMonth, "MMMM yyyy", { locale: dateLocale })}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Calendar
              mode="single"
              selected={selectedMonth}
              onSelect={(date) => date && setSelectedMonth(date)}
              locale={dateLocale}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
            />
            <div className="text-sm text-muted-foreground">
              Mes seleccionado: <span className="font-mono text-foreground">{format(selectedMonth, "MMMM yyyy", { locale: dateLocale })}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-primary" />
              Entrada Manual de Fecha
            </CardTitle>
            <CardDescription>Escribe una fecha en formato ISO</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="YYYY-MM-DD"
                value={manualDate}
                onChange={(e) => setManualDate(e.target.value)}
                id="manual-date-input"
              />
              <Button onClick={handleManualDateSubmit}>Validar</Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Formato válido: YYYY-MM-DD (ej: 2024-12-25)
            </div>
            {selectedDate && (
              <div className="text-sm">
                Fecha procesada: <span className="font-mono text-foreground">{selectedDate.toISOString()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              Múltiples Fechas
            </CardTitle>
            <CardDescription>Selecciona múltiples fechas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="multi-dates"
                >
                  {multiDates.length} fecha(s) seleccionada(s)
                  <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="multiple"
                  selected={multiDates}
                  onSelect={(dates) => dates && setMultiDates(dates)}
                  locale={dateLocale}
                />
              </PopoverContent>
            </Popover>
            <div className="text-sm text-muted-foreground">
              Fechas seleccionadas:
              <ul className="mt-1 space-y-1">
                {multiDates.map((date, i) => (
                  <li key={i} className="font-mono text-foreground">
                    {format(date, "PPP", { locale: dateLocale })}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              Week Picker
            </CardTitle>
            <CardDescription>Selecciona una semana del año</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="week-year">Año</Label>
                <Select
                  value={new Date().getFullYear().toString()}
                  onValueChange={() => setWeekNumber(1)}
                >
                  <SelectTrigger id="week-year">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2023, 2024, 2025, 2026].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="week-number">Semana</Label>
                <Select value={weekNumber.toString()} onValueChange={(value: string) => setWeekNumber(parseInt(value))}>
                  <SelectTrigger id="week-number">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 52 }, (_, i) => i + 1).map((week) => (
                      <SelectItem key={week} value={week.toString()}>
                        Semana {week}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Fechas de la semana:</p>
              <div className="flex flex-wrap gap-1">
                {getWeekDates(weekNumber, new Date().getFullYear()).map((date, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono bg-background px-2 py-1 rounded"
                  >
                    {format(date, "dd/MM")}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notas para Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Los elementos tienen <code className="bg-muted px-1 rounded">id</code> para selección con Playwright/Cypress</li>
            <li>Los botones de navegación entre meses pueden requerir espera explícita</li>
            <li>Las fechas seleccionadas pueden requerir validación de estado</li>
            <li>Probar navegación con teclado (arrow keys, Enter, Escape)</li>
            <li>Verificar que el calendario sea accesible con lectores de pantalla</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
