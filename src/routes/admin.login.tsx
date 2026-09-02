import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ADMIN_EMAIL, ADMIN_PASSWORD, useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Pokharna Silk" },
      { name: "description", content: "Staff sign-in for the Pokharna Silk store admin panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Login | Pokharna Silk" },
      { property: "og:description", content: "Staff sign-in for the Pokharna Silk admin panel." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { adminLogin, isAdmin, hydrated } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && isAdmin) navigate({ to: "/admin/dashboard", replace: true });
  }, [hydrated, isAdmin, navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-veil px-4 py-12">
      <div className="card-surface w-full max-w-md p-8">
        <div className="text-center">
          <p className="eyebrow">Pokharna Silk</p>
          <h1 className="mt-2 text-3xl">Admin Panel</h1>
          <div className="gold-rule mx-auto my-4" />
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (adminLogin(email, password)) navigate({ to: "/admin/dashboard", replace: true });
            else setError("Invalid admin credentials. Please try again.");
          }}
        >
          <div>
            <label htmlFor="admin-email" className="label-x">Email</label>
            <input
              id="admin-email"
              type="email"
              required
              className="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="admin-pass" className="label-x">Password</label>
            <input
              id="admin-pass"
              type="password"
              required
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">{error}</p>
          )}
          <button type="submit" className="btn-base btn-primary w-full">Sign In</button>
        </form>
        <p className="mt-5 rounded bg-secondary p-3 text-center text-xs text-muted-foreground">
          Demo credentials — {ADMIN_EMAIL} / {ADMIN_PASSWORD}
        </p>
        <p className="mt-4 text-center text-xs">
          <Link to="/" className="text-primary hover:underline">← Back to store</Link>
        </p>
      </div>
    </div>
  );
}
