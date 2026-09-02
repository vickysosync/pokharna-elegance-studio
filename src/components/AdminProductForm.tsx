import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { img, imageMap } from "@/lib/images";
import type { Product } from "@/data/products";

export type ProductDraft = Omit<Product, "id">;

export function emptyDraft(): ProductDraft {
  return {
    sku: `PKS-${Math.floor(1000 + Math.random() * 8999)}`,
    name: "",
    category: "dress-materials",
    fabric: "",
    weave: "",
    color: "",
    occasion: "Festive",
    length: "2.5 m top · 2.5 m bottom · 2.25 m dupatta",
    care: "Dry clean recommended. Store folded in muslin away from direct sunlight.",
    description: "",
    price: 0,
    originalPrice: 0,
    stock: 0,
    rating: 4.5,
    reviews: 0,
    imageKey: "dressMaterials",
    collection: "New Arrivals",
    featured: false,
    bestseller: false,
    newArrival: true,
    createdAt: new Date().toISOString().slice(0, 10),
  };
}

export function AdminProductForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial: ProductDraft;
  submitLabel: string;
  onSubmit: (draft: ProductDraft) => void;
}) {
  const { categories } = useStore();
  const navigate = useNavigate();
  const [d, setD] = useState<ProductDraft>(initial);

  const set = <K extends keyof ProductDraft>(k: K, v: ProductDraft[K]) =>
    setD((prev) => ({ ...prev, [k]: v }));

  const discount =
    d.originalPrice > d.price && d.originalPrice > 0
      ? Math.round(((d.originalPrice - d.price) / d.originalPrice) * 100)
      : 0;

  return (
    <form
      className="grid gap-6 lg:grid-cols-[1fr_20rem]"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(d);
      }}
    >
      <div className="card-surface space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Product Name" id="p-name">
            <input
              id="p-name"
              className="field"
              required
              value={d.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>
          <Field label="SKU" id="p-sku">
            <input
              id="p-sku"
              className="field"
              required
              value={d.sku}
              onChange={(e) => set("sku", e.target.value)}
            />
          </Field>
          <Field label="Category" id="p-cat">
            <select
              id="p-cat"
              className="field"
              value={d.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Collection" id="p-coll">
            <input
              id="p-coll"
              className="field"
              value={d.collection}
              onChange={(e) => set("collection", e.target.value)}
            />
          </Field>
          <Field label="Fabric" id="p-fab">
            <input
              id="p-fab"
              className="field"
              value={d.fabric}
              onChange={(e) => set("fabric", e.target.value)}
            />
          </Field>
          <Field label="Work / Weave" id="p-weave">
            <input
              id="p-weave"
              className="field"
              value={d.weave}
              onChange={(e) => set("weave", e.target.value)}
            />
          </Field>
          <Field label="Colour" id="p-color">
            <input
              id="p-color"
              className="field"
              value={d.color}
              onChange={(e) => set("color", e.target.value)}
            />
          </Field>
          <Field label="Occasion" id="p-occ">
            <input
              id="p-occ"
              className="field"
              value={d.occasion}
              onChange={(e) => set("occasion", e.target.value)}
            />
          </Field>
          <Field label="Length / Set details" id="p-len">
            <input
              id="p-len"
              className="field"
              value={d.length}
              onChange={(e) => set("length", e.target.value)}
            />
          </Field>
          <Field label="Rating (0-5)" id="p-rating">
            <input
              id="p-rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              className="field"
              value={d.rating}
              onChange={(e) => set("rating", Number(e.target.value))}
            />
          </Field>
        </div>

        <Field label="Description" id="p-desc">
          <textarea
            id="p-desc"
            rows={4}
            className="field"
            value={d.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>
        <Field label="Care Instructions" id="p-care">
          <textarea
            id="p-care"
            rows={3}
            className="field"
            value={d.care}
            onChange={(e) => set("care", e.target.value)}
          />
        </Field>
      </div>

      <div className="space-y-6">
        <div className="card-surface space-y-4 p-6">
          <h2 className="text-lg">Pricing & Stock</h2>
          <Field label="Price (₹)" id="p-price">
            <input
              id="p-price"
              type="number"
              min="0"
              required
              className="field"
              value={d.price}
              onChange={(e) => set("price", Number(e.target.value))}
            />
          </Field>
          <Field label="Original Price (₹)" id="p-orig">
            <input
              id="p-orig"
              type="number"
              min="0"
              className="field"
              value={d.originalPrice}
              onChange={(e) => set("originalPrice", Number(e.target.value))}
            />
          </Field>
          <p className="text-xs text-muted-foreground">Discount shown on site: {discount}%</p>
          <Field label="Stock" id="p-stock">
            <input
              id="p-stock"
              type="number"
              min="0"
              className="field"
              value={d.stock}
              onChange={(e) => set("stock", Number(e.target.value))}
            />
          </Field>
        </div>

        <div className="card-surface space-y-4 p-6">
          <h2 className="text-lg">Image</h2>
          <Field label="Image key or URL" id="p-img">
            <input
              id="p-img"
              className="field"
              value={d.imageKey}
              onChange={(e) => set("imageKey", e.target.value)}
            />
          </Field>
          <div className="flex flex-wrap gap-2">
            {Object.keys(imageMap).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => set("imageKey", k)}
                className={`h-12 w-12 overflow-hidden rounded border ${
                  d.imageKey === k ? "border-primary ring-2 ring-ring" : "border-border"
                }`}
                aria-label={`Use ${k} image`}
              >
                <img src={img(k)} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <img
            src={img(d.imageKey)}
            alt="Selected product image preview"
            className="aspect-3/4 w-full rounded object-cover"
          />
        </div>

        <div className="card-surface space-y-3 p-6">
          <h2 className="text-lg">Visibility</h2>
          <Toggle
            id="p-feat"
            label="Featured"
            checked={d.featured}
            onChange={(v) => set("featured", v)}
          />
          <Toggle
            id="p-best"
            label="Bestseller"
            checked={d.bestseller}
            onChange={(v) => set("bestseller", v)}
          />
          <Toggle
            id="p-new"
            label="New Arrival"
            checked={d.newArrival}
            onChange={(v) => set("newArrival", v)}
          />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn-base btn-primary flex-1">
            {submitLabel}
          </button>
          <button
            type="button"
            className="btn-base btn-outline"
            onClick={() => navigate({ to: "/admin/products" })}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-x">
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 text-sm">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 accent-[var(--primary)]"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}
