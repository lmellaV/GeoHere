-- Datos iniciales para GetInWork
-- Contraseñas hasheadas con PBKDF2+SHA256 (compatible con Web Crypto API)

-- Crear empresa (contraseña: admin123)
REPLACE INTO companies (id, name, password) VALUES (
  'company_casona',
  'Casona Nueva',
  'pbkdf2:d56a8365bb89a77c04d6c8920af2e78c:5ccd7fecb469976ccc78c79c00c35ae2a9cab0645c6ea69cd59d34d2bde696b2'
);

-- Crear usuarios
REPLACE INTO users (
  id, username, name, email, cargo, jornada, password, company_id
) VALUES (
  'user_admin_demo',
  '11111111-1',
  'Administrador Demo',
  'admin.demo@getinwork.cl',
  'Administrador',
  'Completa',
  'pbkdf2:d56a8365bb89a77c04d6c8920af2e78c:5ccd7fecb469976ccc78c79c00c35ae2a9cab0645c6ea69cd59d34d2bde696b2',
  'company_casona'
);

REPLACE INTO users (
  id, username, name, email, cargo, jornada, password, company_id
) VALUES (
  'user_demo_1',
  '22222222-2',
  'Usuario Demo',
  'user.demo@getinwork.cl',
  'Operario',
  'Completa',
  'pbkdf2:3f04e62348b1b4446bf5af80019af33e:22453dd7175c3c3577680581cbc94d3392498c1e5ebc326559ab9af3fd909bc7',
  'company_casona'
);

-- Crear ubicaciones
REPLACE INTO locations (id, name, latitude, longitude, radius) VALUES (
  'loc_casona',
  'Casona Nueva',
  -33.427782,
  -70.617822,
  100
);

REPLACE INTO locations (id, name, latitude, longitude, radius) VALUES (
  'loc_providencia',
  'Sucursal Providencia',
  -33.4263,
  -70.6152,
  100
);

REPLACE INTO locations (id, name, latitude, longitude, radius) VALUES (
  'loc_vitacura',
  'Sucursal Vitacura',
  -33.3947,
  -70.5777,
  100
);
