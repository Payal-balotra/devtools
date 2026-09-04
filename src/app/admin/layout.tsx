export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-6">
        <h2 className="mb-6 text-xl font-bold">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-3">
          <a href="/admin">Dashboard</a>
          <a href="/admin/users">Users</a>
          <a href="/admin/products">Products</a>
          <a href="/admin/prices">Prices</a>
          <a href="/admin/subscriptions">Subscriptions</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}   