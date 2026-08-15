-- Change foto column to text type to support base64 data
ALTER TABLE gurus ALTER COLUMN foto TYPE text;
ALTER TABLE santri ALTER COLUMN foto TYPE text;