-- Update admin user password to admin123
UPDATE users 
SET password = '$2y$12$/jdyWr4AqgkuOvohTjkvL.4r1ofVzdc2bXm6zRt97kYCnw1juXcpO' 
WHERE username = 'admin';
