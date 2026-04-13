# Documentación Interna - Cambios en GeoHere

## Objetivo
Mejorar el frontend de la PWA GeoHere utilizando **Chakra UI v3**, implementando un diseño **minimalista**, **mobile-first** y **responsivo**, además de asegurar el acceso con **JWT (JSON Web Tokens)**. Todo el sistema ahora corre bajo un mismo framework (**Next.js**) para mayor simplicidad y rendimiento.

## Cambios Realizados

### Backend (Next.js Server Routes)
- **Migración a Drizzle ORM**: Se reemplazó el uso directo de `better-sqlite3` por **Drizzle ORM** para una mejor gestión del esquema y tipado.
- **Server Routes**: Todos los endpoints fueron migrados de Express a **Next.js API Routes (App Router)** en `src/app/api`.
- **Integración de JWT**: Se mantiene el sistema de tokens firmados utilizando `jsonwebtoken`, ahora integrado directamente en las rutas de Next.js.
- **Hashing con Argon2**: Se utiliza `argon2` para el almacenamiento seguro de contraseñas.
- **Inicialización Automática**: El sistema detecta si la base de datos está vacía e inicializa las tablas y datos predeterminados:
  - **Empresa de prueba:** Casona Nueva / `admin123`
  - **Usuario de prueba:** 12345678-9 / `pass123`
  - **3 ubicaciones predeterminadas**

### Frontend (Next.js)
- **Validación de RUT**: Utilidad en `src/lib/rut.ts`.
- **Chakra UI v3**: Diseño moderno y responsivo.
- **API Unificada**: El frontend ahora consume las rutas internas mediante `/api/...`.

## Tecnologías Utilizadas
- **Core**: Next.js 16 (App Router).
- **Base de Datos**: SQLite local.
- **ORM**: Drizzle ORM.
- **UI/UX**: Chakra UI v3, Framer Motion, Lucide React.
- **Seguridad**: JWT (jsonwebtoken), Argon2.

## Estructura de la Base de Datos (Drizzle Schema)

### Tabla: `companies`
- `id` (text, pk)
- `name` (text, unique)
- `password` (text)
- `created_at`, `updated_at` (timestamps)

### Tabla: `users`
- `id` (text, pk)
- `username` (text, unique) - RUT
- `name` (text)
- `password` (text)
- `company_id` (text, fk)
- `created_at`, `updated_at`

### Tabla: `locations`
- `id` (text, pk)
- `name` (text)
- `latitude`, `longitude` (real)
- `radius` (integer)
- `created_at`, `updated_at`

### Tabla: `checkins`
- `id` (text, pk)
- `user_id` (text, fk)
- `location_id` (text, fk)
- `action` (text) - 'checkin' | 'checkout'
- `latitude`, `longitude` (real)
- `distance` (real)
- `action_time` (text)
- `timestamp` (text)

### Tabla: `admin_messages`
- `id` (text, pk)
- `username` (text)
- `type` (text)
- `status` (text) - 'pending' | 'resolved'
- `created_at`, `resolved_at`, `resolved_by` (timestamps)

## Panel de Administración
Los CRUDs para gestionar Empresas, Usuarios, Ubicaciones y Logs están ahora implementados como rutas protegidas en `/api/admin/*`.

