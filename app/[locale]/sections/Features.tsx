"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BarChart3, Shield, Puzzle } from "lucide-react";

interface FeaturesProps {
  t: {
    title: string;
    subtitle: string;
    items?: {
      collaboration: { title: string; description: string };
      analytics: { title: string; description: string };
      security: { title: string; description: string };
      integration: { title: string; description: string };
    };
  };
}

const features = [
  {
    key: "collaboration" as const,
    icon: Users,
  },
  {
    key: "analytics" as const,
    icon: BarChart3,
  },
  {
    key: "security" as const,
    icon: Shield,
  },
  {
    key: "integration" as const,
    icon: Puzzle,
  },
];

export default function Features({ t }: FeaturesProps) {
  // Provide default items if they don't exist
  const items = t.items || {
    collaboration: { title: "Collaboration", description: "Work together seamlessly with your team members." },
    analytics: { title: "Analytics", description: "Gain insights with powerful analytics tools." },
    security: { title: "Security", description: "Enterprise-grade security for your data." },
    integration: { title: "Integration", description: "Connect with your favorite tools and services." }
  };

  return (
    <section className="py-20 md:py-32 bg-muted/50 relative overflow-hidden" id="features">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/10 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const item = items[feature.key];
            
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 relative">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
