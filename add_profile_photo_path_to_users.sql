-- Add profile_photo_path column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_photo_path VARCHAR(255);