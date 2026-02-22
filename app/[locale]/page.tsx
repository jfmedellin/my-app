import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Pricing from "./sections/Pricing";
import Testimonials from "./sections/Testimonials";
import About from "./sections/About";
import CTA from "./sections/CTA";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Navbar from "./components/Navbar";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <>
      <Navbar t={messages.nav} locale={locale} />
      <main>
        <Hero t={messages.hero} />
        <Features t={messages.features} />
        <Pricing t={messages.pricing} />
        <Testimonials t={messages.testimonials} />
        <About t={messages.about} />
        <CTA t={messages.cta} />
        <Contact t={messages.contact} />
      </main>
      <Footer t={messages.footer} />
    </>
  );
}
