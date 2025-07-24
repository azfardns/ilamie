import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const nav = [
    ...(profile?.role === "organizer"
      ? [
          { label: "My Events", href: "/organizer/my-events" },
          { label: "Create Event", href: "/organizer/create" },
        ]
      : []),
    ...(profile?.role === "admin"
      ? [
          { label: "Organizer Requests", href: "/admin/requests" },
          { label: "Approved Organizers", href: "/admin/organizers" },
        ]
      : []),
    { label: "Account", href: "/account" },
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white border-r p-6 space-y-4">
        <h2 className="text-xl font-bold text-emerald-700">Dashboard</h2>
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block text-gray-700 hover:text-emerald-600"
          >
            {item.label}
          </Link>
        ))}
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}