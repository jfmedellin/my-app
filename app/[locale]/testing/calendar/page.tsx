'use client';

import { useState, use } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CalendarDays,
  CalendarRange,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Clock,
  Timer,
} from 'lucide-react';
import { format, addDays, addMonths, subMonths } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function CalendarTestingPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const locale = resolvedParams?.locale || 'es';
  const dateLocale = locale === 'es' ? es : enUS;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [manualDate, setManualDate] = useState('');
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
      {/* Header Pattern */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="size-4 text-muted-foreground/70" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Calendar Testing Module
          </span>
        </div>
        <h1 className="text-2xl font-bold font-mono">
          <span className="text-primary">&gt;</span> Manipulación de Tiempo
        </h1>
        <p className="text-muted-foreground mt-1 font-mono text-sm">
          {/* Módulos de práctica para selección y navegación temporal */}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Date Picker Básico */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">seleccionar_fecha()</CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">
              {/* Selecciona una fecha única del calendario */}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal font-mono text-sm h-10"
                  id="date-picker-basic"
                >
                  {selectedDate
                    ? format(selectedDate, 'PPP', { locale: dateLocale })
                    : 'ninguna_fecha_seleccionada'}
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
            <div className="text-xs text-muted-foreground font-mono">
              <span className="text-primary">&gt;</span> output:{' '}
              {selectedDate?.toISOString() || 'null'}
            </div>
          </CardContent>
        </Card>

        {/* Date Range Picker */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <CalendarRange className="w-4 h-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">
                definir_rango_temporal()
              </CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">
              {/* Define un rango de fechas consecutivo */}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal font-mono text-sm h-10"
                  id="date-range"
                >
                  {dateRange.from
                    ? dateRange.to
                      ? `${format(dateRange.from, 'PPP', { locale: dateLocale })} — ${format(dateRange.to, 'PPP', { locale: dateLocale })}`
                      : format(dateRange.from, 'PPP', { locale: dateLocale })
                    : 'rango_no_definido'}
                  <CalendarRange className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={range => setDateRange({ from: range?.from, to: range?.to })}
                  locale={dateLocale}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <div className="text-xs text-muted-foreground font-mono space-y-1">
              <div>
                <span className="text-primary">desde:</span>{' '}
                {dateRange.from?.toISOString() || 'null'}
              </div>
              <div>
                <span className="text-primary">hasta:</span> {dateRange.to?.toISOString() || 'null'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Month Picker */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">navegar_mes()</CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">
              {/* Navega y selecciona un mes específico */}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center font-medium font-mono text-sm" id="month-picker">
                {format(currentMonth, 'MMMM yyyy', { locale: dateLocale })}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Calendar
              mode="single"
              selected={selectedMonth}
              onSelect={date => date && setSelectedMonth(date)}
              locale={dateLocale}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
            />
            <div className="text-xs text-muted-foreground font-mono">
              <span className="text-primary">&gt;</span> mes_activo:{' '}
              {format(selectedMonth, 'MMMM_yyyy', { locale: dateLocale })}
            </div>
          </CardContent>
        </Card>

        {/* Entrada Manual de Fecha */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">
                entrada_manual_fecha()
              </CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">
              {/* Ingresa fecha en formato ISO directamente */}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="YYYY-MM-DD"
                value={manualDate}
                onChange={e => setManualDate(e.target.value)}
                id="manual-date-input"
                className="h-10 font-mono text-sm"
              />
              <Button onClick={handleManualDateSubmit} className="h-10 font-mono text-xs gap-2">
                <Terminal className="size-3.5" />
                validar()
              </Button>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {/* formato: YYYY-MM-DD (ej: 2024-12-25) */}
            </div>
            {selectedDate && (
              <div className="text-xs font-mono">
                <span className="text-primary">&gt;</span> procesado: {selectedDate.toISOString()}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Múltiples Fechas */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">
                seleccionar_multiples_fechas()
              </CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">
              {/* Selecciona múltiples fechas discontinuas */}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal font-mono text-sm h-10"
                  id="multi-dates"
                >
                  {multiDates.length} fecha(s) en cola
                  <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="multiple"
                  selected={multiDates}
                  onSelect={dates => dates && setMultiDates(dates)}
                  locale={dateLocale}
                />
              </PopoverContent>
            </Popover>
            <div className="text-xs text-muted-foreground font-mono">
              <span className="text-primary">&gt;</span> fechas_en_cola:
              <ul className="mt-1 space-y-0.5">
                {multiDates.map((date, i) => (
                  <li key={i} className="text-foreground">
                    [{i + 1}] {format(date, 'yyyy-MM-dd', { locale: dateLocale })}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Week Picker */}
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-muted-foreground/70" />
              <CardTitle className="text-sm font-medium font-mono">obtener_semana()</CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">
              {/* Obtiene las fechas de una semana específica */}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 space-y-1">
                <span className="text-xs font-mono text-muted-foreground">{/* año */}</span>
                <Select
                  value={new Date().getFullYear().toString()}
                  onValueChange={() => setWeekNumber(1)}
                >
                  <SelectTrigger id="week-year" className="h-10 font-mono text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2023, 2024, 2025, 2026].map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-xs font-mono text-muted-foreground">{/* semana */}</span>
                <Select
                  value={weekNumber.toString()}
                  onValueChange={(value: string) => setWeekNumber(parseInt(value))}
                >
                  <SelectTrigger id="week-number" className="h-10 font-mono text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 52 }, (_, i) => i + 1).map(week => (
                      <SelectItem key={week} value={week.toString()}>
                        {week.toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="p-3 bg-muted/30 border border-border/40 rounded-lg">
              <p className="text-xs font-mono text-muted-foreground mb-2">
                <span className="text-primary">&gt;</span> dias_semana:
              </p>
              <div className="flex flex-wrap gap-1">
                {getWeekDates(weekNumber, new Date().getFullYear()).map((date, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono bg-card border border-border/40 px-2 py-1 rounded"
                  >
                    {format(date, 'dd/MM')}
                  </span>
                ))}
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
          <CardDescription className="font-mono text-xs">
            {/* Consideraciones para automatización de pruebas */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1.5 text-xs font-mono text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>
                Elementos con <code className="bg-muted px-1 rounded">id</code> para selección
                Playwright/Cypress
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>Navegación entre meses puede requerir espera explícita</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>Validar estados de fechas seleccionadas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>Soporte navegación teclado: arrow keys, Enter, Escape</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">[✓]</span>
              <span>Accesibilidad: verificarlectores de pantalla</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
