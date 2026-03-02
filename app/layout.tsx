import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transforma tu forma de trabajar",
  description: "La plataforma todo-en-uno para equipos modernos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
