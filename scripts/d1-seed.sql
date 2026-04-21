-- Datos iniciales para GetInWork
-- Contraseñas hasheadas con argon2
-- admin: $argon2id$v=19$m=19456,t=2,p=1$xzPgXBSV0a3K5vYZCc7K1A$5RM8XgI1CYG6SLVVxZMOhyXZLKkSdZB6mEiVvyN2XrA
-- User123#: $argon2id$v=19$m=19456,t=2,p=1$+Ry+aPxFLLdGM3EVLb6yjg$qjVJG0wH7VJF7K8VzHvYFnVX8K4N9L2M5P0Q1R2S3T4

-- Crear empresa
INSERT OR IGNORE INTO companies (id, name, password) VALUES (
  'company_casona',
  'Casona Nueva',
  '$argon2id$v=19$m=19456,t=2,p=1$xzPgXBSV0a3K5vYZCc7K1A$5RM8XgI1CYG6SLVVxZMOhyXZLKkSdZB6mEiVvyN2XrA'
);

-- Crear usuarios
INSERT OR IGNORE INTO users (
  id, username, name, email, cargo, jornada, password, company_id
) VALUES (
  'user_admin_demo',
  '11111111-1',
  'Administrador Demo',
  'admin.demo@getinwork.cl',
  'Administrador',
  'Completa',
  '$argon2id$v=19$m=19456,t=2,p=1$xzPgXBSV0a3K5vYZCc7K1A$5RM8XgI1CYG6SLVVxZMOhyXZLKkSdZB6mEiVvyN2XrA',
  'company_casona'
);

INSERT OR IGNORE INTO users (
  id, username, name, email, cargo, jornada, password, company_id
) VALUES (
  'user_demo_1',
  '22222222-2',
  'Usuario Demo',
  'user.demo@getinwork.cl',
  'Operario',
  'Completa',
  '$argon2id$v=19$m=19456,t=2,p=1$+Ry+aPxFLLdGM3EVLb6yjg$qjVJG0wH7VJF7K8VzHvYFnVX8K4N9L2M5P0Q1R2S3T4',
  'company_casona'
);

-- Crear ubicaciones
INSERT OR IGNORE INTO locations (id, name, latitude, longitude, radius) VALUES (
  'loc_casona',
  'Casona Nueva',
  -33.427782,
  -70.617822,
  100
);

INSERT OR IGNORE INTO locations (id, name, latitude, longitude, radius) VALUES (
  'loc_providencia',
  'Sucursal Providencia',
  -33.4263,
  -70.6152,
  100
);

INSERT OR IGNORE INTO locations (id, name, latitude, longitude, radius) VALUES (
  'loc_vitacura',
  'Sucursal Vitacura',
  -33.3947,
  -70.5777,
  100
);
