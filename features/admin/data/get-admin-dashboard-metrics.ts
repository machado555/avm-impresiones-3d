import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdminDashboardMetrics() {
  await requireCapability("admin:access");
  const supabase = await createSupabaseServerClient();
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const monthStartIso = monthStart.toISOString();

  const [
    pendingRequests,
    urgentRequests,
    unquotedRequests,
    activeOrders,
    pendingPaymentOrders,
    totalProducts,
    estimatedRevenue,
    monthRevenue,
    registeredUsers,
    newUsersMonth,
    outOfStockProducts,
    latestRequests,
    latestOrders,
    requestsByStatus
  ] = await Promise.all([
    supabase.from("custom_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("custom_requests").select("id", { count: "exact", head: true }).eq("is_urgent", true),
    supabase.from("custom_requests").select("id", { count: "exact", head: true }).is("estimated_price", null),
    supabase.from("orders").select("id", { count: "exact", head: true }).in("status", ["paid", "processing", "printing", "ready_for_pickup", "shipped"]),
    supabase.from("orders").select("id", { count: "exact", head: true }).eq("payment_status", "pending"),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("total").in("status", ["pending_payment", "payment_processing", "paid", "processing", "printing", "ready_for_pickup", "shipped", "delivered"]),
    supabase.from("orders").select("total").gte("created_at", monthStartIso),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }).gte("created_at", monthStartIso),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("stock", 0).eq("status", "active"),
    supabase.from("custom_requests").select("request_number,project_name,status,priority,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("orders").select("order_number,status,payment_status,total,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("custom_requests").select("status")
  ]);

  return {
    pendingRequests: pendingRequests.count ?? 0,
    urgentRequests: urgentRequests.count ?? 0,
    unquotedRequests: unquotedRequests.count ?? 0,
    activeOrders: activeOrders.count ?? 0,
    pendingPaymentOrders: pendingPaymentOrders.count ?? 0,
    totalProducts: totalProducts.count ?? 0,
    estimatedRevenue: sumTotals(estimatedRevenue.data),
    monthRevenue: sumTotals(monthRevenue.data),
    registeredUsers: registeredUsers.count ?? 0,
    newUsersMonth: newUsersMonth.count ?? 0,
    outOfStockProducts: outOfStockProducts.count ?? 0,
    latestRequests: latestRequests.data ?? [],
    latestOrders: latestOrders.data ?? [],
    requestsByStatus: countByStatus(requestsByStatus.data)
  };
}

function sumTotals(rows: Array<{ total: number | string | null }> | null) {
  return rows?.reduce((sum, row) => sum + Number(row.total ?? 0), 0) ?? 0;
}

function countByStatus(rows: Array<{ status: string | null }> | null) {
  return (rows ?? []).reduce<Record<string, number>>((acc, row) => {
    const status = row.status ?? "unknown";
    acc[status] = (acc[status] ?? 0) + 1;
    return acc;
  }, {});
}
