# QA Sandbox - Plataforma de Testing

QA Sandbox es una plataforma interactiva diseñada para que equipos de QA practiquen automatización de pruebas (Playwright, Selenium, Cypress) y prueben estrategias de QA manual.

## 🚀 Tecnologías

- **[Next.js 16](https://nextjs.org/)** - Framework React con App Router
- **[NextAuth.js v5](https://authjs.dev/)** - Autenticación
- **[next-intl](https://next-intl-docs.vercel.app/)** - Internacionalización (ES/EN)
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Estilos
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI
- **[date-fns](https://date-fns.org/)** - Manipulación de fechas
- **[Lucide React](https://lucide.dev/)** - Iconos
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones
- **[Supabase](https://supabase.com/)** - Base de datos y autenticación

## 🧪 Módulos de Testing

| Módulo | Descripción |
|--------|-------------|
| Sistema de Login | Pruebas de autenticación con validación |
| Formularios Clásicos | Inputs, radio buttons, checkboxes, selects |
| Formularios Dinámicos | Datepickers, autocompletado, sliders |
| Interacciones Asíncronas | Demoras en red, elementos dinámicos |
| Tablas y Datos | Búsquedas, paginación, filtros |
| Componentes UI | Tooltips, toasts, modales |
| Calendarios | Date picker, range picker, month picker, week picker |
| Usuarios | CRUD con Supabase: crear, editar, eliminar usuarios |

## 🛠️ Setup

```bash
npm install
npm run dev
```

## 🗄️ Configuración de Supabase

El proyecto usa Supabase como base de datos. Las credenciales se encuentran en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://bidicoxetxpmlpwdkogi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon
```

### Tablas disponibles:
- `users` - Gestión de usuarios con CRUD completo

## 🔐 Credenciales Demo

- **Email:** `admin@example.com`
- **Contraseña:** `1234`

## 🌎 Idiomas

- `/es` - Español
- `/en` - Inglés

## 🎨 Características

- Modo oscuro/claro con persistencia
- Diseño minimalista con paleta verde
- Soporte para testing de automatización
- IDs organizados para selección con Playwright/Cypress

---

Desarrollado para equipos de QA.
