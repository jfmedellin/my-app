"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Globe } from "lucide-react";

interface AboutProps {
  t: {
    title: string;
    subtitle: string;
    mission: {
      title: string;
      description: string;
    };
    values: {
      innovation: string;
      collaboration: string;
      excellence: string;
      customer: string;
    };
    stats: {
      team: string;
      years: string;
      customers: string;
      countries: string;
    };
    team: Array<{
      name: string;
      role: string;
      image: string;
    }>;
  };
}

export default function About({ t }: AboutProps) {
  const stats = [
    { icon: Users, label: t.stats.team, value: "150+" },
    { icon: Target, label: t.stats.years, value: "10+" },
    { icon: Award, label: t.stats.customers, value: "10k+" },
    { icon: Globe, label: t.stats.countries, value: "50+" },
  ];

  return (
    <div className="space-y-20">
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
                {t.title}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t.subtitle}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t.mission.description}
              </p>
              <div className="h-16 w-full bg-muted/50 rounded-2xl flex items-center gap-4 px-6">
                <Users className="h-8 w-8 text-primary" />
                <span className="font-semibold text-foreground">Juntos construimos el futuro del trabajo</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 bg-card rounded-2xl border border-border/50 p-6 hover:shadow-lg transition-all hover:-translate-y-2">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{t.values.collaboration}</h3>
                    <p className="text-sm text-muted-foreground">Trabajamos juntos para lograr lo imposible</p>
                  </div>
                  <div className="h-48 bg-card rounded-2xl border border-border/50 p-6 hover:shadow-lg transition-all hover:-translate-y-2">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">{t.values.excellence}</h3>
                    <p className="text-sm text-muted-foreground">Buscamos la excelencia en todo lo que hacemos</p>
                  </div>
                </div>
                <div className="space-y-4 pt-24">
                  <div className="h-48 bg-card rounded-2xl border border-border/50 p-6 hover:shadow-lg transition-all hover:-translate-y-2">
                    <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="font-semibold mb-2">{t.values.innovation}</h3>
                    <p className="text-sm text-muted-foreground">Innovamos para stay ahead of the curve</p>
                  </div>
                  <div className="h-48 bg-card rounded-2xl border border-border/50 p-6 hover:shadow-lg transition-all hover:-translate-y-2">
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                      <Globe className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="font-semibold mb-2">{t.values.customer}</h3>
                    <p className="text-sm text-muted-foreground">El cliente es nuestro prioritario</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Nuestros Números</h2>
            <p className="text-muted-foreground">Los resultados hablan por sí mismos</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all"
              >
                <div className="h-12 w-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Nuestro Equipo</h2>
            <p className="text-muted-foreground">Las personas detrás deWorkFlow</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <Card className="overflow-hidden border-0 hover:shadow-xl transition-all">
                  <CardContent className="p-0">
                    <div className="h-64 w-full bg-muted relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
