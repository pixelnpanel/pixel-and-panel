import AdminOrdersClient from "./AdminOrdersClient";

export const metadata = {
  title: "Admin Orders",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminOrdersPage() {
  return <AdminOrdersClient />;
}
