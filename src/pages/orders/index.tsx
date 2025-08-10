// src/pages/flyer/index.tsx
// Update the import path if the file exists elsewhere, for example:
import AdminLayout from "../../components/layout/AdminLayout";
import OrderPage from "../../features/orders/pages/index";


export default function Orders() {
  return (
    <AdminLayout>
      <OrderPage />
    </AdminLayout>
  );
}