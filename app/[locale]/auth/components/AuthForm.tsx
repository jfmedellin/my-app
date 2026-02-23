"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { authenticate } from "@/lib/actions/auth";

interface AuthFormProps {
  t: {
    title: string;
    description: string;
    email: string;
    password: string;
    confirmPassword: string;
    forgotPassword: string;
    login: string;
    signup: string;
    haveAccount: string;
    dontHaveAccount: string;
  };
}

export default function AuthForm({ t }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [error, action, isPending] = useActionState(authenticate, undefined);
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/");
    router.refresh();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
        <CardDescription className="text-center">
          {t.description}
        </CardDescription>
      </CardHeader>
      {isLogin ? (
        <form action={async (formData) => {
          const result = await action(formData);
          if (result === undefined) {
            handleSuccess();
          }
        }}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">{t.email}</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder={t.email}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t.password}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : t.login}
            </Button>
            <div className="text-center text-sm">
              <Button
                variant="link"
                onClick={() => setIsLogin(false)}
                className="text-muted-foreground"
                type="button"
              >
                {t.dontHaveAccount}
              </Button>
            </div>
            <div className="text-center text-sm">
              <Button
                variant="link"
                className="text-muted-foreground"
                type="button"
              >
                {t.forgotPassword}
              </Button>
            </div>
          </CardFooter>
        </form>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault();
          setSignupError("Sign up is not configured in this demo.");
        }}>
          <CardContent className="space-y-4">
            {signupError && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                {signupError}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="signup-email">{t.email}</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder={t.email}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">{t.password}</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder={t.password}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t.confirmPassword}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled>
              {t.signup}
            </Button>
            <div className="text-center text-sm">
              <Button
                variant="link"
                onClick={() => setIsLogin(true)}
                className="text-muted-foreground"
                type="button"
              >
                {t.haveAccount}
              </Button>
            </div>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
ö