'use client';

import useSWR from 'swr';
import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersModal } from '@/components/users/UsersModal';
import { UserCard, UsersEmpty } from '@/components/users/UserCard';
import { UsersHeader, UsersStats } from '@/components/users/UsersHeader';
import { Loader2, Database, AlertTriangle } from 'lucide-react';
import { deleteUser, getUsers, User } from '@/lib/actions/users';
import { toast } from 'sonner';

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    data: users = [],
    isLoading,
    mutate,
  } = useSWR<User[]>('users', getUsers, {
    revalidateOnFocus: false,
  });

  const handleOpenCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      try {
        await deleteUser(id);
        mutate(currentUsers => currentUsers?.filter(u => u.id !== id) ?? [], false);
        toast.success('Usuario eliminado correctamente');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Error al eliminar usuario');
      }
    });
  };

  const handleSuccess = () => {
    mutate();
    toast.success(selectedUser ? 'Usuario actualizado' : 'Usuario creado');
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <UsersHeader userCount={0} onCreateUser={handleOpenCreate} />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <UsersHeader userCount={users.length} onCreateUser={handleOpenCreate} />

      {/* Demo Data Indicator */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50">
        <AlertTriangle className="size-4 text-amber-600 dark:text-amber-500" />
        <p className="text-xs font-mono text-amber-800 dark:text-amber-400">
          Datos de prueba - Demo Data Only
        </p>
      </div>

      {users.length > 0 && <UsersStats users={users} />}

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="size-4 text-muted-foreground" />
              Lista de usuarios
            </CardTitle>
            <span className="text-xs text-muted-foreground">{users.length} total</span>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          {users.length === 0 ? (
            <UsersEmpty onCreate={handleOpenCreate} />
          ) : (
            <div className="space-y-1.5">
              {users.map(user => (
                <UserCard
                  key={user.id}
                  name={user.name}
                  email={user.email}
                  role={user.role}
                  onEdit={() => handleOpenEdit(user)}
                  onDelete={() => handleDelete(user.id)}
                  isDeleting={isPending}
                />
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
  );
}
