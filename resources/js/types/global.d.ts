declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly DEV: boolean;
  readonly MODE: string;
  readonly PROD: boolean;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly glob: (pattern: string) => Record<string, () => Promise<unknown>>;
  readonly base: string;
  readonly url: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

// Global type definitions for the application
declare global {
  interface Window {
    route: (name?: string, params?: Record<string, unknown>) => {
      current: (current: string) => boolean;
      toString: () => string;
    };
  }
}

// User and Auth types
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  email_verified_at?: string | null;
  profile_photo_path?: string | null;
  roles: Role[];
  guru?: Guru;
}

export interface Role {
  id: number;
  name: string;
}

export interface Guru {
  id: number;
  nama_lengkap: string;
  jabatan?: string;
  status?: string;
  email?: string;
}

// Pagination types
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// File types
export interface FileData {
  id: number;
  nama_file: string;
  file_path: string;
  file_type: string;
  file_size: number;
  file_url?: string;
  folder?: Folder;
  uploadedBy?: User;
  created_at: string;
  updated_at: string;
}

export interface Folder {
  id: number;
  nama: string;
  parent_id?: number | null;
  created_at: string;
}

// Stats types
export interface DashboardStats {
  total_guru: number;
  guru_aktif: number;
  guru_tidak_aktif: number;
  total_santri: number;
  total_surat: number;
  total_folder: number;
  upload_hari_ini: number;
}

// Inertia page props
export interface PageProps {
  auth: {
    user: User;
  };
  errors?: Record<string, string>;
}

// Form errors type
export interface FormErrors {
  [key: string]: string;
}
