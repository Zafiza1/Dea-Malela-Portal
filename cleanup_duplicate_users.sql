-- Cleanup duplicate user entries from failed attempts
-- This removes users that were created but without associated guru records

DELETE FROM users 
WHERE id NOT IN (
    SELECT user_id FROM gurus WHERE user_id IS NOT NULL
    UNION
    SELECT id FROM users WHERE username = 'admin'
);
