import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useStore } from "@/lib/store";
import { img, imageMap } from "@/lib/images";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      { title: "Manage Categories | Pokharna Silk Admin" },
      { name: "description", content: "Add, edit, enable or remove store categories." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Manage Categories | Pokharna Silk Admin" },
      { property: "og:description", content: "Add, edit, enable or remove store categories." },
    ],
  }),
  component: AdminCategories,
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageKey, setImageKey] = useState("dressMaterials");

  return (
    <AdminLayout title="Categories">
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="card-surface overflow-x-auto">
          <table className="w-full min-w-[42rem] text-sm">
            <thead className="bg-secondary text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="p-3">Category</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Products</th>
                <th className="p-3">Enabled</th>
                <th className="p-3">Featured</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-t border-border">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={img(c.imageKey)}
                        alt={c.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <input
                        aria-label={`Name for ${c.name}`}
                        className="field py-1"
                        value={c.name}
                        onChange={(e) => updateCategory(c.id, { name: e.target.value })}
                      />
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">{c.slug}</td>
                  <td className="p-3">{products.filter((p) => p.category === c.slug).length}</td>
                  <td className="p-3">
                    <input
                      aria-label={`Enable ${c.name}`}
                      type="checkbox"
                      checked={c.enabled}
                      onChange={(e) => updateCategory(c.id, { enabled: e.target.checked })}
                    />
                  </td>
                  <td className="p-3">
                    <input
                      aria-label={`Feature ${c.name}`}
                      type="checkbox"
                      checked={c.featured}
                      onChange={(e) => updateCategory(c.id, { featured: e.target.checked })}
                    />
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      className="btn-base px-3 py-1 text-xs text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        if (window.confirm(`Delete category "${c.name}"?`)) deleteCategory(c.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form
          className="card-surface space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            addCategory({
              slug: slugify(name),
              name,
              description,
              imageKey,
              enabled: true,
              featured: false,
            });
            setName("");
            setDescription("");
          }}
        >
          <h2 className="text-lg">Add Category</h2>
          <div>
            <label htmlFor="c-name" className="label-x">
              Name
            </label>
            <input
              id="c-name"
              className="field"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="c-desc" className="label-x">
              Description
            </label>
            <textarea
              id="c-desc"
              rows={3}
              className="field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="c-img" className="label-x">
              Image
            </label>
            <select
              id="c-img"
              className="field"
              value={imageKey}
              onChange={(e) => setImageKey(e.target.value)}
            >
              {Object.keys(imageMap).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-base btn-primary w-full">
            Add Category
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
