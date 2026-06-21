import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // When CRON_SECRET is set in the environment, Vercel injects it as a Bearer
  // token on scheduled requests — require it so the endpoint can't be hit
  // anonymously. Until CRON_SECRET is configured the endpoint stays open so the
  // existing cron keeps working; set CRON_SECRET in Vercel project env to enforce.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ success: false }, { status: 401 });
    }
  }

  try {
    const supabase = await createClient();

    // Simple query to keep database active
    const { count, error } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    console.log(
      `[${new Date().toISOString()}] Database keepalive: ${count} products`
    );

    return NextResponse.json({
      success: true,
      message: "Database keepalive successful",
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    // Log details server-side; never leak internal/DB error messages to the caller.
    console.error("Keepalive error:", error);
    return NextResponse.json(
      { success: false, error: "Keepalive failed" },
      { status: 500 }
    );
  }
}
