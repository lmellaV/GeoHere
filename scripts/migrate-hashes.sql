-- Migración de hashes Argon2 a PBKDF2
-- Ejecutar con: npx wrangler d1 execute getinwork-db --file=scripts/migrate-hashes.sql --remote

UPDATE companies SET password = 'pbkdf2:14d00458faf317a4da9cef6f16e4ad8c:02ef1abe56d185fdbc73912e702b5759cb7bf31c8d79d19907546accc6826878' WHERE id = 'company_casona';
UPDATE companies SET password = 'pbkdf2:88ef4204fb53193369f790c4a6dce105:624a4c5c5f4e0f9db6e9ddc5f5877ce3976b51f48d30cb70f971db257197c135' WHERE id = 'company_norte';
UPDATE users SET password = 'pbkdf2:bbac6cfe5760c0ed98346bdfdfaab6bf:e38842a39f21587c32cc15eb5e9094504a29fbd270ca33caf59ea6ff2bdb02bf' WHERE id = 'user_admin_demo';
UPDATE users SET password = 'pbkdf2:880392edcf845484135641b09adb0669:b1cbf3e0b43b81343cf02262213257606d6312aa0d15e0d5fae0ba58226911b1' WHERE id = 'user_demo_1';
UPDATE users SET password = 'pbkdf2:25fbae86aa55bfa973a1f7c33e31986b:98aa41b1a8bd3af8d22f0e8176a1f2ac92b539d07387b8454464b7373e35c854' WHERE id = 'user_test_1';
UPDATE users SET password = 'pbkdf2:f28893322db988938bb05b5980f349ff:7f204ea50dd849b4224d3f54408f6efa39d53346e890ada3175e40bf1a80ac90' WHERE id = 'user_test_2';
UPDATE users SET password = 'pbkdf2:7442456105a23a2388baef2c1d3a1bb5:3eb1de970245795d396ebcbf1a9c858ac857813fb45c80ef90617ccfac506619' WHERE id = 'user_test_3';
