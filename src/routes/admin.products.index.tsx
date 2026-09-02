import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useStore, inr } from "@/lib/store";
import { img } from "@/lib/images";

export const Route = createFileRoute("/admin/products/")({
  head: () => ({
    meta: [
      { title: "Manage Products | Pokharna Silk Admin" },
      { name: "description", content: "Create, edit and remove Pokharna Silk products." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Manage Products | Pokharna Silk Admin" },
      { property: "og:description", content: "Create, edit and remove Pokharna Silk products." },
    ],
  }),
  component: AdminProducts,
});

function AdminProducts() {
  const { products, categories, updateProduct, deleteProduct } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const rows = products.filter(
    (p) =>
      (cat === "all" || p.category === cat) &&
      (p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.sku.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <AdminLayout title="Products">
      <div className="card-surface mb-6 flex flex-wrap items-end gap-3 p-4">
        <div className="min-w-48 flex-1">
          <label htmlFor="ap-q" className="label-x">
            Search
          </label>
          <input
            id="ap-q"
            className="field"
            placeholder="Name or SKU"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="min-w-40">
          <label htmlFor="ap-cat" className="label-x">
            Category
          </label>
          <select
            id="ap-cat"
            className="field"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <Link to="/admin/products/add" className="btn-base btn-primary">
          + Add Product
        </Link>
      </div>

      <div className="card-surface overflow-x-auto">
        <table className="w-full min-w-[54rem] text-sm">
          <thead className="bg-secondary text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Flags</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t border-border align-middle">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={img(p.imageKey)}
                      alt={p.name}
                      className="h-12 w-10 rounded object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-muted-foreground">{p.category}</td>
                <td className="p-3">
                  <input
                    aria-label={`Price for ${p.name}`}
                    type="number"
                    className="field w-24 py-1"
                    value={p.price}
                    onChange={(e) => updateProduct(p.id, { price: Number(e.target.value) })}
                  />
                  <span className="mt-1 block text-xs text-muted-foreground">
                    MRP {inr(p.originalPrice)}
                  </span>
                </td>
                <td className="p-3">
                  <input
                    aria-label={`Stock for ${p.name}`}
                    type="number"
                    className="field w-20 py-1"
                    value={p.stock}
                    onChange={(e) => updateProduct(p.id, { stock: Number(e.target.value) })}
                  />
                </td>
                <td className="p-3">
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="flex items-center gap-1.5">
                      <input
                        type="checkbox"
                        checked={p.featured}
                        onChange={(e) => updateProduct(p.id, { featured: e.target.checked })}
                      />
                      Featured
                    </label>
                    <label className="flex items-center gap-1.5">
                      <input
                        type="checkbox"
                        checked={p.bestseller}
                        onChange={(e) => updateProduct(p.id, { bestseller: e.target.checked })}
                      />
                      Bestseller
                    </label>
                    <label className="flex items-center gap-1.5">
                      <input
                        type="checkbox"
                        checked={p.newArrival}
                        onChange={(e) => updateProduct(p.id, { newArrival: e.target.checked })}
                      />
                      New
                    </label>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      to="/admin/products/edit/$id"
                      params={{ id: p.id }}
                      className="btn-base btn-outline px-3 py-1 text-xs"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn-base px-3 py-1 text-xs text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        if (window.confirm(`Delete "${p.name}"?`)) deleteProduct(p.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No products match your filters.
          </p>
        )}
      </div>
    </AdminLayout>
  );
}
