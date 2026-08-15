-- Fix invalid photo paths in gurus table (PostgreSQL compatible)
UPDATE gurus SET foto = NULL WHERE foto = '0';
UPDATE gurus SET foto = NULL WHERE foto::text = '0';
UPDATE gurus SET ktp_path = NULL WHERE ktp_path = '0';
UPDATE gurus SET ktp_path = NULL WHERE ktp_path::text = '0';
UPDATE gurus SET sk_kerja_path = NULL WHERE sk_kerja_path = '0';
UPDATE gurus SET sk_kerja_path = NULL WHERE sk_kerja_path::text = '0';

-- Fix invalid photo paths in santri table (PostgreSQL compatible)
UPDATE santri SET foto = NULL WHERE foto = '0';
UPDATE santri SET foto = NULL WHERE foto::text = '0';

-- Fix invalid profile photo paths in users table (PostgreSQL compatible)
UPDATE users SET profile_photo_path = NULL WHERE profile_photo_path = '0';
UPDATE users SET profile_photo_path = NULL WHERE profile_photo_path::text = '0';