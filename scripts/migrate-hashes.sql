-- Migración de hashes Argon2 a PBKDF2
-- Ejecutar con: npx wrangler d1 execute getinwork-db --file=scripts/migrate-hashes.sql --remote

UPDATE companies SET password = 'pbkdf2:9b12b902179cf1b21cd25f42dde82b43:64c7278d434a675e45ec862cd8b59d577eba1485fdddb84728271148efaae98c' WHERE id = 'company_casona';
UPDATE companies SET password = 'pbkdf2:aa7b42b19b8c3918c655304dfcef5ddf:9c5b042ade8788b11ed1330d2d3bcf770a464bb02eb05139c772b1890f5cd4e8' WHERE id = 'company_norte';
UPDATE users SET password = 'pbkdf2:21b16a683f87b65000f01430e4d681bb:37621f5255e61e1f113ddc228a00cac83fe4662735ba46142d2380e9d715d779' WHERE id = 'user_admin_demo';
UPDATE users SET password = 'pbkdf2:f1f5016a3558f12d1456a7717f7cfaef:3948fbc4700eb0343af8979f204823bb03e0f7597eacafe478dabe441e513790' WHERE id = 'user_demo_1';
UPDATE users SET password = 'pbkdf2:72b70e16625d6db78b2459636f4cac25:81a2ff02ff55eb037dfc05a0f751a9fb61fb66a6ac2e9fe8d341e2285e2418d4' WHERE id = 'user_test_1';
UPDATE users SET password = 'pbkdf2:90aff57c0c8f9a0c4cc51c7d8453333d:b9495291b4f4126127f7f9a98c63fea4487ba0c89c5aa2acb2d610cbf89c75c1' WHERE id = 'user_test_2';
UPDATE users SET password = 'pbkdf2:6a768d57402730bbf40f7e6a0fd3851d:39b4054a5ee0bec56c50e7138c1f9534b808be56d62c5cea55f1a6b5ea1c3f30' WHERE id = 'user_test_3';
