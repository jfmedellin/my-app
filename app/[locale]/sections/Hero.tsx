"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Zap, Shield, Activity } from "lucide-react";

interface HeroProps {
  t: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      activeUsers: string;
      companies: string;
      rating: string;
    };
  };
}

export default function Hero({ t }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="mb-6 text-sm px-4 py-1.5 bg-accent/80 text-primary border border-primary/20 hover:bg-accent transition-colors cursor-default"
            >
              <Zap className="w-3 h-3 mr-2 fill-current" />
              {t.badge}
            </Badge>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
            >
              {t.title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">
                y más.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {t.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                {t.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 hover:bg-accent/50 hover:border-primary/30 transition-all hover:-translate-y-0.5"
              >
                <Play className="mr-2 h-4 w-4 text-primary" />
                {t.ctaSecondary}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-border/50"
            >
              <p className="text-sm font-medium text-muted-foreground mb-6">
                Confiado por más de
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-foreground">
                    {t.stats.activeUsers}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Usuarios activos
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-foreground">
                    {t.stats.companies}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Empresas
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-foreground">
                    {t.stats.rating}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Calificación
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 bg-card border border-border/50 rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden">
              <div className="h-16 bg-muted/50 border-b border-border/50 px-4 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                </div>
                <div className="ml-4 h-2 flex-1 bg-border/20 rounded-full" />
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-xl text-center space-y-2">
                    <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">124k</div>
                    <div className="text-xs text-muted-foreground">
                      Acciones
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-xl text-center space-y-2">
                    <div className="mx-auto w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-accent" />
                    </div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-xs text-muted-foreground">
                      Seguridad
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-xl text-center space-y-2">
                    <div className="mx-auto w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold">0.2s</div>
                    <div className="text-xs text-muted-foreground">
                      Velocidad
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-1/3 bg-primary/20 rounded" />
                      <div className="h-1.5 w-1/2 bg-border/30 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-75" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-1/4 bg-accent/20 rounded" />
                      <div className="h-1.5 w-1/3 bg-border/30 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-2/3 bg-green-500/20 rounded" />
                      <div className="h-1.5 w-1/2 bg-border/30 rounded" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Progreso del sistema
                    </span>
                    <span className="font-medium text-primary">98.5%</span>
                  </div>
                  <div className="w-full bg-border/30 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-green-500 rounded-full w-[98.5%]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse-slow" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-2xl animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
