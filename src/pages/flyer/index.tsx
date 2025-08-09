// src/pages/flyer/index.tsx
// Update the import path if the file exists elsewhere, for example:
import AdminLayout from "../../components/layout/AdminLayout";
import FlyerPage from "../../features/flyer/pages/index";


export default function Dashboard() {
  return (
    <AdminLayout>
      <FlyerPage />
    </AdminLayout>
  );
}