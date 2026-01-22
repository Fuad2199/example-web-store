

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64">Top Sidebar</aside>

      <div className="flex-1 flex flex-col">
        {/* <Header /> */}
        <main className="flex-1 p-6">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
