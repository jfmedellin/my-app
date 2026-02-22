"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";

interface PricingProps {
  t: {
    title: string;
    subtitle: string;
    plans: {
      starter: {
        name: string;
        price: string;
        description: string;
        features: string[];
      };
      pro: {
        name: string;
        price: string;
        period: string;
        description: string;
        features: string[];
        popular: string;
      };
      enterprise: {
        name: string;
        price: string;
        description: string;
        features: string[];
      };
    };
    cta: string;
  };
}

export default function Pricing({ t }: PricingProps) {
  const plans = [
    { key: "starter", plan: t.plans.starter },
    { key: "pro", plan: t.plans.pro, popular: true },
    { key: "enterprise", plan: t.plans.enterprise },
  ];

  return (
    <section className="py-20 md:py-32" id="pricing">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className={`h-full relative border-2 transition-all duration-300 ${
                item.popular 
                  ? 'border-primary shadow-2xl shadow-primary/20 bg-card' 
                  : 'border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10'
              }`}>
                {item.popular && (
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 shadow-lg shadow-primary/30 font-semibold">
                    {t.plans.pro.popular}
                  </Badge>
                )}
                <CardHeader className={`pb-6 ${item.popular ? 'pt-8' : 'pt-6'}`}>
                  <h3 className="text-xl font-semibold mb-2">{item.plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-bold">{item.plan.price}</span>
                    {'period' in item.plan && (
                      <span className="text-muted-foreground text-lg">{item.plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{item.plan.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {item.plan.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full py-6 text-base transition-all duration-300 ${
                      item.popular 
                        ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1' 
                        : 'hover:bg-accent hover:border-primary/30 hover:shadow-md hover:-translate-y-1'
                    }`} 
                    variant={item.popular ? "default" : "outline"}
                  >
                    {t.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">¿Necesitas una solución personalizada?</p>
          <a href="#contact" className="inline-flex items-center gap-2 text-primary font-medium hover:underline mt-2">
            Contáctanos para más información <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
