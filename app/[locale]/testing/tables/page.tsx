'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Database,
  Terminal,
  AlertTriangle,
} from 'lucide-react';

// Mock Data
const INITIAL_DATA = Array.from({ length: 25 }, (_, i) => ({
  id: 1000 + i,
  name: `Usuario de Prueba ${i + 1}`,
  email: `tester${i + 1}@qa-sandbox.com`,
  role: i % 3 === 0 ? 'admin' : i % 2 === 0 ? 'editor' : 'user',
  status: i % 5 === 0 ? 'inactive' : 'active',
}));

type SortKey = 'id' | 'name' | 'email' | 'role' | 'status';

const roleConfig = {
  admin: {
    label: 'Admin',
    className: 'bg-primary/10 text-primary border-primary/30 font-mono text-[10px]',
  },
  editor: {
    label: 'Editor',
    className:
      'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800 font-mono text-[10px]',
  },
  user: {
    label: 'User',
    className: 'bg-muted/60 text-muted-foreground border-border font-mono text-[10px]',
  },
};

const statusConfig = {
  active: {
    label: 'Activo',
    className:
      'bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800 font-mono text-[10px]',
  },
  inactive: {
    label: 'Inactivo',
    className:
      'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-500 dark:border-zinc-700 font-mono text-[10px]',
  },
};

function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getAvatarColor(name: string): string {
  if (!name) return 'bg-muted';
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-indigo-500',
    'bg-rose-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function TablesPage() {
  const [data] = useState(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrado
  const filteredData = useMemo(() => {
    return data.filter(item =>
      Object.values(item).some(val => val.toString().toLowerCase().includes(search.toLowerCase()))
    );
  }, [data, search]);

  // Ordenamiento
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Paginación
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ChevronDown className="w-4 h-4 opacity-20" />;
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Database className="size-4 text-muted-foreground/70" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Tablas y Datos
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight font-mono">
            <span className="text-primary">&gt;</span> Directorio de Usuarios
          </h1>
          <p className="text-muted-foreground mt-1 font-mono text-sm">{/* {filteredData.length} registros encontrados en la base de datos */}</p>
        </div>
      </div>

      {/* Demo Data Indicator */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50">
        <AlertTriangle className="size-4 text-amber-600 dark:text-amber-500" />
        <p className="text-xs font-mono text-amber-800 dark:text-amber-400">{/* Datos de prueba - Demo Data Only */}</p>
      </div>

      <Card className="border-dashed">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium font-mono flex items-center gap-2">
              <Database className="size-4" />
              Tabla: users
            </CardTitle>
            <span className="text-xs font-mono text-muted-foreground">
              {paginatedData.length} de {filteredData.length} resultados
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {/* Barra de Herramientas */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="buscar(nombre, email, rol)..."
                className="pl-9 font-mono text-sm h-9"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                data-testid="table-search-input"
              />
            </div>

            <div
              className="text-sm text-muted-foreground font-mono text-xs"
              data-testid="table-summary"
            >
              {currentPage} / {totalPages || 1}
            </div>
          </div>

          {/* Tabla */}
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm text-left" data-testid="data-table">
              <thead className="bg-muted/50 border-b">
                <tr>
                  {(['id', 'name', 'email', 'role', 'status'] as SortKey[]).map(key => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="px-4 py-3 font-medium cursor-pointer hover:bg-muted/80 transition-colors select-none font-mono text-xs"
                      data-testid={`col-header-${key}`}
                    >
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{key === 'id' ? 'ID' : key}</span>
                        <SortIcon column={key} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => {
                    const role = roleConfig[row.role as keyof typeof roleConfig] || roleConfig.user;
                    const status =
                      statusConfig[row.status as keyof typeof statusConfig] ||
                      statusConfig.inactive;

                    return (
                      <tr
                        key={row.id}
                        className="group relative border-b last:border-0 hover:bg-muted/20 transition-colors font-mono text-xs"
                        data-testid={`row-${row.id}`}
                      >
                        <td className="px-4 py-3 text-muted-foreground">{row.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold text-white ${getAvatarColor(row.name)}`}
                            >
                              {getInitials(row.name)}
                            </div>
                            <span>{row.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{row.email}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border ${role.className}`}
                          >
                            {role.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-muted-foreground font-mono text-sm"
                    >{/* Sin resultados para &quot;{search}&quot; */}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground font-mono text-xs">{/* página {currentPage} de {totalPages || 1} */}</div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                data-testid="pagination-prev"
                className="font-mono text-xs gap-1.5"
              >
                <ChevronLeft className="size-3" />
                anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                data-testid="pagination-next"
                className="font-mono text-xs gap-1.5"
              >
                siguiente
                <ChevronRight className="size-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
