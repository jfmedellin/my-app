'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lock,
  Terminal,
  Database,
  AlertTriangle,
} from 'lucide-react';

export default function LoginTestingPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const VALID_USER = process.env.NEXT_PUBLIC_AUTH_TEST_USERNAME || 'qa_tester';
  const VALID_PASS = process.env.NEXT_PUBLIC_AUTH_TEST_PASSWORD || 'password123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);

      if (username === VALID_USER && password === VALID_PASS) {
        setShowSuccessModal(true);
      } else {
        setError('Credenciales inválidas. Acceso denegado.');
      }
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 min-h-[80vh] flex flex-col justify-center px-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="size-4 text-muted-foreground/70" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Autenticación QA
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight font-mono">
          <span className="text-primary">&gt;</span> Login de Pruebas
        </h1>
        <p className="text-muted-foreground mt-1 font-mono text-sm">{/* Simulación de inicio de sesión para testing */}</p>
      </div>

      {/* Demo Data Indicator */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50">
        <AlertTriangle className="size-4 text-amber-600 dark:text-amber-500" />
        <p className="text-xs font-mono text-amber-800 dark:text-amber-400">{/* Credenciales de prueba - Demo Only */}</p>
      </div>

      <Card className="border-dashed">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Database className="size-4" />
            <CardTitle className="text-sm font-medium font-mono">auth_prompt()</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} data-testid="login-form" className="space-y-4">
            {/* Error Message */}
            <div
              role="alert"
              aria-live="polite"
              className={`p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-xs font-mono flex items-start gap-2 transition-all duration-200 ${
                error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 hidden'
              }`}
              data-testid="login-error-message"
            >
              <AlertCircle className="size-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{error || 'Error placeholder'}</span>
            </div>

            {/* Username Input */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-xs font-medium font-mono text-muted-foreground"
              >{/* Ingresa tu usuario */}</label>
              <div className="relative">
                <Input
                  id="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="qa_tester"
                  className="pl-9 h-10 font-mono text-sm"
                  required
                  data-testid="login-username-input"
                  disabled={isLoading}
                  autoComplete="username"
                />
                <UserIcon
                  className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
              </div>
              <p className="text-[10px] text-muted-foreground font-mono" data-testid="qa-hint-user">
                usuario: <code className="text-primary">{VALID_USER}</code>
              </p>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-medium font-mono text-muted-foreground"
              >{/* Ingresa tu contraseña */}</label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 h-10 font-mono text-sm"
                  required
                  data-testid="login-password-input"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <Lock
                  className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
              </div>
              <p className="text-[10px] text-muted-foreground font-mono" data-testid="qa-hint-pass">
                contraseña: <code className="text-primary">{VALID_PASS}</code>
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-10 font-mono text-sm gap-2"
              disabled={isLoading}
              data-testid="login-submit-btn"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  autenticando...
                </>
              ) : (
                <>
                  <Terminal className="size-4" />
                  login()
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          data-testid="login-success-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
          onClick={() => {
            setShowSuccessModal(false);
            setUsername('');
            setPassword('');
          }}
        >
          <div
            className="bg-background w-full max-w-sm p-6 rounded-lg border border-dashed shadow-lg"
            data-testid="login-success-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="size-8 text-green-500" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h2 id="success-title" className="text-xl font-bold font-mono">
                  <span className="text-green-500">&gt;</span> Acceso Concedido
                </h2>
                <p className="text-muted-foreground text-xs font-mono">
                  {/* Autenticación exitosa */}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full h-10 font-mono text-sm gap-2"
                onClick={() => {
                  setShowSuccessModal(false);
                  setUsername('');
                  setPassword('');
                }}
                data-testid="login-success-close-btn"
              >
                <Terminal className="size-4" />
                cerrar_sesion()
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UserIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
