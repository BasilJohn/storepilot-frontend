// pages/products.tsx
// Update the import path below to the correct relative path if needed
import AdminLayout from "../../components/layout/AdminLayout";
// Update the import path below to the correct relative path if needed
// import DashboardPage from "../features/dashboard/DashboardPage";
import ProductsPage from "../../features/products/pages/index";

export default function Dashboard() {
  return (
    <AdminLayout>
      <ProductsPage />
    </AdminLayout>
  );
}