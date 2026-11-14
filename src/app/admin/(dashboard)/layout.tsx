import AdminShell from "@/components/admin/AdminShell";
import { getUnreadCount } from "@/lib/submissions";

// The unread badge reads the database, so this layout must render per request.
export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell unread={getUnreadCount()}>{children}</AdminShell>;
}
