import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UsersHeaderProps {
  userCount: number;
  onCreateUser: () => void;
}

export function UsersHeader({ userCount, onCreateUser }: UsersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Users className="size-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Gestión de Usuarios
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Usuarios del Sistema</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {userCount === 0
            ? 'No hay usuarios registrados'
            : `${userCount} usuario${userCount === 1 ? '' : 's'} registrado${userCount === 1 ? '' : 's'}`}
        </p>
      </div>
      <Button onClick={onCreateUser} className="gap-2">
        <Plus className="size-4" />
        Nuevo Usuario
      </Button>
    </div>
  );
}

export function UsersStats({ users }: { users: { role: string }[] }) {
  const stats = {
    admin: users.filter(u => u.role === 'admin').length,
    editor: users.filter(u => u.role === 'editor').length,
    user: users.filter(u => u.role === 'user').length,
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="p-3 rounded-md border border-border/60 bg-card">
        <p className="text-xl font-semibold text-primary">{stats.admin}</p>
        <p className="text-xs text-muted-foreground mt-0.5">Administradores</p>
      </div>
      <div className="p-3 rounded-md border border-border/60 bg-card">
        <p className="text-xl font-semibold text-amber-600 dark:text-amber-400">{stats.editor}</p>
        <p className="text-xs text-muted-foreground mt-0.5">Editores</p>
      </div>
      <div className="p-3 rounded-md border border-border/60 bg-card">
        <p className="text-xl font-semibold">{stats.user}</p>
        <p className="text-xs text-muted-foreground mt-0.5">Usuarios</p>
      </div>
    </div>
  );
}
