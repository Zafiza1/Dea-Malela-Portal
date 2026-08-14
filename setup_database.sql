-- Setup Database for Dea Malela Portal
-- Run this in Supabase Dashboard SQL Editor

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    email_verified_at TIMESTAMP,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create password_reset_tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    email VARCHAR(255) PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id BIGINT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    payload TEXT NOT NULL,
    last_activity INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS sessions_user_id_index ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_last_activity_index ON sessions(last_activity);

-- Create cache table
CREATE TABLE IF NOT EXISTS cache (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT NOT NULL,
    expiration INTEGER NOT NULL
);

-- Create cache_locks table
CREATE TABLE IF NOT EXISTS cache_locks (
    key VARCHAR(255) PRIMARY KEY,
    owner VARCHAR(255) NOT NULL,
    expiration INTEGER NOT NULL
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id BIGSERIAL PRIMARY KEY,
    queue VARCHAR(255) NOT NULL,
    payload TEXT NOT NULL,
    attempts SMALLINT NOT NULL,
    reserved_at INTEGER,
    available_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS jobs_queue_index ON jobs(queue);

-- Create job_batches table
CREATE TABLE IF NOT EXISTS job_batches (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    total_jobs INTEGER NOT NULL,
    pending_jobs INTEGER NOT NULL,
    failed_jobs INTEGER NOT NULL,
    failed_job_ids TEXT NOT NULL,
    options TEXT,
    cancelled_at INTEGER,
    created_at INTEGER NOT NULL,
    finished_at INTEGER
);

-- Create failed_jobs table
CREATE TABLE IF NOT EXISTS failed_jobs (
    id BIGSERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    connection TEXT NOT NULL,
    queue TEXT NOT NULL,
    payload TEXT NOT NULL,
    exception TEXT NOT NULL,
    failed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    guard_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, guard_name)
);

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    guard_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, guard_name)
);

-- Create model_has_permissions table
CREATE TABLE IF NOT EXISTS model_has_permissions (
    permission_id BIGINT NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id BIGINT NOT NULL,
    PRIMARY KEY(permission_id, model_id, model_type),
    FOREIGN KEY(permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS model_has_permissions_model_id_model_type_index ON model_has_permissions(model_id, model_type);

-- Create model_has_roles table
CREATE TABLE IF NOT EXISTS model_has_roles (
    role_id BIGINT NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id BIGINT NOT NULL,
    PRIMARY KEY(role_id, model_id, model_type),
    FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS model_has_roles_model_id_model_type_index ON model_has_roles(model_id, model_type);

-- Create role_has_permissions table
CREATE TABLE IF NOT EXISTS role_has_permissions (
    permission_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY(permission_id, role_id),
    FOREIGN KEY(permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Create gurus table
CREATE TABLE IF NOT EXISTS gurus (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    nama_lengkap VARCHAR(255) NOT NULL,
    jenis_kelamin CHAR(1) NOT NULL,
    tempat_lahir VARCHAR(255) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    jabatan VARCHAR(255) NOT NULL,
    nomor_hp VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    alamat TEXT NOT NULL,
    pendidikan_terakhir VARCHAR(255) NOT NULL,
    tanggal_masuk DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'aktif',
    foto VARCHAR(255),
    ktp_path VARCHAR(255),
    sk_kerja_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create santri table
CREATE TABLE IF NOT EXISTS santri (
    id BIGSERIAL PRIMARY KEY,
    nis VARCHAR(255) UNIQUE NOT NULL,
    nama VARCHAR(255) NOT NULL,
    jenis_kelamin CHAR(1) NOT NULL,
    tempat_lahir VARCHAR(255) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    nama_ayah VARCHAR(255) NOT NULL,
    nama_ibu VARCHAR(255) NOT NULL,
    alamat TEXT NOT NULL,
    nomor_hp VARCHAR(255) NOT NULL,
    jenjang VARCHAR(255) NOT NULL,
    kelas VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'aktif',
    tanggal_masuk DATE NOT NULL,
    catatan TEXT,
    foto VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create surat_folders table
CREATE TABLE IF NOT EXISTS surat_folders (
    id BIGSERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    parent_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(parent_id) REFERENCES surat_folders(id) ON DELETE CASCADE
);

-- Create surat_files table
CREATE TABLE IF NOT EXISTS surat_files (
    id BIGSERIAL PRIMARY KEY,
    folder_id BIGINT,
    nama_file VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    ukuran BIGINT,
    tipe_file VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(folder_id) REFERENCES surat_folders(id) ON DELETE CASCADE
);

-- Insert default admin user (password: admin123)
-- Note: You should change this password after first login
INSERT INTO users (name, username, email, password, is_active) 
VALUES ('Administrator', 'admin', 'admin@deamalela.com', '$2y$12$/jdyWr4AqgkuOvohTjkvL.4r1ofVzdc2bXm6zRt97kYCnw1juXcpO', TRUE)
ON CONFLICT (username) DO NOTHING;

-- Insert default roles
INSERT INTO roles (name, guard_name) 
VALUES ('admin', 'web')
ON CONFLICT (name, guard_name) DO NOTHING;

INSERT INTO roles (name, guard_name) 
VALUES ('guru', 'web')
ON CONFLICT (name, guard_name) DO NOTHING;

-- Assign admin role to admin user
INSERT INTO model_has_roles (role_id, model_type, model_id)
SELECT r.id, 'App\Models\User', u.id 
FROM roles r, users u 
WHERE r.name = 'admin' AND u.username = 'admin'
ON CONFLICT DO NOTHING;

-- Create migrations table for Laravel
CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    migration VARCHAR(255) NOT NULL,
    batch INT NOT NULL
);

-- Mark migrations as run
INSERT INTO migrations (migration, batch) VALUES 
('0001_01_01_000000_create_users_table', 1),
('0001_01_01_000001_create_cache_table', 1),
('0001_01_01_000002_create_jobs_table', 1),
('2026_08_06_022934_create_permission_tables', 1),
('2026_08_06_022953_create_gurus_table', 1),
('2026_08_06_022959_create_santri_table', 1),
('2026_08_06_023026_create_surat_folders_table', 1),
('2026_08_06_023031_create_surat_files_table', 1)
ON CONFLICT DO NOTHING;

COMMIT;
