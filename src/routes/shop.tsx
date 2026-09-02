import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { QuickView } from "@/components/QuickView";
import {
  FiltersPanel,
  defaultFilters,
  sortOptions,
  type FilterState,
} from "@/components/ProductFilters";
import { useStore } from "@/lib/store";
import { discountOf, type Product } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Dress Materials & Sarees | Pokharna Silk" },
      {
        name: "description",
        content:
          "Browse silk dress materials, Banarasi, Chanderi, Paithani and sarees with filters for price, rating and discount.",
      },
      { property: "og:title", content: "Shop All Dress Materials & Sarees | Pokharna Silk" },
      { property: "og:description", content: "Filter and sort our full curated ethnic wear catalogue." },
    ],
  }),
  component: ShopPage,
});

export function useFilteredProducts(products: Product[], filters: FilterState) {
  return useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    let list = products.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.category} ${p.fabric} ${p.collection} ${p.weave} ${p.occasion} ${p.color}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.category !== "all" && p.category !== filters.category) return false;
      if (p.price > filters.maxPrice) return false;
      if (p.rating < filters.minRating) return false;
      if (discountOf(p) < filters.minDiscount) return false;
      if (filters.inStockOnly && p.stock <= 0) return false;
      return true;
    });

    list = [...list];
    switch (filters.sort) {
      case "newest":
        list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [products, filters]);
}

function ShopPage() {
  const { products, categories } = useStore();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [drawer, setDrawer] = useState(false);
  const [quick, setQuick] = useState<Product | null>(null);
  const results = useFilteredProducts(products, filters);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Full Catalogue"
        title="Shop the Collection"
        subtitle="Unstitched suit sets, dress materials and sarees — every piece chosen by hand at the loom."
      />

      <div className="container-x grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            onClear={() => setFilters(defaultFilters)}
          />
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{results.length} products</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn-base btn-outline lg:hidden"
                onClick={() => setDrawer(true)}
              >
                <SlidersHorizontal size={15} /> Filters
              </button>
              <label htmlFor="sort" className="sr-only">Sort by</label>
              <select
                id="sort"
                className="field w-auto"
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              >
                {sortOptions.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="card-surface p-12 text-center">
              <h2 className="text-xl">No products match those filters</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening the price range or clearing filters.
              </p>
              <button
                type="button"
                className="btn-base btn-primary mt-5"
                onClick={() => setFilters(defaultFilters)}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuick} />
              ))}
            </div>
          )}
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 bg-foreground/50 lg:hidden" onClick={() => setDrawer(false)}>
          <div
            className="ml-auto h-full w-[85%] max-w-sm overflow-auto bg-background p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg">Filters</h2>
              <button type="button" className="btn-base btn-ghost" onClick={() => setDrawer(false)}>
                Done
              </button>
            </div>
            <FiltersPanel
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              onClear={() => setFilters(defaultFilters)}
            />
          </div>
        </div>
      )}

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </SiteLayout>
  );
}
