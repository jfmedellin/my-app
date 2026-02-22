"use client";

import { ReactNode } from "react";
import { Providers } from "./components/Providers";

interface ProvidersClientProps {
  children: ReactNode;
}

export default function ProvidersClient({ children }: ProvidersClientProps) {
  return <Providers>{children}</Providers>;
}
