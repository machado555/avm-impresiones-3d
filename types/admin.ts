import type { UserRole } from "./auth";

export type AdminPermission =
  | "admin:access"
  | "products:manage"
  | "categories:manage"
  | "orders:manage"
  | "requests:manage"
  | "materials:manage"
  | "rewards:manage"
  | "blog:manage"
  | "users:manage"
  | "logs:read"
  | "cms:manage";

export type ActivityLog = {
  id: string;
  actorId: string | null;
  actorRole: UserRole | null;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
};
