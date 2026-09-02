import { useEffect, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

const adminNav = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/customers", label: "Customers" },
  { to: "/admin/homepage", label: "Homepage" },
  { to: "/admin/settings", label: "Settings" },
] as const;

export function AdminLayout({ title, children }: { title: string; children: ReactNode }) {
  const { isAdmin, hydrated, adminLogout } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !isAdmin) navigate({ to: "/admin/login", replace: true });
  }, [hydrated, isAdmin, navigate]);

  if (!hydrated || !isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <p className="text-sm text-muted-foreground">Checking admin session…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="border-b border-border bg-background">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-4">
          <Link to="/admin/dashboard" className="font-display text-xl font-semibold text-primary">
            Pokharna Silk · Admin
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn-base btn-ghost text-xs">
              View Store
            </Link>
            <button
              type="button"
              className="btn-base btn-outline text-xs"
              onClick={() => {
                adminLogout();
                navigate({ to: "/admin/login", replace: true });
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <nav aria-label="Admin" className="border-t border-border">
          <ul className="container-x flex gap-1 overflow-x-auto py-2">
            {adminNav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="whitespace-nowrap rounded px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted"
                  activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="container-x py-8">
        <h1 className="mb-6 text-3xl">{title}</h1>
        {children}
      </main>
    </div>
  );
}
