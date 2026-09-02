import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { AdminProductForm, emptyDraft } from "@/components/AdminProductForm";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/products/add")({
  head: () => ({
    meta: [
      { title: "Add Product | Pokharna Silk Admin" },
      { name: "description", content: "Add a new dress material or saree to the catalogue." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Add Product | Pokharna Silk Admin" },
      { property: "og:description", content: "Add a new product to the Pokharna Silk catalogue." },
    ],
  }),
  component: AddProduct,
});

function AddProduct() {
  const { addProduct } = useStore();
  const navigate = useNavigate();

  return (
    <AdminLayout title="Add Product">
      <AdminProductForm
        initial={emptyDraft()}
        submitLabel="Create Product"
        onSubmit={(draft) => {
          addProduct(draft);
          navigate({ to: "/admin/products" });
        }}
      />
    </AdminLayout>
  );
}
