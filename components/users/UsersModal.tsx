'use client';

import * as React from 'react';
import { User, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { createUser, updateUser } from '@/lib/actions/users';

interface UserFormData {
  id?: number;
  email: string;
  name: string;
  role: string;
}

interface UsersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: UserFormData | null;
  onSuccess: () => void;
}

const roleOptions = [
  { value: 'user', label: 'Usuario', icon: Shield, description: 'Acceso básico' },
  { value: 'editor', label: 'Editor', icon: ShieldCheck, description: ' Puede editar contenido' },
  { value: 'admin', label: 'Administrador', icon: ShieldAlert, description: 'Acceso completo' },
];

export function UsersModal({ open, onOpenChange, user, onSuccess }: UsersModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<UserFormData>({
    email: '',
    name: '',
    role: 'user',
  });

  const isEditing = !!user?.id;

  React.useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } else {
      setFormData({ email: '', name: '', role: 'user' });
    }
    setError(null);
  }, [user, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (isEditing && user?.id) {
        await updateUser(user.id, {
          email: formData.email,
          name: formData.name,
          role: formData.role,
        });
      } else {
        await createUser({
          email: formData.email,
          name: formData.name,
          role: formData.role,
        });
      }
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <User className="size-4 text-primary" />
            </div>
            {isEditing ? 'Editar usuario' : 'Crear usuario'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica los datos del usuario. Los cambios se guardarán al hacer clic en Guardar.'
              : 'Completa los datos para crear un nuevo usuario en el sistema.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
              {error}
            </div>
          )}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                disabled={isLoading}
                className="h-10"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium leading-none">
                Nombre completo
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={isLoading}
                className="h-10"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="role" className="text-sm font-medium leading-none">
                Rol del usuario
              </label>
              <Select
                value={formData.role}
                onValueChange={value => setFormData(prev => ({ ...prev, role: value }))}
                disabled={isLoading}
              >
                <SelectTrigger id="role" className="h-10">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map(role => {
                    const Icon = role.icon;
                    return (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="size-4" />
                          <span>{role.label}</span>
                          <span className="text-muted-foreground text-xs ml-auto">
                            {role.description}
                          </span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="h-10"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="h-10">
              {isLoading ? (
                <>
                  <span className="size-4 animate-spin border-2 border-current border-t-transparent rounded-full mr-2" />
                  Guardando...
                </>
              ) : isEditing ? (
                'Guardar cambios'
              ) : (
                'Crear usuario'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
