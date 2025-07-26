import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

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
          { label: "Organizer Requests", href: "/admin/applications" },
          { label: "Approved Organizers", href: "/admin/organizers" },
        ]
      : []),
    { label: "Account", href: "/account" },
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="text-xl font-bold text-emerald-700">
                    IslamicEvents
          </Link>
        </div>
        {/* <br className="border-gray-200 mb-4" /> */}
        <hr className="border-gray-200 mb-10" />
        {/* <h2 className="text-xl font-bold text-emerald-700">Dashboard</h2> */}
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block text-gray-700 hover:text-emerald-600"
          >
            {item.label}
          </Link>
        ))}
        <LogoutButton />
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}