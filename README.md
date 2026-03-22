# 📍 GeoHere

**GeoHere** es una solución full-stack moderna para la gestión de asistencia y verificación domiciliaria mediante geolocalización en tiempo real. Diseñada para dispositivos móviles, permite a los empleados realizar marcaciones precisas con validación de rango geográfico.

---

## ✨ Características Principales

*   🚀 **Full-stack Next.js**: Arquitectura unificada con Next.js 16.1.6 y API Routes.
*   📱 **Diseño Mobile-First**: Interfaz optimizada para teléfonos, construida con **CSS Modules** puros (sin dependencias de UI pesadas).
*   🗺️ **Geolocalización Precisa**: Verificación en tiempo real de la ubicación del usuario frente al radio permitido de la sucursal.
*   🆔 **Autenticación Chilena**: Soporte nativo para validación de **RUT** y nombres de usuario.
*   🛡️ **Panel Administrativo**: Gestión completa de Usuarios, Empresas (Clientes), Ubicaciones y Logs de asistencia.
*   🔔 **Sistema de Notificaciones**: Alertas en tiempo real para el administrador (solicitudes de cambio de contraseña).
*   🌓 **Modo Oscuro/Claro**: Soporte nativo de temas persistentes con un diseño minimalista y premium.

---

## 🛠️ Stack Tecnológico

*   **Framework**: Next.js 16.1.6 (App Router + Turbopack)
*   **Lenguaje**: TypeScript
*   **Estilos**: CSS Modules (Vanilla CSS)
*   **Base de Datos**: SQLite con **Drizzle ORM**
*   **Autenticación**: JWT (JSON Web Tokens) con hashing **Argon2**
*   **Iconos**: Lucide React
*   **Runtime**: Node.js / Bun

---

## 🚀 Inicio Rápido

### 1. Clonar e Instalar
```bash
git clone https://github.com/lmellaV/GeoHere.git
cd GeoHere
npm install
```

### 2. Configurar Entorno
Crea un archivo `.env` en la raíz (puedes copiar de las variables de abajo):
```env
JWT_SECRET=tu_secreto_super_seguro
GEO_RADIUS=100
```

### 3. Inicializar Base de Datos (Fixtures)
Este comando creará la base de datos SQLite y poblará el sistema con datos de prueba iniciales:
```bash
npm run fixture
```

### 4. Ejecutar en Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

---

## 🔑 Credenciales de Prueba

| Tipo | Usuario / RUT | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | `Casona Nueva` | `admin123` |
| **Empleado** | `12345678-9` | `admin123` |

---

## 📂 Estructura del Proyecto

*   `src/app`: Rutas del frontend (App Router) y Endpoints de la API.
*   `src/components`: Componentes de UI y módulos administrativos.
*   `src/db`: Esquemas de Drizzle, configuración de conexión e inicialización.
*   `src/lib`: Utilidades de servidor, lógica de autenticación y validación de RUT.
*   `scripts`: Scripts de mantenimiento y población de datos (`fixture.js`).

---

## ⚙️ Comandos Útiles

*   `npm run dev`: Inicia el servidor de desarrollo.
*   `npm run build`: Compila la aplicación para producción.
*   `npm run fixture`: Reinicia y puebla la base de datos con datos de prueba.
*   `npm run lint`: Ejecuta el linter para asegurar la calidad del código.

---

## 🔐 Seguridad y Observability

*   **Argon2**: Las contraseñas se almacenan de forma segura usando hashing de última generación.
*   **Observability**: Middleware personalizado que registra cada llamada a la API con IDs únicos, tiempos de respuesta y estados.
*   **JWT**: Sesiones gestionadas mediante tokens seguros almacenados localmente.

---

Desarrollado con ❤️ para la gestión eficiente de recursos humanos.
**GeoHere v1.0.0**
