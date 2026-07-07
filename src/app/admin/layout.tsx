import { SessionProvider } from "next-auth/react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-[var(--bg-base)]">
        <AdminSidebar />
        <div className="lg:pl-56">
          <main className="p-6 pt-16 lg:p-8 lg:pt-8">{children}</main>
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--bg-surface)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "8px",
            },
          }}
        />
      </div>
    </SessionProvider>
  );
}
