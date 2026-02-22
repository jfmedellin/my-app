"use client";

import AuthForm from "@/app/[locale]/auth/components/AuthForm";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("Auth.login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <AuthForm t={{
        title: t("title"),
        description: t("description"),
        email: t("email"),
        password: t("password"),
        confirmPassword: t("confirmPassword"),
        forgotPassword: t("forgotPassword"),
        login: t("login"),
        signup: t("signup"),
        haveAccount: t("haveAccount"),
        dontHaveAccount: t("dontHaveAccount")
      }} />
    </div>
  );
}