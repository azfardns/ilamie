import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-emerald-700">
          IslamicEvents
        </Link>

        <div className="space-x-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-emerald-700 hover:underline"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/organizer/my-events"
                className="text-emerald-700 hover:underline"
              >
                Dashboard
              </Link>
              <LogoutButton />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}