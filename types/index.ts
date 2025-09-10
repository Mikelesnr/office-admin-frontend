// User model
export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  email_verified_at?: string | null;
}

// Login payload
export interface LoginPayload {
  email: string;
  password: string;
}

// Registration payload
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
