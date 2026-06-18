export type UserRole = "guest" | "customer" | "moderator" | "admin" | "superadmin";

export type ProfileStatus = "active" | "inactive" | "suspended";

export type AuthUser = {
  id: string;
  email: string | null;
  fullName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  role: UserRole;
  status: ProfileStatus;
  pointsBalance: number;
  isActive: boolean;
  lastLoginAt: string | null;
};

export type AuthState = {
  user: AuthUser | null;
  role: UserRole;
  isLoading: boolean;
  isAuthenticated: boolean;
};
