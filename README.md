# GetInWork

GetInWork es una solucion full-stack para gestion de asistencia y verificacion domiciliaria con geolocalizacion.

## Caracteristicas

- Full-stack con Next.js App Router.
- Diseno mobile-first.
- Geolocalizacion con control de radio.
- Login por RUT para usuarios y login por empresa para admin.
- Panel administrativo para usuarios, empresas, ubicaciones, logs y mensajes.

## Stack

- Framework: Next.js 16
- Lenguaje: TypeScript
- UI: CSS Modules
- DB objetivo cloud: Cloudflare D1 + Drizzle ORM
- Auth: JWT con jose + hashing PBKDF2 (Web Crypto)
- Runtime deploy: Cloudflare Workers (OpenNext)

## Desarrollo Local

1. Instalar dependencias

```bash
npm install
```

2. Crear .env

```env
JWT_SECRET=tu_secreto_super_seguro
GEO_RADIUS=100
```

3. Levantar en dev

```bash
npm run dev
```

## Despliegue en Cloudflare (GitHub conectado)

El repositorio ya esta preparado para OpenNext + Wrangler.

### 1) Crear D1 y configurar binding

```bash
npx wrangler d1 create getinwork-db
```

- Copia el database_id resultante.
- Reemplaza REEMPLAZAR_CON_ID_REAL en wrangler.jsonc.

### 2) Crear esquema y datos iniciales en D1

Generar seed SQL con hashes PBKDF2 compatibles con Workers:

```bash
node scripts/generate-d1-seed.js
```

Aplicar esquema y seed a D1:

```bash
npx wrangler d1 execute getinwork-db --file=scripts/d1-schema.sql --remote
npx wrangler d1 execute getinwork-db --file=scripts/d1-seed.sql --remote
```

### 3) Variables de entorno en Cloudflare

En Workers Builds (Build variables and secrets):

- JWT_SECRET (secret)
- GEO_RADIUS (variable normal, por ejemplo 100)

### 4) Build y deploy en Cloudflare (desde GitHub)

En la configuracion de Builds del Worker:

- Build command:

```bash
npx @opennextjs/cloudflare build
```

- Deploy command:

```bash
npx @opennextjs/cloudflare deploy
```

### 5) Probar localmente en runtime Workers (opcional)

```bash
npm run preview
```

## Comandos utiles

- npm run dev
- npm run build
- npm run preview
- npm run deploy
- npm run upload
- npm run cf-typegen
- npm run fixture
- npm run fixture:keep
- npm run test

## Credenciales de prueba (seed)

- Admin empresa: Casona Nueva / admin123
- Usuario: 12345678-9 / admin123
