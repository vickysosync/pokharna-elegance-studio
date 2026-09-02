import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Account Login | Pokharna Silk" },
      { name: "description", content: "Sign in to your Pokharna Silk account to track orders and saved pieces." },
      { property: "og:title", content: "Account Login | Pokharna Silk" },
      { property: "og:description", content: "Access your Pokharna Silk account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, login, logout, orders } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [remember, setRemember] = useState(true);

  if (user) {
    const mine = orders.filter((o) => o.email.toLowerCase() === user.email.toLowerCase());
    return (
      <SiteLayout>
        <PageHeader eyebrow="My Account" title={`Namaste, ${user.name}`} />
        <div className="container-x py-10">
          <div className="card-surface mx-auto max-w-2xl p-8">
            <p className="text-sm text-muted-foreground">Signed in as {user.email}</p>
            <h2 className="mt-6 text-xl">Your Orders</h2>
            <div className="gold-rule my-3" />
            {mine.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders under this email yet.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {mine.map((o) => (
                  <li key={o.id} className="flex justify-between border-b border-border py-2">
                    <span>{o.id} · {o.date}</span>
                    <span className="text-primary">{o.status}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-base btn-primary">Continue Shopping</Link>
              <button type="button" className="btn-base btn-outline" onClick={logout}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Account"
        title={mode === "login" ? "Sign In" : "Create Account"}
        subtitle="Demo account area — details are stored only in your browser."
      />
      <div className="container-x py-10">
        <form
          className="card-surface mx-auto max-w-md space-y-4 p-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (login(email, password)) navigate({ to: "/" });
            else toast.error("Enter a valid email and a password of at least 4 characters");
          }}
        >
          {mode === "register" && (
            <div>
              <label htmlFor="acc-name" className="label-x">Full Name</label>
              <input
                id="acc-name"
                className="field"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <label htmlFor="acc-email" className="label-x">Email</label>
            <input
              id="acc-email"
              type="email"
              required
              className="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="acc-pass" className="label-x">Password</label>
            <input
              id="acc-pass"
              type="password"
              required
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[var(--primary)]"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-primary underline-offset-4 hover:underline"
              onClick={() => toast("Password reset link sent (demo)")}
            >
              Forgot password?
            </button>
          </div>
          <button type="submit" className="btn-base btn-primary w-full">
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? "New to Pokharna Silk?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="text-primary underline-offset-4 hover:underline"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
          <p className="text-center text-xs text-muted-foreground">
            Shop owner? <Link to="/admin/login" className="text-primary">Admin login</Link>
          </p>
        </form>
      </div>
    </SiteLayout>
  );
}
