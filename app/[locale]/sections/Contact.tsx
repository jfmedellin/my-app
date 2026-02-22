"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, Mail, MapPin, Phone, User, MailCheck } from "lucide-react";

interface ContactProps {
  t: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    success: string;
    info: {
      email: string;
      phone: string;
      address: string;
    };
  };
}

export default function Contact({ t }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'email') {
      setErrors(prev => ({
        ...prev,
        email: value && !validateEmail(value) ? "Por favor ingresa un email válido" : ""
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [field]: value.trim() ? "" : `El ${field} es requerido`
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: formData.name.trim() ? "" : "El nombre es requerido",
      email: formData.email.trim() && validateEmail(formData.email) ? "" : "Por favor ingresa un email válido",
      message: formData.message.trim() ? "" : "El mensaje es requerido"
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => error === "")) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/10 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4 group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-muted-foreground">{t.info.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Teléfono</h3>
                <p className="text-muted-foreground">{t.info.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Dirección</h3>
                <p className="text-muted-foreground">{t.info.address}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Horario de atención: Lunes a Viernes, 9:00 AM - 6:00 PM
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl shadow-primary/5">
              {submitted ? (
                <div className="flex flex-col items-center gap-6 py-8 text-center animate-in fade-in zoom-in duration-300">
                  <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">¡Mensaje enviado!</h3>
                    <p className="text-muted-foreground">{t.success}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {t.name}
                    </label>
                    <div className="relative">
                      <Input
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`bg-background ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <MailCheck className="h-4 w-4 text-muted-foreground" />
                      {t.email}
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`bg-background ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Mensaje</label>
                    <div className="relative">
                      <Textarea
                        placeholder="Escribe tu mensaje aquí..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={5}
                        className={`bg-background resize-none min-h-[140px] ${errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <Send className="mr-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    {t.submit}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
