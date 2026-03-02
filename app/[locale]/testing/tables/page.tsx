"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// Mock Data
const INITAL_DATA = Array.from({ length: 25 }, (_, i) => ({
    id: 1000 + i,
    name: `Usuario de Prueba ${i + 1}`,
    email: `tester${i + 1}@qa-sandbox.com`,
    role: i % 3 === 0 ? "Admin" : i % 2 === 0 ? "QA" : "Dev",
    status: i % 5 === 0 ? "Inactivo" : "Activo",
}));

type SortKey = "id" | "name" | "email" | "role" | "status";

export default function TablesPage() {
    const [data] = useState(INITAL_DATA);
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("id");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filtrado
    const filteredData = useMemo(() => {
        return data.filter((item) =>
            Object.values(item).some(val =>
                val.toString().toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [data, search]);

    // Ordenamiento
    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
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
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
        setCurrentPage(1); // Reset page on sort
    };

    const SortIcon = ({ column }: { column: SortKey }) => {
        if (sortKey !== column) return <ChevronDown className="w-4 h-4 opacity-20" />;
        return sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Tablas y Datos</h1>
                <p className="text-muted-foreground mt-2">
                    Escenario complejo con tablas de datos dinámicas. Prueba selectores de fila, validación de datos, paginación y ordenamiento.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Directorio de Usuarios</CardTitle>
                    <CardDescription>Tabla interactiva con {data.length} registros simulados.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    {/* Barra de Herramientas */}
                    <div className="flex items-center justify-between">
                        <div className="relative w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre, email o rol..."
                                className="pl-9"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                data-testid="table-search-input"
                            />
                        </div>

                        <div className="text-sm text-muted-foreground" data-testid="table-summary">
                            Mostrando {paginatedData.length} de {filteredData.length} resultados
                        </div>
                    </div>

                    {/* Tabla */}
                    <div className="rounded-md border overflow-hidden">
                        <table className="w-full text-sm text-left" data-testid="data-table">
                            <thead className="bg-muted/50 border-b">
                                <tr>
                                    {(["id", "name", "email", "role", "status"] as SortKey[]).map((key) => (
                                        <th
                                            key={key}
                                            onClick={() => handleSort(key)}
                                            className="px-4 py-3 font-medium cursor-pointer hover:bg-muted/80 transition-colors select-none group"
                                            data-testid={`col-header-${key}`}
                                        >
                                            <div className="flex items-center gap-1">
                                                <span className="capitalize">{key === "id" ? "ID" : key}</span>
                                                <SortIcon column={key} />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((row, index) => (
                                        <tr
                                            key={row.id}
                                            className={`border-b last:border-0 hover:bg-muted/30 transition-colors ${index % 2 === 0 ? "bg-background" : "bg-muted/10"}`}
                                            data-testid={`row-${row.id}`}
                                        >
                                            <td className="px-4 py-3 font-medium">{row.id}</td>
                                            <td className="px-4 py-3">{row.name}</td>
                                            <td className="px-4 py-3">{row.email}</td>
                                            <td className="px-4 py-3">{row.role}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "Activo" ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-700"}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                            No se encontraron resultados para &quot;{search}&quot;
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="text-sm text-muted-foreground">
                            Página {currentPage} de {totalPages || 1}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                data-testid="pagination-prev"
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Anterior
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                data-testid="pagination-next"
                            >
                                Siguiente
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
