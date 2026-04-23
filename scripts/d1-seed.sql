-- GeoHere D1 Seed — GENERADO AUTOMÁTICAMENTE por scripts/generate-d1-seed.js
-- Contraseñas hasheadas con PBKDF2-SHA256 (compatible con Cloudflare Workers)

-- Limpieza
DELETE FROM admin_messages;
DELETE FROM checkins;
DELETE FROM users;
DELETE FROM companies;
DELETE FROM locations;

-- Ubicaciones
INSERT INTO locations (id, name, latitude, longitude, radius) VALUES ('loc_casona', 'Casona Nueva', -33.427782, -70.617822, 100);
INSERT INTO locations (id, name, latitude, longitude, radius) VALUES ('loc_providencia', 'Sucursal Providencia', -33.4263, -70.6152, 100);
INSERT INTO locations (id, name, latitude, longitude, radius) VALUES ('loc_vitacura', 'Sucursal Vitacura', -33.3947, -70.5777, 100);
INSERT INTO locations (id, name, latitude, longitude, radius) VALUES ('loc_maipu', 'Bodega Maipú', -33.5117, -70.761, 150);

-- Empresas (admins)
INSERT INTO companies (id, name, password) VALUES ('company_casona', 'Casona Nueva', 'pbkdf2:4500033f8ed6eb5be9a460490a6c3b6d:126333601d7781183a0920f019b0358a25a0115067ca95ae3630e40919721bfc');
INSERT INTO companies (id, name, password) VALUES ('company_norte', 'Empresa Norte', 'pbkdf2:aa516c53f2a83a7e4be18c70a2a8c86e:08548ec857f577d9ad5a5a645745dcb900585c7e05e4bede1297e645d8ea85ca');

-- Usuarios
INSERT INTO users (id, username, name, email, cargo, jornada, password, company_id) VALUES ('user_admin_demo', '11111111-1', 'Administrador Demo', 'admin.demo@getinwork.cl', 'Administrador', 'Completa', 'pbkdf2:d8890b89e33f7df513257bb0a48d5ca2:612d3f3dfe71cf65b7162253d71e804ae250f169dbacfea43f884cd35079ba11', 'company_casona');
INSERT INTO users (id, username, name, email, cargo, jornada, password, company_id) VALUES ('user_demo_1', '22222222-2', 'Usuario Demo', 'user.demo@getinwork.cl', 'Operario', 'Completa', 'pbkdf2:b8ebd6f0dc3cb12d9204f7a93dc54796:cdc482c938a4f98f6348849f3fc191b50d0348289231e1c6191472b19a4e0250', 'company_casona');
INSERT INTO users (id, username, name, email, cargo, jornada, password, company_id) VALUES ('user_test_1', '12345678-9', 'Usuario Prueba', 'usuario.prueba@getinwork.cl', 'Operario', 'Completa', 'pbkdf2:1f4fd67741ffda2aadc721ca8de91a97:fde750e036c9e1a676e860cb2cdd8cd1d3f528e493561f3ff905182759fe64a2', 'company_casona');
INSERT INTO users (id, username, name, email, cargo, jornada, password, company_id) VALUES ('user_test_2', '98765432-1', 'María Empleado', 'maria.empleado@getinwork.cl', 'Supervisora', 'Turno', 'pbkdf2:9b19dd8006199cf7b4144a1596bd300a:57e86dce3e1caee312f07079196a45ae0be4ca35cb1f52ec55e1d611f4ae20c9', 'company_norte');
INSERT INTO users (id, username, name, email, cargo, jornada, password, company_id) VALUES ('user_test_3', '11223344-5', 'Pedro Olvidadizo', 'pedro.olvidadizo@getinwork.cl', 'Técnico', 'Parcial', 'pbkdf2:670fbbb7561f79fee27ab1ded7f0c8fa:d1b40bfb9ea5c0fe14497b2339e5c8008572d59e117b664686f29ee6031f1177', 'company_casona');

-- Mensajes de prueba
INSERT INTO admin_messages (id, username, type, status) VALUES ('msg_1', '11223344-5', 'password_reset', 'pending');
INSERT INTO admin_messages (id, username, type, status) VALUES ('msg_2', '98765432-1', 'password_reset', 'pending');
INSERT INTO admin_messages (id, username, type, status) VALUES ('msg_3', '12345678-9', 'password_reset', 'resolved');
