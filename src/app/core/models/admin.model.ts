export interface AdminSession {
  loggedIn: boolean;
  username?: string;
}

export interface AdminLoginResponse {
  success: boolean;
  username?: string;
  error?: string;
}
