import { UserPlus, Users, Search, Database, Code2, Terminal } from 'lucide-react';
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
          <Database className="size-4 text-muted-foreground/70" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Usuarios
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight font-mono">
          <span className="text-primary">&gt;</span> Gestor de Usuarios
        </h1>
        <p className="text-muted-foreground mt-1 font-mono text-sm">
          {userCount === 0
            ? '// Sin registros en la base de datos'
            : `// ${userCount} usuario${userCount === 1 ? '' : 's'} cargado${userCount === 1 ? '' : 's'}`}
        </p>
      </div>
      <Button onClick={onCreateUser} className="gap-2 font-mono text-sm">
        <Terminal className="size-4" />
        nuevo_usuario()
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
      <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 shadow-[inset_0_-1px_0_0_var(--primary)]">
        <p className="text-2xl font-bold font-mono">{String(stats.admin).padStart(2, '0')}</p>
        <p className="text-xs text-muted-foreground font-medium font-mono uppercase tracking-wider">
          Admin
        </p>
      </div>
      <div className="p-4 rounded-lg border border-amber-300/30 bg-amber-50/50 dark:border-amber-700/30 dark:bg-amber-950/30">
        <p className="text-2xl font-bold font-mono text-amber-700 dark:text-amber-400">
          {String(stats.editor).padStart(2, '0')}
        </p>
        <p className="text-xs text-muted-foreground font-medium font-mono uppercase tracking-wider">
          Editores
        </p>
      </div>
      <div className="p-4 rounded-lg border bg-muted/30">
        <p className="text-2xl font-bold font-mono">{String(stats.user).padStart(2, '0')}</p>
        <p className="text-xs text-muted-foreground font-medium font-mono uppercase tracking-wider">
          Usuarios
        </p>
      </div>
    </div>
  );
}
