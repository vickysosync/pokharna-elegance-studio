import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { products as seedProducts, type Product } from "@/data/products";
import { categories as seedCategories, type Category } from "@/data/categories";
import { orders as seedOrders, type Order, type OrderStatus } from "@/data/orders";
import {
  defaultHomeContent,
  defaultSettings,
  type HomeContent,
  type Settings,
} from "@/data/site";

const KEY = (k: string) => `pokharna:${k}`;

function load<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(KEY(k));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(k: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY(k), JSON.stringify(value));
  } catch {
    /* quota / private mode */
  }
}

/** State that lives in localStorage. Hydrates after mount to keep SSR markup stable. */
function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(load(key, initial));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (hydrated) save(key, value);
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}

export type CartLine = { productId: string; qty: number };
export type User = { name: string; email: string };

export const inr = (n: number) =>
  `₹${Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

type StoreValue = {
  hydrated: boolean;
  // catalogue
  products: Product[];
  categories: Category[];
  productById: (id: string) => Product | undefined;
  addProduct: (p: Omit<Product, "id"> & { id?: string }) => Product;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (c: Omit<Category, "id"> & { id?: string }) => void;
  updateCategory: (id: string, patch: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  // cart
  cart: CartLine[];
  cartCount: number;
  cartItems: { product: Product; qty: number }[];
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totals: {
    subtotal: number;
    savings: number;
    shipping: number;
    discount: number;
    tax: number;
    total: number;
  };
  // wishlist
  wishlist: string[];
  isWished: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  moveToCart: (id: string) => void;
  // orders
  orders: Order[];
  placeOrder: (o: Omit<Order, "id" | "date" | "status">) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  // config
  settings: Settings;
  setSettings: (s: Settings) => void;
  home: HomeContent;
  setHome: (h: HomeContent) => void;
  // auth
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export const ADMIN_EMAIL = "admin@pokharnasilk.com";
export const ADMIN_PASSWORD = "admin123";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts, pHydrated] = usePersisted<Product[]>("products", seedProducts);
  const [categories, setCategories] = usePersisted<Category[]>("categories", seedCategories);
  const [cart, setCart] = usePersisted<CartLine[]>("cart", []);
  const [wishlist, setWishlist] = usePersisted<string[]>("wishlist", []);
  const [orders, setOrders] = usePersisted<Order[]>("orders", seedOrders);
  const [settings, setSettings] = usePersisted<Settings>("settings", defaultSettings);
  const [home, setHome] = usePersisted<HomeContent>("home", defaultHomeContent);
  const [user, setUser] = usePersisted<User | null>("user", null);
  const [isAdmin, setIsAdmin] = usePersisted<boolean>("admin", false);

  const productById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products],
  );

  const cartItems = useMemo(
    () =>
      cart
        .map((l) => {
          const product = products.find((p) => p.id === l.productId);
          return product ? { product, qty: l.qty } : null;
        })
        .filter(Boolean) as { product: Product; qty: number }[],
    [cart, products],
  );

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);
    const savings = cartItems.reduce(
      (s, i) => s + Math.max(0, i.product.originalPrice - i.product.price) * i.qty,
      0,
    );
    const shipping =
      subtotal === 0 || subtotal >= settings.freeShippingThreshold ? 0 : settings.shippingCharge;
    const discount = subtotal >= 10000 ? Math.round(subtotal * 0.05) : 0;
    const tax = Math.round(((subtotal - discount) * settings.gstPercent) / 100);
    return { subtotal, savings, shipping, discount, tax, total: subtotal - discount + shipping + tax };
  }, [cartItems, settings]);

  const value: StoreValue = {
    hydrated: pHydrated,
    products,
    categories,
    productById,
    addProduct: (p) => {
      const created = { ...p, id: p.id ?? `p-${Date.now()}` } as Product;
      setProducts((prev) => [created, ...prev]);
      toast.success("Product added");
      return created;
    },
    updateProduct: (id, patch) => {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    },
    deleteProduct: (id) => {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted");
    },
    addCategory: (c) => {
      setCategories((prev) => [...prev, { ...c, id: c.id ?? `cat-${Date.now()}` } as Category]);
      toast.success("Category added");
    },
    updateCategory: (id, patch) =>
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c))),
    deleteCategory: (id) => {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("Category deleted");
    },
    cart,
    cartCount: cart.reduce((s, l) => s + l.qty, 0),
    cartItems,
    addToCart: (id, qty = 1) => {
      setCart((prev) => {
        const found = prev.find((l) => l.productId === id);
        return found
          ? prev.map((l) => (l.productId === id ? { ...l, qty: l.qty + qty } : l))
          : [...prev, { productId: id, qty }];
      });
      toast.success("Added to cart");
    },
    setQty: (id, qty) =>
      setCart((prev) =>
        qty <= 0
          ? prev.filter((l) => l.productId !== id)
          : prev.map((l) => (l.productId === id ? { ...l, qty } : l)),
      ),
    removeFromCart: (id) => {
      setCart((prev) => prev.filter((l) => l.productId !== id));
      toast("Removed from cart");
    },
    clearCart: () => setCart([]),
    totals,
    wishlist,
    isWished: (id) => wishlist.includes(id),
    toggleWishlist: (id) =>
      setWishlist((prev) => {
        const has = prev.includes(id);
        toast(has ? "Removed from wishlist" : "Saved to wishlist");
        return has ? prev.filter((w) => w !== id) : [...prev, id];
      }),
    moveToCart: (id) => {
      setCart((prev) =>
        prev.find((l) => l.productId === id)
          ? prev.map((l) => (l.productId === id ? { ...l, qty: l.qty + 1 } : l))
          : [...prev, { productId: id, qty: 1 }],
      );
      setWishlist((prev) => prev.filter((w) => w !== id));
      toast.success("Moved to cart");
    },
    orders,
    placeOrder: (o) => {
      const order: Order = {
        ...o,
        id: `PKS-${Math.floor(100000 + Math.random() * 899999)}`,
        date: new Date().toISOString().slice(0, 10),
        status: "Pending",
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      return order;
    },
    updateOrderStatus: (id, status) => {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      toast.success(`Order ${id} → ${status}`);
    },
    settings,
    setSettings: (s) => {
      setSettings(s);
      toast.success("Settings saved");
    },
    home,
    setHome: (h) => {
      setHome(h);
      toast.success("Homepage content saved");
    },
    user,
    login: (email, password) => {
      if (!email || password.length < 4) return false;
      setUser({ name: email.split("@")[0], email });
      toast.success("Signed in");
      return true;
    },
    logout: () => {
      setUser(null);
      toast("Signed out");
    },
    isAdmin,
    adminLogin: (email, password) => {
      const ok = email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
      if (ok) setIsAdmin(true);
      return ok;
    },
    adminLogout: () => setIsAdmin(false),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
