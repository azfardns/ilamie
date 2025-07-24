import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerClient();
  const { data } = await supabase.from("venues").select("id, name").order("name");
  return NextResponse.json(data || []);
}