"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialsProps {
  t: {
    title: string;
    subtitle: string;
    items?: Array<{
      quote: string;
      author: string;
      role: string;
      company: string;
      avatar: string;
    }>;
  };
}

export default function Testimonials({ t }: TestimonialsProps) {
  return (
    <section
      className="py-20 md:py-32 bg-muted/50 relative overflow-hidden"
      id="testimonials"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMTAgMEg0MHYzMEwxMCA0MHoiIGZpbGw9InJnYmEoMjQ5LDI1MCwyNTEsMC4wMykiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {t.items ? (
            t.items.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <div className="absolute top-0 right-0 p-4">
                    <Quote className="h-12 w-12 text-primary/10" />
                  </div>
                  <CardContent className="p-8 pt-6 relative">
                    <p className="text-muted-foreground mb-6 leading-relaxed font-medium">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0 border-2 border-primary/20">
                        <span className="text-lg font-bold text-primary">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-primary/70">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div></div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 border-2 border-background flex items-center justify-center text-xs text-primary-foreground font-semibold"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="h-8 w-8 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center text-xs text-muted-foreground">
              +500
            </div>
          </div>
          <p className="text-muted-foreground">
            Miles de equipos confían en nosotros para transformar su forma de
            trabajar
          </p>
        </motion.div>
      </div>
    </section>
  );
}
