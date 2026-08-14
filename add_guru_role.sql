-- Add missing 'guru' role for GuruController
INSERT INTO roles (name, guard_name) 
VALUES ('guru', 'web')
ON CONFLICT (name, guard_name) DO NOTHING;
