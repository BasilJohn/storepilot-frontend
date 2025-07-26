// Update the import path below to the correct relative path if needed
import AdminLayout from "../../../components/layout/AdminLayout";
// Update the import path below if the actual location is different
import ProductForm from "../components/ProductForm"; // <-- Update this path if needed, e.g. "../../components/ProductForm"

export default function AddProductPage() {
  return (
    <AdminLayout>
      <ProductForm />
    </AdminLayout>
  );
}