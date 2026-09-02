import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { QuickView } from "@/components/QuickView";
import { useStore } from "@/lib/store";
import type { Product } from "@/data/products";

type SearchParams = { q?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search | Pokharna Silk" },
      { name: "description", content: "Search Pokharna Silk by product name, category, fabric or collection." },
      { property: "og:title", content: "Search | Pokharna Silk" },
      { property: "og:description", content: "Find the weave you are looking for." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { products } = useStore();
  const [term, setTerm] = useState(q);
  const [quick, setQuick] = useState<Product | null>(null);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return products.filter((p) =>
      `${p.name} ${p.category} ${p.fabric} ${p.collection} ${p.weave} ${p.occasion} ${p.color}`
        .toLowerCase()
        .includes(needle),
    );
  }, [products, q]);

  return (
    <SiteLayout>
      <PageHeader eyebrow="Search" title={q ? `Results for “${q}”` : "Search the Collection"} />
      <div className="container-x py-10">
        <form
          className="mx-auto mb-8 flex max-w-xl gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ search: { q: term.trim() || undefined } });
          }}
        >
          <label htmlFor="search-input" className="sr-only">Search products</label>
          <input
            id="search-input"
            className="field"
            placeholder="Banarasi, Chanderi, Paithani, saree…"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit" className="btn-base btn-primary">Search</button>
        </form>

        {q && results.length === 0 ? (
          <div className="card-surface mx-auto max-w-lg p-12 text-center">
            <h2 className="text-2xl">No matches found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a fabric like “Chanderi” or a category like “sarees”.
            </p>
            <Link to="/shop" className="btn-base btn-primary mt-6">Browse All Products</Link>
          </div>
        ) : (
          <>
            {q && <p className="mb-5 text-sm text-muted-foreground">{results.length} products</p>}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuick} />
              ))}
            </div>
          </>
        )}
      </div>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </SiteLayout>
  );
}
