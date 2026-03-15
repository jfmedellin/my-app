import { User, Mail, Shield, ShieldAlert, ShieldCheck, Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UserCardProps {
  name: string;
  email: string;
  role: string;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

const roleConfig = {
  admin: {
    label: 'Admin',
    icon: ShieldAlert,
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  editor: {
    label: 'Editor',
    icon: ShieldCheck,
    className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  },
  user: {
    label: 'Usuario',
    icon: Shield,
    className: 'bg-muted text-muted-foreground border-border',
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

export function UserCard({ name, email, role, onEdit, onDelete, isDeleting }: UserCardProps) {
  const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.user;
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card hover:border-border hover:bg-muted/30 transition-colors">
      {/* Avatar */}
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white',
          getAvatarColor(name)
        )}
      >
        {getInitials(name)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm truncate">{name || 'Sin nombre'}</p>
          <span
            className={cn(
              'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs border',
              config.className
            )}
          >
            <Icon className="size-3" />
            {config.label}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Mail className="size-3.5 shrink-0" />
          <span className="truncate">{email}</span>
        </div>
      </div>

      {/* Actions - siempre visibles */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
          <Pencil className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          disabled={isDeleting}
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          {isDeleting ? (
            <span className="size-4 animate-spin border-2 border-destructive border-t-transparent rounded-full" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

export function UsersEmpty({ onCreate }: { onCreate?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <User className="size-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-medium">No hay usuarios</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-xs">
        Comienza creando el primer usuario para probar las funcionalidades de gestión
      </p>
      {onCreate && (
        <Button onClick={onCreate} variant="outline" size="sm" className="gap-2">
          <Plus className="size-4" />
          Crear usuario
        </Button>
      )}
    </div>
  );
}
