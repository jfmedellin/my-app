"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Twitter, Github, Linkedin, Layers } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  t: {
    description: string;
    links: {
      product: string;
      company: string;
      resources: string;
      legal: string;
    };
    copyright: string;
  };
}

const productLinks = ["Features", "Pricing", "Integrations", "Changelog"];
const companyLinks = ["About", "Blog", "Careers", "Contact"];
const resourceLinks = ["Documentation", "Help Center", "Community", "Templates"];
const legalLinks = ["Privacy", "Terms", "Security", "Cookies"];

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-muted/50 pt-16 pb-8 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12"
        >
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold mb-6">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Layers className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                WorkFlow
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t.description}
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t.links.product}</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t.links.company}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t.links.resources}</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t.links.legal}</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <Separator className="mb-8" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            {t.copyright}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
