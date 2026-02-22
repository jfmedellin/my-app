"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          username: email.trim(),
          password: password.trim(),
        });

        if (result?.error) {
          setError("Invalid credentials");
        } else {
          router.push("/");
          router.refresh();
        }
      } else {
        setError("Sign up is not configured in this demo.");
      }
    } catch (err) {
      setError("An error occurred during authentication.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
        <CardDescription className="text-center">
          {t.description}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t.password}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t.confirmPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : isLogin ? t.login : t.signup}
          </Button>
          <div className="text-center text-sm">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-muted-foreground"
            >
              {isLogin
                ? t.dontHaveAccount
                : t.haveAccount}
            </Button>
          </div>
          {isLogin && (
            <div className="text-center text-sm">
              <Button
                variant="link"
                className="text-muted-foreground"
              >
                {t.forgotPassword}
              </Button>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}