"use client";
// pages/products.tsx
import AdminLayout from "../../components/layout/AdminLayout";
import ProductsPage from "../../features/products/pages/index";

export default function Products() {
  return (
    <AdminLayout>
      <ProductsPage />
    </AdminLayout>
  );
}