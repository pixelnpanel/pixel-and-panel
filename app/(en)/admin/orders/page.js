import AdminOrdersClient from "./AdminOrdersClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin Orders",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSession(session)) {
    redirect("/admin/login");
  }

  return <AdminOrdersClient />;
}
