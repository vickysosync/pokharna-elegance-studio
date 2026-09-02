import type { Category } from "@/data/categories";

export type FilterState = {
  q: string;
  category: string;
  maxPrice: number;
  minRating: number;
  minDiscount: number;
  inStockOnly: boolean;
  sort: string;
};

export const defaultFilters: FilterState = {
  q: "",
  category: "all",
  maxPrice: 20000,
  minRating: 0,
  minDiscount: 0,
  inStockOnly: false,
  sort: "featured",
};

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];

export function FiltersPanel({
  filters,
  setFilters,
  categories,
  onClear,
}: {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  categories: Category[];
  onClear: () => void;
}) {
  const set = <K extends keyof FilterState>(k: K, v: FilterState[K]) =>
    setFilters({ ...filters, [k]: v });

  return (
    <div className="card-surface space-y-6 p-5">
      <div>
        <label className="label-x" htmlFor="f-search">Search</label>
        <input
          id="f-search"
          className="field"
          placeholder="Search products"
          value={filters.q}
          onChange={(e) => set("q", e.target.value)}
        />
      </div>

      <div>
        <label className="label-x" htmlFor="f-cat">Category</label>
        <select
          id="f-cat"
          className="field"
          value={filters.category}
          onChange={(e) => set("category", e.target.value)}
        >
          <option value="all">All categories</option>
          {categories.filter((c) => c.enabled).map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label-x" htmlFor="f-price">
          Max price · ₹{filters.maxPrice.toLocaleString("en-IN")}
        </label>
        <input
          id="f-price"
          type="range"
          min={1000}
          max={20000}
          step={500}
          className="w-full accent-[var(--primary)]"
          value={filters.maxPrice}
          onChange={(e) => set("maxPrice", Number(e.target.value))}
        />
      </div>

      <div>
        <label className="label-x" htmlFor="f-rating">Minimum rating</label>
        <select
          id="f-rating"
          className="field"
          value={filters.minRating}
          onChange={(e) => set("minRating", Number(e.target.value))}
        >
          <option value={0}>Any rating</option>
          <option value={4}>4★ &amp; above</option>
          <option value={4.5}>4.5★ &amp; above</option>
        </select>
      </div>

      <div>
        <label className="label-x" htmlFor="f-disc">Minimum discount</label>
        <select
          id="f-disc"
          className="field"
          value={filters.minDiscount}
          onChange={(e) => set("minDiscount", Number(e.target.value))}
        >
          <option value={0}>Any discount</option>
          <option value={10}>10% and above</option>
          <option value={20}>20% and above</option>
          <option value={30}>30% and above</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="f-stock"
          type="checkbox"
          className="h-4 w-4 accent-[var(--primary)]"
          checked={filters.inStockOnly}
          onChange={(e) => set("inStockOnly", e.target.checked)}
        />
        <label htmlFor="f-stock" className="text-sm">In stock only</label>
      </div>

      <button type="button" className="btn-base btn-outline w-full" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  );
}
