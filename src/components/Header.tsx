import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";

export default async function Header() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role = "";
  if (user) {
    const { data: userData } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    role = userData?.role || "";
  }

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-[#defbdd] shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-[#25c226] hover:text-[#19a01a] transition-colors">
          IslamicEvents
        </Link>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-[#177e19] hover:text-[#25c226] font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-[#defbdd]/50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#25c226] text-white px-4 py-1.5 rounded-lg hover:bg-[#19a01a] transition-colors font-medium shadow-sm"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/organizer/my-events"
                className="text-[#177e19] hover:text-[#25c226] font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-[#defbdd]/50"
              >
                Dashboard
              </Link>

              <span className="text-sm text-gray-700 px-2 bg-gray-200 rounded-lg">
                {user.email} {role && <span className="text-sm text-gray-500">({role})</span>}
              </span>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}