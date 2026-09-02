import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { AdminProductForm, emptyDraft } from "@/components/AdminProductForm";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/products/edit/$id")({
  head: () => ({
    meta: [
      { title: "Edit Product | Pokharna Silk Admin" },
      { name: "description", content: "Update pricing, stock and details for a product." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Edit Product | Pokharna Silk Admin" },
      { property: "og:description", content: "Update pricing, stock and details for a product." },
    ],
  }),
  component: EditProduct,
});

function EditProduct() {
  const { id } = useParams({ from: "/admin/products/edit/$id" });
  const { productById, updateProduct, hydrated } = useStore();
  const navigate = useNavigate();
  const product = productById(id);

  if (!hydrated) {
    return (
      <AdminLayout title="Edit Product">
        <p className="text-sm text-muted-foreground">Loading product…</p>
      </AdminLayout>
    );
  }

  if (!product) {
    return (
      <AdminLayout title="Edit Product">
        <div className="card-surface p-8 text-center">
          <p className="text-sm text-muted-foreground">This product no longer exists.</p>
          <Link to="/admin/products" className="btn-base btn-primary mt-4">
            Back to Products
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const { id: _productId, ...draft } = product;

  return (
    <AdminLayout title={`Edit · ${product.name}`}>
      <AdminProductForm
        initial={{ ...emptyDraft(), ...draft }}
        submitLabel="Save Changes"
        onSubmit={(next) => {
          updateProduct(product.id, next);
          navigate({ to: "/admin/products" });
        }}
      />
    </AdminLayout>
  );
}
