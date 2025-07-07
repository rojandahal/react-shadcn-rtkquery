import type { AuthUser } from "./user.d";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  permissions: string[];
  token: {
    accessToken: string;
    refreshToken: string;
  };
  admin: AuthUser;
}
