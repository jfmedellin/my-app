"use client"

import useSWR from "swr"
import { useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UsersModal } from "@/components/users/UsersModal"
import { UserPlus, Trash2, Loader2 } from "lucide-react"
import { deleteUser, getUsers, User } from "@/lib/actions/users"

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isPending, startTransition] = useTransition()

  const { data: users = [], isLoading, mutate } = useSWR<User[]>("users", getUsers, {
    revalidateOnFocus: false,
  })

  const handleOpenCreate = () => {
    setSelectedUser(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return
    
    startTransition(async () => {
      try {
        await deleteUser(id)
        mutate(
          (currentUsers) => currentUsers?.filter((u) => u.id !== id) ?? [],
          false
        )
      } catch (error) {
        console.error("Error deleting user:", error)
        alert("Error al eliminar usuario")
      }
    })
  }

  const handleSuccess = () => {
    mutate()
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted-foreground mt-2">
            CRUD de usuarios con Supabase.
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <p className="text-muted-foreground mt-2">
          CRUD de usuarios con Supabase.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="size-5" />
            Usuarios
          </CardTitle>
          <CardDescription>
            Lista de usuarios desde Supabase. Haz clic en &quot;Editar&quot; para modificar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleOpenCreate}>
            <UserPlus className="size-4" />
            Nuevo Usuario
          </Button>

          {users.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No hay usuarios. Crea el primero.
            </p>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{user.name || "Sin nombre"}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-secondary rounded">
                      {user.role}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEdit(user)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(user.id)}
                      disabled={isPending}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      {isPending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <UsersModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        user={selectedUser}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
