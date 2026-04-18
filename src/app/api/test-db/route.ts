import { NextResponse } from "next/server";
import { db } from "@/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    console.log("Testing database connection...");

    // Check Cloudflare context
    const cfContext = getCloudflareContext();
    console.log("Cloudflare context:", !!cfContext);
    console.log("Env available:", !!cfContext?.env);

    // Check database binding
    const dbBinding = (cfContext?.env as any)?.GETINWORK_DB;
    console.log("Database binding available:", !!dbBinding);

    // Simple test query
    const result = await db.run("SELECT 1 as test");
    console.log("Query result:", result);

    return NextResponse.json({
      success: true,
      message: "Database connection works",
      context: {
        hasContext: !!cfContext,
        hasEnv: !!cfContext?.env,
        hasDbBinding: !!dbBinding,
      },
      result: result,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
        context: {
          hasContext: !!getCloudflareContext(),
          hasEnv: !!getCloudflareContext()?.env,
          hasDbBinding: !!(getCloudflareContext()?.env as any)?.GETINWORK_DB,
        },
      },
      { status: 500 },
    );
  }
}
