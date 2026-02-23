"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UsersModal } from "@/components/users/UsersModal"
import { UserPlus } from "lucide-react"

interface User {
  id?: number
  email: string
  name: string
  role: string
}

export default function UsersModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([
    { id: 1, email: "admin@ejemplo.com", name: "Admin Principal", role: "admin" },
    { id: 2, email: "editor@ejemplo.com", name: "Editor Demo", role: "editor" },
  ])

  const handleOpenCreate = () => {
    setSelectedUser(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleSubmit = (userData: User) => {
    console.log("Datos del usuario:", userData)
    if (userData.id) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userData.id ? userData : u))
      )
    } else {
      const newUser = { ...userData, id: Date.now() }
      setUsers((prev) => [...prev, newUser])
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <p className="text-muted-foreground mt-2">
          Modal para crear y editar usuarios en la base de datos.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="size-5" />
            Usuarios
          </CardTitle>
          <CardDescription>
            Lista de usuarios. Haz clic en &quot;Editar&quot; para modificar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleOpenCreate}>
            <UserPlus className="size-4" />
            Nuevo Usuario
          </Button>

          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{user.name}</p>
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
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <UsersModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        user={selectedUser}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
