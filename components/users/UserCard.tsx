import { User, Mail, Shield, ShieldAlert, ShieldCheck, Terminal, Trash2 } from 'lucide-react';
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
    className: 'bg-primary/10 text-primary border-primary/30 font-mono text-[10px]',
  },
  editor: {
    label: 'Editor',
    icon: ShieldCheck,
    className:
      'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800 font-mono text-[10px]',
  },
  user: {
    label: 'User',
    icon: Shield,
    className: 'bg-muted/60 text-muted-foreground border-border font-mono text-[10px]',
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
    <div className="group relative flex items-center gap-4 p-4 rounded-lg border border-border/40 bg-card transition-all duration-200 hover:border-border hover:bg-muted/20">
      {/* Avatar */}
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-xs font-bold text-white font-mono',
          getAvatarColor(name)
        )}
      >
        {getInitials(name)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold font-mono text-sm truncate">{name || 'Sin nombre'}</p>
          <span
            className={cn(
              'inline-flex items-center gap-1 px-1.5 py-0.5 rounded border',
              config.className
            )}
          >
            <Icon className="size-3" />
            {config.label}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
          <Mail className="size-3 shrink-0" />
          <span className="truncate">{email}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="h-8 font-mono text-xs gap-1.5"
        >
          <Terminal className="size-3" />
          Editar
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          disabled={isDeleting}
          className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
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

export function UsersEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30">
        <User className="size-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold font-mono">&gt; No hay registros</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-4 font-mono text-xs">{/* Inicializa la tabla de usuarios */}</p>
    </div>
  );
}
