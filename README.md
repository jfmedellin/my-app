# WorkFlow - Plataforma para Equipos Modernos

WorkFlow es una plataforma SaaS moderna diseñada para ayudar a los equipos a colaborar, gestionar proyectos y alcanzar sus objetivos con eficiencia. Este proyecto utiliza tecnologías de vanguardia para ofrecer una experiencia premium y escalable.

## 🚀 Tecnologías Principales

- **[Next.js 16 (App Router)](https://nextjs.org/)** - El framework de React para la web.
- **[NextAuth.js v5 Beta](https://authjs.dev/)** - Autenticación flexible y segura.
- **[next-intl](https://next-intl-docs.vercel.app/)** - Soporte de internacionalización (Español e Inglés).
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Estilizado moderno y rápido.
- **[Lucide React](https://lucide.dev/)** - Iconografía elegante.
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones fluidas.

## 🛠️ Configuración Inicial

Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repo>
   cd my-app
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env.local` en la raíz del proyecto y añade:
   ```env
   AUTH_SECRET=tu_secreto_aqui
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## 🔐 Autenticación de Prueba (Demo)

Actualmente, el proyecto utiliza un proveedor de credenciales simulado para propósitos de prueba:
- **Email:** `admin@example.com`
- **Contraseña:** `1234`

## 🌍 Estructura de Idiomas

El proyecto está configurado para soportar múltiples idiomas mediante rutas:
- `/es` - Español
- `/en` - Inglés

Los mensajes de traducción se encuentran en la carpeta `/messages`.

## 📂 Limpieza del Repositorio

El repositorio ha sido optimizado para producción, eliminando carpetas redundantes y archivos de configuración innecesarios, manteniendo solo la lógica central del negocio y la configuración de Next.js.

---

Desarrollado con ❤️ para equipos modernos.
