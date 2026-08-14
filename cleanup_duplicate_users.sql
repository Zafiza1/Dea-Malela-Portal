-- Cleanup duplicate user entries from failed attempts
-- This removes users that were created but without associated guru records

DELETE FROM users 
WHERE id NOT IN (
    SELECT user_id FROM gurus WHERE user_id IS NOT NULL
    UNION
    SELECT id FROM users WHERE username = 'admin'
);

-- Find and reset invalid file paths (0, empty strings)
SELECT 'Checking gurus table...' as status;
SELECT id, foto, ktp_path, sk_kerja_path FROM gurus WHERE foto = '0' OR foto = '' OR ktp_path = '0' OR ktp_path = '' OR sk_kerja_path = '0' OR sk_kerja_path = '';

SELECT 'Checking santri table...' as status;
SELECT id, foto FROM santri WHERE foto = '0' OR foto = '';

SELECT 'Checking surat_files table...' as status;
SELECT id, path FROM surat_files WHERE path = '0' OR path = '';

-- Reset invalid file paths
UPDATE gurus SET foto = NULL WHERE foto = '0' OR foto = '';
UPDATE gurus SET ktp_path = NULL WHERE ktp_path = '0' OR ktp_path = '';
UPDATE gurus SET sk_kerja_path = NULL WHERE sk_kerja_path = '0' OR sk_kerja_path = '';
UPDATE santri SET foto = NULL WHERE foto = '0' OR foto = '';
UPDATE surat_files SET path = NULL WHERE path = '0' OR path = '';
