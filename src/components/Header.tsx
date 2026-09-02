import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useStore } from "@/lib/store";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/category/$category", params: { category: "dress-materials" }, label: "Dress Materials" },
  { to: "/category/$category", params: { category: "sarees" }, label: "Sarees" },
  { to: "/category/$category", params: { category: "festive-collection" }, label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { cartCount, wishlist, home, user } = useStore();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setSearchOpen(false);
    setOpen(false);
    navigate({ to: "/search", search: { q: q.trim() } });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="bg-royal py-2 text-center text-[11px] tracking-[0.16em] text-primary-foreground">
        <span className="container-x block">{home.announcement}</span>
      </div>

      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-semibold text-primary">Pokharna Silk</span>
          <span className="text-[9px] tracking-[0.3em] text-muted-foreground">
            DRESS MATERIALS &amp; SAREES
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              params={"params" in l ? l.params : undefined}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Search products"
            className="rounded-full p-2 hover:bg-muted"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <Search size={18} />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="relative rounded-full p-2 hover:bg-muted">
            <Heart size={18} />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative rounded-full p-2 hover:bg-muted">
            <ShoppingBag size={18} />
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </Link>
          <Link
            to="/login"
            aria-label={user ? `Account: ${user.name}` : "Account"}
            className="rounded-full p-2 hover:bg-muted"
          >
            <User size={18} />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-full p-2 hover:bg-muted lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-secondary/60">
          <form onSubmit={submitSearch} className="container-x flex gap-2 py-3">
            <label htmlFor="header-search" className="sr-only">
              Search products
            </label>
            <input
              id="header-search"
              className="field"
              placeholder="Search sarees, Banarasi, Chanderi, festive…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn-base btn-primary">
              Search
            </button>
          </form>
        </div>
      )}

      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-background lg:hidden">
          <ul className="container-x flex flex-col py-2">
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  params={"params" in l ? l.params : undefined}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3 text-sm font-medium"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" onClick={() => setOpen(false)} className="block py-3 text-sm font-medium">
                Account
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
      {children}
    </span>
  );
}
