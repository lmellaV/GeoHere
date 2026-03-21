# GeoHere - Geolocation Check-in Application

Una aplicación web moderna para gestionar check-in y check-out de empleados con verificación geográfica en tiempo real. Incluye panel administrativo completo para gestionar usuarios, ubicaciones y registros.

## 🌟 Características

✅ **Check-in/Check-out con Geolocalización**
- Verificación de ubicación en tiempo real usando GPS
- Cálculo de distancia a zona permitida
- Registro automático de coordenadas

✅ **Autenticación Flexible**
- Login por RUT o nombre de usuario
- Login específico para empresas/administradores
- Gestión de contraseñas seguras

✅ **Panel Administrativo**
- Gestión de usuarios (crear, editar, eliminar)
- Gestión de ubicaciones permitidas
- Historial de check-ins
- Generador de nuevas contraseñas

✅ **Tema Minimalista**
- Diseño limpio y elegante con líneas finas
- Soporte para modo claro y oscuro
- Variables CSS dinámicas
- Interfaz responsive

✅ **API RESTful Completa**
- Endpoints para autenticación
- CRUD de usuarios y ubicaciones
- Historial de checkins
- Gestión de passwords

## 🛠️ Tecnologías

**Frontend:**
- Next.js 16.1.6 (React 19)
- TypeScript 5.9.3
- Tailwind CSS 4.2.1
- CSS Variables para theming

**Backend:**
- Express.js 5.2.1
- TypeScript 5.9.3
- SQLite3 (better-sqlite3)
- CORS habilitado

**Herramientas:**
- Turbopack (compilación rápida)
- concurrently (ejecución simultánea)
- tsx (ejecutor TypeScript)

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm 9.x o superior
- Git

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/lmellaV/GeoHere.git
cd GeoHere

# Instalar dependencias
npm install
```

## ▶️ Ejecución

### Desarrollo (Cliente + Servidor)
```bash
npm run dev
```

Esto inicia automáticamente:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001

### Solo Cliente
```bash
npm run dev:client
```

### Solo Servidor
```bash
npm run dev:server
```

### Build Producción
```bash
npm run build
npm start
```

## 📖 Guía de Uso

### Usuario Regular (Check-in/Check-out)

1. Acceder a http://localhost:3000
2. Ingresar credenciales:
   - **RUT:** `12345678-9`
   - **Contraseña:** `prueba123`
3. Permitir acceso a geolocalización
4. Seleccionar ubicación
5. Hacer check-in o check-out

### Acceso Empresa (Administrador)

1. Click en "Acceso Empresa" en esquina superior derecha
2. Ingresar credenciales:
   - **Empresa:** `Casona Nueva`
   - **Contraseña:** `admin123`
3. Gestionar:
   - Usuarios
   - Ubicaciones
   - Ver histórico de checkins

## 🔌 API Endpoints

### Autenticación

```
POST /api/auth/login
Body: { username: string, password: string }
Response: { success: boolean, token: string, user: User }

POST /api/auth/register
Body: { name: string, rut: string }
Response: { success: boolean, user: User }

POST /api/auth/company-login
Body: { name: string, password: string }
Response: { success: boolean, token: string, company: Company }
```

### Ubicaciones

```
GET /api/locations
Response: { success: boolean, locations: Location[] }

POST /api/locations
Body: { name: string, latitude: number, longitude: number }
Response: { success: boolean, location: Location }

PUT /api/locations/:id
Body: { name: string, latitude: number, longitude: number }
Response: { success: boolean, location: Location }

DELETE /api/locations/:id
Response: { success: boolean }
```

### Usuarios

```
GET /api/users
Response: { success: boolean, users: User[] }

PUT /api/users/:id
Body: { username: string, name: string }
Response: { success: boolean, user: User }

DELETE /api/users/:id
Response: { success: boolean }

POST /api/users/:id/new-password
Response: { success: boolean, password: string }
```

### Check-ins

```
POST /api/checkins
Body: { location_id: string, latitude: number, longitude: number, action: "check-in" | "check-out" }
Response: { success: boolean, checkin: Checkin }

GET /api/checkins/:user_id
Response: { success: boolean, checkins: Checkin[] }
```

## 📁 Estructura del Proyecto

```
GeoHere/
├── server/
│   └── index.ts                 # API REST con Express
├── src/
│   ├── app/
│   │   ├── globals.css          # Estilos globales + tema minimalista
│   │   ├── layout.tsx           # Layout raíz
│   │   ├── page.tsx             # Home - formulario check-in
│   │   ├── company-login/
│   │   │   └── page.tsx         # Login de empresas
│   │   └── admin/
│   │       └── page.tsx         # Panel administrativo
│   ├── components/
│   │   └── CheckinForm.tsx      # Componente principal
│   └── lib/
│       └── api.ts               # Cliente API
├── public/                        # Archivos estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.mjs
└── README.md
```

## 🎨 Diseño y Temas

El proyecto utiliza un sistema de theming con CSS variables:

### Variables CSS Disponibles
```css
--login-bg          /* Color de fondo */
--login-border      /* Color de bordes */
--login-text        /* Color de texto */
--login-input-bg    /* Fondo de inputs */
--login-input-border /* Borde de inputs */
```

### Clases Minimalistas
- `.login-container` - Contenedor principal
- `.login-input` - Inputs del formulario
- `.login-btn` - Botones principales
- `.btn-minimal` - Botones minimalistas
- `.btn-minimal-outline` - Botones outline
- `.btn-minimal-danger` - Botones de peligro
- `.card-minimal` - Tarjetas
- `.input-minimal` - Inputs generales

### Cambiar Tema
El tema se persiste en localStorage. Click en botón de tema (☀️/🌙) para alternar:
- **Claro:** Fondo blanco, bordes negros
- **Oscuro:** Fondo negro, bordes blancos

## 🔐 Seguridad

✅ Validación de credenciales estricta
✅ Generación segura de contraseñas (8+ caracteres con símbolos)
✅ No se crean usuarios automáticamente
✅ Verificación geográfica obligatoria
✅ CORS configurado
✅ Variables de entorno para datos sensibles

## 📝 Variables de Entorno

Crear archivo `.env` en raíz:

```env
PORT=3001
GEO_RADIUS=50
NODE_ENV=development
```

- `PORT` - Puerto del servidor API (default: 3001)
- `GEO_RADIUS` - Radio en metros para verificación de ubicación (default: 50)
- `NODE_ENV` - Ambiente (development/production)

## 🗄️ Base de Datos

Se usa **SQLite3** con tablas:

- `users` - Usuarios del sistema
- `companies` - Empresas autorizadas
- `locations` - Ubicaciones permitidas
- `checkins` - Registro de check-ins/check-outs

Se inicializa automáticamente con:
- **Empresa de prueba:** Casona Nueva / admin123
- **Usuario de prueba:** 12345678-9 / prueba123
- **3 ubicaciones predeterminadas**

## 🧪 Testing

### Flujo de Prueba Recomendado

1. **Login Regular:**
   ```
   RUT: 12345678-9
   Contraseña: prueba123
   ```

2. **Login Admin:**
   ```
   Empresa: Casona Nueva
   Contraseña: admin123
   ```

3. **Crear Nuevo Usuario:**
   - Ir a Admin → Usuarios → Agregar
   - Se genera contraseña automática

4. **Cambiar Tema:**
   - Click en botón ☀️/🌙 en esquina superior

## 📚 Comandos Útiles

```bash
# Build para producción
npm run build

# Iniciar producción
npm start

# Verificar tipos TypeScript
npm run type-check

# Lint
npm run lint
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia ISC.

## 👨‍💻 Autor

Desarrollado por GeoHere Development Team

## 📞 Soporte

Para reportar bugs o solicitar features, abre un issue en el repositorio.

---

**Última actualización:** Marzo 21, 2026  
**Versión:** 1.0.0
