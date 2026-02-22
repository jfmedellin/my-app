import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AuthPage({ params }: PageProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <>
      <Navbar t={messages.nav} locale={locale} />
      <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthForm t={messages.Auth.login} />
      </main>
    </>
  );
}