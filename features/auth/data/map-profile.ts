import type { AuthUser, ProfileStatus, UserRole } from "@/types/auth";

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  status: ProfileStatus;
  points_balance: number;
  is_active: boolean;
  last_login_at: string | null;
};

export function mapProfileToAuthUser(profile: ProfileRow): AuthUser {
  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    phone: profile.phone,
    avatarUrl: profile.avatar_url,
    role: profile.role,
    status: profile.status,
    pointsBalance: profile.points_balance,
    isActive: profile.is_active,
    lastLoginAt: profile.last_login_at
  };
}
