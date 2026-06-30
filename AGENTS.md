<!-- BEGIN:nextjs-agent-rules -->
# Reglas específicas para agentes - Next.js

> **Atención:** Esta **NO** es la versión de Next.js de tu entrenamiento base.  
> El proyecto usa **Next.js 16.2.6** con React 19.2.4. Tiene cambios importantes en APIs, convenciones y estructura de archivos respecto a versiones anteriores. Antes de escribir código, lee la guía relevante en `node_modules/next/dist/docs/` y respeta los avisos de deprecación.
<!-- END:nextjs-agent-rules -->

---

# AGENTS.md - Guía del proyecto para agentes de código

Archivo destinado a agentes de IA que trabajen sobre este repositorio. Supone que el lector no conoce nada del proyecto. Toda la documentación interna, comentarios y nombres de commits se mantienen principalmente en **español**.

---

## 1. Resumen del proyecto

Este es un frontend web construido con **Next.js 16.2.6** (App Router), **React 19.2.4** y **TypeScript 5**. Fue inicializado con `create-next-app` y usa **Tailwind CSS v4** como sistema de estilos. La UI se basa en componentes de **shadcn/ui** (`base-nova` style) junto con **Base UI** y **Radix UI**.

El objetivo del proyecto es servir como interfaz de administración tipo backoffice para la gestión de:

- Usuarios
- Workspaces
- Contactos
- Automatizaciones
- Planes

También incluye una sección de `/examples` y `/showcase` que se usan como laboratorio de componentes y patrones de UI.

---

## 2. Stack tecnológico

### Core

| Tecnología | Versión | Uso |
|------------|---------|-----|
| next | 16.2.6 | Framework principal (App Router) |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | Renderizado |
| typescript | ^5 | Tipado estático |

### Estilos

| Tecnología | Versión | Uso |
|------------|---------|-----|
| tailwindcss | ^4 | Utilidades CSS |
| @tailwindcss/postcss | ^4 | Plugin PostCSS |
| tw-animate-css | ^1.4.0 | Animaciones Tailwind |
| class-variance-authority | ^0.7.1 | Variantes de componentes |
| clsx / tailwind-merge | - | Composición de clases (`cn`) |

### UI / Componentes

| Tecnología | Uso |
|------------|-----|
| shadcn/ui | Sistema de componentes base |
| @base-ui/react | Primitives de UI |
| radix-ui | Primitives accesibles |
| lucide-react / react-icons | Iconografía |
| sonner | Toast notifications |

### Estado y datos

| Tecnología | Uso |
|------------|-----|
| @tanstack/react-query | Server state, cacheo y fetching |
| zustand | Estado global cliente |
| react-hook-form | Manejo de formularios |
| zod | Validación de esquemas |
| @hookform/resolvers | Integración zod + react-hook-form |

### Comunicación

| Tecnología | Uso |
|------------|-----|
| axios | Cliente HTTP |
| socket.io-client | WebSockets |

### Trabajo en segundo plano (librerías instaladas, no usadas activamente en el código actual)

| Tecnología | Uso potencial |
|------------|---------------|
| bullmq | Colas de jobs Redis |
| ioredis | Cliente Redis |
| express | Servidor HTTP auxiliar |

> Nota: a la fecha de exploración, no existen archivos `.ts` o `.tsx` que usen `bullmq`, `express` o `Queue/Worker`. Están listadas en `package.json` como dependencias futuras para jobs en segundo plano.

---

## 3. Estructura del proyecto

```
.
├── app/                    # Rutas de Next.js App Router
│   ├── backoffice/         # Panel administrativo
│   ├── dev/                # Experimentos de desarrollo
│   ├── examples/           # Ejemplos y prototipos
│   ├── home/               # Home autenticado
│   ├── login/              # Login de app
│   ├── register/           # Registro de app
│   ├── showcase/           # Vitrina de componentes
│   ├── layout.tsx          # Layout raíz con fuentes y Toaster
│   ├── page.tsx            # Página de inicio pública
│   └── globals.css         # Variables CSS, tema claro/oscuro, Tailwind
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   ├── reui/               # Componentes del registro @reui
│   ├── examples/           # Ejemplos aislados
│   └── *.tsx               # Componentes reutilizables globales
├── modules/
│   ├── auth/               # Autenticación de la app pública
│   ├── backoffice/         # Módulos del panel administrativo
│   └── examples/           # Ejemplos y prototipos
├── hooks/                  # Custom hooks globales
├── layouts/                # Layouts compartidos
├── lib/
│   └── utils.ts            # `cn()` helper
├── providers/              # Providers de React (React Query)
├── setup/                  # Configuración de axios, queryClient y socket
├── types/api/              # Tipos globales de API
├── public/                 # Archivos estáticos
├── .env                    # Variables de entorno (no versionar)
├── next.config.ts          # Configuración de Next.js
├── eslint.config.mjs       # Configuración ESLint (Next.js core-web-vitals + TS)
├── tsconfig.json           # Configuración TypeScript
├── postcss.config.mjs      # Configuración PostCSS para Tailwind v4
└── components.json         # Configuración shadcn/ui
```

### Convención de rutas App Router

- Cada carpeta dentro de `app/` representa un segmento de ruta.
- Las páginas se definen en `page.tsx`.
- Los layouts anidados se definen en `layout.tsx`.
- El middleware de autenticación vive en `middleware.ts` en la raíz.

---

## 4. Organización de módulos

El proyecto sigue una estructura de **módulos por dominio** dentro de `modules/`.

### `modules/auth/`

Lógica de autenticación de la aplicación pública:

- `components/login-form.tsx` - Formulario de login
- `components/login-form.schema.ts` - Esquema Zod de login
- `components/register-form.tsx` - Formulario de registro
- `models/login.response.ts` - Tipos de respuesta
- `services/auth.service.tsx` - Servicio de login

### `modules/backoffice/`

Cada submódulo representa una entidad administrable y sigue una estructura repetible:

```
modules/backoffice/<entidad>/
├── components/
│   ├── screen.tsx              # Pantalla principal del CRUD
│   ├── section.header.tsx      # Cabecera (título, crear, refrescar)
│   ├── section.headerFilter.tsx # Búsqueda
│   ├── section.table.tsx       # Tabla de datos
│   ├── section.footerTable.tsx # Paginación
│   ├── dialog.create.tsx       # Modal de creación
│   ├── dialog.edit.tsx         # Modal de edición
│   └── dialog.confirmdelete.tsx # Modal de eliminación
├── hooks/
│   ├── useList.tsx             # useQuery para listar
│   ├── useCreate.tsx           # useMutation para crear
│   ├── useUpdate.tsx           # useMutation para actualizar
│   └── useDelete.tsx           # useMutation para eliminar
├── services/
│   ├── index.ts                # Re-exporta los servicios
│   ├── listItem.ts
│   ├── createItem.ts
│   ├── updateItem.ts
│   └── deleteItem.ts
├── models/
│   └── dto.ts                  # DTOs de request/response
├── schemas/
│   ├── item.creation.ts        # Zod schema de creación
│   └── item.update.ts          # Zod schema de edición
├── store/
│   └── store.tsx               # Estado Zustand del módulo
├── types/                      # Tipos auxiliares
├── utils/                      # Utilidades (sleep, etc.)
└── config.ts                   # Configuración específica
```

Entidades actuales en `modules/backoffice/`:

- `automation`
- `contact`
- `plans`
- `users`
- `workspaces`
- `auth` (login específico de backoffice)

### `modules/examples/`

Contiene prototipos, ejemplos de tablas, selectores, formularios, etc. Son rutas independientes bajo `/examples/*`. Sirven como referencia de patrones a reutilizar en los módulos reales.

---

## 5. Comandos de build y desarrollo

Los scripts definidos en `package.json`:

```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Servidor de producción (requiere build previo)
npm run start

# Linter
npm run lint
```

### Desarrollo local

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno en `.env`:

```env
NEXT_PUBLIC_API_URL=<url-del-backend>
NEXT_PUBLIC_WEBSOCKET_URL=<url-del-websocket>
JWT_SECRET=<secreto-para-middleware>
```

3. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

---

## 6. Arquitectura de autenticación

### Middleware (`middleware.ts`)

- Protege las rutas `/home`, `/backoffice/:path*`.
- Lee el token JWT desde la cookie `token`.
- Usa `jose` (no `jsonwebtoken`) porque el middleware de Next.js corre en el Edge Runtime.
- Rutas públicas: `/login`, `/register`, `/backoffice/login`.
- Si no hay token o es inválido, redirige al login correspondiente.

### Flujo en cliente

- Login exitoso → guarda token en `localStorage` y cookie `token`.
- `setup/axios.ts` lee `localStorage.token` y lo envía como `Authorization: Bearer <token>`.
- Logout → limpia `localStorage` y cookie.

### Seguridad

- `JWT_SECRET` se usa solo en el middleware (Edge Runtime compatible).
- No almacenar secretos en variables `NEXT_PUBLIC_*`.
- El archivo `.env` está en `.gitignore` y no debe versionarse.

---

## 7. Convenciones de código

### Idioma

- Documentación y comentarios: **español**.
- Código (nombres de variables, funciones, tipos): mixto. Predominan nombres en inglés (`useListManagerV1`, `CreateItem`, `AutomationBackofficeDTO`) pero con comentarios y textos de UI en español.

### Imports

- Usar alias `@/` para todo import relativo a la raíz (`tsconfig.json` configura `"@/*": ["./*"]`).
- Ejemplo:

```ts
import { api } from "@/setup/axios";
import { ResponseApi } from "@/types/api/response";
```

### Nomenclatura de archivos

- Componentes React: `PascalCase.tsx`.
- Hooks: `use<Nombre>.tsx`.
- Servicios: `camelCase.ts`.
- DTOs y tipos: `PascalCase.ts`.
- Schemas Zod: `item.creation.ts`, `item.update.ts`.

### Componentes cliente vs servidor

- Las páginas en `app/**/page.tsx` suelen ser Server Components (`'use server'` o sin directiva).
- Los componentes interactivos deben marcar explícitamente `'use client'`.
- Los formularios, tablas, modales y pantallas principales son Client Components.

### Formularios

- `react-hook-form` + `zodResolver` + `zod`.
- Definir schema en archivo separado dentro de `schemas/`.
- Tipar el formulario con `z.infer<typeof schema>`.

### Fetching de datos

- Usar `@tanstack/react-query`.
- Las queries se declaran en `hooks/useList.tsx`.
- Las mutations en `hooks/useCreate.tsx`, `useUpdate.tsx`, `useDelete.tsx`.
- Los servicios HTTP viven en `services/` y usan la instancia `api` de `setup/axios.ts`.
- La respuesta esperada del backend sigue `ResponseApi<T>`:

```ts
export interface ResponseApi<T> {
  status: boolean;
  data: T;
  message?: string;
  pagination?: ResponsePagination;
}
```

### Estado global

- Preferir Zustand para estado de UI por módulo (apertura de modales, selección de items).
- El estado del servidor debe ir a React Query.

### Estilos

- Tailwind CSS v4 con variables CSS en `app/globals.css`.
- Tema claro/oscuro definido con clases `:root` y `.dark`.
- Usar `cn()` de `@/lib/utils` para combinar clases condicionalmente.

### ESLint

- Configuración en `eslint.config.mjs`.
- Usa `eslint-config-next/core-web-vitals` y `eslint-config-next/typescript`.
- Se ignoran `.next/`, `out/`, `build/`, `next-env.d.ts`.
- Existen supresiones frecuentes de `@typescript-eslint/no-explicit-any` en archivos legacy. Evita introducir nuevos `any`.

---

## 8. Instrucciones de testing

- **El proyecto no tiene tests configurados actualmente.**
- No existen archivos `*.test.ts`, `*.test.tsx`, `*.spec.ts` ni `*.spec.tsx`.
- No hay framework de testing en `devDependencies`.

Si necesitas agregar tests, el stack recomendado para este proyecto sería:

- **Vitest** o **Jest** para unit tests.
- **React Testing Library** para componentes.
- **MSW** para mockear requests HTTP.

### Comando de lint como mínimo de calidad

```bash
npm run lint
```

> **Estado actual:** el proyecto tiene advertencias y errores de lint preexistentes, principalmente en componentes de terceros/registro (`components/reui/`), hooks (`use-mobile.ts`) y módulos con imports sin usar. Estos errores no fueron introducidos por esta documentación; corregirlos requiere una tarea de limpieza aparte.

---

## 9. Consideraciones de seguridad

- **Variables de entorno sensibles:** `JWT_SECRET` nunca debe exponerse al cliente. No uses `NEXT_PUBLIC_` para secretos.
- **Cookies:** el middleware lee la cookie `token`. Asegúrate de configurar `Secure`, `HttpOnly` y `SameSite` adecuadamente si el backend la setea.
- **LocalStorage:** se usa para almacenar el token JWT y Axios lo lee. Considerar que esto lo hace vulnerable a XSS; evita renderizar contenido no sanitizado.
- **CORS:** el backend debe permitir el origen del frontend.
- **Rutas protegidas:** actualmente el middleware protege `/home` y `/backoffice/*`. Si agregas nuevas rutas privadas, actualiza `matcher` en `middleware.ts`.
- **Errores de servicio:** muchos servicios actuales hacen `catch { return null; }`, lo que oculta errores. Considera un manejo de errores más explícito para producción.

---

## 10. Despliegue

El proyecto está preparado para desplegarse en cualquier plataforma compatible con Next.js. La forma más directa documentada en el README es **Vercel**.

### Build de producción

```bash
npm run build
```

### Requisitos de runtime

- Node.js compatible con Next.js 16.2.6.
- Variables de entorno configuradas en el entorno de despliegue:
  - `NEXT_PUBLIC_API_URL`
  - `NEXT_PUBLIC_WEBSOCKET_URL`
  - `JWT_SECRET`

### Notas

- No existe `Dockerfile` ni `docker-compose.yml` en el repositorio.
- No existe configuración de CI/CD (GitHub Actions, etc.) en el repositorio.
- El output por defecto de Next.js usa el directorio `.next/`. Si se necesita static export, se debe configurar `output: 'export'` en `next.config.ts`.

---

## 11. Dependencias a tener en cuenta

### Posibles imports rotos / deuda técnica

- `modules/backoffice/automation/services/listItem.ts` y `createItem.ts` importan `ManagerV1Item` desde `@/modules/examples/example1/types/manager.v1`, pero ese archivo no existe. Aunque actualmente TypeScript puede no reportarlo si el tipo no se usa, es un import potencialmente roto que debería limpiarse.

### Dependencias instaladas pero no usadas

- `bullmq`, `ioredis`, `express`: instaladas para jobs en segundo plano pero sin implementación actual.
- `jsonwebtoken`: instalada pero el middleware usa `jose`.

---

## 12. Recursos útiles para agentes

- Guía local de Next.js: `node_modules/next/dist/docs/`
- Configuración shadcn/ui: `components.json`
- Variables de tema y Tailwind: `app/globals.css`
- Utilidades compartidas: `lib/utils.ts`
- Documentación de componentes reutilizables: `QUICK_START.md`, `DESIGN_IMPROVEMENTS.md`

---

**Última actualización:** 2026-06-30
