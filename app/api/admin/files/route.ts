import { NextResponse, type NextRequest } from "next/server";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { canAccessCapability } from "@/lib/security/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const user = await getCurrentProfile();

  if (!canAccessCapability(user, "requests:manage")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const path = request.nextUrl.searchParams.get("path");
  const isQuote = request.nextUrl.searchParams.get("quote") === "1";

  if (!path) {
    return NextResponse.json({ error: "Missing file path" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const bucket = isQuote ? "quote-files" : "custom-request-files";
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 60);

  if (error || !data) {
    return NextResponse.json({ error: "Could not create signed URL" }, { status: 404 });
  }

  return NextResponse.redirect(data.signedUrl);
}
