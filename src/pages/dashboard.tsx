// pages/dashboard.tsx
// Update the import path below to the correct relative path if needed
import AdminLayout from "../components/layout/AdminLayout";
// Update the import path below to the correct relative path if needed
// import DashboardPage from "../features/dashboard/DashboardPage";
import DashboardPage from "../features/dashboard/pages/index";

export default function Dashboard() {
  return (
    <AdminLayout>
      <DashboardPage />
    </AdminLayout>
  );
}